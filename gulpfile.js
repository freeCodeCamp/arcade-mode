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

const notify = require('gulp-notify');

// Configuration Objects
// ---------------------

// Entry points
const paths = {
  // scripts: ['./client/scripts/**/*.jsx', './client/scripts/**/*.js'],
  scripts: ['./client/scripts/App.jsx'],
  stylesheets: ['./client/stylesheets/style.scss']
};


// Gulp Tasks
// ----------

gulp.task('build-js', () => {
  const streams = paths.scripts.map(script =>
    browserify({
      entries: script,
      extensions: ['.jsx'],
      debug: true
    })
      .transform(babelify)
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error.'))
      .pipe(source(script.slice(17))) // "pretend" name: https://www.npmjs.com/package/vinyl-source-stream; slice off the './client/scripts/' segment for just the script file name
      .pipe(plumber())
      .pipe(rename(path => {
        paths.scripts.length === 1 ? path.basename = 'bundle' : path.suffix = '.bundle';
        path.extname = '.js';
      }))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify({ mangle: false }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('public/js'))
  );

  return es.merge.apply(null, streams);
});

gulp.task('build-css', () =>
  gulp.src(paths.stylesheets[0]) // only the entry/index sheet, style.scss
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('public/css'))
);

gulp.task('build', ['build-js', 'build-css']);

// DEV-tasks (not used in production)
//------------------------------------

function handleErrors(...errorArgs) {
  const args = Array.prototype.slice.call(errorArgs);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

if (process.env.NODE_ENV !== 'production') {
  const browserifyInc = require('browserify-incremental');

  // Incrementally building the js
  gulp.task('build-js-inc', () => {
    const b = browserify(Object.assign({}, browserifyInc.args,
      {
        entries: paths.scripts,
        extensions: ['.jsx'],
        debug: true
      }
    ));

    browserifyInc(b, { cacheFile: './browserify-cache.json' });

    b.transform(babelify)
      .bundle()
        .on('error', handleErrors)
        .pipe(source('./bundle.js'))
        .pipe(gulp.dest('public/js'));
  });
}
