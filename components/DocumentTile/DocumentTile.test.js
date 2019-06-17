import DATABASE from '../../api/DATABASE';
import DocumentTile from './index';
import React from 'react';
import {shallow} from 'enzyme';

describe('<DocumentTile />', () => {
	const DEFAULT_PROPS = {
		item: DATABASE[0],
	};

	const shallowRender = (props) => {
		return shallow(<DocumentTile {...DEFAULT_PROPS} {...props} />);
	};

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});
});
