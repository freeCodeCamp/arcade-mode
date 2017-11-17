
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 28: Number spiral diagonals
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:</p>
/// <div class="euler__pre-wrap"><pre class="euler__pre">
/// <span class="euler__text--bold" style="color:#ff0000;">21</span> 22 23 24 <span class="euler__text--bold" style="color:#ff0000;">25</span>
/// 20  <span class="euler__text--bold" style="color:#ff0000;">7</span>  8  <span class="euler__text--bold" style="color:#ff0000;">9</span> 10
/// 19  6  <span class="euler__text--bold" style="color:#ff0000;">1</span>  2 11
/// 18  <span class="euler__text--bold" style="color:#ff0000;">5</span>  4  <span class="euler__text--bold" style="color:#ff0000;">3</span> 12
/// <span class="euler__text--bold" style="color:#ff0000;">17</span> 16 15 14 <span class="euler__text--bold" style="color:#ff0000;">13</span>
/// </pre></div>
/// <p class="euler__paragraph">It can be verified that the sum of the numbers on the diagonals is 101.</p>
/// <br>
/// <p class="euler__paragraph">What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?</p></div>

/// challengeSeed:
function euler28() {
  // Good luck!
  return true;
}

euler28();

/// solutions:
function euler28() {
  const spiralSize = 1001;
  if (spiralSize % 2 === 0) {
    return -1;
  }
  if (spiralSize === 1) {
    return 1;
  }
  let sum = 1;
  const cornerNums = [3, 5, 7, 9];
  for (let layer = 3; layer <= spiralSize; layer += 2) {
    sum += cornerNums.reduce((element, cornerSum) =>
      cornerSum + element, 0);
    cornerNums.forEach((num, i) => {
      cornerNums[i] += ((layer - 1) * (3 - i)) + ((layer + 1) * (i + 1));
    });
  }
  return sum;
}

/// tail:

/// tests:
assert(typeof euler28 === 'function', 'message: <code>euler28()</code> is a function.');
assert.strictEqual(euler28(), 669171001, 'message: <code>euler28()</code> should return 669171001.');
/// id: 5900f3881000cf542c50fe9b
