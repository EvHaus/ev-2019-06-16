// @flow

import React, {type Element, useState} from 'react';
import debounce from '../utils/debounce';
import DocumentsLister from '../components/DocumentsLister';
import Header from '../components/Header';
import Message from '../components/Message';
import ResponsiveLayout from '../components/ResponsiveLayout';
import useDocuments from '../hooks/useDocuments';
import useUploadSuccess from '../hooks/useUploadSuccess';

export const Home = (): Element<typeof ResponsiveLayout> => {
	const [uploadError, setUploadError] = useState(null);
	const [uploadSuccessMessage, uploadedFiles, setUploadSuccess] = useUploadSuccess();
	const [search, setSearch] = useState(null);
	const {documents, error, isLoading, totalSize} = useDocuments(search);

	// Debounce the search input so we only fire the API when the user has
	// stopped typed
	const debouncedSetSearch = debounce(setSearch, 500);

	return (
		<ResponsiveLayout>
			<Header
				onSearchRequest={debouncedSetSearch}
				onUploadError={setUploadError}
				onUploadSuccess={setUploadSuccess} />
			{error ? <Message message={error} type='error' /> : null}
			{uploadError ? <Message message={uploadError} type='error' /> : null}
			{uploadSuccessMessage ? <Message message={uploadSuccessMessage} type='success' /> : null}
			<DocumentsLister
				documents={documents}
				error={error}
				isLoading={isLoading}
				search={search}
				totalSize={totalSize}
				uploadedFiles={uploadedFiles} />
		</ResponsiveLayout>
	);
};

Home.displayName = 'Home';

export default Home;
