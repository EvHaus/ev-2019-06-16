// @flow

import {GUTTER_SIZE, TILE_HEIGHT, TILE_WIDTH} from '../../constants';
import React, {type Element} from 'react';
import {type DocumentType} from '../../types';
import numeral from 'numeral';
import styles from './DocumentTile.css';

type PropsType = {|
	isFullWidth: boolean,
	item: DocumentType,
|};

export const DocumentTile = ({
	isFullWidth,
	item,
}: PropsType): Element<'a'> => {
	const style = {
		height: TILE_HEIGHT,
		marginBottom: GUTTER_SIZE,
		marginRight: GUTTER_SIZE,
		width: isFullWidth ? '100%' : TILE_WIDTH,
	};

	const formattedSize = numeral(item.size).format('0.0b');

	return (
		<a
			className={styles.main}
			href={item.url}
			rel='noopener noreferrer'
			style={style}
			target='_blank'>
			<h3 className={styles.title}>{item.name}</h3>
			<div className={styles.size}>{formattedSize}</div>
		</a>
	);
};

DocumentTile.displayName = 'DocumentTile';

export default DocumentTile;
