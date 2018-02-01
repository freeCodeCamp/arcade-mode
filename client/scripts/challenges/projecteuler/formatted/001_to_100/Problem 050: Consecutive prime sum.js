
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 50: Consecutive prime sum
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The prime 41, can be written as the sum of six consecutive primes:</p>
/// <br>
/// <p class="euler__paragraph">$41 = 2 + 3 + 5 + 7 + 11 + 13$</p>
/// <br>
/// <p class="euler__paragraph">This is the longest sum of consecutive primes that adds to a prime below one-hundred.</p>
/// <br>
/// <p class="euler__paragraph">The longest sum of consecutive primes below one-thousand that adds to a prime, contains 21 terms, and is equal to 953.</p>
/// <br>
/// <p class="euler__paragraph">Which prime, below one-million, can be written as the sum of the most consecutive primes?</p></div>

/// challengeSeed:
// noprotect
function euler50() {
  // Good luck!
  return true;
}

euler50();

/// solutions:
// noprotect
function euler50() {
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

  function getPrimes(limit) {
    const primes = [];
    for (let i = 0; i <= limit; i++) {
      if (isPrime(i)) primes.push(i);
    }
    return primes;
  }

  const limit = 1000000;
  const primes = getPrimes(limit);

  // Create a map of the cumulative sum of primes
  const cumulativeSums = {};
  let cumulativeSum = 0;
  for (let i = 0; i < primes.length; i++) {
    cumulativeSum += primes[i];
    cumulativeSums[primes[i]] = cumulativeSum;
  }

  // Look for a set of 1000000 consecutive primes.
  // If not found, decrease the number of consecutive primes
  // and look again.
  for (let consecPrimes = 1000000; consecPrimes > 0; consecPrimes--) {
    for (let i = 0; i < primes.length - consecPrimes; i++) {
      const sum = cumulativeSums[primes[i + consecPrimes]] - cumulativeSums[primes[i]];
      if (sum > limit) break;
      if (isPrime(sum)) return sum;
    }
  }
}

/// tail:

/// tests:
assert(typeof euler50 === 'function', 'message: <code>euler50()</code> is a function.');
assert.strictEqual(euler50(), 997651, 'message: <code>euler50()</code> should return 997651.');
/// id: 5900f39e1000cf542c50feb1
