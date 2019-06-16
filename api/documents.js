// @flow

import {type DocumentsResponseType, type DocumentType} from '../types';
import DATABASE from './DATABASE';

export default function (ctx: any) {
	const filter = ctx.query.search;
	let totalSize = 0;

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
