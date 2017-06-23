/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-nested-ternary: 0 */

const assert = require('chai').assert;

/// title: Abundant, deficient and perfect number classifications
/// type: rosetta-code

/// categories:
/// ?

/// difficulty: 4

/// benchmark:
getDPA(20000);

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">These define three classifications of positive integers based on their <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Proper divisors" title="Proper divisors">proper divisors</a>.</p><br/>
/// <p class="rosetta__paragraph">Let $P(n)$ be the sum of the proper divisors of n where proper divisors are all positive integers n other than n itself.</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">If <code>P(n) < n</code> then n is classed as "deficient"</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">If <code>P(n) === n</code> then n is classed as "perfect"</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">If <code>P(n) > n</code> then n is classed as "abundant"</span></p><br/>
/// <p class="rosetta__paragraph">Example:</p>
/// <p class="rosetta__paragraph">6 has proper divisors of 1, 2, and 3.</p>
/// <p class="rosetta__paragraph">1 + 2 + 3 = 6, so 6 is classed as a perfect number.</p><br/>
/// <p class="rosetta__paragraph">Implement a function that calculates how many of the integers from 1 to 20,000 (inclusive) are in each of the three classes. Output the result as an array in the following format <code>[deficient, perfect, abundant]</code>.</p>
/// </div>

/// challengeSeed:
function getDPA (num) {
  // Good luck!
}

/// solutions:
function getDPA (num) {
  const dpa = [1, 0, 0];
  for (let n = 2; n <= num; n += 1) {
    let ds = 1;
    const e = Math.sqrt(n);
    for (let d = 2; d < e; d += 1) {
      if (n % d === 0) {
        ds += d + (n / d);
      }
    }
    if (n % e === 0) {
      ds += e;
    }
    dpa[ds < n ? 0 : ds === n ? 1 : 2] += 1;
  }
  return dpa;
}

/// tail:
const solution = [15043, 4, 4953];

/// tests:
assert(typeof getDPA === 'function', 'message: <code>getDPA</code> is a function.');
assert(Array.isArray(getDPA(100)), 'message: <code>getDPA</code> should return an array.');
assert(getDPA(100).length === 3, 'message: <code>getDPA</code> return value should have a length of 3.');
assert.deepEqual(getDPA(20000), solution, 'message: <code>getDPA(20000)</code> should equal [15043, 4, 4953]');
/// id: 594810f028c0303b75339acd
