import './buttons.scss';

const RadioButton = ({ position, userPosition, handleUserPosition, positionId }) => {
	return (
		<div className="radio-button">
			<input type='radio' value={position} name='position' onChange={() => handleUserPosition(position, positionId)} checked={userPosition === position} id={position} className='radio-button-position'/>
			<label htmlFor={position}>{position}</label>
		</div>
	);
};

export default RadioButton;
