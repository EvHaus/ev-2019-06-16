// @flow

import {MAX_FILE_SIZE, VALID_FILE_TYPES} from '../constants';
import {IncomingForm} from 'formidable';
import path from 'path';

type FormPartType = {
	filename: string,
	mime: string,
};

export default async function (ctx: any) {
	try {
		await new Promise((
			resolve: () => any,
			reject: (err: Error) => any
		) => {
			const form = new IncomingForm();
			const files = [];

			// Validate mime type of file to reject types we don't support.
			form.onPart = function (part: FormPartType) {
				const isValidType = VALID_FILE_TYPES.includes(part.mime);

				if (!isValidType) {
					form._error(new Error('File type is not supported'));
				} else if (!part.filename) {
					form.handlePart(part);
				}
			};

			form.maxFileSize = MAX_FILE_SIZE;
			form.uploadDir = path.join(__dirname, '..', 'static', 'uploads');

			form.on('progress', (bytesReceived, bytesExpected) => {
				console.log({bytesReceived, bytesExpected});
			});

			form.on('error', (err: Error) => {
				console.log('upload error', err);
				ctx.status = 415;
				ctx.body = {
					error: err.message,
				};
				reject(err);
			});

			form.on('file', (field: string, file: File) => {
				files.push(file);
			});

			form.on('end', () => {
				try {
					// Always assume we only received 1 file
					const file = files[0];
					console.log(file);

					ctx.status = 200;
					ctx.body = {
						name: file.name,
					};

					resolve();
				} catch (err) {
					reject(err);
				}
			});

			form.parse(ctx.req);
		});
	} catch (err) {
		if (!ctx.status) ctx.status = 500;
		if (!ctx.body) ctx.body = {
			error: err.message,
		};
	}

	return undefined;
}
