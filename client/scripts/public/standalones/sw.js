// On the shoulders of giants:
// --------------------------
// MDN - Service Worker API - Using Service Workers
// https://serviceworke.rs
// https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker

'use strict';

const CACHE_VERSION = 2;
const CURRENT_CACHES = {
  font: `font-cache-v${CACHE_VERSION}`,
  css: `css-cache-v${CACHE_VERSION}`,
  html: `html-cache-v${CACHE_VERSION}`, // is this needed?
  img: `img-cache-v${CACHE_VERSION}`,
  js: `js-cache-v${CACHE_VERSION}`
  // json: `json-cache-v${CACHE_VERSION}` // this should be in indexedDB.
  // currently appcache has everything stored in it, including json
  // will eventually need to take out json and move it to indexedDB.
  // indexedDB will also store the user's progress.
};

const CACHE = {
  font: [
    'public/font/Roboto/Roboto-Regular.ttf',
    'public/font/Roboto/Roboto-Medium.ttf',
    'public/font/Roboto/Roboto-Bold.ttf',
    'public/font/Lato/Lato-Black.ttf',
    'public/font/Kalam/Kalam-Regular.ttf'
  ],

  css: [
    'public/css/style.css',
    'public/css/vendor/bootswatch/bootstrap.min.css',
    'public/css/vendor/codemirror/codemirror.min.css',
    'public/css/vendor/codemirror/monokai.min.css'
  ],

  html: ['/'],

  img: [
    'public/img/FCClogo.svg',
    'public/img/FCCfire.svg'
  ],

  js: [
    'public/js/main.bundle.js',
    'public/js/index.bundle.js',
    'public/js/ww.bundle.js',
    'public/js/sw.bundle.js'
  ]
};

// challenges currently do not need to be imported as it's part of the main.bundle.js

self.addEventListener('install', event => {
  console.log('in the install event');
  event.waitUntil(
    Object.keys(CURRENT_CACHES).forEach(key => {
      caches
        .open(CURRENT_CACHES[key])
        .then(cache => cache.addAll(CACHE[key]))
        .then(() => {
          console.log(`${key} has been cached.`);
          return self.skipWaiting(); // make queued SW active.
        });
    })
  );
});


self.addEventListener('fetch', event => {
  console.log(`Handling fetch event for ${event.request.url}`);

  let requestType;

  switch (event.request.url.split('.')[event.request.url.split('.').length - 1]) {
    case 'http://localhost:3000/':
    case 'http://localhost:8080/':
    case 'com/':
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
    console.log(`Requested type, ${event.request.url}, is not in the cache`);
    console.log(event.request.url.split('.')[event.request.url.split('.').length - 1]);
    return fetch(event.request);
  }
  event.respondWith(
    fromNetwork(event.request, 400).catch(() =>
      fromCache(event.request, CURRENT_CACHES[requestType]))
  /*
    caches.open(CURRENT_CACHES[requestType]).then(cache =>
      cache.match(event.request).then(res => {
        if (res) {
          console.log(`Response found in cache ${res}.`);
          return res;
        }
        return fetch(event.request);
      })
    )
  */
  );
});

self.addEventListener('activate', event => {
  console.log('[activate]: Activating Service Worker.');
  // Delete all caches that aren't named in CURRENT_CACHES
  const expectedCacheNames = Object.keys(CURRENT_CACHES).map(key => CURRENT_CACHES[key]);

  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(cacheNames.map(cacheName => {
        if (expectedCacheNames.indexOf(cacheName) === -1) {
          console.log(`Deleting out of date cache: ${cacheName}`);
          return caches.delete(cacheName);
        }
      }))
    )
    .then(() => self.clients.claim())
  );
});


function fromCache (__request__, __CACHE__) {
  return caches.open(__CACHE__).then(cache =>
    cache.match(__request__).then(res => {
      if (res) {
        console.log(`Response found in cache ${res}.`);
        return res;
      }
      return fetch(__request__);
    }));
}

function fromNetwork (__request__, __timeout__) {
  return new Promise((fulfill, reject) => {
    const timeoutId = setTimeout(reject, __timeout__);

    fetch(__request__).then(res => {
      console.log(`Response found from network ${res}.`);
      clearTimeout(timeoutId);
      fulfill(res);
    }, reject);
  });
}

