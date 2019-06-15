// @flow

import './_app.css';
import App, {Container} from 'next/app';
import {DEFAULT_META, SITE_NAME} from '../constants/seo';
import React, {type Element} from 'react';
import {Helmet} from 'react-helmet';

export default class MyApp extends App {
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
				<Helmet
					htmlAttributes={{lang: 'en'}}
					meta={DEFAULT_META}
					title={SITE_NAME}
					titleTemplate={`%s | ${SITE_NAME}`} />
				<Component {...pageProps} />
			</Container>
		);
	}
}
