/* eslint spaced-comment: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-redeclare: 0 */

const assert = require('chai').assert;

/// title: Rotate array left

/// categories:
/// algorithms
/// arrays

/// difficulty: 1

/// description:
/// Rotating values of an array is a common operation. By rotating values of
/// <code>[0, 1, 2]</code> to left by one, we get <code>[1, 2, 0]</code>. Thus
/// each number has moved to left one position, and the value 0 has been pushed
/// back in from the right side.
/// Instructions:
/// Implement a function to rotate an array left by k positions, where k is the
/// 2nd input parameter to the function. Also, try to avoid making copies of the
/// original array.

/// challengeSeed:
function rotateArrayLeft(arr, k) {
    // Good luck!
}

/// solutions:
function rotateArrayLeft(arr, k) {
  if (arr.length <= 1) {
    return arr;
  }
  const shift = k % arr.length;
  arr.reverse();

  const spliceIndex = (arr.length - 1) - (k - 1);
  const right = arr.splice(spliceIndex, k);
  right.reverse();
  arr.reverse();
  return arr.concat(right);
}

/// tests:
assert.equal(typeof rotateArrayLeft([], 1), 'object', 'message: rotateArrayLeft should return an object.');
assert.deepEqual(rotateArrayLeft([], 10), [], 'message: Rotating empty array should return the same array.');
assert.deepEqual(rotateArrayLeft([1], 1), [1], 'message: Rotating [1] should return [1]');
assert.deepEqual(rotateArrayLeft([7, 8], 1), [8, 7], 'message: Rotating [7, 8] by 1 should return [8, 7]');
assert.deepEqual(rotateArrayLeft([7, 8], 2), [7, 8], 'message: Rotating [7, 8] by 2 should return [7, 8]');
assert.deepEqual(rotateArrayLeft([1, 2, 3], 1), [2, 3, 1], 'message: Rotating [1, 2, 3] by 1 should return [2, 3, 1]');
assert.deepEqual(rotateArrayLeft([1, 2, 3, 4], 2), [3, 4, 1, 2], 'message: Rotating [1,2,3,4] by 2 should return [3, 4, 1, 2]');
/// id: 59481016e949d6392ed98d4f
