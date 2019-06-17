import Header from './index';
import React from 'react';
import {shallow} from 'enzyme';

describe('<Header />', () => {
	const shallowRender = (props) => {
		return shallow(<Header {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
