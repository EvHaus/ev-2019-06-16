// @flow

import React, {type Element} from 'react';
import DocumentsLister from '../components/DocumentsLister';
import Header from '../components/Header';
import Message from '../components/Message';
import ResponsiveLayout from '../components/ResponsiveLayout';
import useDocumentsReducer from '../hooks/useDocumentsReducer';

export const Home = (): Element<typeof ResponsiveLayout> => {
	const {
		onDelete,
		onDeleteError,
		onDeleteSuccess,
		onSearch,
		onUpload,
		onUploadError,
		onUploadSuccess,
		onUploadSuccessDismiss,
		state,
	} = useDocumentsReducer();

	return (
		<ResponsiveLayout>
			<Header
				isUploading={state.isUploading}
				onSearch={onSearch}
				onUpload={onUpload}
				onUploadError={onUploadError}
				onUploadSuccess={onUploadSuccess} />
			{state.errorFetching ? (
				<Message message={state.errorFetching} type='error' />
			) : null}
			{state.errorUploading ? (
				<Message message={state.errorUploading} type='error' />
			) : null}
			{state.successUploading ? (
				<Message
					message={state.successUploading}
					onDismiss={onUploadSuccessDismiss}
					type='success' />
			) : null}
			<DocumentsLister
				documents={state.documents}
				hasError={Boolean(state.errorFetching)}
				isFetched={state.isFetched}
				isFetching={state.isFetching}
				onDelete={onDelete}
				onDeleteError={onDeleteError}
				onDeleteSuccess={onDeleteSuccess}
				search={state.search}
				totalSize={state.documentsSize} />
		</ResponsiveLayout>
	);
};

Home.displayName = 'Home';

export default Home;
