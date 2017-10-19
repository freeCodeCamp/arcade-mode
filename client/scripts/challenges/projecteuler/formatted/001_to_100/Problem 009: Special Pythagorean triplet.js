
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 9: Special Pythagorean triplet
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,</p>
/// <p class="euler__paragraph"> a2 + b2 = c2</p>
/// <p class="euler__paragraph">For example, 32 + 42 = 9 + 16 = 25 = 52.</p>
/// <p class="euler__paragraph">There exists exactly one Pythagorean triplet for which a + b + c = 1000.Find the product abc.</p></div>

/// challengeSeed:
function euler9() {
  // Good luck!
  return true;
}

euler9();

/// solutions:
function euler9() {
  function isPythTrip(a, b, c) {
    if ((a ** 2) + (b ** 2) === c ** 2) {
      return true;
    }
    return false;
  }

  const sum = 1000;
  for (let a = 1; a < sum; a++) {
    for (let b = 1; b < a; b++) {
      const c = sum - a - b;
      if (isPythTrip(a, b, c)) {
        return a * b * c;
      }
    }
  }
  return 0;
}

/// tail:

/// tests:
assert(typeof euler9 === 'function', 'message: <code>euler9()</code> is a function.');
assert.strictEqual(euler9(), 31875000, 'message: <code>euler9()</code> should return 31875000.');
/// id: 5900f3761000cf542c50fe88
