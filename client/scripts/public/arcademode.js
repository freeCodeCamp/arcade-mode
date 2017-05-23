
'use strict';

import browser from 'detect-browser';

import titleCanvas from './titleCanvas';

console.log(browser.name);

/*
document.addEventListener('DOMContentLoaded', () => {
  titleCanvas().init();
});
*/

window.onload = () => {
  if (browser.name !== 'firefox') {
    titleCanvas().init();
  }
};

