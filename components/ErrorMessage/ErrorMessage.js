// @flow

import React, {type Element} from 'react';
import styles from './ErrorMessage.css';

type PropsType = {|
	message?: ?string,
|};

export const ErrorMessage = ({
	message,
}: PropsType): Element<'div'> => (
	<div className={styles.main} role='alert'>
		{message}
	</div>
);

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
