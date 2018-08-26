
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Problem 55: Lychrel numbers
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">If we take 47, reverse and add, 47 + 74 = 121, which is palindromic.</p>
/// <p class="euler__paragraph">Not all numbers produce palindromes so quickly. For example,</p>
/// <p class="euler__paragraph">349 + 943 = 1292,</p>
/// <p class="euler__paragraph">1292 + 2921 = 4213</p>
/// <p class="euler__paragraph">4213 + 3124 = 7337</p>
/// <p class="euler__paragraph">That is, 349 took three iterations to arrive at a palindrome.</p>
/// <p class="euler__paragraph">Although no one has proved it yet, it is thought that some numbers, like 196, never produce a palindrome. A number that never forms a palindrome through the reverse and add process is called a Lychrel number. Due to the theoretical nature of these numbers, and for the purpose of this problem, we shall assume that a number is Lychrel until proven otherwise. In addition you are given that for every number below ten-thousand, it will either (i) become a palindrome in less than fifty iterations, or, (ii) no one, with all the computing power that exists, has managed so far to map it to a palindrome. In fact, 10677 is the first number to be shown to require over fifty iterations before producing a palindrome: 4668731596684224866951378664 (53 iterations, 28-digits).</p>
/// <p class="euler__paragraph">Surprisingly, there are palindromic numbers that are themselves Lychrel numbers; the first example is 4994.</p>
/// <p class="euler__paragraph">How many Lychrel numbers are there below ten-thousand?</p>
/// <p class="euler__paragraph">NOTE: Wording was modified slightly on 24 April 2007 to emphasise the theoretical nature of Lychrel numbers.</p></div>

/// challengeSeed:
function euler55() {
  // Good luck!
  return true;
}

euler55();

/// solutions:
function euler55() {

  const numReverse = function(num) {
    return Number(num.toString().split('').reverse().join(''));
  };
  
  const isPalin = function(num) {
    if (numReverse(num) === num) {
      return true;
    }
    return false;
  };
  
  const countLychrel = function(size) {
    let total = 0;
  
    for (let i = 1; i < size; i++) {
      // Keep track of number of iterations took to arrive at the palindrome
      let loopCount = 1;
      let sum = i;

      while (loopCount < 50) {
        sum = sum + numReverse(sum);
        // Not a Lychrel number if sum iterates to a palindrome
        if (isPalin(sum)) { 
          break;
        } else {
          loopCount++;
        }
      }
      // 50 iterations over; count `i` as a Lychrel number
      if (loopCount === 50) {
        total++;
      }
    }
    
    return total;
  }

  return countLychrel(10000);
}

/// tail:
const replaceThis = 3;

/// tests:
assert(typeof euler55 === 'function', 'message: <code>euler55()</code> is a function.');
assert.strictEqual(euler55(), 249, 'message: <code>euler55()</code> should return 249.');
/// id: 5900f3a31000cf542c50feb6
