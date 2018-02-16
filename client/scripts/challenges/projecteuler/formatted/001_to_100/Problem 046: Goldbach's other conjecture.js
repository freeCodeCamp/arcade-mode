
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 46: Goldbach's other conjecture
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">It was proposed by Christian Goldbach that every odd composite number can be written as the sum of a prime and twice a square.</p>
/// <br>
/// <p class="euler__paragraph">$9 = 7 + 2×12$</p>
/// <p class="euler__paragraph">$15 = 7 + 2×22$</p>
/// <p class="euler__paragraph">$21 = 3 + 2×32$</p>
/// <p class="euler__paragraph">$25 = 7 + 2×32$</p>
/// <p class="euler__paragraph">$27 = 19 + 2×22$</p>
/// <p class="euler__paragraph">$33 = 31 + 2×12$</p>
/// <br>
/// <p class="euler__paragraph">It turns out that the conjecture was false.</p>
/// <br>
/// <p class="euler__paragraph">What is the smallest odd composite that cannot be written as the sum of a prime and twice a square?</p></div>

/// challengeSeed:
function euler46() {
  // Good luck!
  return true;
}

euler46();

/// solutions:
function euler46() {
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

  function isSquare(num) {
    return Math.sqrt(num) % 1 === 0;
  }

  // construct a list of prime numbers
  const primes = [];
  for (let i = 2; primes.length < 1000; i++) {
    if (isPrime(i)) primes.push(i);
  }

  let num = 3;
  let answer;
  while (!answer) {
    num += 2;
    if (!isPrime(num)) {
      let found = false;
      for (let primeI = 0; primeI < primes.length && !found; primeI++) {
        const square = (num - primes[primeI]) / 2;
        if (isSquare(square)) {
          found = true;
          break;
        }
      }
      if (!found) answer = num;
    }
  }
  return answer;
}

/// tail:

/// tests:
assert(typeof euler46 === 'function', 'message: <code>euler46()</code> is a function.');
assert.strictEqual(euler46(), 5777, 'message: <code>euler46()</code> should return 5777.');
/// id: 5900f39a1000cf542c50fead
