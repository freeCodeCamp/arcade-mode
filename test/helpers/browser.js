/* browser.js
 *
 * Sets up 'browser-like' environment for running unit tests for React
 * components.
 * */

import { JSDOM } from 'jsdom';

const dom = new JSDOM('<html><head></head><body></body></html>');
global.document = dom;

global.navigator = {
  userAgent: 'node.js'
};

