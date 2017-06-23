
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Averages/Mode
/// type: rosetta-code

/// categories:


/// difficulty: 1

/// benchmark:


/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a program to find the <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Mode (statistics)" title="wp: Mode (statistics)">mode</a> value of a collection.</p><br/><p class="rosetta__paragraph">The case where the collection is empty may be ignored. Care must be taken to handle the case where the mode is non-unique.</p><br/><p class="rosetta__paragraph">If it is not appropriate or possible to support a general collection, use a vector (array), if possible. If it is not appropriate or possible to support an unspecified value type, use integers.</p>

/// challengeSeed:
function mode (arr) {
  // Good luck!
  return true;
}

/// solutions:
function mode(arr) {
  const counter = {};
  let result = [];
  let max = 0;
  // for (const i in arr) {
  arr.forEach(el => {
    if (!(el in counter)) {
      counter[el] = 0;
    }
    counter[el]++;

    if (counter[el] === max) {
      result.push(el);
    }
    else if (counter[el] > max) {
      max = counter[el];
      result = [el];
    }
  });
  return result;
}

/// tail:
const arr1 = [1, 3, 6, 6, 6, 6, 7, 7, 12, 12, 17];
const arr2 = [1, 2, 4, 4, 1];

/// tests:
assert(typeof mode === 'function', 'message: <code>mode</code> is a function.');
assert.deepEqual(mode(arr1), [6], 'message: <code>mode([1, 3, 6, 6, 6, 6, 7, 7, 12, 12, 17])</code> should equal <code>[6]</code>');
assert.sameMembers(mode(arr2), [1, 4], 'message <code>mode([1, 2, 4, 4, 1])</code> should equal <code>[1, 4]</code>.');
/// id: 594d8d0ab97724821379b1e6
