// @flow

import apiDocuments from './api/documents';
import apiUpload from './api/upload';
import greenlock from 'greenlock-express';
import http from 'http';
// flow-disable-next-line
import http2 from 'http2';
import Koa from 'koa';
import koaBody from 'koa-body';
import next from 'next';
import redirectHttps from 'redirect-https';
import Router from 'koa-router';

type CtxType = any;

const PORT = parseInt(process.env.PORT, 10) || 3000;
const __DEV__ = process.env.NODE_ENV !== 'production';

const app = next({dev: __DEV__});
const handle = app.getRequestHandler();

app.prepare().then((): any => {
	const server = new Koa();
	const router = new Router();

	// Handle JSON payloads in API endpoints
	const withPostBody = koaBody();

	// API endpoints
	router.get('/api/documents', apiDocuments);
	router.put('/api/upload', withPostBody, apiUpload);

	router.get('*', async (ctx: CtxType) => {
		await handle(ctx.req, ctx.res);
		ctx.respond = false;
	});

	server.use(async (ctx: CtxType, next: () => Promise<void>) => {
		ctx.res.statusCode = 200;
		await next();
	});

	server.use(router.routes());

	// Dev server doesn't use any of the greenlock and HTTP2 stuff, so we can
	// immediately serve the application.
	if (__DEV__) {
		return server.listen(PORT, (err: Error) => {
			if (err) throw err;
			// eslint-disable-next-line no-console
			console.log(`> Ready on http://localhost:${PORT}`);
		});
	}

	// Enable greenlock SSL
	const gLock = greenlock.create({
		approveDomains (opts: any, certs: any, cb: any) {
			opts.domains = certs && certs.altnames || opts.domains;
			opts.email = 'ev@haus.gg';
			opts.agreeTos = true;

			cb(null, {
				certs,
				options: opts,
			});
		},
		configDir: '/tmp/etc/greenlock',
		server: 'https://acme-v02.api.letsencrypt.org/directory',
		store: require('greenlock-store-fs'),
		version: 'draft-11',
	});

	// Handle HTTPS connections with HTTP/2
	const http2Server = http2.createSecureServer(gLock.tlsOptions, server.callback());

	// Handle HTTP connnections
	const acmeChallengeHandler = gLock.middleware(redirectHttps());
	http.createServer(acmeChallengeHandler).listen(80, () => {
		// eslint-disable-next-line no-console
		console.log('Listening for ACME http-01 challenges on 80');
	});

	// Handle HTTPS connections
	return http2Server.listen(443, (err: Error) => {
		if (err) throw err;
		// eslint-disable-next-line no-console
		console.log('Listening for http2 requests on 443');
	});
}).catch((err: Error) => {
	throw err;
});
