// @flow

import {
	AutoSizer,
	CellMeasurer,
	CellMeasurerCache,
	createMasonryCellPositioner,
	Masonry,
} from 'react-virtualized';
import {
	type AutoSizerType,
	type CellRendererType,
	type DocumentType,
} from '../../types';
import {GUTTER_SIZE, MOBILE_WIDTH, TILE_HEIGHT, TILE_WIDTH} from '../../constants';
import React, {type Element, useCallback, useMemo, useRef} from 'react';
import DocumentTile from '../DocumentTile';
import styles from './DocumentsGrid.css';

type PropsType = {|
	documents: Array<DocumentType>,
|};

// This is our breakpoint for mobile layouts.
const _isMobile = (): boolean => window.innerWidth < MOBILE_WIDTH;

// In a mobile layout we only want to render 1 column in our masonry grid
const _getColumnCount = (width: number): number => {
	return _isMobile() ? 1 : Math.floor(width / (TILE_WIDTH + GUTTER_SIZE));
};

export const DocumentsGrid = ({
	documents,
}: PropsType): Element<'div'> => {
	const _masonryRef = useRef(null);

	// Setup cache for cell positions on mount
	const [_cache, _cellPositioner] = useMemo((): [any, any] => {
		const _cache = new CellMeasurerCache({
			defaultHeight: TILE_HEIGHT,
			defaultWidth: TILE_WIDTH,
			fixedWidth: true,
		});

		const _cellPositioner = createMasonryCellPositioner({
			cellMeasurerCache: _cache,
			columnCount: 1,
			columnWidth: TILE_WIDTH,
			spacer: GUTTER_SIZE,
		});

		return [_cache, _cellPositioner];
	}, []);

	const _cellRenderer = useCallback(({
		index,
		parent,
		style,
	}: CellRendererType): Element<typeof DocumentTile> | null => {
		const item = documents[index];

		// Needed to handle filtering logic
		if (!item) return null;

		const isMobile = _isMobile();

		// This extra div wrapper is needed here for <Masonry /> to be able to
		// properly calculate the dimensions of the grid tiles.
		const innerStyle = {...style, width: isMobile ? '100%' : style.width};

		return (
			<CellMeasurer
				cache={_cache}
				index={index}
				key={item.id}
				parent={parent}>
				<div style={innerStyle}>
					<DocumentTile
						isFullWidth={isMobile}
						item={item} />
				</div>
			</CellMeasurer>
		);
	}, [documents]);

	const _handleResize = ({height, width}: AutoSizerType) => {
		const columnCount = _getColumnCount(width);

		_cellPositioner.reset({
			columnCount,
			columnWidth: TILE_WIDTH,
			spacer: GUTTER_SIZE,
		});

		if (_masonryRef && _masonryRef.current) {
			_masonryRef.current.recomputeCellPositions();
		}
	};

	return (
		<div className={styles.main}>
			<AutoSizer onResize={_handleResize}>
				{({height, width}: any): Element<typeof Masonry> => (
					<Masonry
						cellCount={documents.length}
						cellMeasurerCache={_cache}
						cellPositioner={_cellPositioner}
						cellRenderer={_cellRenderer}
						className={styles.masonry}
						height={height}
						ref={_masonryRef}
						width={width} />
				)}
			</AutoSizer>
		</div>
	);
};

DocumentsGrid.displayName = 'DocumentsGrid';

export default DocumentsGrid;
