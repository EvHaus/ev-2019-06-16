// @flow

export default function (ctx: any) {
	const data = [{
		name: 'Some Doc',
		size: 10000,
	}, {
		name: 'Another',
		size: 20000,
	}];

	ctx.status = 200;
	ctx.body = data;

	return undefined;
}
