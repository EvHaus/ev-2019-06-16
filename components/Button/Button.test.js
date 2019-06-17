import Button from './index';
import React from 'react';
import {shallow} from 'enzyme';

describe('<Button />', () => {
	const shallowRender = (props) => {
		return shallow(<Button {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
