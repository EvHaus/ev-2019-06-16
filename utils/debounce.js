// @flow
/* eslint-disable flowtype/no-weak-types, consistent-this, prefer-rest-params */

// Stolen from: https://davidwalsh.name/javascript-debounce-function

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds.
export const debounce = function (
	func: Function,
	wait: number
): Function {
	let timeout;
	return function () {
		const context = this;
		const args = arguments;
		const later = function () {
			timeout = null;
			func.apply(context, args);
		};
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

export default debounce;
