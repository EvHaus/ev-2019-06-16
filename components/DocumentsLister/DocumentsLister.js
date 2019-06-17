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
	error?: ?string,
	isLoading: boolean,
	search?: ?string,
	totalSize: number,
	uploadedFiles: Array<DocumentType>,
};

export const DocumentsLister = ({
	documents,
	error,
	isLoading,
	search,
	totalSize,
	uploadedFiles,
}: PropsType): Element<'section'> => {
	// Combine recently uploaded files with what our API said is there
	const allDocuments = uploadedFiles.concat(documents);

	let content;
	if (error) {
		content = null;
	} else if (isLoading) {
		content = <Spinner />;
	} else if (!allDocuments || !allDocuments.length) {
		content = <DocumentsListerEmpty search={search} />;
	} else {
		// FUTURE: Use a library like `i18next` instead of this mess.
		const documentsString = allDocuments.length === 1 ? 'document' : 'documents';

		content = (
			<>
				<header className={styles.header}>
					<h2 className={styles.title}>
						{allDocuments.length} {documentsString}
					</h2>
					<span className={styles.sizeTotal}>
						Total size: {numeral(totalSize).format('0.0b')}
					</span>
				</header>
				<DocumentsGrid documents={allDocuments} />
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
