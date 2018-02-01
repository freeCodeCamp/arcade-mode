
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 36: Double-base palindromes
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The decimal number, 585 = 1001001001<sub>2</sub> (binary), is palindromic in both bases.</p>
/// <br>
/// <p class="euler__paragraph">Find the sum of all numbers, less than one million, which are palindromic in base 10 and base 2.</p>
/// <br>
/// <p class="euler__paragraph">(Please note that the palindromic number, in either base, may not include leading zeros.)</p></div>

/// challengeSeed:
// noprotect
function euler36() {
  // Good luck!
  return true;
}

euler36();

/// solutions:
// noprotect
function euler36() {
  function isPalindromic(num) {
    const numStr = num.toString();
    for (let i = 0; i < numStr.length / 2; i++) {
      if (numStr[i] !== numStr[numStr.length - 1 - i]) return false;
    }
    return true;
  }

  function getBinaryNumber(num) {
    let binaryNum = '';
    let largestPower = 1;
    while (largestPower * 2 <= num) {
      largestPower *= 2;
    }
    let currNum = num;
    while (largestPower >= 1) {
      if (largestPower <= currNum) {
        binaryNum += '1';
        currNum -= largestPower;
      } else {
        binaryNum += '0';
      }
      largestPower /= 2;
    }
    return binaryNum;
  }

  let sum = 0;
  for (let i = 1; i < 1000000; i++) {
    if (isPalindromic(i) && isPalindromic(getBinaryNumber(i))) {
      sum += i;
    }
  }
  return sum;
}

/// tail:

/// tests:
assert(typeof euler36 === 'function', 'message: <code>euler36()</code> is a function.');
assert.strictEqual(euler36(), 872187, 'message: <code>euler36()</code> should return 872187.');
/// id: 5900f3901000cf542c50fea3
