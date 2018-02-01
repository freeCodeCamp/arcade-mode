
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 35: Circular primes
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The number, 197, is called a circular prime because all rotations of the digits: 197, 971, and 719, are themselves prime.</p>
/// <br>
/// <p class="euler__paragraph">There are thirteen such primes below 100: 2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, and 97.</p>
/// <br>
/// <p class="euler__paragraph">How many circular primes are there below one million?</p></div>

/// challengeSeed:
// noprotect
function euler35() {
  // Good luck!
  return true;
}

euler35();

/// solutions:
// noprotect
function euler35() {
  function eSieve(max) {
    // Find primes using the Sieve of Eratosthenes
    const array = [];
    const upperLimit = Math.sqrt(max);
    const primes = [];

    for (let i = 0; i < max; i++) {
      array.push(true);
    }

    for (let i = 2; i <= upperLimit; i++) {
      if (array[i]) {
        for (let j = i * i; j < max; j += i) {
          array[j] = false;
        }
      }
    }

    for (let i = 2; i < max; i++) {
      if (array[i]) {
        primes.push(i);
      }
    }
    return primes;
  }

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

  function getRotations(num) {
    let numStr = num.toString();
    const rotations = [];
    for (let i = 0; i < numStr.length; i++) {
      rotations.push(parseInt(numStr, 10));
      numStr = numStr.slice(1) + numStr[0];
    }
    return rotations;
  }

  function canHavePrimeRotations(num) {
    if (num === 5 || num === 2) return true;
    const numStr = num.toString();
    for (let i = 0; i < numStr.length; i++) {
      const c = numStr[i];
      if ((c % 2 === 0 || c % 5 === 0)) return false;
    }
    return true;
  }

  const limit = 1000000;
  // create array of prime numbers below limit
  const primes = eSieve(limit);

  let circularPrimesCount = 0;
  for (let i = 0; i < primes.length; i++) {
    if (canHavePrimeRotations(primes[i])) {
      const rotations = getRotations(primes[i]);
      let allArePrime = true;
      for (let j = 0; j < rotations.length; j++) {
        if (!isPrime(rotations[j])) allArePrime = false;
      }
      if (allArePrime) circularPrimesCount++;
    }
  }
  return circularPrimesCount;
}

/// tail:

/// tests:
assert(typeof euler35 === 'function', 'message: <code>euler35()</code> is a function.');
assert.strictEqual(euler35(), 55, 'message: <code>euler35()</code> should return 55.');
/// id: 5900f38f1000cf542c50fea2
