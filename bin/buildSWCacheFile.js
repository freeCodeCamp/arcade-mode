#! /usr/bin/env node

/* A script that generates all paths from the public directory files.
 * Used by the service worker to cache all files beforehand.
 */

/* eslint eqeqeq: 0 */

const fs = require('fs');
const readdir = require('recursive-readdir');

const filePath = 'client/scripts/public/standalones/swCache.json';

console.log('buildSWCacheFile.js: Script started.');

readdir('public').then(files => {
  const CACHE = {};
  CACHE.html = ['/'];

  // sorted so that arbitrary file path string rearrangements in their respective arrays
  // do not happen and thus prevents unnecessary commits
  const sortedFiles = files.sort();

  const re = /^public\/([^/]*)\/.*$/;

  sortedFiles.forEach(file => {
    const directory = file.match(re) && file.match(re)[1];
    if (directory) {
      if (!CACHE[directory]) {
        CACHE[directory] = [];
      }
      CACHE[directory].push(file);
    }
  });

  // If the file exists,
  if (fs.existsSync(filePath)) {
    const oldCache = JSON.parse(fs.readFileSync(filePath));

    // check if it has been updated. If so, write over old version.
    const updated = !Array.prototype.concat(...Object.values(CACHE))
      .every(file => Array.prototype.concat(...Object.values(oldCache)).includes(file));

    if (updated) {
      console.log('buildSWCacheFile.js: Service Worker file paths used for caching have been updated!');
      const cache = JSON.stringify(CACHE, null, 2);
      fs.writeFileSync(filePath, cache);
    }
    else console.log('buildSWCacheFile.js: Service Worker cache files have not changed. No operation.');
  } // Else write the file as it is completely new.
  else {
    console.log('buildSWCacheFile.js: Service Worker file paths used for caching have been generated!');
    const cache = JSON.stringify(CACHE, null, 2);
    fs.writeFileSync(filePath, cache);
  }
})
.catch(err => console.error(`error: ${err}`))
.then(() => console.log('buildSWCacheFile.js: Script finished.'));
