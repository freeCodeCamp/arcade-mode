/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-sequences: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Vector cross product
/// type: rosetta-code
/// difficulty: 2

/// categories:
/// vector
/// math

/// description:
/// <div class="rosetta">
/// A vector is defined as having three dimensions as being represented by an ordered collection of three numbers: &nbsp; (X, Y, Z).
/// <br/>
/// <p class="rosetta__paragraph">
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <ul class="rosetta__unordered-list">
///   <li class="rosetta__list-item--unordered">
///     Write a function that takes two vectors (arrays) as input and computes their cross product.
///   </li>
/// </ul>
/// <br>
/// Your function should return <code>null</code> on
/// invalid inputs (ie vectors of different lengths).
/// </p>
/// </div>

/// challengeSeed:
function crossProduct() {
    // Good luck!
}

/// solutions:
function crossProduct(a, b) {
  if (!a || !b) {
    return null;
  }

  // Check lengths
  if (a.length !== 3 || b.length !== 3) {
    return null;
  }

  return [
    (a[1] * b[2]) - (a[2] * b[1]),
    (a[2] * b[0]) - (a[0] * b[2]),
    (a[0] * b[1]) - (a[1] * b[0])
  ];
}

/// tail:
const tv1 = [1, 2, 3];
const tv2 = [4, 5, 6];
const res12 = crossProduct(tv1, tv2);
const exp12 = [-3, 6, -3];

/// tests:
assert.equal(typeof crossProduct, 'function', 'message: dotProduct must be a function');
assert.equal(crossProduct(), null, 'message: dotProduct() must return null');
assert.deepEqual(res12, exp12, 'message: crossProduct([1, 2, 3], [4, 5, 6]) must return [-3, 6, -3].');
/// id: 594810f028c0303b75339ad2
