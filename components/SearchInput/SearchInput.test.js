import React from 'react';
import SearchInput from './index';
import {shallow} from 'enzyme';

describe('<SearchInput />', () => {
	const shallowRender = (props) => {
		return shallow(<SearchInput {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
