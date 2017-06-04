
'use strict';

const debug = require('debug')('am:swregistration');

export default function swRegistration () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.bundle.js').then(reg => {
      debug(`Registration successful: ${reg}. Scope is ${reg.scope}`);

      if (navigator.serviceWorker.controller) {
        debug('Page controlled by service worker.');
      }
      else {
        debug('Service worker not in control.');
      }
    })
    .catch(err => {
      console.error(err);
    });
/*
    navigator.serviceWorker.addEventListener('controllerchange', event => {
      console.log(`controllerchange event: ${event}`);
    });

    navigator.serviceWorker.controller.addEventListener('statechange', function () {
      console.log(`statechange: ${this.state}`);
    });
    */
  }
  else {
    console.warn('This browser does not support service workers.');
  }
}
