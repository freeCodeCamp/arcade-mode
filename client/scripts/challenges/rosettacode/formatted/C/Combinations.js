
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Combinations
/// type: rosetta-code

/// categories:


/// difficulty: 3

/// benchmark:
combinations(4, 6);

/// description:
/// <div class="rosetta">
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Given non-negative integers  <big> <span class="rosetta__text--bold">m</span> </big>  and  <big> <span class="rosetta__text--bold">n</span></big>,  generate all size  <big> <span class="rosetta__text--bold">m</span> </big>  <a class="rosetta__link--wiki" href="http://mathworld.wolfram.com/Combination.html" title="link: http://mathworld.wolfram.com/Combination.html">combinations</a>  of the integers from  <big> <span class="rosetta__text--bold">0</span></big>  (zero)  to  <big> <span class="rosetta__text--bold">n-1</span> </big>  in sorted order  (each combination is sorted and the entire table is sorted).</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Example:</dt></dl>
/// <p class="rosetta__paragraph"><big><span class="rosetta__text--bold">3</span></big>  comb  <big> <span class="rosetta__text--bold">5</span> </big>is:</p>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
/// 0 1 2
/// 0 1 3
/// 0 1 4
/// 0 2 3
/// 0 2 4
/// 0 3 4
/// 1 2 3
/// 1 2 4
/// 1 3 4
/// 2 3 4
/// </pre></div>
/// </div>

/// challengeSeed:
function combinations (m, n) {
  // Good luck!
  return true;
}

/// solutions:
function combinations (m, n) {
  const nArr = [...Array(n).keys()];

  return (function generateCombinations (size, numArr) {
    const ret = [];

    for (let i = 0; i < numArr.length; i++) {
      if (size === 1) {
        ret.push([numArr[i]]);
      }
      else {
        const sub = generateCombinations(size - 1, numArr.slice(i + 1, numArr.length));
        for (let subI = 0; subI < sub.length; subI++) {
          const next = sub[subI];
          next.unshift(numArr[i]);
          ret.push(next);
        }
      }
    }
    return ret;
  }(m, nArr));
}

/// tail:
const testInput1 = [3, 5];
const testOutput1 = [[0, 1, 2], [0, 1, 3], [0, 1, 4], [0, 2, 3], [0, 2, 4], [0, 3, 4], [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]];

const testInput2 = [4, 6];
const testOutput2 = [[0, 1, 2, 3], [0, 1, 2, 4], [0, 1, 2, 5], [0, 1, 3, 4], [0, 1, 3, 5], [0, 1, 4, 5], [0, 2, 3, 4], [0, 2, 3, 5], [0, 2, 4, 5], [0, 3, 4, 5], [1, 2, 3, 4], [1, 2, 3, 5], [1, 2, 4, 5], [1, 3, 4, 5], [2, 3, 4, 5]];

/// tests:
assert(typeof combinations === 'function', 'message: <code>combinations</code> is a function.');
assert.deepEqual(combinations(testInput1[0], testInput1[1]), testOutput1, 'message: <code>combinations(3, 5)</code> should return <code>[[0, 1, 2], [0, 1, 3], [0, 1, 4], [0, 2, 3], [0, 2, 4], [0, 3, 4], [1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]]</code>.');
assert.deepEqual(combinations(testInput2[0], testInput2[1]), testOutput2, 'message: <code>combinations(4, 6)</code> should return <code>[[0,1,2,3],  [0,1,2,4],  [0,1,2,5],  [0,1,3,4],  [0,1,3,5],  [0,1,4,5],  [0,2,3,4],  [0,2,3,5],  [0,2,4,5],  [0,3,4,5],  [1,2,3,4],  [1,2,3,5],  [1,2,4,5],  [1,3,4,5],  [2,3,4,5]]</code>');
/// id: 5958469238c0d8d2632f46db
