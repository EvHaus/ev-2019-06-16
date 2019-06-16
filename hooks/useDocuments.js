// @flow

import {type DocumentsResponseType, type DocumentType} from '../types';
import {useEffect, useState} from 'react';

type ResponseType = {|
	documents: Array<DocumentType>,
	error: ?string,
	isLoading: boolean,
	totalSize: number,
|};

const useDocuments = (
	search: ?string
): ResponseType => {
	// A small cache to avoid loading spinner between page navigations and
	// hot reloading
	const [wasEverFetched, setWasEverFetched] = useState(false);
	const [isLoading, setIsLoading] = useState(wasEverFetched ? false : true);
	const [error, setError] = useState(null);
	const [documents, setDocuments] = useState([]);
	const [totalSize, setTotalSize] = useState(0);

	// Runs when the components mounts, or if the `search` string changes
	useEffect(() => {
		setWasEverFetched(true);
		setIsLoading(true);

		let url = '/api/documents';
		if (search) url += `?search=${search}`;

		fetch(url, {timeout: 1000})
			.then((res: any): Promise<DocumentsResponseType> => res.json())
			.then((res: DocumentsResponseType): void => {
				setIsLoading(false);
				setError(null);
				setDocuments(res.documents);
				setTotalSize(res.totalSize);
				return;
			})
			.catch((err: Error) => {
				setError(err.message);
				setIsLoading(false);
			});
	}, [search]);

	return {error, isLoading, documents, totalSize};
};

export default useDocuments;
