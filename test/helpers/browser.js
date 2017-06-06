/* browser.js
 *
 * Sets up 'browser-like' environment for running unit tests for React
 * components.
 * */

import 'babel-polyfill';

import { JSDOM } from 'jsdom';
import indexedDB from 'fake-indexeddb';
// import MockStorage from './mockstorage';
import requestAnimFrame from './requestAnimFrame';

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;
global.navigator = global.window.navigator;

Object.keys(global.window).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = global.window[property];
  }
});

if (global.window.requestAnimationFrame === undefined) {
  requestAnimFrame(); // polyfill
}
/*
global.navigator = {
  userAgent: 'node.js'
};
*/

global.window.indexedDB = indexedDB;
// global.window.localStorage = new MockStorage();

