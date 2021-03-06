// @flow

import React, {type Element, useRef} from 'react';
import Button from '../Button';
import {type DocumentType} from '../../types';
import styles from './UploadButton.css';
import {upload} from '../../actions/upload';

type PropsType = {|
	isUploading: boolean,
	onUpload: () => any,
	onUploadError: (err: string) => any,
	onUploadSuccess: (doc: DocumentType) => any,
|};

export const UploadButton = ({
	isUploading,
	onUpload,
	onUploadError,
	onUploadSuccess,
}: PropsType): Element<typeof Button> => {
	const _fileInputRef = useRef();

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
		onUpload();

		// FIXME: Assumes only 1 file is given. Might be dangerous.
		return upload(event.target.files[0])
			.then((file: DocumentType): DocumentType => {
				onUploadSuccess(file);

				// Clear the file input field so we can re-upload the same file
				if (_fileInputRef && _fileInputRef.current) {
					_fileInputRef.current.value = '';
				}

				return file;
			})
			.catch((err: Error): any => {
				onUploadError(err.message);
			});
	};

	return (
		<Button
			className={styles.main}
			disabled={isUploading}
			onClick={_handleClick}>
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
