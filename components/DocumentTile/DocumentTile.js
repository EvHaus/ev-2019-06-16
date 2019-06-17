// @flow

import {GUTTER_SIZE, TILE_HEIGHT, TILE_WIDTH} from '../../constants';
import React, {type Element, memo} from 'react';
import Button from '../Button';
import {type DocumentType} from '../../types';
import numeral from 'numeral';
import styles from './DocumentTile.css';

type DeleteResponseType = {
	success: boolean,
};

type PropsType = {|
	isFullWidth: boolean,
	item: DocumentType,
	onDelete: (doc: DocumentType) => any,
	onDeleteError: (err: string) => any,
	onDeleteSuccess: (doc: DocumentType) => any,
|};

export const DocumentTile = ({
	isFullWidth,
	item,
	onDelete,
	onDeleteError,
	onDeleteSuccess,
}: PropsType): Element<'div'> => {
	const style = {
		height: TILE_HEIGHT,
		marginBottom: GUTTER_SIZE,
		marginRight: GUTTER_SIZE,
		width: isFullWidth ? '100%' : TILE_WIDTH,
	};

	const formattedSize = numeral(item.size).format('0.0b');

	const _handleDelete = (): any => {
		onDelete(item);

		const url = `/api/document/${item.id}`;
		return fetch(url, {method: 'DELETE', timeout: 1000})
			.then((res: any): Promise<DeleteResponseType> => res.json())
			.then((res: DeleteResponseType): any => onDeleteSuccess(item))
			.catch((err: Error): any => onDeleteError(err.message));
	};

	return (
		<div className={styles.main} style={style}>
			<div className={styles.left}>
				<a
					className={styles.title}
					href={item.url}
					rel='noopener noreferrer'
					target='_blank'>
					{item.name}
				</a>
				<div className={styles.size}>{formattedSize}</div>
			</div>
			<div className={styles.right}>
				<Button color='dark' onClick={_handleDelete}>
					Delete
				</Button>
			</div>
		</div>
	);
};

DocumentTile.displayName = 'DocumentTile';

export default memo<PropsType>(DocumentTile);
