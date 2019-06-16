// @flow

import React, {type Element} from 'react';
import styles from './DocumentsListerEmpty.css';

export const DocumentsListerEmpty = (): Element<'div'> => {
	return (
		<div className={styles.main} role='alert'>
			No documents have been uploaded yet. Press the &quot;Upload&quot; button above to get started.
		</div>
	);
};

DocumentsListerEmpty.displayName = 'DocumentsListerEmpty';

export default DocumentsListerEmpty;
