// @flow

import React, {type Element, useRef, useState} from 'react';
import Button from '../Button';
import {type DocumentType} from '../../types';
import styles from './UploadButton.css';
import {upload} from '../../actions/upload';

type PropsType = {|
	onUploadError: (err: ?string) => any,
	onUploadSuccess: (doc: ?DocumentType) => any,
|};

export const UploadButton = ({
	onUploadError,
	onUploadSuccess,
}: PropsType): Element<typeof Button> => {
	const _fileInputRef = useRef();
	const [isUploading, setIsUploading] = useState(false);

	// Simulate clicking on the hidden `<input type="file" />`
	const _handleClick = () => {
		if (_fileInputRef && _fileInputRef.current) {
			_fileInputRef.current.click();
		}
	};

	// Handle the file uploading itself
	const _handleFileInputChange = (
		event: SyntheticInputEvent<HTMLInputElement>
	): Promise<DocumentType> => {
		setIsUploading(true);

		// Clear any success and error messages when a new file is being
		// uploaded.
		onUploadError(null);
		onUploadSuccess(null);

		// FIXME: Assumes only 1 file is given. Might be dangerous.
		return upload(event.target.files[0])
			.then((file: DocumentType): DocumentType => {
				onUploadSuccess(file);
				setIsUploading(false);

				// Clear the file input field so we can re-upload the same file
				if (_fileInputRef && _fileInputRef.current) {
					_fileInputRef.current.value = '';
				}

				return file;
			})
			.catch((err: Error): any => {
				onUploadError(err.message);
				setIsUploading(false);
			});
	};

	return (
		<Button disabled={isUploading} onClick={_handleClick}>
			{isUploading ? 'Uploading...' : 'Upload'}
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
