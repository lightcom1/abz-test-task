import './successModal.scss';
import successImage from '../../../assets/success-image.svg';

const SuccessModal = () => {
	return (
		<div className='success-modal-wrapper'>
			<h1 className='modal-title'>User successfully registered</h1>
			<img width='328' height='290' src={successImage} alt='Success' />
		</div>
	);
};

export default SuccessModal;
