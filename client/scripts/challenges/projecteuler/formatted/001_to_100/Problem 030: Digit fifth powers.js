
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 30: Digit fifth powers
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:</p>
/// <p class="euler__paragraph">$1634 = 1^4 + 6^4 + 3^4 + 4^4$</p>
/// <p class="euler__paragraph">$8208 = 8^4 + 2^4 + 0^4 + 8^4$</p>
/// <p class="euler__paragraph">$9474 = 9^4 + 4^4 + 7^4 + 4^4$</p>
/// <p class="euler__paragraph">As $1 = 1^4$ is not a sum it is not included.</p>
/// <p class="euler__paragraph">The sum of these numbers is: $1634 + 8208 + 9474 = 19316$</p>
/// <br>
/// <p class="euler__paragraph">Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.</p></div>

/// challengeSeed:
// noprotect
function euler30() {
  // Good luck!
  return true;
}

euler30();

/// solutions:
// noprotect
function euler30() {
  /*
    The upper bound is found by evaluating:
    n*9^5 = {nDigitNumber}
    When n < 6, we get a number with more than n digits.
    When n = 6, we get a number with 6 digits. 6*9^5 = 354,294
    Therefore, we can't get a number greater than 354,294 with
    6 digits.
    When n > 6, we get a number with less than n digits.
    Therefore, we can't get any solutions for n > 6.
    Therefore, 354,294 must be our limit.
  */
  let sum = 0;
  for (let i = 2; i <= 354294; i++) {
    let sumOfFifthPowers = 0;
    let currNum = i;
    while (sumOfFifthPowers <= i && currNum > 0) {
      sumOfFifthPowers += (currNum % 10) ** 5;
      currNum = Math.floor(currNum / 10);
    }
    if (sumOfFifthPowers === i) {
      sum += sumOfFifthPowers;
    }
  }
  return sum;
}

/// tail:

/// tests:
assert(typeof euler30 === 'function', 'message: <code>euler30()</code> is a function.');
assert.strictEqual(euler30(), 443839, 'message: <code>euler30()</code> should return 443839.');
/// id: 5900f38a1000cf542c50fe9d
