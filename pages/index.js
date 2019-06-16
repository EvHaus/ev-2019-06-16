// @flow

import React, {type Element} from 'react';
import DocumentsLister from '../components/DocumentsLister';
import Header from '../components/Header';
import ResponsiveLayout from '../components/ResponsiveLayout';

export const Home = (): Element<typeof ResponsiveLayout> => (
	<ResponsiveLayout>
		<Header
			onSearchRequest={() => {}}
			onUploadError={() => {}}
			onUploadSuccess={() => {}} />
		<DocumentsLister />
	</ResponsiveLayout>
);

Home.displayName = 'Home';

export default Home;
