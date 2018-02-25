
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Greatest common divisor
/// type: rosetta-code

/// categories:
/// Recursion

/// difficulty: 1

/// benchmark:

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function that returns the greatest common divisor of two integers.</p></div>

/// challengeSeed:
function gcd (a,b) {
  // Good luck!
}

/// solutions:
function gcd(a, b) {
  return b==0 ? Math.abs(a):gcd(b, a % b);
}

/// tests:
assert(typeof gcd=='function','message: <code>gcd</code> should be a function.');
assert(typeof gcd(24,36)=='number','message: <code>gcd(24,36)</code> should return a number.');
assert.equal(gcd(24,36),12,'message: <code>gcd(24,36)</code> should return <code>12</code>.');
assert.equal(gcd(30,48),6,'message: <code>gcd(30,48)</code> should return <code>6</code>.');
assert.equal(gcd(10,15),5,'message: <code>gcd(10,15)</code> should return <code>5</code>.');
assert.equal(gcd(100,25),25,'message: <code>gcd(100,25)</code> should return <code>25</code>.');
assert.equal(gcd(13,250),1,'message: <code>gcd(13,250)</code> should return <code>1</code>.');
assert.equal(gcd(1300,250),50,'message: <code>gcd(1300,250)</code> should return <code>50</code>.');
/// id: 5a23c84252665b21eecc7e82
