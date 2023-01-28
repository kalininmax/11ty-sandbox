const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const csso = require('postcss-csso');
const notifier = require('node-notifier');
const log = require('fancy-log');
const colors = require('ansi-colors');

const PATHS = require('../paths');
const { IS_PRODUCTION } = require('../env');

module.exports = function tailwind() {
	return gulp
		.src(PATHS.src.tailwind)
		.pipe(plumber({
			errorHandler: err => {
				log.error(colors.red(err.message));
				notifier.notify({
					title: 'TailwindCSS Compilation Error',
					message: err.message,
				});
			},
		}))
		.pipe(postcss())
		.pipe(gulpif(IS_PRODUCTION, postcss(csso({ restructure: false }))))
		.pipe(gulp.dest(PATHS.build.styles));
};
