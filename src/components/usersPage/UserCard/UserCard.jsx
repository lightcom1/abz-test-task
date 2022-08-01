import './userCard.scss';
import photoCover from '../../../assets/photo-cover.svg';
import { useState, memo } from 'react';

const UserCard = ({ email, name, phone, photo, position }) => {
	const [tooltip, setTooltip] = useState(false);

	const onMouseEnterHandler = () => {
		setTooltip(true);
	};
	const onMouseLeaveHandler = () => {
		setTooltip(false);
	};

	return (
		<div className='user-card'>
			<img
				src={photo}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = photoCover;
				}}
				width='70'
				height='70'
				loading='lazy'
				alt={name}
				className='user-card__photo'
			/>
			<p className='user-card__name'>{name}</p>
			<div className='user-card__info'>
				<p className='user-card__info--position'>{position}</p>
				<p
					className='user-card__info--email'
					onMouseEnter={() => onMouseEnterHandler()}
					onMouseLeave={() => onMouseLeaveHandler()}>
					{email}
				</p>
				{tooltip && <p className='email-tootlip'>{email}</p>}
				<p className='user-card__info--phone'>{phone}</p>
			</div>
		</div>
	);
};

export default memo(UserCard);
