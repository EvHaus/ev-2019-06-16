import React from 'react';
import ResponsiveLayout from './index';
import {shallow} from 'enzyme';

describe('<ResponsiveLayout />', () => {
	const shallowRender = (props) => {
		return shallow(<ResponsiveLayout {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
