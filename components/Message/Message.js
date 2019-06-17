// @flow

import React, {type Element, useEffect} from 'react';
import classnames from 'classnames';
import styles from './Message.css';

type PropsType = {|
	message?: ?string,
	onDismiss?: () => any,
	type: 'error' | 'success',
|};

export const Message = ({
	message,
	onDismiss,
	type,
}: PropsType): Element<'div'> => {
	// Automatically dismiss the message after 2.5 seconds
	useEffect(() => {
		if (onDismiss) setTimeout(onDismiss, 2500);
	}, [onDismiss]);

	return (
		<div className={classnames(styles.main, styles[type])} role='alert'>
			{message}
		</div>
	);
};

Message.displayName = 'Message';

export default Message;
