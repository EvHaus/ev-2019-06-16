// @flow

// I'm cheating a little bit. Even though I'm not using a state management
// library, this giant hook is emulating a lot of what Redux would do. This
// greatly reduces the complexity of using local state management.

import {type DocumentsResponseType, type DocumentType} from '../types';
import {useEffect, useReducer} from 'react';
import debounce from '../utils/debounce';

type ActionType = {|
	error?: ?string,
	payload?: any,
	type: string,
|};

type StateType = {|
	documents: Array<DocumentType>,
	documentsSize: number,
	errorDeleting: ?string,
	errorFetching: ?string,
	errorUploading: ?string,
	isDeleting: boolean,
	isFetched: boolean,
	isFetching: boolean,
	isUploading: boolean,
	search: string,
	successDeleting: ?string,
	successUploading: ?string,
|};

type ResponseType = {|
	onDelete: (doc: DocumentType) => any,
	onDeleteError: (error: string) => any,
	onDeleteSuccess: (doc: DocumentType) => any,
	onDeleteSuccessDismiss: () => any,
	onSearch: (search: string) => any,
	onUpload: () => any,
	onUploadError: (error: string) => any,
	onUploadSuccess: (doc: DocumentType) => any,
	onUploadSuccessDismiss: () => any,
	state: StateType,
|};

const INITIAL_STATE = {
	documents: [],
	documentsSize: 0,
	errorDeleting: null,
	errorFetching: null,
	errorUploading: null,
	isDeleting: false,
	isFetching: false,
	isFetched: false,
	isUploading: false,
	search: '',
	successDeleting: null,
	successUploading: null,
};

const REDUCER = (state: StateType, action: ActionType): StateType => {
	const {error, payload, type} = action;

	switch (type) {
		case 'DELETE':
			return {
				...state,
				isDeleting: true,
				successDeleting: null,
			};
		case 'DELETE_ERROR':
			return {
				...state,
				errorDeleting: error,
				isDeleting: false,
				successDeleting: null,
			};
		case 'DELETE_SUCCESS':
			return {
				...state,
				documents: state.documents.filter((d: DocumentType): boolean => (
					!payload || d.id !== payload.id
				)),
				documentsSize: payload ?
					state.documentsSize - payload.size :
					state.documentsSize,
				isDeleting: false,
				successDeleting: (
					`Your file (${(payload || {}).name}) has been deleted successfully.`
				),
			};
		case 'DELETE_SUCCESS_DISMISS':
			return {...state, successDeleting: null};
		case 'FETCH':
			return {...state, isFetched: true, isFetching: true};
		case 'FETCH_ERROR':
			return {...state, errorFetching: error, isFetching: false};
		case 'FETCH_SUCCESS':
			return {
				...state,
				documents: payload ? payload.documents : [],
				documentsSize: payload ? payload.totalSize : 0,
				isFetching: false,
			};
		case 'SEARCH':
			return {
				...state,
				errorDeleting: null,
				errorFetching: null,
				errorUploading: null,
				search: payload,
			};
		case 'UPLOAD':
			return {
				...state,
				errorUploading: null,
				isUploading: true,
				successUploading: null,
			};
		case 'UPLOAD_ERROR':
			return {
				...state,
				errorUploading: error,
				isUploading: false,
				successUploading: null,
			};
		case 'UPLOAD_SUCCESS':
			return {
				...state,
				// Prepend newly uploaded file to documents
				documents: payload ?
					[].concat([payload]).concat(state.documents) :
					state.documents,
				documentsSize: payload ?
					state.documentsSize + payload.size :
					state.documentsSize,
				errorUploading: null,
				isUploading: false,
				successUploading: (
					`Your file (${(payload || {}).name}) has been uploaded successfully.`
				),
			};
		case 'UPLOAD_SUCCESS_DISMISS':
			return {...state, successUploading: null};
		default:
			throw new Error(`Invalid action fired ${type} in useDocumentsReducer.`);
	}
};

const useDocumentsReducer = (): ResponseType => {
	const [state, dispatch] = useReducer(REDUCER, INITIAL_STATE);

	const onDelete = (payload: DocumentType) => {
		dispatch({payload, type: 'DELETE'});
	};

	const onDeleteError = (error: string) => {
		dispatch({error, type: 'DELETE_ERROR'});
	};

	const onDeleteSuccess = (payload: DocumentType) => {
		dispatch({payload, type: 'DELETE_SUCCESS'});
	};

	const onDeleteSuccessDismiss = () => {
		dispatch({type: 'DELETE_SUCCESS_DISMISS'});
	};

	const onFetch = () => {
		dispatch({type: 'FETCH'});
	};

	const onFetchError = (error: string) => {
		dispatch({error, type: 'FETCH_ERROR'});
	};

	const onFetchSuccess = (payload: DocumentsResponseType) => {
		dispatch({payload, type: 'FETCH_SUCCESS'});
	};

	// Debounce the search input so we only fire the API when the user has
	// stopped typed
	const onSearch = debounce((payload: string) => {
		dispatch({payload, type: 'SEARCH'});
	}, 500);

	const onUpload = () => {
		dispatch({type: 'UPLOAD'});
	};

	const onUploadError = (error: string) => {
		dispatch({error, type: 'UPLOAD_ERROR'});
	};

	const onUploadSuccess = (payload: DocumentType) => {
		dispatch({payload, type: 'UPLOAD_SUCCESS'});
	};

	const onUploadSuccessDismiss = () => {
		dispatch({type: 'UPLOAD_SUCCESS_DISMISS'});
	};

	// Runs when the components mounts, or if the `search` string changes
	useEffect(() => {
		onFetch();

		let url = '/api/documents';
		if (state.search) url += `?search=${state.search}`;

		fetch(url, {timeout: 1000})
			.then((res: any): Promise<DocumentsResponseType> => res.json())
			.then((res: DocumentsResponseType): any => onFetchSuccess(res))
			.catch((err: Error): any => onFetchError(err.message));
	}, [state.search]);

	return {
		onDelete,
		onDeleteError,
		onDeleteSuccess,
		onDeleteSuccessDismiss,
		onSearch,
		onUpload,
		onUploadError,
		onUploadSuccess,
		onUploadSuccessDismiss,
		state,
	};
};

export default useDocumentsReducer;
