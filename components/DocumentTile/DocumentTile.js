// @flow

import {GUTTER_SIZE, TILE_HEIGHT, TILE_WIDTH} from '../../constants';
import React, {type Element} from 'react';
import {type DocumentType} from '../../types';
import numeral from 'numeral';
import styles from './DocumentTile.css';

type PropsType = {|
	document: DocumentType,
	isFullWidth: boolean,
|};

export const DocumentTile = ({
	document,
	isFullWidth,
}: PropsType): Element<'div'> => {
	const style = {
		height: TILE_HEIGHT,
		marginBottom: GUTTER_SIZE,
		marginRight: GUTTER_SIZE,
		width: isFullWidth ? '100%' : TILE_WIDTH,
	};

	const formattedSize = numeral(document.size).format('0.0b');

	return (
		<div
			className={styles.main}
			style={style}>
			<h3 className={styles.title}>{document.name}</h3>
			<div className={styles.size}>{formattedSize}</div>
		</div>
	);
};

DocumentTile.displayName = 'DocumentTile';

export default DocumentTile;
