const { resolve } = require('path');
const Assets = require('assets');

const base64Resolver = new Assets();

module.exports = (imgPath, callback) => {
	const pathResolved = resolve(imgPath);

	base64Resolver.data(pathResolved, callback);
}
