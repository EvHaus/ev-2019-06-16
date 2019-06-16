// @flow

import React, {type Element} from 'react';
import DocumentsLister from '../components/DocumentsLister';
import ResponsiveLayout from '../components/ResponsiveLayout';

export const Home = (): Element<typeof ResponsiveLayout> => (
	<ResponsiveLayout>
		<DocumentsLister />
	</ResponsiveLayout>
);

Home.displayName = 'Home';

export default Home;
