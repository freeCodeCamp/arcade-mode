/* browser.js
 *
 * Sets up 'browser-like' environment for running unit tests for React
 * components.
 * */

import { JSDOM } from 'jsdom';
import MockStorage from './mockstorage';

const dom = new JSDOM('<!DOCTYPE html><html><head></head><body></body></html>');

global.window = dom.window;
global.document = dom.window.document;

Object.keys(global.window).forEach(property => {
  if (typeof global[property] === 'undefined') {
    global[property] = global.window[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.window.localStorage = new MockStorage();

