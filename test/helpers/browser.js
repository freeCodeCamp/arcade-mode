/* browser.js
 *
 * Sets up 'browser-like' environment for running unit tests for React
 * components.
 * */

// require('babel-register')();

import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCUMENT html><html><head></head><body></body></html>');
// const exposedProperties = ['window', 'navigator', 'document'];

global.document = dom;
global.window = document.defaultView;

/*
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});
*/

global.navigator = {
  userAgent: 'node.js'
};
