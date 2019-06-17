// @flow

import {type DocumentType} from '../types';
import fs from 'fs';
import path from 'path';

export default function (ctx: any) {
	try {
		// TODO: Add error handling if the param is provided, or is invalid
		const id = ctx.params.id;

		// Mock a database read by parsing a local file
		const dbPath = path.join(__dirname, 'DATABASE.json');
		const DATABASE = JSON.parse(fs.readFileSync(dbPath).toString());

		let fileToDelete;

		const documents = DATABASE.filter((item: DocumentType): boolean => {
			const isIncluded = item.id === id;
			if (isIncluded) fileToDelete = item;
			return !isIncluded;
		});

		// Push the info to our fake "database"
		fs.writeFileSync(dbPath, JSON.stringify(documents, null, '\t'));

		// Delete the actual file on disk
		if (fileToDelete) {
			const pathToDelete = path.join(__dirname, '..', fileToDelete.url);
			fs.unlinkSync(pathToDelete);
		}

		ctx.status = 200;
		ctx.body = fileToDelete;
	} catch (err) {
		ctx.status = 500;
		ctx.body = {
			error: err.message,
		};
	}

	return undefined;
}
