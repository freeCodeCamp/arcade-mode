/* browser.js
 *
 * Sets up 'browser-like' environment for running unit tests for React
 * components.
 * */

// require('babel-register')();

import { JSDOM } from 'jsdom';

const doc = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
const win = doc.defaultView;
// const exposedProperties = ['window', 'navigator', 'document'];

global.document = doc;
global.window = win;
/*
Object.keys(win).forEach(property => {
  if (typeof global[property] === 'undefined') {
    // exposedProperties.push(property);
    global[property] = win[property];
  }
});
*/
/*
global.navigator = {
  userAgent: 'node.js'
};
*/
