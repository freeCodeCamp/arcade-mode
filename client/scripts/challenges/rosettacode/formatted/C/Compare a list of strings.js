
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Compare a list of strings
/// type: rosetta-code

/// categories:


/// difficulty: 1

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="rosetta"><br/>
/// <p class="rosetta__paragraph">Given a  <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/List_(abstract_data_type)" title="wp: List_(abstract_data_type)">list</a>  of arbitrarily many strings, implement a function for each of the following conditions:</p><br/><ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered"> test if they are all lexically <span class="rosetta__text--bold">equal</span></li>
/// <li class="rosetta__list-item--unordered"> test if every string is lexically <span class="rosetta__text--bold">less than</span> the one after it  <span class="rosetta__text--italic">(i.e. whether the list is in strict ascending order)</span></li></ul>
/// </div>

/// challengeSeed:
function allEqual (arr) {
  // Good luck!
  return true;
}

function azSorted (arr) {
  // Good luck!
  return true;
}

/// solutions:
function allEqual(a) {
  let out = true;
  let i = 0;
  while (++i < a.length) {
    out = out && (a[i - 1] === a[i]);
  } return out;
}

function azSorted(a) {
  let out = true;
  let i = 0;
  while (++i < a.length) {
    out = out && (a[i - 1] < a[i]);
  } return out;
}

/// tail:
const testCases = [['AA', 'AA', 'AA', 'AA'], ['AA', 'ACB', 'BB', 'CC'], [], ['AA'], ['BB', 'AA']];

/// tests:
assert(typeof allEqual === 'function', 'message: <code>allEqual</code> is a function.');
assert(typeof azSorted === 'function', 'message: <code>azSorted</code> is a function.');
assert.isTrue(allEqual(testCases[0]), 'message: <code>allEqual(["AA", "AA", "AA", "AA"])</code> returns true.');
assert.isFalse(azSorted(testCases[0]), 'message: <code>azSorted(["AA", "AA", "AA", "AA"])</code> returns false.');
assert.isFalse(allEqual(testCases[1]), 'message: <code>allEqual(["AA", "ACB", "BB", "CC"])</code> returns false.');
assert.isTrue(azSorted(testCases[1]), 'message: <code>azSorted(["AA", "ACB", "BB", "CC"])</code> returns true.');
assert.isTrue(allEqual(testCases[2]), 'message: <code>allEqual([])</code> returns true.');
assert.isTrue(azSorted(testCases[2]), 'message: <code>azSorted([])</code> returns true.');
assert.isTrue(allEqual(testCases[3]), 'message: <code>allEqual(["AA"])</code> returns true.');
assert.isTrue(azSorted(testCases[3]), 'message: <code>azSorted(["AA"])</code> returns true.');
assert.isFalse(allEqual(testCases[4]), 'message: <code>allEqual(["BB", "AA"])</code> returns false.');
assert.isFalse(azSorted(testCases[4]), 'message: <code>azSorted(["BB", "AA"])</code> returns false.');
/// id: 596e457071c35c882915b3e4
