// @flow

import {type DocumentsResponseType, type DocumentType} from '../types';

export default function (ctx: any) {
	const filter = ctx.query.search;
	let totalSize = 0;

	const documents = [{
		name: 'Some Doc',
		size: 10000,
		url: '/static/uploads/1',
	}, {
		name: 'Another',
		size: 20000,
		url: '/static/uploads/2',
	}, {
		name: 'Third',
		size: 20000,
		url: '/static/uploads/3',
	}, {
		name: 'Another weird item with a long name',
		size: 20000,
		url: '/static/uploads/4',
	}, {
		name: 'Fifth',
		size: 20000,
		url: '/static/uploads/5',
	}, {
		name: 'Sixth',
		size: 20000,
		url: '/static/uploads/6',
	}].filter((item: DocumentType): boolean => {
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
