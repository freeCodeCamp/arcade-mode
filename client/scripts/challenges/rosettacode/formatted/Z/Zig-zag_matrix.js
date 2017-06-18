/* eslint spaced-comment: 0 */
/* eslint no-continue: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-shadow: 0 */
/* eslint no-redeclare: 0 */

const assert = require('chai').assert;

/// title: Zig-zag matrix
/// type: rosetta-code
/// difficulty: 3

/// categories:
/// matrix

/// description:
/// A &nbsp; ''zig-zag'' &nbsp; array is a square arrangement of the first &nbsp;
/// <big>N<sup>2</sup></big> &nbsp; integers, &nbsp; where the
/// <br>numbers increase sequentially as you zig-zag along the array's &nbsp;
/// <a href="https://en.wiktionary.org/wiki/antidiagonal">anti-diagonals</a>.
///<br/>
/// For example, given &nbsp; '''5''', &nbsp; produce this array:
/// <pre>
///  0  1  5  6 14
///  2  4  7 13 15
///  3  8 12 16 21
///  9 11 17 20 22
/// 10 18 19 23 24
/// </pre>
/// Instructions:
/// Write a function that takes the size of the zig-zag matrix, and returns the
/// corresponding matrix as two-dimensional array.

/// challengeSeed:
function ZigZagMatrix(n) {
  // Good luck!
  return [[], []];
}

/// solutions:
function ZigZagMatrix(n) {
  const mtx = [];
  for (let i = 0; i < n; i++) {
    mtx[i] = [];
  }

  let i = 1;
  let j = 1;
  for (let e = 0; e < n * n; e++) {
    mtx[i - 1][j - 1] = e;
    if ((i + j) % 2 === 0) {
      // Even stripes
      if (j < n) j++;
      else i += 2;
      if (i > 1) i--;
    } else {
      // Odd stripes
      if (i < n) i++;
      else j += 2;
      if (j > 1) j--;
    }
  }
  return mtx;
}

/// tail:
const zm1 = [[0]];
const zm2 = [[0, 1], [2, 3]];
const zm5 = [
  [0, 1, 5, 6, 14],
  [2, 4, 7, 13, 15],
  [3, 8, 12, 16, 21],
  [9, 11, 17, 20, 22],
  [10, 18, 19, 23, 24]
];

/// tests:
assert.equal(typeof ZigZagMatrix, 'function', 'message: ZigZagMatrix must be a function');
assert.equal(typeof ZigZagMatrix(1), 'object', 'message: ZigZagMatrix should return array');
assert.equal(typeof ZigZagMatrix(1)[0], 'object', 'message: ZigZagMatrix should return an array of nestes arrays');
assert.deepEqual(ZigZagMatrix(1), zm1, 'message: ZigZagMatrix(1) should return [[0]]');
assert.deepEqual(ZigZagMatrix(2), zm2, 'message: ZigZagMatrix(2) should return [[0, 1], [2, 3]]');
assert.deepEqual(ZigZagMatrix(5), zm5, 'message: ZigZagMatrix(5) must return specified matrix');
