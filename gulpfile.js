'use strict';

// Requires
// --------

// General
const gulp = require('gulp');
const gutil = require('gulp-util');

// JSX/ES6 -> ES5
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const es = require('event-stream');

const paths = {
  // scripts: ['./client/scripts/**/*.jsx', './client/scripts/**/*.js'],
  entries: ['./App.jsx']
};

gulp.task('build-js', () => {

  const streams = paths.entries.map(entry => {
    return browserify({ entries: [entry], basedir: './client/scripts', debug: true })
      .transform(babelify)
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error.'))
      .pipe(source(entry))
      .pipe(rename(function (path) {
        paths.entries.length === 1 ? path.basename = 'bundle' : path.suffix = '.bundle';
        path.extname = '.js';
      }))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify({ mangle: false }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./public/js'));
  });

  return es.merge.apply(null, streams);

});
