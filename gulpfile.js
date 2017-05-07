'use strict';

// Requires
// --------

// General
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');

// JSX/ES6 -> ES5
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const es = require('event-stream');

// SCSS -> CSS
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');


// Configuration Objects
// ---------------------

const paths = {
  // scripts: ['./client/scripts/**/*.jsx', './client/scripts/**/*.js'],
  entries: ['./App.jsx']
};


// Gulp Tasks
// ----------

gulp.task('build-js', () => {
  const streams = paths.entries.map(entry =>
    browserify({ entries: [entry], basedir: './client/scripts', extensions: ['.jsx'], debug: true })
      .pipe(plumber())
      .transform(babelify)
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error.'))
      .pipe(source(entry))
      .pipe(rename(path => {
        paths.entries.length === 1 ? path.basename = 'bundle' : path.suffix = '.bundle';
        path.extname = '.js';
      }))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify({ mangle: false }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./public/js'))
  );

  return es.merge.apply(null, streams);
});

gulp.task('build-css', () =>
  gulp.src('./client/stylesheets/*.scss') // only the entry/index sheet, style.scss
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./public/css'))
);
