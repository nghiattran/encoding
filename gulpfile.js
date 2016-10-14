'use strict'

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var webpack = require('webpack-stream');
var source = require('vinyl-source-stream');


gulp.task('bower', function () {
  require('wiredep')({ src: 'index.html' });
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch("*.css").on('change', browserSync.reload);
  gulp.watch("build/*.js").on('change', browserSync.reload);
  gulp.watch("*.html").on('change', browserSync.reload);
});
 
gulp.task('build', function() {
  return browserify('./scripts/main.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./build/'));
});