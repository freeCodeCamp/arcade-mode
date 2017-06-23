/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-param-reassign: 0 */

/* no benchmark expected as there were no "optimal" solutions in the solution list */

const assert = require('chai').assert;

/// title: Happy numbers
/// type: rosetta-code

/// categories:
/// ?

/// difficulty: 2

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">A happy number is defined by the following process:</p><br/>
/// <p class="rosetta__paragraph">Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers, while those that do not end in 1 are unhappy numbers.</p><br/>
/// <p class="rosetta__paragraph">Implement a function that returns true if the number is happy, or false if not.</p>
/// </div>

/// challengeSeed:
function happy (number) {
  // Good luck!
}

/// solutions:
function happy (number) {
  let m;
  let digit;
  const cycle = [];

  while (number !== 1 && cycle[number] !== true) {
    cycle[number] = true;
    m = 0;
    while (number > 0) {
      digit = number % 10;
      m += digit ** 2;
      number = (number - digit) / 10;
    }
    number = m;
  }
  return (number === 1);
}

/// tests:
assert(typeof happy === 'function', 'message: <code>happy</code> is a function.');
assert(typeof happy(1) === 'boolean', 'message: <code>happy(1)</code> should return a boolean.');
assert.isTrue(happy(1), 'message: <code>happy(1)</code> should return true.');
assert.isFalse(happy(2), 'message: <code>happy(2)</code> should return false.');
assert.isTrue(happy(7), 'message: <code>happy(7)</code> should return true.');
assert.isTrue(happy(10), 'message: <code>happy(10)</code> should return true.');
assert.isTrue(happy(13), 'message: <code>happy(13)</code> should return true.');
assert.isTrue(happy(19), 'message: <code>happy(19)</code> should return true.');
assert.isTrue(happy(23), 'message: <code>happy(23)</code> should return true.');
assert.isTrue(happy(28), 'message: <code>happy(28)</code> should return true.');
assert.isTrue(happy(31), 'message: <code>happy(31)</code> should return true.');
assert.isTrue(happy(32), 'message: <code>happy(32)</code> should return true:.');
assert.isFalse(happy(33), 'message: <code>happy(33)</code> should return false.');
/// id: 594810f028c0303b75339ad1
