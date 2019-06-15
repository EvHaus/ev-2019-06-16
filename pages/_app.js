// @flow

import './_app.css';
import App, {Container} from 'next/app';
import React, {type Element} from 'react';

export default class MyApp extends App {
	// This is needed by next.js by default
	static async getInitialProps ({Component, ctx, router}: any): {} {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return {pageProps};
	}

	render (): Element<typeof Container> {
		const {Component, pageProps} = this.props;
		return (
			<Container>
				<Component {...pageProps} />
			</Container>
		);
	}
}
