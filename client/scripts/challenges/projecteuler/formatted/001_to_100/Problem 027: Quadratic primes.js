
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 27: Quadratic primes
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">Euler discovered the remarkable quadratic formula:</p>
/// <br>
/// <p class="euler__paragraph">$n^2 + n + 41$</p>
/// <br>
/// <p class="euler__paragraph">It turns out that the formula will produce 40 primes for the consecutive integer values $0 \le n \le 39$. However, when $n = 40$, $40^2 + 40 + 41 = 40(40 + 1) + 41$ is divisible by 41, and certainly when $n = 41$, $41^2 + 41 + 41$ is clearly divisible by 41.</p>
/// <br>
/// <p class="euler__paragraph">The incredible formula $n^2 - 79n + 1601$ was discovered, which produces 80 primes for the consecutive values $0 \le n \le 79$. The product of the coefficients, −79 and 1601, is −126479.</p>
/// <br>
/// <p class="euler__paragraph">Considering quadratics of the form:</p>
/// <br>
/// <p class="euler__paragraph">$n^2 + an + b$, where $|a| < 1000$ and $|b| \le 1000$</p>
/// <br>
/// <p class="euler__paragraph"><small>where $|n|$ is the modulus/absolute value of $n$<br>e.g. $|11| = 11$ and $|-4| = 4$</small></p>
/// <br>
/// <p class="euler__paragraph">Find the product of the coefficients, $a$ and $b$, for the quadratic expression that produces the maximum number of primes for consecutive values of $n$, starting with $n = 0$.</p></div>

/// challengeSeed:
// noprotect
function euler27() {
  // Good luck!
  return true;
}

euler27();

/// solutions:
// noprotect
function euler27() {
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

  function findPrimes(lim) {
    const primes = [];
    for (let num = 1; num < lim; num++) {
      if (isPrime(num)) {
        primes.push(num);
      }
    }
    return primes;
  }

  const limitA = 1000;
  const limitB = 1000;

  const primes = findPrimes(limitA > limitB ? limitA : limitB);
  const negativePrimes = [];
  primes.forEach(prime => {
    negativePrimes.push(prime);
    negativePrimes.push(-prime);
  });

  let maxN = 0;
  let maxA = 0;
  let maxB = 0;
  for (let i = 0; i < negativePrimes.length && negativePrimes[i] < limitA; i++) {
    const a = negativePrimes[i];
    for (let j = 0; j < negativePrimes.length && negativePrimes[j] <= limitB; j++) {
      const b = negativePrimes[j];
      let n = 0;
      while (isPrime((n ** 2) + (a * n) + b)) {
        n++;
      }
      if (n > maxN) {
        maxN = n;
        maxA = a;
        maxB = b;
      }
    }
  }
  return maxA * maxB;
}

/// tail:

/// tests:
assert(typeof euler27 === 'function', 'message: <code>euler27()</code> is a function.');
assert.strictEqual(euler27(), -59231, 'message: <code>euler27()</code> should return -59231.');
/// id: 5900f3871000cf542c50fe9a
