
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Determine if a string is numeric
/// type: rosetta-code

/// categories:
/// Simple

/// difficulty: 1

/// description:
/// <div class="rosetta">
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Create a boolean function which takes in a string and tells whether it is a numeric string (floating point and negative numbers included).</p>
/// <br><br><br/></div>

/// challengeSeed:
function isNumeric (n) {
  // Good luck!
  return true;
}

/// solutions:
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}


/// tests:
assert(typeof isNumeric === 'function', 'message: <code>isNumeric</code> should be a function.');
assert(typeof isNumeric('20') === 'boolean', 'message: <code>isNumeric("20")</code> should return a boolean');
assert(isNumeric('-27.3'), 'message: <code>isNumeric("-27.3")</code> should return true');
assert(isNumeric('123.45e7'), 'message: <code>isNumeric("123.45e7")</code> should return true');
assert(isNumeric('testing') === false, 'message: <code>isNumeric("testing")</code> should return false');
assert(isNumeric('123.45e') === false, 'message: <code>isNumeric("123.45e7")</code> should return false');
/// id: 59f4d879ea42e9248e4c3152
