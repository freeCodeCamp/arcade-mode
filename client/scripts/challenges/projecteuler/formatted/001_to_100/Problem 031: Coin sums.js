
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 31: Coin sums
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">In England the currency is made up of pound, £, and pence, p, and there are eight coins in general circulation:</p>
/// <p class="euler__paragraph">1p, 2p, 5p, 10p, 20p, 50p, £1 (100p) and £2 (200p).</p>
/// <br>
/// <p class="euler__paragraph">It is possible to make £2 in the following way:</p>
/// <p class="euler__paragraph">1×£1 + 1×50p + 2×20p + 1×5p + 1×2p + 3×1p</p>
/// <br>
/// <p class="euler__paragraph">How many different ways can £2 be made using any number of coins?</p></div>

/// challengeSeed:
function euler31() {
  // Good luck!
  return true;
}

euler31();

/// solutions:
function euler31() {
  let count = 0;
  const requiredTotal = 200;
  for (let a = requiredTotal; a >= 0; a -= 200) {
    for (let b = a; b >= 0; b -= 100) {
      for (let c = b; c >= 0; c -= 50) {
        for (let d = c; d >= 0; d -= 20) {
          for (let e = d; e >= 0; e -= 10) {
            for (let f = e; f >= 0; f -= 5) {
              for (let g = f; g >= 0; g -= 2) {
                count++;
              }
            }
          }
        }
      }
    }
  }
  return count;
}

/// tail:

/// tests:
assert(typeof euler31 === 'function', 'message: <code>euler31()</code> is a function.');
assert.strictEqual(euler31(), 73682, 'message: <code>euler31()</code> should return 73682.');
/// id: 5900f38b1000cf542c50fe9e
