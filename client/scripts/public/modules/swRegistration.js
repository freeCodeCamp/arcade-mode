
'use strict';

export default function swRegistration () {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.bundle.js').then(reg => {
      console.log(`Registration successful: ${reg}. Scope is ${reg.scope}`);

      if (navigator.serviceWorker.controller) {
        console.log('Page controlled by service worker.');
      }
      else {
        console.log('Service worker not in control.');
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
    console.log('This browser does not support service workers.');
  }
}
