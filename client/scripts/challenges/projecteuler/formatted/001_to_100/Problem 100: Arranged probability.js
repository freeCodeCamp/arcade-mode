/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-mixed-operators: 0 */

const assert = require('chai').assert;

/// title: Problem 100: Arranged probability
/// type: project-euler

/// categories:
/// math

/// difficulty: 3

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">If a box contains twenty-one coloured discs, composed of fifteen blue discs and six red discs, and two discs were taken at random, it can be seen that the probability of taking two blue discs, P(BB) = (15/21)×(14/20) = 1/2.</p>
/// <p class="euler__paragraph">The next such arrangement, for which there is exactly 50% chance of taking two blue discs at random, is a box containing eighty-five blue discs and thirty-five red discs.</p>
/// <p class="euler__paragraph">By finding the first arrangement to contain over 10<sup>12</sup> = 1,000,000,000,000 discs in total, determine the number of blue discs that the box would contain.</p></div>

/// challengeSeed:
function euler100() {
  // Good luck!
  return 1;
}

euler100();

/// solutions:
function euler100() {
  const x0 = 3;
  const y0 = 1;
  let x = 3;
  let y = 1;

  while (true) {
    const sqrt = Math.sqrt(y * y * 8 + 1);
    if (sqrt % 2 === 1) {
      const blue = Math.floor((sqrt + 1) / 2 + y);
      if (blue + y > 10 ** 12) {
        return blue;
      }
      const nextX = x * x0 + y * y0 * 8;
      const nextY = x * y0 + y * x0;
      x = nextX;
      y = nextY;
    }
  }
}

/// tail:
const result = 756872327473;

/// tests:
assert(typeof euler100 === 'function', 'message: <code>euler100()</code> is a function.');
assert.strictEqual(euler100(), 756872327473, 'message: <code>euler100()</code> should return 756872327473.');
/// id: 5900f3d01000cf542c50fee3
