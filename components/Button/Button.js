// @flow

import React, {type Element, type Node} from 'react';
import classnames from 'classnames';
import styles from './Button.css';

type PropsType = {|
	children?: Node,
	className?: ?string,
	color?: 'dark' | 'light',
	disabled?: boolean,
	onClick?: () => any,
|};

export const Button = ({
	children,
	className,
	color = 'light',
	disabled = false,
	onClick,
}: PropsType): Element<'button'> => (
	<button
		className={classnames(styles.main, styles[color], className)}
		disabled={disabled}
		onClick={onClick}>
		{children}
	</button>
);

Button.displayName = 'Button';

export default Button;
