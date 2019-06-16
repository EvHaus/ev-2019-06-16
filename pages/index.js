// @flow

import React, {type Element, useState} from 'react';
import debounce from '../utils/debounce';
import DocumentsLister from '../components/DocumentsLister';
import Header from '../components/Header';
import Message from '../components/Message';
import ResponsiveLayout from '../components/ResponsiveLayout';
import useDocuments from '../hooks/useDocuments';

export const Home = (): Element<typeof ResponsiveLayout> => {
	const [uploadError, setUploadError] = useState(null);
	const [uploadSuccess, setUploadSuccess] = useState(null);
	const [search, setSearch] = useState(null);
	const {documents, error, isLoading, totalSize} = useDocuments(search);

	// Debounce the search input so we only fire the API when the user has
	// stopped typed
	const debouncedSetSearch = debounce(setSearch, 500);


	console.log(documents, search, uploadSuccess);

	return (
		<ResponsiveLayout>
			<Header
				onSearchRequest={debouncedSetSearch}
				onUploadError={setUploadError}
				onUploadSuccess={setUploadSuccess} />
			{error ? <Message message={error} type='error' /> : null}
			{uploadError ? <Message message={uploadError} type='error' /> : null}
			<DocumentsLister
				documents={documents}
				error={error}
				isLoading={isLoading}
				search={search}
				totalSize={totalSize} />
		</ResponsiveLayout>
	);
};

Home.displayName = 'Home';

export default Home;
