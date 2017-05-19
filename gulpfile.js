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
  json: ['client/json/**/*'], // temporary storage for challenges
  scripts: ['client/scripts/arcademode/main.jsx', 'client/scripts/public/arcademode.js', 'client/scripts/public/worker.js'], // entry point scripts
  stylesheets: ['client/stylesheets/style.scss'], // entry point stylesheets
  watchScripts: ['client/scripts/**/*.js*'],
  watchStylesheets: ['client/stylesheets/**/*.scss']
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

gulp.task('build-json', () =>
  gulp.src(paths.json)
    .pipe(gulp.dest('public/json'))
);

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
      .pipe(source(`./${script.split('/')[script.split('/').length - 1]}`))
      .pipe(buffer())
      .pipe(plumber())
      .pipe(rename(path => {
        path.extname = '.bundle.js';
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
    const streams = paths.scripts.map(script => {
      const b = browserify(Object.assign({}, browserifyInc.args,
        {
          entries: script,
          extensions: ['.jsx'],
          debug: true
        }
      ));

      browserifyInc(b, { cacheFile: './browserify-cache.json' });

      return b.transform(babelify)
        .bundle()
          .on('error', handleErrors)
          .pipe(source(`./${script.split('/')[script.split('/').length - 1]}`))
          .pipe(buffer())
          .pipe(plumber())
          .pipe(rename(path => {
            path.extname = '.bundle.js';
          }))
          .pipe(gulp.dest('public/js'));
    });

    return es.merge.apply(null, streams);
  });
}


// Helper tasks
// ------------
/*
gulp.task('bundle', ['build'], () =>
  gulp.src(paths.scripts.map(script =>
    `./public/js/${script.split('/')[script.split('/').length - 1]}`
  ))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/js'))
);

gulp.task('bundle-dev', ['build-dev'], () =>
  gulp.src(paths.scripts.map(script =>
    `./public/js/${script.split('/')[script.split('/').length - 1]}`
  ))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public/js'))
);
*/
gulp.task('clear-cache', done => cache.clearAll(done)); // clears img cache


// Bundled tasks
// -------------

gulp.task('build', ['build-font', 'build-img', 'build-json', 'build-js', 'build-css']);
gulp.task('build-dev', ['build-font', 'build-img', 'build-json', 'build-js-inc', 'build-css']);

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.fonts, ['build-font']);
  gulp.watch(paths.images, ['build-img']);
  gulp.watch(paths.json, ['build-json']);
  gulp.watch(paths.watchScripts, ['build-js']);
  gulp.watch(paths.watchStylesheets, ['build-css']);
});

gulp.task('watch-dev', ['build-dev'], () => {
  gulp.watch(paths.fonts, ['build-font']);
  gulp.watch(paths.images, ['build-img']);
  gulp.watch(paths.json, ['build-json']);
  gulp.watch(paths.watchScripts, ['build-js-inc']);
  gulp.watch(paths.watchStylesheets, ['build-css']);
});

