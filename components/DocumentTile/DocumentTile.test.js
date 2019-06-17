import DATABASE from '../../api/DATABASE';
import DocumentTile from './index';
import React from 'react';
import {shallow} from 'enzyme';

describe('<DocumentTile />', () => {
	const DEFAULT_PROPS = {
		item: DATABASE[0],
		onDelete: () => {},
		onDeleteError: () => {},
		onDeleteSuccess: () => {},
	};

	const shallowRender = (props) => {
		return shallow(<DocumentTile {...DEFAULT_PROPS} {...props} />);
	};

	beforeAll(() => {
		// Mock 'fetch'
		global.fetch = () => Promise.resolve({
			json: () => Promise.resolve(),
		});
	});

	it('should render without failure', () => {
		expect(shallowRender).not.toThrow();
	});

	it('should fire the `onDelete` action when the delete button is clicked', () => {
		const onDelete = jasmine.createSpy();
		const component = shallowRender({onDelete});
		component.find('Button').simulate('click');
		expect(onDelete).toHaveBeenCalledWith(DATABASE[0]);
	});
});
