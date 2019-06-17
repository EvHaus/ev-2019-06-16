import DocumentsGrid from './index';
import React from 'react';
import {shallow} from 'enzyme';

describe('<DocumentsGrid />', () => {
	const shallowRender = (props) => {
		return shallow(<DocumentsGrid {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
