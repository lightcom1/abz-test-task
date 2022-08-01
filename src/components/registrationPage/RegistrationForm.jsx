import './registrationForm.scss';
import { useState, useEffect } from 'react';
import Input from '../ui/Input/Input';
import {
	useAddUserMutation,
	useGetPositionsQuery,
	useLazyGetTokenQuery,
} from '../../store/abz/abz.api';
import Loader from '../ui/Loader/Loader';
import Button from '../ui/Buttons/Button';
import SuccessModal from '../ui/Modal/SuccessModal';
import { useActions } from './../../hooks/actions';
import Positions from './Positions/Positions';
import PhotoUpload from './PhotoUpload/PhotoUpload';

const RegistrationForm = () => {
	//Form data states
	const [userName, setUserName] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const [userPhone, setUserPhone] = useState('');
	const [userPosition, setUserPosition] = useState('');
	const [userPositionId, setUserPositionId] = useState(0);

	//Form photo states
	const [userPhotoName, setUserPhotoName] = useState('Upload your photo');
	const [userPhotoFile, setUserPhotoFile] = useState(null);
	const [userPhotoError, setUserPhotoError] = useState('');

	//Form statuses
	const [isFormValidated, setIsFormValidated] = useState(false);
	const [isFormFilled, setIsFormFilled] = useState(false);

	//Form errors
	const [registrationError, setRegistrationError] = useState('');
	const [formErrors, setFormErrors] = useState({
		username: false,
		useremail: false,
		userphone: false,
		userposition: true,
	});

	//Clear state of users on refetch
	const { resetUsers } = useActions();

	//Get positions query
	const {
		data: positions,
		isLoading: isPositionsLoading,
		isError: isPositionsError,
		error: positionsError,
	} = useGetPositionsQuery();

	//Get token query
	const [fetchToken] = useLazyGetTokenQuery();

	//Add user mutation
	const [registerUser, { isLoading: isUserLoading }] = useAddUserMutation();

	//Load photo
	const handlePhotoUpload = e => {
		setUserPhotoError('');
		setUserPhotoFile(null);

		const file = e.target.files[0];
		let isUploadError = false;

		if (file.size > 5_242_880) {
			setUserPhotoError('Image size must not exceed 5MB');
			isUploadError = true;
		}

		const img = new Image();
		img.src = URL.createObjectURL(file);
		img.onload = () => {
			if (img.width < 70 && img.height < 70) {
				setUserPhotoError('Dimensions must be at least 70x70px');
				isUploadError = true;
			}
		};

		setUserPhotoName(file.name);
		!isUploadError && setUserPhotoFile(file);
	};

	//Set user position and id
	const handleUserPosition = (position, id) => {
		setUserPosition(position);
		setUserPositionId(id);

		setFormErrors(prevState => ({
			...prevState,
			userposition: false,
		}));
	};

	//Clear state on successfully added user
	const clearFormStates = () => {
		setUserName('');
		setUserEmail('');
		setUserPhone('');
		setUserPosition('');
		setUserPhotoName('Upload your photo');
		setUserPhotoFile(null);
		setRegistrationError('');

		setFormErrors(prevState => ({
			...prevState,
			userposition: true,
		}));
	};

	//Validations
	const validateUserName = value => {
		if (value.length > 1 && value.length < 61) {
			setFormErrors(prevState => ({
				...prevState,
				username: false,
			}));
		} else {
			setFormErrors(prevState => ({
				...prevState,
				username: true,
			}));
		}
	};

	const validateUserEmail = value => {
		const regEmail =
			/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

		if (userEmail.length <= 74 && regEmail.test(value)) {
			setFormErrors(prevState => ({
				...prevState,
				useremail: false,
			}));
		} else {
			setFormErrors(prevState => ({
				...prevState,
				useremail: true,
			}));
		}
	};

	const validateUserPhone = value => {
		const regPhone = /^[\\+]{0,1}380([0-9]{9})$/;

		if (regPhone.test(value)) {
			setFormErrors(prevState => ({
				...prevState,
				userphone: false,
			}));
		} else {
			setFormErrors(prevState => ({
				...prevState,
				userphone: true,
			}));
		}
	};

	//Submit form when completely filled out and valid
	const submitForm = async () => {
		if (
			!formErrors.useremail &&
			!formErrors.userphone &&
			!formErrors.userposition &&
			!formErrors.username
		) {
			const { token } = await fetchToken().unwrap();

			const formData = new FormData();
			formData.append('name', userName);
			formData.append('email', userEmail);
			formData.append('phone', userPhone);
			formData.append('position_id', userPositionId);
			formData.append('photo', userPhotoFile);

			try {
				await registerUser({ token, formData }).unwrap();

				setIsFormValidated(true);
			} catch (error) {
				setRegistrationError(error.data.message);
				setFormErrors(prevState => ({
					...prevState,
					useremail: true,
					userphone: true,
				}));
			}
		} else {
			setIsFormValidated(false);
		}
	};

	//Check if form completely filled without errors
	const checkFormFilled = async () => {
		if (
			userName.length > 1 &&
			userEmail.length &&
			userPhone.length > 12 &&
			userPosition.length &&
			!formErrors.useremail &&
			userPhotoFile !== null
		) {
			setIsFormFilled(true);
		} else {
			setIsFormFilled(false);
		}
	};

	//Invoke checkFormFilled func on inputs change
	useEffect(() => {
		checkFormFilled();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		userName,
		userEmail,
		userPhone,
		userPosition,
		userPhotoFile,
		userPhotoError,
	]);

	//Show success modal and clear states when user successfully added
	useEffect(() => {
		if (isFormValidated) {
			clearFormStates();
			resetUsers();
			setTimeout(() => {
				setIsFormValidated(false);
			}, 3000);
		}
	}, [isFormValidated]);

	return (
		<section className='POST-section' id='signup'>
			{isFormValidated ? (
				<SuccessModal />
			) : (
				<>
					<h1 className='title'>Working with POST request</h1>
					<form className='form'>
						<Input
							type='text'
							placeholder='Your name'
							state={userName}
							setState={setUserName}
							validate={validateUserName}
							error={formErrors.username}
						/>
						<Input
							type='email'
							placeholder='Email'
							state={userEmail}
							setState={setUserEmail}
							validate={validateUserEmail}
							error={formErrors.useremail}
						/>
						<Input
							type='tel'
							placeholder='Phone'
							state={userPhone}
							setState={setUserPhone}
							validate={validateUserPhone}
							error={formErrors.userphone}
						/>

						<Positions
							isPositionsLoading={isPositionsLoading}
							isPositionsError={isPositionsError}
							positionsError={positionsError}
							positions={positions}
							handleUserPosition={handleUserPosition}
							userPosition={userPosition}
						/>

						<PhotoUpload
							userPhotoError={userPhotoError}
							userPhotoFile={userPhotoFile}
							userPhotoName={userPhotoName}
							handlePhotoUpload={handlePhotoUpload}
						/>

						{!isUserLoading ? (
							<Button
								text='Sign up'
								isDisabled={!isFormFilled}
								submitForm={submitForm}
							/>
						) : (
							<Loader />
						)}
						{registrationError && (
							<p className='error' style={{ marginTop: 10 }}>
								{registrationError}
							</p>
						)}
					</form>
				</>
			)}
		</section>
	);
};

export default RegistrationForm;
