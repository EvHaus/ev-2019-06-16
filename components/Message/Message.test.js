import Message from './index';
import React from 'react';
import {shallow} from 'enzyme';

describe('<Message />', () => {
	const shallowRender = (props) => {
		return shallow(<Message {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
