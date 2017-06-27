/// WIP
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Towers of Hanoi
/// type: rosetta-code

/// categories:
/// Recursion
/// Games

/// difficulty: 2

/// benchmark:
// replaceWithActualFunctionHere;

/// description:
/// <div class="rosetta">
/// <dl class="rosetta__description-list">
///     <dt class="rosetta__description-title">Task:</dt>
/// </dl>
/// <p class="rosetta__paragraph">Solve the <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Towers_of_Hanoi" title="wp: Towers_of_Hanoi">Towers of Hanoi</a>  problem.</p>
/// <p class="rosetta__paragraph">
/// Your solution should accept the number of discs as the first parameters, and
/// three string used to identify each of the three stacks of discs, for example
/// <code>towerOfHanoi(4, 'A', 'B', 'C')</code>. The function should return an
/// array of arrays containing the list of moves, source -> destination. For
/// example, the array <code>[['A', 'C'], ['B', 'A']]</code> indicates that the
/// 1st move was to move a disc from stack A to C, and the 2nd move was to move a
/// disc from stack B to A.
/// </p>
/// </div>

/// challengeSeed:
function towerOfHanoi (n, a, b, c) {
  // Good luck!
  return [[]];
}

/// solutions:
function towerOfHanoi(n, a, b, c) {
  const res = [];
  towerOfHanoiHelper(n, a, c, b, res);
  return res;
}

function towerOfHanoiHelper(n, a, b, c, res) {
  if (n > 0) {
    towerOfHanoiHelper(n - 1, a, c, b, res);
    res.push([a, c]);
    towerOfHanoiHelper(n - 1, b, a, c, res);
  }
}

/// tail:
const res3 = towerOfHanoi(3, 'A', 'B', 'C');

const res5 = towerOfHanoi(5, 'X', 'Y', 'Z');

const res7 = towerOfHanoi(7, 'A', 'B', 'C');

/// tests:
assert(typeof towerOfHanoi === 'function', 'message: <code>towerOfHanoi</code> is a function.');
assert(res3.length === 7, 'message: <code>towerOfHanoi(3, ...)</code> shoul return 7 moves.');
assert.deepEqual(res5[9], ['Y', 'X'], 'message: <code>towerOfHanoi(5, "X", "Y", "Z")</code> 10th move should be Y -> X.');
assert.deepEqual(towerOfHanoi(7, 'A', 'B', 'C'), res7, 'message: <code>towerOfHanoi(7, "A", "B", "C")</code> not correct.');
/// id: 5951ed8945deab770972ae56
