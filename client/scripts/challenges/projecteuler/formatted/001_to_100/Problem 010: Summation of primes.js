
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 10: Summation of primes
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.</p>
/// <p class="euler__paragraph">Find the sum of all the primes below two million.</p></div>

/// challengeSeed:
// noprotect
function euler10() {
  // Good luck!
  return true;
}

euler10();

/// solutions:
// noprotect
function euler10() {
  function isPrime(num) {
    if (num === 1) {
      return false;
    } else if (num === 2) {
      return true;
    }
    const sqrtOfNum = Math.floor(num ** 0.5);
    for (let i = 2; i <= sqrtOfNum + 1; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  const limit = 2000000;
  let sum = 0;
  for (let i = 1; i < limit; i++) {
    if (isPrime(i)) {
      sum += i;
    }
  }
  return sum;
}

/// tail:

/// tests:
assert(typeof euler10 === 'function', 'message: <code>euler10()</code> is a function.');
assert.strictEqual(euler10(), 142913828922, 'message: <code>euler10()</code> should return 142913828922.');
/// id: 5900f3761000cf542c50fe89
