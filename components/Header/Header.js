// @flow

import React, {type Element, memo} from 'react';
import styles from './Header.css';

type PropsType = {};

export const Header = (): Element<'div'> => (
	<div className={styles.main}>
		Header
	</div>
);

Header.displayName = 'Header';

export default memo<PropsType>(Header);
