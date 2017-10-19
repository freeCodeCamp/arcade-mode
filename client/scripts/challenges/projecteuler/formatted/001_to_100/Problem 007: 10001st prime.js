/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 7: 10001st prime
/// type: project-euler

/// categories:
/// math

/// difficulty: 1

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.</p>
/// <p class="euler__paragraph">What is the 10 001st prime number?</p></div>

/// challengeSeed:
function euler7() {
  // Good luck!
  return true;
}

euler7();

/// solutions:
function euler7() {

	function isPrime(num) {
			if (num === 1) {
				return false;
			} else if (num === 2) {
				return true;
		}
		let sqrtOfNum = Math.floor(num ** 0.5);
		for (let i = 2; i <= sqrtOfNum + 1; i++) {
			if (num % i === 0) {
				return false;
			}
		}
		return true;
	}

  let primes = [];
  let currNum = 1;
  while (primes.length < 10001) { // noprotect
    if (isPrime(currNum)) {
      primes.push(currNum);
    }
    currNum += 1;
  }
  return primes[primes.length - 1];
}

/// tail:

/// tests:
assert(typeof euler7 === 'function', 'message: <code>euler7()</code> is a function.');
assert.strictEqual(euler7(), 104743, 'message: <code>euler7()</code> should return 104743.');
/// id: 5900f3731000cf542c50fe86
