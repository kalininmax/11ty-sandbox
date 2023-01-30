const path = require('path');
const gulp = require('gulp');
const rename = require('gulp-rename');
const svgSprite = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const editSVG = require('gulp-cheerio');

const svgoPluginsList = require('./svgmin-plugins-list');
const PATHS = require('../paths');

module.exports = function svg() {
	return gulp
		.src(PATHS.src.svg)
		.pipe(svgmin(file => {
			const prefix = path.basename(file.relative, path.extname(file.relative));

			return {
				multipass: true,
				full: true,
				plugins: [
					...svgoPluginsList,
					{
						name: 'cleanupIDs',
						params: {
							prefix: `${prefix}-`,
							minify: true
						}
					},
				]
			}
		}))
		.pipe(rename({ prefix: 'icon-' }))
		.pipe(svgSprite({ inlineSvg: true }))
		.pipe(editSVG({
			run: $ => {
				$('svg').attr('style', 'display:none');
			},
			parserOptions: { xmlMode: true }
		}))
		.pipe(rename('sprite.svg'))
		.pipe(gulp.dest(PATHS.build.svg));
};
