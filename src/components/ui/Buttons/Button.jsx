import './buttons.scss';

const Button = ({
	text,
	isDisabled = false,
	showMore = null,
	submitForm = null,
}) => {
	const link = `#${text.replace(/\s+/g, '').toLowerCase()}`;

	const handleClick = e => {
		e.preventDefault();
		if (showMore) {
			showMore();
		} else {
			submitForm();
		}
	};

	return (
		<>
			<a
				href={link}
				className={`primary-btn${isDisabled ? ' disabled' : ''}`}
				onClick={e => (showMore || submitForm) && handleClick(e)}>
				{text}
			</a>
		</>
	);
};

export default Button;
