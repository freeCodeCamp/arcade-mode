
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 4: Largest palindrome product
/// type: project-euler

/// categories:
/// math

/// difficulty: 1

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.</p>
/// <p class="euler__paragraph">Find the largest palindrome made from the product of two 3-digit numbers.</p></div>

/// challengeSeed:
function euler4() {
  // Good luck!
  return true;
}

euler4();

/// solutions:
function euler4() {
  function isPalindrome(num) {
    const numStr = num.toString();
    for (let i = 0; i < numStr.length / 2; i++) {
      if (numStr[i] !== numStr[numStr.length - 1 - i]) return false;
    }
    return true;
  }

  let largestPalindrome = 0;
  for (let num1 = 999; num1 > 0; num1--) {
    let num2 = num1 - 1;
    while (num1 * num2 > largestPalindrome) {
      if (isPalindrome(num1 * num2)) {
        largestPalindrome = num1 * num2;
      }
      num2--;
    }
  }
  return largestPalindrome;
}

/// tail:

/// tests:
assert(typeof euler4 === 'function', 'message: <code>euler4()</code> is a function.');
assert.strictEqual(euler4(), 906609, 'message: <code>euler4()</code> should return 906609.');
/// id: 5900f3701000cf542c50fe83
