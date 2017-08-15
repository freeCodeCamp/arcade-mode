
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Evaluate binomial coefficients
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function to calculate the binomial coefficient for the given value of n and k.</p><br/><p class="rosetta__paragraph">This formula is recommended:</p>
/// $\binom{n}{k} = \frac{n!}{(n-k)!k!} = \frac{n(n-1)(n-2)\ldots(n-k+1)}{k(k-1)(k-2)\ldots 1}$</div>

/// challengeSeed:
function binom (n,k) {
  // Good luck!
}

/// solutions:
function binom(n, k) {
    let coeff = 1;
    for (let i = n-k+1; i <= n; i++) coeff *= i;
    for (let i = 1;     i <= k; i++) coeff /= i;
    return coeff;
}

/// tests:
assert(typeof binom === 'function', 'message: <code>binom</code> is a function.');
assert.equal(binom(5,3),10, 'message: <code>binom(5,3)</code> should return 10.');
assert.equal(binom(7,2),21, 'message: <code>binom(7,2)</code> should return 21.');
assert.equal(binom(10,4),210, 'message: <code>binom(10,4)</code> should return 210.');
assert.equal(binom(6,1),6, 'message: <code>binom(6,1)</code> should return 6.');
assert.equal(binom(12,8),495, 'message: <code>binom(12,8)</code> should return 495.');
/// id: 598de241872ef8353c58a7a2
