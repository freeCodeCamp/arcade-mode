#! /usr/bin/env node

/* A script that generates all paths from the public directory files.
 * Used by the service worker to cache all files beforehand.
 */

/* eslint eqeqeq: 0 */

const fs = require('fs');
const readdir = require('recursive-readdir');

readdir('public').then(files => {
  const CACHE = {};
  CACHE.html = ['/'];

  const re = /^public\/([^/]*)\/.*$/;

  files.forEach(file => {
    const directory = file.match(re) && file.match(re)[1];
    if (directory) {
      if (!CACHE[directory]) {
        CACHE[directory] = [];
      }
      CACHE[directory].push(file);
    }
  });

  const cache = JSON.stringify(CACHE, null, 2);
  fs.writeFileSync('public/swCache.json', cache);
})
.catch(err => console.error(`error: ${err}`));
