// @flow

import {
	MAX_FILE_SIZE,
	VALID_FILE_TYPES,
} from '../constants';
import {type DocumentType} from '../types';

// Handles the submission of the file upload
export const upload = (file: File): Promise<DocumentType> => {
	const formData = new FormData();
	formData.append('file', file, file.name);

	// Before we send the file to the backend for further validation, let's
	// run some simple cleint-side checks to improve UX and reduce network
	// load. These can be easily bypassed so they're online here for superficial
	// checks.
	if (file.size > MAX_FILE_SIZE) return Promise.reject(
		new Error(
			`The file you selected is too big. ` +
			`Maximum file size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`
		)
	);

	if (!VALID_FILE_TYPES.includes(file.type)) return Promise.reject(
		new Error(
			`The file you selected is not supported. Please ` +
			`provide one of these types: ${VALID_FILE_TYPES.join(', ')}.`
		)
	);

	return fetch('/api/upload', {method: 'PUT', body: formData})
		.then((response: Response): Promise<any> => response.json())
		.then((response: any): DocumentType => {
			if (response.error) throw new Error(response.error);
			return response;
		});
};

export default upload;
