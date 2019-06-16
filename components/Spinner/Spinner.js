// @flow

import React, {type Element} from 'react';
import classnames from 'classnames';
import styles from './Spinner.css';

export const Spinner = (): Element<'div'> => (
	<div className={styles.main}>
		<div className={classnames(styles.dot, styles.dot0)} />
		<div className={classnames(styles.dot, styles.dot1)} />
		<div className={classnames(styles.dot, styles.dot2)} />
		<div className={classnames(styles.dot, styles.dot3)} />
		<div className={classnames(styles.dot, styles.dot4)} />
		<div className={classnames(styles.dot, styles.dot5)} />
	</div>
);

Spinner.displayName = 'Spinner';

export default Spinner;
