/* eslint-disable flowtype/require-valid-file-annotation, import/no-commonjs */
/* eslint-disable flowtype/require-return-type, flowtype/require-parameter-type */

// This file is here just as an entry point for our Node.js application. This
// allows us to use ES6 on the backend. It's an optional layer that adds some
// performance overhead but allows the API code to be clean, efficient and make
// use of Flow for static typing.
//
// In a real world production app I wouldn't recommend using Node.js on the
// backend anyway, so this is here just for this sample code submission.

require('@babel/register')({
	presets: ['@babel/preset-env'],
	ignore: ['node_modules', '.next'],
});

module.exports = require('./server.js');
