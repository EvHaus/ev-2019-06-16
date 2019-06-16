// @flow

import React, {type Element, useState} from 'react';
import debounce from '../utils/debounce';
import DocumentsLister from '../components/DocumentsLister';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';
import ResponsiveLayout from '../components/ResponsiveLayout';

export const Home = (): Element<typeof ResponsiveLayout> => {
	const [error, setError] = useState(null);
	const [search, setSearch] = useState(null);

	// Debounce the search input so we only fire the API when the user has
	// stopped typed
	const debouncedSetSearch = debounce(setSearch, 500);

	return (
		<ResponsiveLayout>
			<Header
				onSearchRequest={debouncedSetSearch}
				onUploadError={setError}
				onUploadSuccess={() => {}} />
			{error ? <ErrorMessage message={error} /> : null}
			<DocumentsLister search={search} />
		</ResponsiveLayout>
	);
};

Home.displayName = 'Home';

export default Home;
