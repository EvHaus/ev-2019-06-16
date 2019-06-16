// @flow

import React, {type Element, type Node} from 'react';
import styles from './ResponsiveLayout.css';

type PropsType = {|
	children: Node,
|};

export const ResponsiveLayout = ({
	children,
}: PropsType): Element<'div'> => (
	<div className={styles.main}>
		{children}
	</div>
);

ResponsiveLayout.displayName = 'ResponsiveLayout';

export default ResponsiveLayout;
