// @flow

import React, {type Element} from 'react';
import {type DocumentType} from '../../types';
import SearchInput from '../SearchInput';
import styles from './Header.css';
import UploadButton from '../UploadButton';

type PropsType = {|
	isUploading: boolean,
	onSearch: (search: string) => any,
	onUpload: () => any,
	onUploadError: (err: string) => any,
	onUploadSuccess: (doc: DocumentType) => any,
|};

export const Header = ({
	isUploading,
	onSearch,
	onUpload,
	onUploadError,
	onUploadSuccess,
}: PropsType): Element<'header'> => (
	<header className={styles.main}>
		<SearchInput onChange={onSearch} />
		<UploadButton
			isUploading={isUploading}
			onUpload={onUpload}
			onUploadError={onUploadError}
			onUploadSuccess={onUploadSuccess} />
	</header>
);

Header.displayName = 'Header';

export default Header;
