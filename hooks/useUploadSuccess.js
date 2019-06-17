// @flow

import {useEffect, useState} from 'react';
import {type DocumentType} from '../types';

type ResponseType = [
	?string,
	Array<DocumentType>,
	(doc: ?DocumentType) => any,
];

const useUploadSuccess = (): ResponseType => {
	// FUTURE: A local cache of uploaded files. In an ideal scenario both the
	// uploaded items and the items we fetched from the API would be stored in
	// a global reducer so we wouldn't have to use this hack.
	const [uploadedFiles, setUploadedFiles] = useState([]);

	const [uploadSuccess, setUploadSuccess] = useState(null);

	// Automatically dismiss the message after 2.5 seconds
	useEffect(() => {
		if (uploadSuccess) setTimeout((): any => setUploadSuccess(null), 2500);
	}, [uploadSuccess]);

	// Convert success response to a friendly user message
	const uploadSuccessMessage = uploadSuccess ? (
		`Your file (${uploadSuccess.name}) has been uploaded successfully.`
	) : null;

	// When a file is uploaded, set the success state but also write a value to
	// our local `uploadedFiles` cache.
	const combinedSetUploadSuccess = (uploadedFile: ?DocumentType) => {
		setUploadSuccess(uploadedFile);

		if (uploadedFile) {
			uploadedFiles.push(uploadedFile);
			setUploadedFiles(uploadedFiles);
		}
	};

	return [uploadSuccessMessage, uploadedFiles, combinedSetUploadSuccess];
};

export default useUploadSuccess;
