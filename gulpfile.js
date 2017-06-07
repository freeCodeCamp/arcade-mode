'use strict';


// Requires
// ========

// Node
// ----
// https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
const exec = require('child_process').exec;

// Gulp
// ----
const gulp = require('gulp');
const gulpif = require('gulp-if');
// const ignore
const gutil = require('gulp-util');
const del = require('del');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();

// Pug -> HTML
// -----------
const pug = require('gulp-pug');

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
const merge = require('merge-stream');
const browserifyInc = require('browserify-incremental');

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
// -----------------
const manifest = require('gulp-manifest');


// Configuration Objects
// =====================

// Environmental variables
// const isProduction = process.env.NODE_ENV === 'production';
const isGitHubPages = process.env.DEST === 'github';

let ghPages = '';

if (isGitHubPages) {
  ghPages = '.publish/';
}

// Entry points and sources
// ------------------------
const paths = {
  entry: { // entry points
    scripts: [
      'client/scripts/arcademode/main.jsx',
      'client/scripts/public/index.js',
      'client/scripts/public/standalones/ww.js',
      'client/scripts/public/standalones/wwBenchmark.js',
      'client/scripts/public/standalones/sw.js'
    ],
    /*
    specialCases: [
      'client/scripts/public/standalones/wwBenchmark.js'
    ],
   */
    stylesheets: ['client/stylesheets/style.scss']
  },
  fonts: ['client/fonts/**/*'], // font sources
  images: ['client/images/**/*'], // image sources
  jsons: { // json-related items
    fccInterviewSeed: ['client/jsons/**/*'],
    js2jsonScript: ['bin/js2json_challenges.js']
  },
  challengesJs: ['client/scripts/challenges/**/*'],
  scripts: ['client/scripts/**/*'],
  stylesheets: ['client/stylesheets/**/*'],
  vendor: {
    scripts: ['client/scripts/vendor/**/*'], // browserify currently imports loop-protect
    stylesheets: ['client/stylesheets/vendor/**/*.css']
  },
  views: ['server/views/*.pug'] // generated for static sites
};


// Gulp Tasks
// ==========

// Build tasks
// -----------
gulp.task('build-font', () =>
  gulp.src(paths.fonts, { base: 'client/fonts' })
    .pipe(gulp.dest(`${ghPages}public/font`)) // no processing: fonts are already optimized
    .pipe(browserSync.reload({ stream: true }))
);

gulp.task('build-img', () => {
  const s1 = gulp.src('client/images/favicon.ico')
    .pipe(isGitHubPages ? gulp.dest(ghPages) : gulp.dest('public/img'));

  const s2 = gulp.src(paths.images)
    .pipe(cache(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      // imagemin.jpegtran({ progressive: true }), // Tuomas: Cannot get this to work, crashes gulp
      imagemin.optipng({ optimizationLevel: 5 })
    ])))
    .pipe(gulp.dest(`${ghPages}public/img`))
    .pipe(browserSync.reload({ stream: true }));

  return merge(s1, s2);
});

gulp.task('build-json', () => {
  // pass through individual files (currently algo+ds) for individual mode display:
  const s1 = gulp.src(paths.jsons.fccInterviewSeed)
    .pipe(gulp.dest(`${ghPages}public/json`))
    .pipe(browserSync.reload({ stream: true }));

  // pass through a bundled version for mixed mode display:
  const s2 = gulp.src(paths.jsons.fccInterviewSeed)
    .pipe(jsoncombine('challenges-combined.json', data =>
      new Buffer(JSON.stringify(data))
    ))
    .pipe(gulp.dest(`${ghPages}public/json`))
    .pipe(browserSync.reload({ stream: true }));

  return merge(s1, s2);
});

// Builds the arcade-mode json from js challenge files
gulp.task('build-js2json', done => {
  const js2jsonScript = `bin/js2json_challenges.js\
    --force -f client/scripts/challenges/*.js -o ${ghPages}public/json/challenges-arcade.json`;
  exec(js2jsonScript, err => {
    if (err) {
      console.error(`exec error: ${err}`);
    }
    done();
  });
});

gulp.task('build-js', () =>
  merge(...paths.entry.scripts.map(script => {
    const scriptName = script.split('/')[script.split('/').length - 1];
    let bundler;
    if (scriptName === 'wwBenchmark.js') {
      bundler = browserify({
        entries: script,
        debug: true
      });
    }
    else {
      bundler = browserify({
        entries: script,
        extensions: ['.jsx'],
        debug: true,
        plugin: [collapse]
      });
    }
    return bundler
      .transform(babelify, { presets: ['env', 'react'] })
      .transform(envify)
      .transform({
        global: true
      }, uglifyify)
      // .plugin(collapse)
      // .plugin(gulpif('*wwBenchmark.js', gutil.noop(), collapse))
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error.'))
      .pipe(source(`./${script.split('/')[script.split('/').length - 1]}`))
      .pipe(buffer())
      .pipe(plumber())
      .pipe(rename(path => {
        path.extname = '.bundle.js';
      }))
      .pipe(uglify({ mangle: true }))
      .pipe(gulp.dest(`${ghPages}public/js`))
      .pipe(isGitHubPages ? gulpif('*sw.bundle.js', gulp.dest(ghPages)) : gutil.noop())
      .pipe(browserSync.reload({ stream: true }));
  }))
 /*
  const specialCases = browserify({
    entries: paths.entry.specialCases[0],
    debug: true
  })
    .transform(babelify, { presets: ['env', 'react'] })
    .transform(envify)
    .transform({
      global: true
    }, uglifyify)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify error.'))
    .pipe(source(`./${paths.entry.specialCases[0].split('/')[paths.entry.specialCases[0].split('/').length - 1]}`))
    .pipe(buffer())
    .pipe(plumber())
    .pipe(rename(path => {
      path.extname = '.bundle.js';
    }))
    .pipe(uglify({ mangle: true }))
    .pipe(gulp.dest(`${ghPages}public/js`))
    .pipe(browserSync.reload({ stream: true }));

  return merge(merged, specialCases);
 */
);

gulp.task('build-css', () => {
  const s1 = gulp.src(paths.entry.stylesheets[0]) // only the entry/index sheet, style.scss
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest(`${ghPages}public/css`))
    .pipe(browserSync.reload({ stream: true }));

  // any vendor css files, minify then pass through
  const s2 = gulp.src(paths.vendor.stylesheets, { base: 'client/stylesheets/vendor' })
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(rename(path => {
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest(`${ghPages}public/css/vendor`))
    .pipe(browserSync.reload({ stream: true }));

  return merge(s1, s2);
});

gulp.task('build-view', () =>
  gulp.src(paths.views, { base: 'server/views' })
    .pipe(plumber())
    .pipe(pug({ pretty: true, basedir: 'server/views' }))
    .pipe(isGitHubPages ? gulp.dest(ghPages) : gutil.noop())
    .pipe(browserSync.reload({ stream: true }))
);

// Appcache file creation
// ----------------------
gulp.task('build-appcache', () =>
  gulp.src('public/**/*', { base: 'public' })
    .pipe(manifest({
      hash: true,
      preferOnline: true,
      network: ['*'],
      // fallback:
      filename: 'offline.appcache',
      exclude: 'offline.appcache'
    }))
    .pipe(gulp.dest(`${ghPages}public`))
    .pipe(browserSync.reload({ stream: true }))
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

// Incrementally building the js
gulp.task('build-js-inc', () =>
  merge(...paths.entry.scripts.map(script => {
    const b = browserify(Object.assign({}, browserifyInc.args,
      {
        entries: script,
        extensions: ['.jsx'],
        debug: true
      }
    ));

    browserifyInc(b, { cacheFile: './browserify-cache.json' });

    return b.transform(babelify, { presets: ['env', 'react'] })
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
  }))
);

gulp.task('build-appcache-dev', () =>
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

// Cleaners
// --------

// rm -rf public directory
gulp.task('clean:static', () => {
  if (isGitHubPages) {
    return del(['.publish/**/*']);
  }
  return del(['public/**/*']);
});

gulp.task('clear-cache', done => cache.clearAll(done)); // clears img cache

// Bundled tasks
// -------------
gulp.task('build-types',
  gulp.series(
    'build-json',
    'build-js2json',
    gulp.parallel('build-font', 'build-img', 'build-js', 'build-css', 'build-view')
  )
);

gulp.task('build-types-dev',
  gulp.series(
    'build-json',
    'build-js2json',
    gulp.parallel('build-font', 'build-img', 'build-js-inc', 'build-css', 'build-view')
  )
);

gulp.task('build', gulp.series('clean:static', 'build-types', 'build-appcache'));
gulp.task('build-dev', gulp.series('build-types-dev', 'build-appcache-dev'));

gulp.task('watch', gulp.series('build', done => {
  gulp.watch(paths.fonts, gulp.task('build-font'));
  gulp.watch(paths.images, gulp.task('build-img'));
  gulp.watch([...Object.values(paths.jsons)], gulp.task('build-json'));
  gulp.watch(paths.challengesJs, gulp.task('build-js2json'));
  gulp.watch(paths.scripts, gulp.task('build-js'));
  gulp.watch(paths.stylesheets, gulp.task('build-css'));
  done();
}));

gulp.task('watch-dev', gulp.series('build-dev', done => {
  const jsonFiles = Object.keys(paths.jsons).map(item => paths.jsons[item]);
  gulp.watch(paths.fonts, gulp.task('build-font'));
  gulp.watch(paths.images, gulp.task('build-img'));
  gulp.watch(jsonFiles, gulp.task('build-json'));
  gulp.watch(paths.challengesJs, gulp.task('build-js2json'));
  gulp.watch(paths.scripts, gulp.task('build-js-inc'));
  gulp.watch(paths.stylesheets, gulp.task('build-css'));
  done();
}));

// Hot-reloading
// -------------
gulp.task('browser-sync', gulp.series('watch-dev', done => {
  browserSync.init({
    proxy: {
      target: 'localhost:8080',
      ws: true // websockets
    },
    ghostMode: true, // sync across all browsers
    reloadDelay: 2000, // give gulp tasks time to reprocess files
    port: 3000 // browserSync port
  }, done);
}));

// GitHub pages deploy
// -------------------

// gulp.task('deploy-gh-pages', gulp.series('build', () =>
//   gulp.src('public/**/*')
//     .pipe(ghPages())
// ));

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
