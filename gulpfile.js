'use strict';


// Requires
// ========

// General
// -------
const gulp = require('gulp');
const gutil = require('gulp-util');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

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

// JSON processing
// ---------------
const jsoncombine = require('gulp-jsoncombine');

// Appcache creation
const manifest = require('gulp-manifest');


// Configuration Objects
// =====================

// Entry points and sources
// ------------------------
const paths = {
  entry: { // entry points
    scripts: ['client/scripts/arcademode/main.jsx', 'client/scripts/public/index.js', 'client/scripts/public/standalones/ww.js', 'client/scripts/public/standalones/sw.js'],
    stylesheets: ['client/stylesheets/style.scss']
  },
  fonts: ['client/fonts/**/*'], // font sources
  images: ['client/images/**/*'], // image sources
  json: ['client/json/**/*'], // temporary storage for challenges
  scripts: ['client/scripts/**/*'],
  stylesheets: ['client/stylesheets/**/*'],
  vendor: {
    scripts: ['client/scripts/vendor/**/*'], // browserify currently imports loop-protect
    stylesheets: ['client/stylesheets/vendor/**/*.css']
  }
};


// Gulp Tasks
// ==========

// Hot-reloading
// -------------
gulp.task('browser-sync', ['watch-dev'], () => {
  browserSync.init({
    proxy: {
      target: 'localhost:8080',
      ws: true // websockets
    },
    ghostMode: true, // sync across all browsers
    reloadDelay: 2000, // give gulp tasks time to reprocess files
    port: 3000 // browserSync port
  });
});

// Appcache file creation
// ----------------------
gulp.task('build-appcache', ['build-types'], () =>
  gulp.src('public/**/*', { base: 'public' })
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      // fallback:
      filename: 'offline.appcache',
      exclude: 'offline.appcache'
    }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('build-appcache-dev', ['build-dev'], () =>
  gulp.src('public/**/*', { base: 'public' })
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      // fallback:
      filename: 'offline.appcache',
      exclude: 'offline.appcache'
    }))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({ stream: true }))
);


// Build tasks
// -----------
gulp.task('build-font', () =>
  gulp.src(paths.fonts, { base: 'client/fonts' })
    .pipe(gulp.dest('public/font')) // no processing because fonts are already optimized
    .pipe(browserSync.reload({ stream: true }))
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
    .pipe(gulp.dest('public/img'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build-json', () => {
  // pass through individual files (currently algo+ds) for individual mode display:
  gulp.src(paths.json)
    .pipe(gulp.dest('public/json'))
    .pipe(browserSync.reload({ stream: true }));

  // pass through a bundled version for mixed mode display:
  gulp.src(paths.json)
    .pipe(jsoncombine('challenges-combined.json', data =>
      new Buffer(JSON.stringify(data))
    ))
    .pipe(gulp.dest('public/json'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('build-js', () => {
  const streams = paths.entry.scripts.map(script =>
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
      .pipe(browserSync.reload({ stream: true }))
  );

  return es.merge.apply(null, streams);
});

gulp.task('build-css', () => {
  gulp.src(paths.entry.stylesheets[0]) // only the entry/index sheet, style.scss
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({ stream: true }));

  // any vendor css files, minify then pass through
  gulp.src(paths.vendor.stylesheets, { base: 'client/stylesheets/vendor' })
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename(path => {
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest('public/css/vendor'))
    .pipe(browserSync.reload({ stream: true }));
});


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
    const streams = paths.entry.scripts.map(script => {
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
          .pipe(gulp.dest('public/js'))
          .pipe(browserSync.reload({ stream: true }));
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

gulp.task('build-types', ['build-font', 'build-img', 'build-json', 'build-js', 'build-css']);
gulp.task('build-dev', ['build-font', 'build-img', 'build-json', 'build-js-inc', 'build-css']);

gulp.task('build', ['build-appcache']);
gulp.task('generate-public-dev', ['build-appcache-dev']);

gulp.task('watch', ['build'], () => {
  gulp.watch(paths.fonts, ['build-font']);
  gulp.watch(paths.images, ['build-img']);
  gulp.watch(paths.json, ['build-json']);
  gulp.watch(paths.scripts, ['build-js']);
  gulp.watch(paths.stylesheets, ['build-css']);
});

gulp.task('watch-dev', ['generate-public-dev'], () => {
  gulp.watch(paths.fonts, ['build-font']);
  gulp.watch(paths.images, ['build-img']);
  gulp.watch(paths.json, ['build-json']);
  gulp.watch(paths.scripts, ['build-js-inc']);
  gulp.watch(paths.stylesheets, ['build-css']);
});
