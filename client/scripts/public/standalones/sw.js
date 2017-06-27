// On the shoulders of giants:
// --------------------------
// MDN - Service Worker API - Using Service Workers
// https://serviceworke.rs
// https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker

'use strict';

import * as CACHE from './swCache.json';

const debug = require('debug')('am:sw');

const CACHE_VERSION = 10;
const CURRENT_CACHES = {
  font: `font-cache-v${CACHE_VERSION}`,
  css: `css-cache-v${CACHE_VERSION}`,
  html: `html-cache-v${CACHE_VERSION}`,
  img: `img-cache-v${CACHE_VERSION}`,
  js: `js-cache-v${CACHE_VERSION}`
  // json: `json-cache-v${CACHE_VERSION}` // this should be in indexedDB.
  // Currently appcache has everything stored in it, including json.
  // Shouldn't be a problem to move everything to IDB being that it has incredibly high compatibility (~94%).
  // Need to move all non-structural files to be stored in and accessed from IDB.
  // This includes all JSON, non-base images, and files used by various challenges.
  // IDB currently just stores the user's progress.
};

// challenges currently do not need to be imported as it's part of the main.bundle.js

self.addEventListener('install', event => {
  self.skipWaiting(); // make queued SW active.
  debug('in the install event');
  event.waitUntil(
    Object.keys(CURRENT_CACHES).forEach(key => {
      caches
        .open(CURRENT_CACHES[key])
        .then(cache => cache.addAll(CACHE[key]));
        /*
        .then(() =>
          self.skipWaiting() // make queued SW active.
        );
       */
    })
  );
});


self.addEventListener('fetch', event => {
  debug(`Handling fetch event for ${event.request.url}`);

  let requestType;

  switch (event.request.url.split('.')[event.request.url.split('.').length - 1]) {
    case 'http://localhost:3000/':
    case 'http://localhost:8080/':
    case 'com/':
    case 'io/arcade-mode/':
      requestType = 'html';
      break;
    case 'ttf':
      requestType = 'font';
      break;
    case 'css':
      requestType = 'css';
      break;
    case 'svg':
    case 'png':
    case 'jpeg':
    case 'jpg':
      requestType = 'img';
      break;
    case 'js':
      requestType = 'js';
      break;
    default:
      requestType = 'not found';
  }

  if (requestType === 'not found') {
    debug(`Requested type, ${event.request.url}, is not in the cache`);
    debug(event.request.url.split('.')[event.request.url.split('.').length - 1]);
    return fetch(event.request);
  }
  event.respondWith(
    fromNetwork(event.request, 400).catch(() =>
      fromCache(event.request, CURRENT_CACHES[requestType]))
  /*
    caches.open(CURRENT_CACHES[requestType]).then(cache =>
      cache.match(event.request).then(res => {
        if (res) {
          debug(`Response found in cache ${res}.`);
          return res;
        }
        return fetch(event.request);
      })
    )
  */
  );
});

self.addEventListener('activate', event => {
  debug('[activate]: Activating Service Worker.');

  self.clients.claim();

  // Delete all caches that aren't named in CURRENT_CACHES
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map(key => CURRENT_CACHES[key]);

  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(cacheNames.map(cacheName => {
        if (expectedCacheNames.indexOf(cacheName) === -1) {
          debug(`Deleting out of date cache: ${cacheName}`);
          return caches.delete(cacheName);
        }
      }))
    )
    /*
    .then(() => self.clients.claim())
   */
  );
});


function fromCache (__request__, __CACHE__) {
  return caches.open(__CACHE__).then(cache =>
    cache.match(__request__).then(res => {
      if (res) {
        debug(`Response found in cache ${res}.`);
        return res;
      }
      return fetch(__request__);
    }));
}

function fromNetwork (__request__, __timeout__) {
  return new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, __timeout__);

    fetch(__request__).then(res => {
      debug(`Response found from network ${res}.`);
      clearTimeout(timeoutId);
      fulfill(res);
    }, reject);
  });
}

