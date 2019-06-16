// @flow

export type AutoSizerType = {|
	height: number,
	width: number,
|};

export type CellRendererType = {|
	index: number,
	key: string,
	parent: any,
	style: {[key: string]: any},
|};

export type DocumentType = {|
	name: string,
	size: number,
	url: string,
|};
