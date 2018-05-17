
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Identity matrix
/// type: rosetta-code

/// categories:
/// Matrices

/// difficulty: 1

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function that takes a number 'n' as a parameter and returns the identity matrix of order n x n.</p>
/// <br/><p class="rosetta__paragraph">An <span class="rosetta__text--italic">identity matrix</span> is a square matrix of size <span class="rosetta__text--bold"><span class="rosetta__text--italic">n</span> &times; <span class="rosetta__text--italic">n</span></span>,</p>
/// <br>where the diagonal elements are all <span class="rosetta__text--bold">1</span>s (ones), 
/// <br>and all the other elements are all <span class="rosetta__text--bold">0</span>s (zeroes).
/// <br/><p class="rosetta__paragraph">$I_n = \begin{bmatrix}</p>
/// <p class="rosetta__paragraph">1      & 0      & 0      & \cdots & 0      \\</p>
/// <p class="rosetta__paragraph">0      & 1      & 0      & \cdots & 0      \\</p>
/// <p class="rosetta__paragraph">0      & 0      & 1      & \cdots & 0      \\</p>
/// <p class="rosetta__paragraph">\vdots & \vdots & \vdots & \ddots & \vdots \\</p>
/// <p class="rosetta__paragraph">0      & 0      & 0      & \cdots & 1      \\</p>
/// <p class="rosetta__paragraph">\end{bmatrix}$</p>
/// <br/><dl class="rosetta__description-list"></div>

/// challengeSeed:
function idMatrix (n) {
  // Good luck!
}

/// solutions:
function idMatrix(n) {
	return Array.apply(null, new Array(n)).map(function (x, i, xs) {
		return xs.map(function (_, k) {
			return i === k ? 1 : 0;
		})
	});
}

/// tail:
let results=[[ [ 1 ] ],
[ [ 1, 0 ], [ 0, 1 ] ],
[ [ 1, 0, 0 ], [ 0, 1, 0 ], [ 0, 0, 1 ] ],
[ [ 1, 0, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 0, 1 ] ]]

/// tests:
assert(typeof idMatrix=='function','message: <code>idMatrix</code> should be a function.');
assert(Array.isArray(idMatrix(1)),'message: <code>idMatrix(1)</code> should return an array.');
assert.deepEqual(idMatrix(1),results[0],'message: <code>idMatrix(1)</code> should return <code>'+JSON.stringify(results[0])+'</code>.');
assert.deepEqual(idMatrix(2),results[1],'message: <code>idMatrix(2)</code> should return <code>'+JSON.stringify(results[1])+'</code>.');
assert.deepEqual(idMatrix(3),results[2],'message: <code>idMatrix(3)</code> should return <code>'+JSON.stringify(results[2])+'</code>.');
assert.deepEqual(idMatrix(4),results[3],'message: <code>idMatrix(4)</code> should return <code>'+JSON.stringify(results[3])+'</code>.');
/// id: 5a23c84252665b21eecc7eb1
