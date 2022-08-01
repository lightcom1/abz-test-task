import './input.scss';

const Input = ({
	type,
	placeholder,
	state,
	setState,
	error = false,
	validate,
}) => {
	const handleFocus = e => {
		if (e.target.type === 'tel' && state.length < 4) {
			setState('+380');
		}
	};

	const handleChange = e => {
		setState(e.target.value);
		validate(e.target.value);
	};

	let errorText = '';
	if (error) {
		switch (type) {
			case 'text':
				errorText = 'Name should be 2-60 characters';
				break;
			case 'email':
				errorText = 'Invalid email address';
				break;
			case 'tel':
				errorText = 'Phone number, should start with code of Ukraine +380';
				break;

			default:
				return;
		}
	}

	return (
		<div
			className={`input-wrapper${state.length > 0 ? ' focused' : ''} ${
				error ? ' input--error' : ''
			}`}
			data-placeholder={placeholder}>
			<input
				className={error ? 'input--error' : ''}
				type={type}
				value={state}
				onChange={e => handleChange(e)}
				onFocus={e => handleFocus(e)}
				name={type === 'text' ? 'name' : placeholder}
				aria-label={type === 'text' ? 'name' : placeholder}
				required
			/>
			{(error || type === 'tel') && (
				<p className={`helper-text${error ? ' error' : ''}`}>
					{type === 'tel' && !errorText ? '+38 (XXX) XXX - XX - XX' : errorText}
				</p>
			)}
		</div>
	);
};

export default Input;
