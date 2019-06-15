// @flow
/* eslint-disable max-len */

import React, {type Element, Fragment} from 'react';
import {Helmet} from 'react-helmet';

export const Home = (): Element<typeof Fragment> => (
	<Fragment>
		<Helmet>
			<title>Home</title>
		</Helmet>
		<div>
			Test
		</div>
	</Fragment>
);

Home.displayName = 'Home';

export default Home;
