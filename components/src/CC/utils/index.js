export * from './search';
export * from './Event';

/** @desc toString reference */
export function toString(value) {
	return Object.prototype.toString.call(value);
}

export function isObject(value) {
	return toString(value) === '[object Object]';
}

export function isArray(value) {
	return toString(value) === '[object Array]';
}
