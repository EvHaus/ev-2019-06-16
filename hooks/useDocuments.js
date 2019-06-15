// @flow

import {useEffect, useState} from 'react';
import {type DocumentType} from '../types';

type ResponseType = {|
	documents: Array<DocumentType>,
	error: ?string,
	isLoading: boolean,
|};

const useDocuments = (): ResponseType => {
	// A small cache to avoid loading spinner between page navigations and
	// hot reloading
	const [wasEverFetched, setWasEverFetched] = useState(false);
	const [isLoading, setIsLoading] = useState(wasEverFetched ? false : true);
	const [error, setError] = useState(null);
	const [documents, setDocuments] = useState([]);

	// Runs when the components mounts
	useEffect(() => {
		setWasEverFetched(true);
		setIsLoading(true);

		fetch('/api/documents', {timeout: 1000})
			.then((res: any): Promise<Array<DocumentType>> => res.json())
			.then((res: Array<DocumentType>): void => {
				setIsLoading(false);
				setError(null);
				return setDocuments(res);
			})
			.catch((err: Error) => {
				setError(err.message);
				setIsLoading(false);
			});
	}, []);

	return {error, isLoading, documents};
};

export default useDocuments;
