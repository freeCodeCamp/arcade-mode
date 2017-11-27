
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 16: Power digit sum
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">2<sup>15</sup> = 32768 and the sum of its digits is:</p>
/// <p class="euler__paragraph">3 + 2 + 7 + 6 + 8 = 26.</p>
/// <p class="euler__paragraph">What is the sum of the digits of the number 2<sup>1000</sup>?</p></div>

/// challengeSeed:
function euler16() {
  // Good luck!
  return true;
}

euler16();

/// solutions:
function euler16() {
  const exponent = 1000;
  // digitArr will hold the digits of the exponents
  const digitArr = [1];
  for (let i = 0; i < exponent; i++) {
    // Each loop multiplies the digits by 2 and carries
    // the result to the next index in the array

    // update final digit
    const len = digitArr.length;
    const lastNum = digitArr[len - 1];
    if (lastNum >= 5) {
      digitArr.push(1);
      digitArr[len - 1] = (lastNum * 2) - 10;
    } else {
      digitArr[len - 1] *= 2;
    }

    // Update remaining digits
    for (let j = len - 2; j >= 0; j--) {
      const digit = digitArr[j];
      if (digit >= 5) {
        digitArr[j + 1] += 1;
        digitArr[j] = (digit * 2) - 10;
      } else {
        digitArr[j] *= 2;
      }
    }
  }
  return digitArr.reduce((sum, digit) => {
    return sum + digit;
  });
}

/// tail:

/// tests:
assert(typeof euler16 === 'function', 'message: <code>euler16()</code> is a function.');
assert.strictEqual(euler16(), 1366, 'message: <code>euler16()</code> should return 1366.');
/// id: 5900f37d1000cf542c50fe8f
