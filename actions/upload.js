// @flow

import {type DocumentType} from '../types';

// Handles the submission of the file upload
export const upload = (file: File): Promise<DocumentType> => {
	const formData = new FormData();
	formData.append('file', file, file.name);

	return fetch('/api/upload', {method: 'PUT', body: formData})
		.then((response: Response): Promise<DocumentType> => response.json())
		.catch((err: Error) => {
			// Convert error message into something more user friendly
			if (err.message.includes('maxFileSize exceeded')) {
				throw new Error(
					`The file you selected is too big. Maximum file size is 10MB.`
				);
			}

			throw err;
		});
};

export default upload;
