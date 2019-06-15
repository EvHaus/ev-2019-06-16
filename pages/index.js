// @flow

import React, {type Element} from 'react';
import DocumentLister from '../components/DocumentLister';
import ResponsiveLayout from '../components/ResponsiveLayout';

export const Home = (): Element<typeof ResponsiveLayout> => (
	<ResponsiveLayout>
		<DocumentLister />
	</ResponsiveLayout>
);

Home.displayName = 'Home';

export default Home;
