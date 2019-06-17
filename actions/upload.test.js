import upload from './upload';

describe('upload', () => {
	beforeAll(() => {
		// Mock 'fetch'
		global.fetch = () => Promise.resolve({
			json: () => Promise.resolve({}),
		});
	});

	it('should be a function', () => {
		expect(typeof upload).toEqual('function');
	});

	it('should reject uploads if the file size is greater than 10MB', async () => {
		const file = {size: 2000 * 1024 * 1024};
		try {
			await upload(file);
		} catch (err) {
			expect(err.message).toEqual('The file you selected is too big. Maximum file size is 10MB.');
		}
	});

	it('should reject uploads if they don\'t have a valid MIME type', async () => {
		const file = {
			type: 'application/json',
			size: 100,
		};
		try {
			await upload(file);
		} catch (err) {
			expect(err.message).toEqual('The file you selected is not supported. Please provide one of these types: image/jpeg, image/png.');
		}
	});

	it('should allow jpeg images to be uploaded', async () => {
		const file = {
			type: 'image/jpeg',
			size: 100,
		};
		const result = await upload(file);
		expect(result).toEqual({});
	});

	it('should allow png images to be uploaded', async () => {
		const file = {
			type: 'image/png',
			size: 100,
		};
		const result = await upload(file);
		expect(result).toEqual({});
	});
});
