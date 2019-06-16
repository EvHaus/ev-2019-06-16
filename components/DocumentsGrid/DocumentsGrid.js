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
import React, {type Element, useRef} from 'react';
import DocumentTile from '../DocumentTile';
import styles from './DocumentsGrid.css';

type PropsType = {
	documents: Array<DocumentType>,
};

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

	const cache = new CellMeasurerCache({
		defaultHeight: TILE_HEIGHT,
		defaultWidth: TILE_WIDTH,
		fixedWidth: true,
	});

	const _cellPositioner = createMasonryCellPositioner({
		cellMeasurerCache: cache,
		columnCount: 1,
		columnWidth: TILE_WIDTH,
		spacer: GUTTER_SIZE,
	});

	// eslint-disable-next-line react/display-name
	const _cellRenderer = ({
		index,
		key,
		parent,
		style,
	}: CellRendererType): Element<typeof DocumentTile> => {
		const isMobile = _isMobile();

		// This extra div wrapper is needed here for <Masonry /> to be able to
		// properly calculate the dimensions of the grid tiles.
		const innerStyle = {...style, width: isMobile ? '100%' : style.width};

		return (
			<CellMeasurer
				cache={cache}
				index={index}
				key={key}
				parent={parent}>
				<div style={innerStyle}>
					<DocumentTile
						document={documents[index]}
						isFullWidth={isMobile} />
				</div>
			</CellMeasurer>
		);
	};

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
						cellMeasurerCache={cache}
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
