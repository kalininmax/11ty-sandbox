const gulp = require('gulp');
const svgSprite = require('./gulp-tasks/svg-sprite');
const sass = require('./gulp-tasks/sass');
const tailwind = require('./gulp-tasks/tailwind');
const watch = require('./gulp-tasks/watch')

gulp.task('svgSprite', svgSprite);

gulp.task('styles', gulp.parallel(sass, tailwind));

gulp.task('dev', gulp.parallel('styles', watch));
