const gulp = require('gulp');
const svg = require('./gulp-tasks/svg');
const sass = require('./gulp-tasks/sass');
const tailwind = require('./gulp-tasks/tailwind');
const watch = require('./gulp-tasks/watch')

gulp.task('svg', svg);

gulp.task('styles', gulp.parallel(sass, tailwind));

gulp.task('dev', gulp.parallel('styles', watch));
