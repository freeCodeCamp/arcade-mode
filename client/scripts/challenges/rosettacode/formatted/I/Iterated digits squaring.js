
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Iterated digits squaring
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">If you add the square of the digits of a Natural number (an integer bigger than zero), you always end with either 1 or 89:</p>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">15 -> 26 -> 40 -> 16 -> 37 -> 58 -> 89
/// 7 -> 49 -> 97 -> 130 -> 10 -> 1</pre></div>
/// <p class="rosetta__paragraph">Write a function that takes a number as a parameter and returns 1 or 89 after performing the mentioned process.</p></div>

/// challengeSeed:
function iteratedSquare (n) {
  // Good luck!
}

/// solutions:
function iteratedSquare(n) {
	var total;
	while (n != 89 && n != 1) {
		total = 0;
		while (n > 0) {
			total += Math.pow(n % 10, 2);
			n = Math.floor(n/10);
		}
		n = total;
	}
	return n;
}

/// tests:
assert(typeof iteratedSquare=='function','message: <code>iteratedSquare</code> should be a function.');
assert(typeof iteratedSquare(4)=='number','message: <code>iteratedSquare(4)</code> should return a number.');
assert.equal(iteratedSquare(4),89,'message: <code>iteratedSquare(4)</code> should return <code>89</code>.');
assert.equal(iteratedSquare(7),1,'message: <code>iteratedSquare(7)</code> should return <code>1</code>.');
assert.equal(iteratedSquare(15),89,'message: <code>iteratedSquare(15)</code> should return <code>89</code>.');
assert.equal(iteratedSquare(20),89,'message: <code>iteratedSquare(20)</code> should return <code>89</code>.');
assert.equal(iteratedSquare(70),1,'message: <code>iteratedSquare(70)</code> should return <code>1</code>.');
assert.equal(iteratedSquare(100),1,'message: <code>iteratedSquare(100)</code> should return <code>1</code>.');
/// id: 5a23c84252665b21eecc7ec1
