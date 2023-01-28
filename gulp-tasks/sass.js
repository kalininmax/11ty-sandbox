const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const sassHandler = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const assets = require('postcss-assets');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const notifier = require('node-notifier');
const colors = require('ansi-colors');
const log = require('fancy-log');

const PATHS = require('../paths');
const { IS_PRODUCTION } = require('../env');

const sassOptions = {
	errLogToConsole: true,
	includePaths: ['./node_modules/']
};

if (IS_PRODUCTION) {
	sassOptions.outputStyle = 'compressed';
}

const postcssPlugins = [
	assets({
		loadPaths: [PATHS.src.imagesInline],
		cache: true
	}),

	IS_PRODUCTION && purgecss({ content: PATHS.purgecssContent }),

	autoprefixer()
].filter((value) => value);

module.exports = function sass() {
	return gulp
		.src(PATHS.src.styles)
		.pipe(
			plumber({
				errorHandler: err => {
					log.error(colors.red(err.message));
					notifier.notify({
						title: 'SASS Compilation Error',
						message: err.message
					});
				}
			})
		)
		.pipe(gulpif(!IS_PRODUCTION, sourcemaps.init()))
		.pipe(sassHandler(sassOptions))
		.pipe(postcss(postcssPlugins))
		.pipe(gulpif(!IS_PRODUCTION, sourcemaps.write()))
		.pipe(gulp.dest(PATHS.build.styles));
};
