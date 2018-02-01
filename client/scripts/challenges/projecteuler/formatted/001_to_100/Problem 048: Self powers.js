
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 48: Self powers
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The series, $1^1 + 2^2 + 3^3 + ... + 10^{10} = 10405071317$.</p>
/// <br>
/// <p class="euler__paragraph">Find the last ten digits of the series, $1^1 + 2^2 + 3^3 + ... + 1000^{1000}$.</p></div>

/// challengeSeed:
function euler48() {
  // Good luck!
  return true;
}

euler48();

/// solutions:
function euler48() {
  let sum = 0;

  // We'll use modulo to remove everything but the
  // last 10 digits of our results.
  const modulo = 10000000000;

  for (let i = 1; i <= 1000; i++) {
    let temp = i;
    for (let j = 1; j < i; j++) {
      // multiply by i
      temp *= i;
      // trim answer
      temp %= modulo;
    }
    // add the trimmed i^i
    sum += temp;
    // trim the answer
    sum %= modulo;
  }
  return sum;
}

/// tail:

/// tests:
assert(typeof euler48 === 'function', 'message: <code>euler48()</code> is a function.');
assert.strictEqual(euler48(), 9110846700, 'message: <code>euler48()</code> should return 9110846700.');
/// id: 5900f39c1000cf542c50feaf
