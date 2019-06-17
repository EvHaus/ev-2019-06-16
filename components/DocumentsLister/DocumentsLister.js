// @flow

import React, {type Element, memo} from 'react';
import DocumentsGrid from '../DocumentsGrid';
import DocumentsListerEmpty from '../DocumentsListerEmpty';
import {type DocumentType} from '../../types';
import numeral from 'numeral';
import Spinner from '../Spinner';
import styles from './DocumentsLister.css';

type PropsType = {
	documents: Array<DocumentType>,
	hasError: boolean,
	isFetched: boolean,
	isFetching: boolean,
	onDelete: (doc: DocumentType) => any,
	onDeleteError: (err: string) => any,
	onDeleteSuccess: (doc: DocumentType) => any,
	search?: ?string,
	totalSize: number,
};

export const DocumentsLister = ({
	documents,
	hasError,
	isFetched,
	isFetching,
	onDelete,
	onDeleteError,
	onDeleteSuccess,
	search,
	totalSize,
}: PropsType): Element<'section'> => {
	let content;
	if (hasError) {
		content = null;
	} else if (!isFetched || isFetching) {
		content = <Spinner />;
	} else if (!documents || !documents.length) {
		content = <DocumentsListerEmpty search={search} />;
	} else {
		// FUTURE: Use a library like `i18next` instead of this mess.
		const documentsString = documents.length === 1 ? 'document' : 'documents';

		content = (
			<>
				<header className={styles.header}>
					<h2 className={styles.title}>
						{documents.length} {documentsString}
					</h2>
					<span className={styles.sizeTotal}>
						Total size: {numeral(totalSize).format('0.0b')}
					</span>
				</header>
				<DocumentsGrid
					documents={documents}
					onDelete={onDelete}
					onDeleteError={onDeleteError}
					onDeleteSuccess={onDeleteSuccess} />
			</>
		);
	}

	return (
		<section className={styles.main}>
			{content}
		</section>
	);
};

DocumentsLister.displayName = 'DocumentsLister';

export default memo<PropsType>(DocumentsLister);
