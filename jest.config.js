// @flow
/* eslint-disable import/no-commonjs */

module.exports = {
	collectCoverageFrom: [
		'actions/**/*.js',
		'components/**/*.js',
		'constants/**/*.js',
		'hooks/**/*.js',
		'pages/**/*.js',
		'utils/**/*.js',
	],
	coverageDirectory: '<rootDir>/coverage',
	moduleNameMapper: {
		'\\.(css)$': 'identity-obj-proxy',
	},
	setupFilesAfterEnv: ['<rootDir>/environ-jest.js'],
};
