/* browser.js
 *
 * Sets up 'browser-like' environment for running unit tests for React
 * components.
 * */

import { JSDOM } from 'jsdom';

const dom = new JSDOM('<html><head></head><body></body></html>');
const wind = dom.defaultView;

global.document = dom;
global.window = wind;

global.navigator = {
  userAgent: 'node.js'
};

