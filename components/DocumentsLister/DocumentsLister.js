// @flow

import React, {type Element} from 'react';
import DocumentsGrid from '../DocumentsGrid';
import DocumentsListerEmpty from '../DocumentsListerEmpty';
import {type DocumentType} from '../../types';
import numeral from 'numeral';
import Spinner from '../Spinner';
import styles from './DocumentsLister.css';

type PropsType = {
	documents: Array<DocumentType>,
	error?: ?string,
	isLoading: boolean,
	search?: ?string,
	totalSize: number,
};

export const DocumentsLister = ({
	documents,
	error,
	isLoading,
	search,
	totalSize,
}: PropsType): Element<'section'> => {
	let content;
	if (error) {
		content = null;
	} else if (isLoading) {
		content = <Spinner />;
	} else if (!documents || !documents.length) {
		content = <DocumentsListerEmpty />;
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
				<DocumentsGrid documents={documents} />
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

export default DocumentsLister;
