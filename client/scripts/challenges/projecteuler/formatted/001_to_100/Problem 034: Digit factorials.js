
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 34: Digit factorials
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">$145$ is a curious number, as $1! + 4! + 5! = 1 + 24 + 120 = 145$.</p>
/// <br>
/// <p class="euler__paragraph">Find the sum of all numbers which are equal to the sum of the factorial of their digits.</p>
/// <br>
/// <p class="euler__paragraph"><small>Note: as $1! = 1$ and $2! = 2$ are not sums they are not included.</small></p></div>

/// challengeSeed:
// noprotect
function euler34() {
  // Good luck!
  return true;
}

euler34();

/// solutions:
// noprotect
function euler34() {
  function factorial(num) {
    if (num === 0 || num === 1) {
      return 1;
    }
    return factorial(num - 1) * num;
  }

  // create factorial lookup
  const factorialHash = {};
  for (let i = 0; i < 10; i++) {
    factorialHash[i] = factorial(i);
  }

  let sum = 0;
  // finding the upper limit:
  // n * 9! = {n-digit-number}
  // for n > 7, we get a number with less than n digits
  // so the upper limit = 7 * 9! = 2540160
  for (let i = 10; i < 2540160; i++) {
    let currNum = i;
    let sumOfFactorialOfDigits = 0;
    while (currNum > 0) {
      sumOfFactorialOfDigits += factorialHash[currNum % 10];
      currNum = Math.floor(currNum / 10);
    }
    if (sumOfFactorialOfDigits === i) {
      sum += i;
    }
  }
  return sum;
}

/// tail:

/// tests:
assert(typeof euler34 === 'function', 'message: <code>euler34()</code> is a function.');
assert.strictEqual(euler34(), 40730, 'message: <code>euler34()</code> should return 40730.');
/// id: 5900f38e1000cf542c50fea1
