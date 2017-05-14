/* browser.js
 *
 * Sets up 'browser-like' environment for running unit tests for React
 * components.
 * */

// require('babel-register')();

import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');
// const win = doc.defaultView;
const exposedProperties = ['window', 'navigator', 'document'];

global.window = dom.window;
global.document = dom.window.document;
// global.document = doc;
// global.window = win;

Object.keys(global.window).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = global.window[property];
  }
});

global.Worker = global.window.Worker;

global.navigator = {
  userAgent: 'node.js'
};

