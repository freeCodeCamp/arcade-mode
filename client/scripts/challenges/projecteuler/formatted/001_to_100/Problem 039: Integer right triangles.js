
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 39: Integer right triangles
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">If $p$ is the perimeter of a right angle triangle with integral length sides, ${a,b,c}$, there are exactly three solutions for $p = 120$.</p>
/// <br>
/// <p class="euler__paragraph">${20,48,52}$, ${24,45,51}$, ${30,40,50}$</p>
/// <br>
/// <p class="euler__paragraph">For which value of $p ≤ 1000$, is the number of solutions maximised?</p></div>

/// challengeSeed:
function euler39() {
  // Good luck!
  return true;
}

euler39();

/// solutions:
function euler39() {
  function findSideLengthOptions(p) {
    const options = [];
    for (let a = 1; a < p / 2; a++) {
      // Solving the equations for b and c:
      // a + b + c = p
      // a^2 + b^2 = c^2
      // gives the following sollutions
      const b = (p * ((a - p) / 2)) / (a - p);
      const c = (((-1 * (a ** 2)) + (p * a)) - ((p ** 2) / 2)) / (a - p);
      if (b % 1 === 0 && c % 1 === 0) {
        options.push([a, b, c]);
      }
    }
    return options;
  }

  let maxNum;
  let maxOptions = 0;
  for (let i = 0; i <= 1000; i++) {
    const len = findSideLengthOptions(i).length;
    if (len > maxOptions) {
      maxNum = i;
      maxOptions = len;
    }
  }
  return maxNum;
}

/// tail:

/// tests:
assert(typeof euler39 === 'function', 'message: <code>euler39()</code> is a function.');
assert.strictEqual(euler39(), 840, 'message: <code>euler39()</code> should return 840.');
/// id: 5900f3931000cf542c50fea6
