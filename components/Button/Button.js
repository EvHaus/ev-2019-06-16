// @flow

import React, {type Element, memo, type Node} from 'react';
import classnames from 'classnames';
import styles from './Button.css';

type PropsType = {|
	children?: Node,
	className?: ?string,
	onClick?: () => any,
|};

export const Button = ({
	children,
	className,
	onClick,
}: PropsType): Element<'button'> => (
	<button
		className={classnames(styles.main, className)}
		onClick={onClick}>
		{children}
	</button>
);

Button.displayName = 'Button';

export default memo<PropsType>(Button);
