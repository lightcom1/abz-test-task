import './photoUpload.scss';

const PhotoUpload = ({ userPhotoError, userPhotoName, handlePhotoUpload }) => {
	return (
		<div className={`photo-input-wrapper${userPhotoError ? ' error' : ''}`}>
			<label
				className={`photo-upload${userPhotoName ? ' filled' : ''}`}
				data-file={userPhotoName}>
				<input
					type='file'
					accept='.jpeg, .jpg'
					onChange={e => handlePhotoUpload(e)}
					required
				/>
				Upload
			</label>
			{userPhotoError && <p className='helper-text'>{userPhotoError}</p>}
		</div>
	);
};

export default PhotoUpload;
