
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 40: Champernowne's constant
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">An irrational decimal fraction is created by concatenating the positive integers:</p>
/// <p class="euler__paragraph">$0.123456789101112131415161718192021$...</p>
/// <br>
/// <p class="euler__paragraph">It can be seen that the $12$th digit of the fractional part is $1$.</p>
/// <br>
/// <p class="euler__paragraph">If $d_n$ represents the $n$th digit of the fractional part, find the value of the following expression.</p>
/// <p class="euler__paragraph">$d_1 × d_{10} × d_{100} × d_{1000} × d_{10000}$ $× d_{100000} × d_{1000000}$</p></div>

/// challengeSeed:
function euler40() {
  // Good luck!
  return true;
}

euler40();

/// solutions:
function euler40() {
  let fractionalPart = ' ';
  for (let i = 1; fractionalPart.length <= 1000000; i++) {
    fractionalPart += i.toString();
  }
  let product = 1;
  for (let i = 0; i < 7; i++) {
    const index = 10 ** i;
    product *= parseInt(fractionalPart[index], 10);
  }
  return product;
}

/// tail:

/// tests:
assert(typeof euler40 === 'function', 'message: <code>euler40()</code> is a function.');
assert.strictEqual(euler40(), 210, 'message: <code>euler40()</code> should return 210.');
/// id: 5900f3941000cf542c50fea7
