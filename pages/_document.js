// @flow

import Document, {Head, Main, NextScript} from 'next/document';
import React, {type Element} from 'react';
import {type Context} from 'next';
import {Helmet} from 'react-helmet';

// flow-disable-next-line
export default class MyDocument extends Document {
	static async getInitialProps (...args: Context): Promise<any> {
		const documentProps = await super.getInitialProps(...args);
		return {...documentProps, helmet: Helmet.renderStatic()};
	}

	render (): Element<'html'> {
		const {helmet} = this.props;
		const htmlArgs = helmet.htmlAttributes.toComponent();
		const bodyArgs = helmet.bodyAttributes.toComponent();
		const headElements = Object.keys(this.props.helmet)
			.filter((el: string): boolean => el !== 'htmlAttributes' && el !== 'bodyAttributes')
			.map((el: string): Element<any> => helmet[el].toComponent());

		return (
			<html {...htmlArgs}>
				<Head>
					{headElements}
					<link href='/static/favicon.ico' rel='icon' type='image/x-icon' />
				</Head>
				<body {...bodyArgs}>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
