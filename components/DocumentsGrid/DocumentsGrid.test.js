import DATABASE from '../../api/DATABASE';
import DocumentsGrid from './index';
import {mount} from 'enzyme';
import React from 'react';

describe('<DocumentsGrid />', () => {
	const DEFAULT_PROPS = {
		documents: [],
		onDelete: () => {},
		onDeleteError: () => {},
		onDeleteSuccess: () => {},
	};

	const fullRender = (props) => {
		return mount(<DocumentsGrid {...DEFAULT_PROPS} {...props} />);
	};

	it('should render without failure', () => {
		expect(fullRender).not.toThrow();
	});

	it('should handle resize events from <AutoSizer /> without failure', () => {
		const component = fullRender();
		const AutoSizer = component.find('AutoSizer');
		const opts = {height: 100, width: 100};
		expect(() => AutoSizer.prop('onResize')(opts)).not.toThrow();
	});

	it('should render a `<DocumentTile />` for every visible document provided', () => {
		const component = fullRender({documents: [DATABASE[0]]});
		const Masonry = component.find('Masonry');
		const cellRenderer = Masonry.prop('cellRenderer');
		const tile = cellRenderer({
			index: 0,
			parent: {},
			style: {},
		});
		expect(tile.props.children.props.children.props.item).toEqual(DATABASE[0]);
	});
});
