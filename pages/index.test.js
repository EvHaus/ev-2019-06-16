import Home from './index';
import React from 'react';
import {shallow} from 'enzyme';

describe('<Home />', () => {
	const shallowRender = (props) => {
		return shallow(<Home {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
