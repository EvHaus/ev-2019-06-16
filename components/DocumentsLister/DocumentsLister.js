// @flow

import React, {type Element} from 'react';
import DocumentsGrid from '../DocumentsGrid';
import DocumentsListerEmpty from '../DocumentsListerEmpty';
import numeral from 'numeral';
import Spinner from '../Spinner';
import styles from './DocumentsLister.css';
import useDocuments from '../../hooks/useDocuments';

type PropsType = {
	search?: ?string,
};

export const DocumentsLister = ({
	search,
}: PropsType): Element<'section'> => {
	const {documents, error, isLoading, totalSize} = useDocuments(search);

	let content;
	if (error) {
		content = error;
	} else if (isLoading) {
		content = <Spinner />;
	} else if (!documents || !documents.length) {
		content = <DocumentsListerEmpty />;
	} else {
		// TODO: i18n this for plural control
		// TODO: Total size handling
		content = (
			<>
				<header className={styles.header}>
					<h2 className={styles.title}>
						{documents.length} documents
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
