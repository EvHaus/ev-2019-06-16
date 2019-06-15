// @flow
/* eslint-disable jsx-a11y/anchor-is-valid, max-len */

import React, {type Element, memo} from 'react';
import styles from './Footer.css';

type PropsType = {};

export const Footer = (): Element<'div'> => (
	<div className={styles.main}>
		Footer
	</div>
);

Footer.displayName = 'Footer';

export default memo<PropsType>(Footer);
