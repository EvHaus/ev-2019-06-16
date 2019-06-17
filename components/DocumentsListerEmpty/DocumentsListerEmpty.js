// @flow

import React, {type Element} from 'react';
import styles from './DocumentsListerEmpty.css';

type PropsType = {|
	search?: ?string,
|};

export const DocumentsListerEmpty = ({
	search,
}: PropsType): Element<'div'> => {
	return (
		<div className={styles.main} role='alert'>
			{search ?
				`No documents match your search query.` :
				`No documents have been uploaded yet. Press the &quot;Upload&quot; button above to get started.`
			}
		</div>
	);
};

DocumentsListerEmpty.displayName = 'DocumentsListerEmpty';

export default DocumentsListerEmpty;
