// @flow

import React, {type Element, useState} from 'react';
import DocumentsLister from '../components/DocumentsLister';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import ResponsiveLayout from '../components/ResponsiveLayout';

export const Home = (): Element<typeof ResponsiveLayout> => {
	const [error, setError] = useState(null);

	return (
		<ResponsiveLayout>
			<Header
				onSearchRequest={() => {}}
				onUploadError={setError}
				onUploadSuccess={() => {}} />
			{error ? <ErrorMessage message={error} /> : null}
			<DocumentsLister />
		</ResponsiveLayout>
	);
};

Home.displayName = 'Home';

export default Home;
