// @flow

import React, {type Element, useRef} from 'react';
import Button from '../Button';
import styles from './UploadButton.css';

const _handleUpload = (file: File): Promise<void> => {
	return new Promise((resolve: () => any, reject: () => any) => {
		const req = new XMLHttpRequest();

		const formData = new FormData();
		formData.append('file', file, file.name);

		req.open('POST', '/api/upload');
		req.send(formData);

		req.upload.addEventListener('progress', (event: ProgressEvent) => {
			if (event.lengthComputable) {
				const copy = {};
				copy[file.name] = {
					state: 'pending',
					percentage: (event.loaded / event.total) * 100,
				};

				console.log(copy);
				// this.setState({ uploadProgress: copy });
			}
		});
	});
};

export const UploadButton = (): Element<typeof Button> => {
	const _fileInputRef = useRef();

	// Simulate clicking on the hidden `<input type="file" />`
	const _handleClick = () => {
		if (_fileInputRef && _fileInputRef.current) {
			_fileInputRef.current.click();
		}
	};

	// Handle the file uploading itself
	const _handleFileInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
		// TODO: Handle invalid event and errors here
		console.log('READY TO UPLOAD', event.target.files);

		_handleUpload(event.target.files[0]);
	};

	return (
		<Button onClick={_handleClick}>
			Upload
			<input
				className={styles.fileInput}
				name='file'
				onChange={_handleFileInputChange}
				ref={_fileInputRef}
				type='file' />
		</Button>
	);
};

UploadButton.displayName = 'UploadButton';

export default UploadButton;
