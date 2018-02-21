
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 52: Permuted multiples
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">It can be seen that the number, 125874, and its double, 251748, contain exactly the same digits, but in a different order.</p>
/// <p class="euler__paragraph">Find the smallest positive integer, x, such that 2x, 3x, 4x, 5x, and 6x, contain the same digits.</p></div>

/// challengeSeed:
function euler52() {
  // Good luck!
  return true;
}

euler52();

/// solutions:
// noprotect
function euler52() {
  function isSameDigits(numbers) {
    // netDigits has 10 numbers for digits 0-9 to count each digit
    const netDigits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 1; i < numbers.length; i += 1) {
      // compare x and each multiple
      let x = numbers[0];
      let xn = numbers[i];
      // count the number of each digit in x and xn
      while (x !== 0) {
        // increment for each digit found in x and decrement for digit found in xn
        // ex. 12 and 21 after first loop: [0, 1, -1, ...]
        // and after second loop [0, 0 (1-1), 0(-1 + 1), ...]
        netDigits[x % 10] += 1;
        netDigits[xn % 10] -= 1;
        x = Math.floor(x / 10);
        xn = Math.floor(xn / 10);
      }
      // if the sum of netDigits is not zero, x and xn do not have the same digits
      for (let j = 0; j < 10; j += 1) {
        if (netDigits[j] !== 0) {
          return false;
        }
      }
    }
    return true;
  }
  function main(limit) {
    let x;// for storing x and its multiples
    let x2;
    let x3;
    let x4;
    let x5;
    let x6;
    for (let i = 100; i < limit; i += 1) {
      x = i; // generate x and its multiples
      x2 = 2 * i;
      x3 = 3 * i;
      x4 = 4 * i;
      x5 = 5 * i;
      x6 = 6 * i;
      // check if all 6 multiples contain the same digits
      if (isSameDigits([x, x2, x3, x4, x5, x6])) {
        return x;
      }
    }
    return 'Not found within the limit';
  }
  return main(1000000000);
}

/// tail:

/// tests:
assert(typeof euler52 === 'function', 'message: <code>euler52()</code> is a function.');
assert.strictEqual(euler52(), 142857, 'message: <code>euler52()</code> should return 142857.');
/// id: 5900f3a01000cf542c50feb3
