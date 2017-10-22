
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 14: Longest Collatz sequence
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The following iterative sequence is defined for the set of positive integers:</p>
/// <p class="euler__paragraph">n → n/2 (n is even)n → 3n + 1 (n is odd)</p>
/// <p class="euler__paragraph">Using the rule above and starting with 13, we generate the following sequence:</p>
/// <p class="euler__paragraph">13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1</p>
/// <p class="euler__paragraph">It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.</p>
/// <p class="euler__paragraph">Which starting number, under one million, produces the longest chain?</p>
/// <p class="euler__paragraph">NOTE: Once the chain starts the terms are allowed to go above one million.</p></div>

/// challengeSeed:
// noprotect
function euler14() {
  // Good luck!
  return true;
}

euler14();

/// solutions:
// noprotect
function euler14() {
  function generateSequence(startNum) {
    const sequence = [startNum];
    let currNum = startNum;
    while (currNum !== 1) {
      if (currNum % 2 === 0) {
        currNum /= 2;
      } else {
        currNum = (3 * currNum) + 1;
      }
      sequence.append(currNum);
    }
    return sequence;
  }

  const limit = 1000000;
  const sequenceLengthStore = { 1: 1 };
  let longestSeq = 0;
  let longestStartNum = 0;
  for (let i = 2; i < limit; i++) {
    let currentNumber = i;
    let count = 1;
    while (!Object.prototype.hasOwnProperty.call(sequenceLengthStore, i)) {
      // Colatz operations
      if (currentNumber % 2 === 0) {
        currentNumber /= 2;
      } else {
        currentNumber = (3 * currentNumber) + 1;
      }

      // Check if the new current number has already been calculated
      if (Object.prototype.hasOwnProperty.call(sequenceLengthStore, currentNumber)) {
        const sequenceLength = sequenceLengthStore[currentNumber] + count;
        sequenceLengthStore[i] = sequenceLength;
        if (sequenceLength > longestSeq) {
          longestSeq = sequenceLength;
          longestStartNum = i;
        }
      }
      count += 1;
    }
  }
  return longestStartNum;
}

/// tail:

/// tests:
assert(typeof euler14 === 'function', 'message: <code>euler14()</code> is a function.');
assert.strictEqual(euler14(), 837799, 'message: <code>euler14()</code> should return 837799.');
/// id: 5900f37a1000cf542c50fe8d
