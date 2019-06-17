import React from 'react';
import {shallow} from 'enzyme';
import Spinner from './index';

describe('<Spinner />', () => {
	const shallowRender = (props) => {
		return shallow(<Spinner {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
