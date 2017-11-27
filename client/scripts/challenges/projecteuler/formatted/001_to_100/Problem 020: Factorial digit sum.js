

/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 20: Factorial digit sum
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler">
/// <p class="euler__paragraph"><span class="euler__text--italic">n</span>! means <span class="euler__text--italic">n</span> × (<span class="euler__text--italic">n</span> − 1) × ... × 3 × 2 × 1</p>
/// <br>
/// <p class="euler__paragraph">For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,</p>
/// <p class="euler__paragraph">and the sum of the digits in the number 10! is:</p>
/// <p class="euler__paragraph">3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.</p>
/// <br>
/// <p class="euler__paragraph">Find the sum of the digits in the number 100!</p></div>

/// challengeSeed:
function euler20() {
  // Good luck!
  return true;
}

euler20();

/// solutions:
function euler20() {
  // 100! is too large to store acurately as an integer.
  // To overcome this, this solution uses an array of digits
  // to represent the large number accurately.

  function multiplyDigitArray(digitArr, multiplier) {
    function carry(arr, index, num) {
      // carries higher multiples of 10 to the next index
      const len = arr.length;
      const ones = num % 10;
      const tens = Math.floor((num % 100) / 10);
      const hundreds = Math.floor(num / 100);
      arr[index] = ones;
      if (tens > 0 || hundreds > 0) {
        if (index + 1 >= len) {
          // need to extend arr
          arr.push(tens);
        } else {
          carry(arr, index + 1, tens + arr[index + 1]);
        }
      }
      if (hundreds > 0) {
        if (index + 2 >= len) {
          // need to extend arr
          arr.push(hundreds);
        } else {
          carry(arr, index + 2, hundreds + arr[index + 2]);
        }
      }
    }

    // Update digits starting with most significant
    const len = digitArr.length;
    for (let i = len - 1; i >= 0; i--) {
      const digit = digitArr[i];
      const product = digit * multiplier;
      carry(digitArr, i, product);
    }
    return digitArr;
  }

  function factorial(num) {
    // returns an array with the digits of the factorial
    if (num === 1) {
      return [1];
    }
    return multiplyDigitArray(factorial(num - 1), num);
  }

  const factorialDigitArr = factorial(100);
  return factorialDigitArr.reduce((sum, digit) => {
    return sum + digit;
  });
}

/// tail:
const replaceThis = 3;

/// tests:
assert(typeof euler20 === 'function', 'message: <code>euler20()</code> is a function.');
assert.strictEqual(euler20(), 648, 'message: <code>euler20()</code> should return 648.');
/// id: 5900f3801000cf542c50fe93
