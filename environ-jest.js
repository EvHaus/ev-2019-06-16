// @flow

// Sets up the environment for Jest tests

import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

Enzyme.configure({adapter: new Adapter()});

// Mock for FormData
global.FormData = (): any => {
	return {
		append: () => {},
	};
};
