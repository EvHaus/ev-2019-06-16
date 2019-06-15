// @flow

import React, {type Element} from 'react';
import styles from './DocumentLister.css';
import useDocuments from '../../hooks/useDocuments';

export const DocumentLister = (): Element<'section'> => {
	const {documents, error, isLoading} = useDocuments();

	let content;
	if (error) {
		content = error;
	} else if (isLoading) {
		content = 'LOADING...';
	} else if (!documents || !documents.length) {
		content = 'NO DOCUMENTS';
	} else {
		content = (
			<>
				<header>
					{documents.length} documents (TODO PLURAL)
				</header>
				Stuff ehre
			</>
		);
	}

	return (
		<section className={styles.main}>
			{content}
		</section>
	);
};

DocumentLister.displayName = 'DocumentLister';

export default DocumentLister;
