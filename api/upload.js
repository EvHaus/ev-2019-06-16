// @flow

import {
	MAX_FILE_NAME_LENGTH,
	MAX_FILE_SIZE,
	ROOT_DIR,
	UPLOAD_DIR,
	VALID_FILE_TYPES,
} from '../constants';
import fs from 'fs';
import {IncomingForm} from 'formidable';
import path from 'path';

type FormPartType = {|
	filename: string,
	mime: string,
|};

export default async function (ctx: any) {
	try {
		await new Promise((
			resolve: () => any,
			reject: (err: Error) => any
		) => {
			const form = new IncomingForm();
			const files = [];

			// Run some validations on the given file.
			form.onPart = function (part: FormPartType) {
				const isValidType = VALID_FILE_TYPES.includes(part.mime);

				if (part.filename.length > MAX_FILE_NAME_LENGTH) {
					form._error(new Error('File name is too long'));
				} else if (!isValidType) {
					form._error(new Error('File type is not supported'));
				} else {
					form.handlePart(part);
				}
			};

			form.maxFileSize = MAX_FILE_SIZE;
			form.uploadDir = UPLOAD_DIR;

			// Create upload directory if it doesn't exist yet
			if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

			form
				.on('progress', (bytesReceived: number, bytesExpected: number) => {
					// TODO: In the future we can add progress bars via a socket
				})
				.on('error', (err: Error) => {
					// Determine error message and status code
					if (err.message.includes('File name is too long')) {
						ctx.status = 413;
						ctx.body = {
							error: (
								`The file you selected has a name that is too long. ` +
								`Maximum file name is ${MAX_FILE_NAME_LENGTH} characters.`
							),
						};
					} else if (err.message.includes('maxFileSize exceeded')) {
						ctx.status = 413;
						ctx.body = {
							error: (
								`The file you selected is too big. ` +
								`Maximum file size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`
							),
						};
					} else if (err.message.includes('File type is not supported')) {
						ctx.status = 415;
						ctx.body = {
							error: (
								`The file you selected is not supported. Please ` +
								`provide one of these types: ${VALID_FILE_TYPES.join(', ')}`
							),
						};
					} else {
						ctx.status = 500;
						ctx.body = {
							error: err.message,
						};
					}

					reject(err);
				})
				.on('file', (field: string, file: any) => {
					files.push(file);
				})
				.on('end', () => {
					try {
						// FIXME: Currently we assume that only 1 file is given.
						const file = files[0] || {};

						const body = {
							id: file.path.replace(UPLOAD_DIR, '').substring(1),
							name: file.name,
							size: file.size,
							url: file.path.replace(ROOT_DIR, ''),
						};

						// Push the info to our fake "database"
						const dbPath = path.join(__dirname, 'DATABASE.json');
						const DATABASE = JSON.parse(fs.readFileSync(dbPath).toString());
						DATABASE.unshift(body);
						fs.writeFileSync(dbPath, JSON.stringify(DATABASE, null, '\t'));

						ctx.status = 200;
						ctx.body = body;

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
