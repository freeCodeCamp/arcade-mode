/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 3: Largest prime factor
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The prime factors of 13195 are 5, 7, 13 and 29.</p>
/// <p class="euler__paragraph">What is the largest prime factor of the number 600851475143 ?</p></div>

/// challengeSeed:
function euler3() {
  // Good luck!
  return true;
}

euler3();

/// solutions:
function euler3() {
	var number = 600851475143;
	var max = 0;

	for (let i = 2; i <= number; i++) {
		while (number % i == 0) {
			max = i;
			number /= i;
		}
	}

	return max;
}

/// tail:

/// tests:
assert(typeof euler3 === 'function', 'message: <code>euler3()</code> is a function.');
assert.strictEqual(euler3(), 6857, 'message: <code>euler3()</code> should return 6857.');
/// id: 5900f36f1000cf542c50fe82



