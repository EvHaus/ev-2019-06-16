// @flow

import React, {type Element, useRef} from 'react';
import Button from '../Button';
import {type DocumentType} from '../../types';
import styles from './UploadButton.css';
import {upload} from '../../actions/upload';

type PropsType = {|
	onUploadError: (err: Error) => any,
	onUploadSuccess: (doc: DocumentType) => any,
|};

export const UploadButton = ({
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
		// FIXME: Assumes only 1 file is given. Might be dangerous.
		return upload(event.target.files[0])
			.then(onUploadSuccess)
			.catch(onUploadError);
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
