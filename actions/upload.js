// @flow

import {type DocumentType} from '../types';

// Handles the submission of the file upload
export const upload = (file: File): Promise<DocumentType> => {
	const formData = new FormData();
	formData.append('file', file, file.name);

	return fetch('/api/upload', {method: 'PUT', body: formData})
		.then((response: Response): Promise<any> => response.json())
		.then((response: any): DocumentType => {
			if (response.error) throw new Error(response.error);
			return response;
		});
};

export default upload;
