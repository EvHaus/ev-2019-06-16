// @flow

import {type DocumentsResponseType, type DocumentType} from '../types';
import fs from 'fs';
import path from 'path';

export default function (ctx: any) {
	const filter = ctx.query.search;
	let totalSize = 0;

	// Mock a database read by parsing a local file
	const dbPath = path.join(__dirname, 'DATABASE.json');
	const DATABASE = JSON.parse(fs.readFileSync(dbPath).toString());

	const documents = DATABASE.filter((item: DocumentType): boolean => {
		const isIncluded = filter && filter.length ?
			item.name.toLowerCase().includes(filter.toLowerCase()) :
			true;

		if (isIncluded) totalSize += item.size;

		return isIncluded;
	});

	const body: DocumentsResponseType = {
		documents,
		totalSize,
	};

	ctx.status = 200;
	ctx.body = body;

	return undefined;
}
