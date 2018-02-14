
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Formatted numeric output
/// type: rosetta-code

/// categories:
/// Text processing
/// Simple

/// difficulty: 1

/// description:
/// <div class="rosetta">
/// <br/>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Express a number in decimal as a fixed-length string with leading zeros.</p>
/// <br/><p class="rosetta__paragraph">For example, the number  <span class="rosetta__text--bold">7125</span>  could be expressed as  <span class="rosetta__text--bold">00007125</span>. Here the number is 7125 and the fixed length is 8.</p>
/// <p class="rosetta__paragraph">Write a function that takes the fixed length and the number as the parameters. The function should return the appropriate string.</p>
/// <br><br><br/></div>

/// challengeSeed:
function format (n,num) {
  // Good luck!
}

/// solutions:
function format(n,num){
  return ("00000000000000000000" + n).slice(-num);
}

/// tail:

/// tests:
assert(typeof format=='function','message: <code>format</code> should be a function.');
assert(typeof format(33,5)=='string','message: <code>format(33,5)</code> should return a string.');
assert.equal(format(33,5),'00033','message: <code>format(33,5)</code> should return <code>"00033"</code>.');
assert.equal(format(123,8),'00000123','message: <code>format(123,5)</code> should return <code>"00000123"</code>.');
assert.equal(format(2044,4),'2044','message: <code>format(2044,4)</code> should return <code>"2044"</code>.');
assert.equal(format(2044,8),'00002044','message: <code>format(2044,8)</code> should return <code>"00002044"</code>.');
assert.equal(format(336544,10),'0000336544','message: <code>format(336544,10)</code> should return <code>"0000336544"</code>.');
/// id: 5a7862a6991ee413f72e2255
