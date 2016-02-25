'use strict'

var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync').create();
var browserify = require('browserify');
var webpack = require('webpack-stream');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

var base = 
gulp.task('bower', function () {
  require('wiredep')({ src: 'index.html' });
});

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(["*.css", 
    "build/*.js", 
    "*.html"
    ]) 
    .on('change', browserSync.reload({ stream: true }));
});

// gulp.task('browserify', function() {
//   return browserify('./main.js')
//     .bundle()
//     // Pass desired output filename to vinyl-source-stream
//     // .pipe(source('bundle.js'))
//     // Start piping stream to tasks!
//     .pipe(gulp.dest('./bundle.js'));
// });

 
gulp.task('build', function() {
  return browserify('./dist/all.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});
 
// gulp.task('build', () => {
//   return gulp.src('scripts/*.js')
//     .pipe(sourcemaps.init())
//     .pipe(babel({
//       presets: ['es2015']
//     }))
//     .pipe(concat('bundle.js'))
//     .pipe(sourcemaps.write('.'))
//     .pipe(gulp.dest('build'));
// });

var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var webpack = require('webpack-stream');

gulp.task('js', function() {
  gulp.src('app/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(webpack())
    // .pipe(uglify())
    // .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./.tmp'))
});