/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 6: Sum square difference
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The sum of the squares of the first ten natural numbers is,</p>
/// <p class="euler__paragraph">12 + 22 + ... + 102 = 385</p>
/// <p class="euler__paragraph">The square of the sum of the first ten natural numbers is,</p>
/// <p class="euler__paragraph">(1 + 2 + ... + 10)2 = 552 = 3025</p>
/// <p class="euler__paragraph">Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640.</p>
/// <p class="euler__paragraph">Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.</p></div>

/// challengeSeed:
function euler6() {
  // Good luck!
  return true;
}

euler6();

/// solutions:
function euler6() {
	const max = 100
	var sumOfSquares = 0
	var squareOfSums = 0

	for(let i = 1; i <= max; i++) {
		sumOfSquares += (i*i)
	}

	for (let i = 1; i <= max; i++) {
		squareOfSums += (i)
	}

	return (squareOfSums * squareOfSums) - sumOfSquares
}

/// tail:

/// tests:
assert(typeof euler6 === 'function', 'message: <code>euler6()</code> is a function.');
assert.strictEqual(euler6(), 25164150, 'message: <code>euler6()</code> should return 25164150.');
/// id: 5900f3721000cf542c50fe85
