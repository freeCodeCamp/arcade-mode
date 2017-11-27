
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 15: Lattice paths
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.</p>
/// <p class="euler__paragraph"></p>
/// <p class="euler__paragraph"></p>
/// <p class="euler__paragraph">How many such routes are there through a 20×20 grid?</p></div>

/// challengeSeed:
function euler15() {
  // Good luck!
  return true;
}

euler15();

/// solutions:
function euler15() {
  const size = [20, 20];
  // create zero matrix
  // The number of rows and columns needs to be one more
  // than the number of squares in each row/column
  const row = new Array(size[0] + 1).fill(0);
  const paths = new Array(size[1] + 1).fill(row);

  for (let i = size[0]; i >= 0; i--) {
    for (let j = size[1]; j >= 0; j--) {
      if (i === size[0] || j === size[1]) {
        // cell is on the bottom or right edge of the matrix
        paths[i][j] = 1;
      } else {
        paths[i][j] = paths[i + 1][j] + paths[i][j + 1];
      }
    }
  }
  return paths[0][0];
}

/// tail:

/// tests:
assert(typeof euler15 === 'function', 'message: <code>euler15()</code> is a function.');
assert.strictEqual(euler15(), 137846528820, 'message: <code>euler15()</code> should return 137846528820.');
/// id: 5900f37b1000cf542c50fe8e
