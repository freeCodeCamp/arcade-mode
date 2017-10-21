
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 23: Non-abundant sums
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">A perfect number is a number for which the sum of its proper divisors is exactly equal to the number. For example, the sum of the proper divisors of 28 would be 1 + 2 + 4 + 7 + 14 = 28, which means that 28 is a perfect number.</p>
/// <p class="euler__paragraph">A number n is called deficient if the sum of its proper divisors is less than n and it is called abundant if this sum exceeds n.</p>
/// <p class="euler__paragraph"></p>
/// <p class="euler__paragraph">As 12 is the smallest abundant number, 1 + 2 + 3 + 4 + 6 = 16, the smallest number that can be written as the sum of two abundant numbers is 24. By mathematical analysis, it can be shown that all integers greater than 28123 can be written as the sum of two abundant numbers. However, this upper limit cannot be reduced any further by analysis even though it is known that the greatest number that cannot be expressed as the sum of two abundant numbers is less than this limit.</p>
/// <p class="euler__paragraph">Find the sum of all the positive integers which cannot be written as the sum of two abundant numbers.</p></div>

/// challengeSeed:
// noprotect
function euler23() {
  // Good luck!
  return true;
}

euler23();

/// solutions:
// noprotect
function euler23() {
  function sumOfDivisors(num) {
    let i = 2;
    let sum = 1;
    while (i <= num ** 0.5) {
      if (num % i === 0) {
        sum += i;
        if (i !== num ** 0.5) {
          sum += num / i;
        }
      }
      i += 1;
    }
    return sum;
  }

  function findAbundantNumbers(limit) {
    const abundantNumbers = [];
    for (let i = 1; i < limit; i++) {
      if (sumOfDivisors(i) > i) {
        abundantNumbers.push(i);
      }
    }
    return abundantNumbers;
  }

  const limit = 28123;
  const abundantNumbers = findAbundantNumbers(limit);

  // find numbers that aren't sums of abundant number
  const notSumsBoolArr = new Array(limit).fill(false);
  for (let i = 0; i < abundantNumbers.length; i++) {
    for (let j = i; j < abundantNumbers.length; j++) {
      const sum = abundantNumbers[i] + abundantNumbers[j];
      if (sum >= limit) {
        break;
      }
      notSumsBoolArr[sum] = true;
    }
  }
  const notSums = [];
  for (let i = 1; i < limit; i++) {
    if (!notSumsBoolArr[i]) {
      notSums.push(i);
    }
  }

  // sum the notSums array

  let sum = 0;
  notSums.forEach(element => {
    sum += element;
  });
  return sum;
}

/// tail:

/// tests:
assert(typeof euler23 === 'function', 'message: <code>euler23()</code> is a function.');
assert.strictEqual(euler23(), 4179871, 'message: <code>euler23()</code> should return 4179871.');
/// id: 5900f3831000cf542c50fe96
