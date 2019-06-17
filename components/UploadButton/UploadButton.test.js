import React from 'react';
import {shallow} from 'enzyme';
import UploadButton from './index';

describe('<UploadButton />', () => {
	const shallowRender = (props) => {
		return shallow(<UploadButton {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
