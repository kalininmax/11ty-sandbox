const gulpWatch = require('gulp-watch');

const PATHS = require('../paths');

const sass = require('./sass');
const tailwind = require('./tailwind');
const svg = require('./svg');

module.exports = function watch() {
	gulpWatch([PATHS.watch.styles], sass);
	gulpWatch(PATHS.watch.tailwind, tailwind);
	gulpWatch([PATHS.watch.svg], svg);
};
