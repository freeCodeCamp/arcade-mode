
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 47: Distinct primes factors
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The first two consecutive numbers to have two distinct prime factors are:</p>
/// <br>
/// <p class="euler__paragraph">$14 = 2 × 7$</p>
/// <p class="euler__paragraph">$15 = 3 × 5$</p>
/// <br>
/// <p class="euler__paragraph">The first three consecutive numbers to have three distinct prime factors are:</p>
/// <br>
/// <p class="euler__paragraph">$644 = 2^2 × 7 × 23$</p>
/// <p class="euler__paragraph">$645 = 3 × 5 × 43$</p>
/// <p class="euler__paragraph">$646 = 2 × 17 × 19$</p>
/// <br>
/// <p class="euler__paragraph">Find the first four consecutive integers to have four distinct prime factors each. What is the first of these numbers?</p></div>

/// challengeSeed:
// noprotect
function euler47() {
  // Good luck!
  return true;
}

euler47();

/// solutions:
// noprotect
function euler47() {
  function isPrime(num) {
    if (num < 2) {
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

  function getPrimeFactors(num) {
    const factors = [];
    for (let i = 1; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        // Found a factor
        if (isPrime(i)) factors.push(i);
        if (isPrime(num / i) && i !== Math.sqrt(num)) {
          factors.push(num / i);
        }
      }
    }
    return factors;
  }

  function findConsecutiveNumbers(targetNumPrimes, targetConsecutive) {
    let number = 0;
    let consecutive = 0;
    while (consecutive < targetConsecutive) {
      number++;
      if (getPrimeFactors(number).length >= targetNumPrimes) {
        consecutive++;
      } else {
        consecutive = 0;
      }
    }
    return (number - targetConsecutive) + 1;
  }

  return findConsecutiveNumbers(4, 4);
}

/// tail:
const replaceThis = 3;

/// tests:
assert(typeof euler47 === 'function', 'message: <code>euler47()</code> is a function.');
assert.strictEqual(euler47(), 134043, 'message: <code>euler47()</code> should return 134043.');
/// id: 5900f39c1000cf542c50feae
