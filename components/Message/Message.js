// @flow

import React, {type Element} from 'react';
import classnames from 'classnames';
import styles from './Message.css';

type PropsType = {|
	message?: ?string,
	type: 'error' | 'success',
|};

export const Message = ({
	message,
	type,
}: PropsType): Element<'div'> => (
	<div className={classnames(styles.main, styles[type])} role='alert'>
		{message}
	</div>
);

Message.displayName = 'Message';

export default Message;
