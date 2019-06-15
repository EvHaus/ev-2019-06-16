// @flow

import React, {type Element} from 'react';
import SearchInput from '../SearchInput';
import styles from './Header.css';
import UploadButton from '../UploadButton';

export const Header = (): Element<'header'> => {
	const _handleSearchChange = (value: string) => {
		console.log('search change', value);
	};

	return (
		<header className={styles.main}>
			<SearchInput onChange={_handleSearchChange} />
			<UploadButton />
		</header>
	);
};

Header.displayName = 'Header';

export default Header;
