
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 37: Truncatable primes
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The number 3797 has an interesting property. Being prime itself, it is possible to continuously remove digits from left to right, and remain prime at each stage: 3797, 797, 97, and 7. Similarly we can work from right to left: 3797, 379, 37, and 3.</p>
/// <br>
/// <p class="euler__paragraph">Find the sum of the only eleven primes that are both truncatable from left to right and right to left.</p>
/// <br>
/// <p class="euler__paragraph"><small>NOTE: 2, 3, 5, and 7 are not considered to be truncatable primes.</small></p></div>

/// challengeSeed:
// noprotect
function euler37() {
  // Good luck!
  return true;
}

euler37();

/// solutions:
// noprotect
function euler37() {
  function isPrime(num) {
    if (num <= 1) {
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

  let count = 0;
  let sum = 0;
  for (let num = 11; count < 11; num++) {
    if (isPrime(num)) {
      const numStr = num.toString();
      let allTruncationsArePrime = true;
      for (let i = 1; i < numStr.length; i++) {
        if (!isPrime(parseInt(numStr.slice(i), 10))
          || !isPrime(parseInt(numStr.slice(0, numStr.length - i), 10))) {
          allTruncationsArePrime = false;
        }
      }
      if (allTruncationsArePrime) {
        sum += num;
        count++;
      }
    }
  }
  return sum;
}

/// tail:

/// tests:
assert(typeof euler37 === 'function', 'message: <code>euler37()</code> is a function.');
assert.strictEqual(euler37(), 748317, 'message: <code>euler37()</code> should return 748317.');
/// id: 5900f3911000cf542c50fea4
