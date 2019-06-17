import DocumentsListerEmpty from './index';
import React from 'react';
import {shallow} from 'enzyme';

describe('<DocumentsListerEmpty />', () => {
	const shallowRender = (props) => {
		return shallow(<DocumentsListerEmpty {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
