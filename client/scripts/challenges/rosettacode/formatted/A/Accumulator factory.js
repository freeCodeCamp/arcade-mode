/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */


const assert = require('chai').assert;

/// title: Accumulator factory
/// type: rosetta-code

/// categories:
/// closures

/// difficulty: 1

/// description:
/// Create a function that takes a single (numeric) argument and returns another function that is an accumulator. The returned accumulator function in turn also takes a single numeric argument, and returns the sum of all the numeric values passed in so far to that accumulator (including the initial value passed when the accumulator was created).
/// Rules
/// Do not use global variables.
/// Hint
/// Closures save outer state.

/// challengeSeed:
function accumulator (sum) {
  // Good luck!
}

/// solutions:
function accumulator (sum) {
  return function (n) {
    return sum += n;
  };
}

/// tail:
const testFn = typeof accumulator(3) === 'function' && accumulator(3);
if (testFn) {
  testFn(-4);
  testFn(1.5);
}

/// tests:
assert(typeof accumulator === 'function', 'message: <code>accumulator</code> is a function.');
assert(typeof accumulator(0) === 'function', 'message: <code>accumulator(0)</code> should return a function.');
assert(typeof accumulator(0)(2) === 'number', 'message: <code>accumulator(0)(2)</code> should return a number.');
assert(testFn(5) === 5.5, 'message: Passing in the values 3, -4, 1.5, and 5 should return 5.5.');
/// id: 594810f028c0303b75339ace
