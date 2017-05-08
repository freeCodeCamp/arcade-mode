'use strict';


// Requires
// ========

// General
// -------
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// JSX/ES6 -> ES5
// --------------
const browserify = require('browserify');
const babelify = require('babelify');
const envify = require('envify');
const uglifyify = require('uglifyify');
const collapse = require('bundle-collapser/plugin');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const es = require('event-stream');

// SCSS -> CSS
// -----------
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');

// Image processing
// ----------------
const imagemin = require('gulp-imagemin'); // supports png, jpg, gif, and svg only
const cache = require('gulp-cache');


// Configuration Objects
// =====================

// Entry points and sources
// ------------------------
const paths = {
  fonts: ['client/fonts/**/*'], // font sources
  images: ['client/images/**/*'], // image sources
  scripts: ['client/scripts/main.jsx'], // entry point scripts
  srcClient: ['client/scripts/**/*.js*'],
  stylesheets: ['client/stylesheets/style.scss'] // entry point stylesheets
};


// Gulp Tasks
// ==========

gulp.task('build-font', () =>
gulp.src(paths.fonts)
  .pipe(gulp.dest('public/font')) // no processing because fonts are already optimized
);

gulp.task('build-img', () => {
  gulp.src('client/images/favicon.ico')
    .pipe(gulp.dest('public/img'));

  gulp.src(paths.images)
    .pipe(cache(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 })
    ])))
    .pipe(gulp.dest('public/img'));
});

gulp.task('build-js', () => {
  const streams = paths.scripts.map(script =>
    browserify({
      entries: script,
      extensions: ['.jsx'],
      debug: true
    })
      .transform(babelify)
      .transform(envify)
      .transform({
        global: true
      }, uglifyify)
      .plugin(collapse)
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error.'))
      .pipe(source(script.slice(15))) // "pretend" name: https://www.npmjs.com/package/vinyl-source-stream; slice off the './client/scripts/' segment for just the script file name
      .pipe(buffer())
      .pipe(plumber())
      .pipe(rename(path => {
        paths.scripts.length === 1 ? path.basename = 'bundle' : path.suffix = '.bundle';
        path.extname = '.js';
      }))
      .pipe(uglify({ mangle: true }))
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


// DEV-tasks (not used in production)
//-----------------------------------

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


// Helper tasks
// ------------

gulp.task('clear-cache', done => cache.clearAll(done)); // clears img cache


// Bundled tasks
// -------------

gulp.task('build', ['build-font', 'build-img', 'build-js', 'build-css']);
gulp.task('build-dev', ['build-font', 'build-img', 'build-js-inc', 'build-css']);

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.fonts, ['build-font']);
  gulp.watch(paths.images, ['build-img']);
  gulp.watch(paths.srcClient, ['build-js']);
  gulp.watch(paths.stylesheets, ['build-css']);
});

gulp.task('watch-dev', ['build-dev'], () => {
  gulp.watch(paths.fonts, ['build-font']);
  gulp.watch(paths.images, ['build-img']);
  gulp.watch(paths.srcClient, ['build-js-inc']);
  gulp.watch(paths.stylesheets, ['build-css']);
});

