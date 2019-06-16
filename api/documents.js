// @flow

export default function (ctx: any) {
	const data = [{
		name: 'Some Doc',
		size: 10000,
	}, {
		name: 'Another',
		size: 20000,
	}, {
		name: 'Third',
		size: 20000,
	}, {
		name: 'Another weird item with a long name',
		size: 20000,
	}, {
		name: 'Fifth',
		size: 20000,
	}, {
		name: 'Sixth',
		size: 20000,
	}];

	ctx.status = 200;
	ctx.body = data;

	return undefined;
}
