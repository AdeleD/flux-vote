var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

gulp.task('watch', function() {
  gulp.watch('./js/**/*.js', ['app']);
});

gulp.task('app', function() {
  return browserify('./js/app.js', {'standalone': 'FluxVote'})
    .transform(reactify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./bundle'));
});

gulp.task('default', ['app']);