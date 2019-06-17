import React from 'react';
import {shallow} from 'enzyme';
import UploadButton from './index';

describe('<UploadButton />', () => {
	const DEFAULT_PROPS = {
		onUpload: () => {},
		onUploadError: () => {},
		onUploadSuccess: () => {},
	};

	const shallowRender = (props) => {
		return shallow(<UploadButton {...DEFAULT_PROPS} {...props} />);
	};

	beforeAll(() => {
		// Mock 'fetch'
		global.fetch = () => Promise.resolve({
			json: () => Promise.resolve(),
		});
	});

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});

	it('should handle click events on the button without failure', () => {
		const component = shallowRender();
		const button = component.find('Button');
		expect(button.prop('onClick')).not.toThrow();
	});

	it('should call `onUpload` when a file has been selected', () => {
		const onUpload = jasmine.createSpy();
		const component = shallowRender({onUpload});
		const input = component.find('input');
		const files = [{}];
		const evt = {target: {files}};
		input.prop('onChange')(evt);
		expect(onUpload).toHaveBeenCalled();
	});
});
