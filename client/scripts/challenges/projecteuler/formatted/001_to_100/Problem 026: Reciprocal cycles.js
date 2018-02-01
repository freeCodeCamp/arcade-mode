
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 26: Reciprocal cycles
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">A unit fraction contains 1 in the numerator. The decimal representation of the unit fractions with denominators 2 to 10 are given:</p>
/// <p class="euler__paragraph"></p>
/// <p class="euler__text--indented"><sup>1</sup>/<sub>2</sub> = 0.5</p><br>
/// <p class="euler__text--indented"><sup>1</sup>/<sub>3</sub> = 0.(3)</p><br>
/// <p class="euler__text--indented"><sup>1</sup>/<sub>4</sub> = 0.25</p><br>
/// <p class="euler__text--indented"><sup>1</sup>/<sub>5</sub> = 0.2</p><br>
/// <p class="euler__text--indented"><sup>1</sup>/<sub>6</sub> = 0.1(6)</p><br>
/// <p class="euler__text--indented"><sup>1</sup>/<sub>7</sub> = 0.(142857)</p><br>
/// <p class="euler__text--indented"><sup>1</sup>/<sub>8</sub> = 0.125</p><br>
/// <p class="euler__text--indented"><sup>1</sup>/<sub>9</sub> = 0.(1)</p><br>
/// <p class="euler__text--indented"><sup>1</sup>/<sub>10</sub>= 0.1</p><br>
/// <p class="euler__paragraph">Where 0.1(6) means 0.166666..., and has a 1-digit recurring cycle. It can be seen that <sup>1</sup>/<sub>7</sub> has a 6-digit recurring cycle.</p>
/// <br>
/// <p class="euler__paragraph">Find the value of d < 1000 for which <sup>1</sup>/<sub>d</sub> contains the longest recurring cycle in its decimal fraction part.</p></div>

/// challengeSeed:
function euler26() {
  // Good luck!
  return true;
}

euler26();

/// solutions:
function euler26() {
  function getLengthOfCycle(denominator) {
    let currNum = 1;
    let count = 0;
    const numsVisited = [];
    while (numsVisited.indexOf(currNum) === -1) {
      numsVisited.push(currNum);
      currNum %= denominator;
      currNum *= 10;
      count++;
    }
    return count - 1;
  }

  let longestCycle = 0;
  let numWithLongestCycle;
  for (let d = 999; d > 0; d--) {
    if (d < longestCycle) break;
    const cycleLength = getLengthOfCycle(d);
    if (cycleLength > longestCycle) {
      longestCycle = cycleLength;
      numWithLongestCycle = d;
    }
  }
  return numWithLongestCycle;
}

/// tail:

/// tests:
assert(typeof euler26 === 'function', 'message: <code>euler26()</code> is a function.');
assert.strictEqual(euler26(), 983, 'message: <code>euler26()</code> should return 983.');
/// id: 5900f3861000cf542c50fe99
