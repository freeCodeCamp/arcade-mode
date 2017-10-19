
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 5: Smallest multiple
/// type: project-euler

/// categories:
/// math

/// difficulty: 1

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.</p>
/// <p class="euler__paragraph">What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?</p></div>

/// challengeSeed:
// noprotect
function euler5() {
  // Good luck!
  return true;
}

euler5();

/// solutions:
// noprotect
function euler5() {
  const num = 20;
  let multiple = num;
  let smallestMultiple;
  while (!smallestMultiple) {
    let provedWrong = false;
    for (let i = num; i > 1; i--) {
      if (multiple % i !== 0) {
        // multiple is not a multiple
        provedWrong = true;
        break;
      }
    }
    if (!provedWrong) {
      smallestMultiple = multiple;
    }
    multiple += num;
  }
  return smallestMultiple;
}

/// tail:

/// tests:
assert(typeof euler5 === 'function', 'message: <code>euler5()</code> is a function.');
assert.strictEqual(euler5(), 232792560, 'message: <code>euler5()</code> should return 232792560.');
/// id: 5900f3711000cf542c50fe84
