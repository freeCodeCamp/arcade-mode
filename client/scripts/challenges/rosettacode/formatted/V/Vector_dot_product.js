/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-sequences: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Vector dot product
/// type: rosetta-code
/// difficulty: 2

/// categories:
/// vector
/// math

/// description:
/// A vector is defined as having three dimensions as being represented by an ordered collection of three numbers: &nbsp; (X, Y, Z).
/// Instructions:
/// Write a function that takes any numbers of vectors (arrays) as
/// input and computes their dot product. Your function should return <code>null</code> on
/// invalid inputs (ie vectors of different lenghts).

/// challengeSeed:
function dotProduct() {
    // Good luck!
}

/// solutions:
function dotProduct(...vectors) {
  if (!vectors || !vectors.length) {
    return null;
  }
  if (!vectors[0] || !vectors[0].length) {
    return null;
  }
  const vectorLen = vectors[0].length;
  const numVectors = vectors.length;

  // If all vectors not same length, return null
  for (let i = 0; i < numVectors; i++) {
    if (vectors[i].length !== vectorLen) {
      return null;  // return undefined
    }
  }

  let prod = 0;
  let sum = 0;
  let j = vectorLen;
  let i = numVectors;
  // Sum terms
  while (j--) {
    i = numVectors;
    prod = 1;

    while (i--) {
      prod *= vectors[i][j];
    }
    sum += prod;
  }
  return sum;
}

/// tail:
const vectors5x5 = [];
for (let i = 0; i < 5; i++) {
  vectors5x5[i] = [];
  for (let j = 0; j < 5; j++) {
    vectors5x5[i].push((i + 1) * j);
  }
}
const vectorsWp = [[1, 3, -5], [4, -2, -1]];

/// tests:
assert.equal(typeof dotProduct, 'function', 'message: dotProduct must be a function');
assert.equal(dotProduct(), null, 'message: dotProduct() must return null');
assert.equal(dotProduct([1], [1]), 1, 'message: dotProduct([[1], [1]]) must return 1.');
assert.equal(dotProduct([1], [1, 2]), null, 'message: dotProduct([[1], [1, 2]]) must return null.');
assert.equal(dotProduct(...vectorsWp), 3, 'message: dotProduct([[1, 3, -5], [4, -2, -1]]) must return 3.');
assert.equal(dotProduct(...vectors5x5), 156000);
