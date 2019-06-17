import DocumentsLister from './index';
import React from 'react';
import {shallow} from 'enzyme';

describe('<DocumentsLister />', () => {
	const shallowRender = (props) => {
		return shallow(<DocumentsLister {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
