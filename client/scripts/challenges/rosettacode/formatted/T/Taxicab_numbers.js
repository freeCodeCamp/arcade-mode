
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-continue: 0 */

const assert = require('chai').assert;

/// title: Taxicab numbers
/// type: rosetta-code

/// categories:

/// difficulty: 5

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="rosetta">
/// A &nbsp; <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Hardy–Ramanujan number" title="wp: Hardy–Ramanujan number">taxicab number</a> &nbsp; (the definition that is being used here) &nbsp; is a positive integer that can be expressed as the sum of two positive cubes in more than one way.
/// <br>
/// The first taxicab number is &nbsp; <span class="rosetta__text--bold">1729</span>, &nbsp; which is:
/// <span class="rosetta__text--indented">1<sup>3</sup> &nbsp; + &nbsp; 12<sup>3</sup> &nbsp; &nbsp; &nbsp; and</span>
/// <span class="rosetta__text--indented">9<sup>3</sup> &nbsp; + &nbsp; 10<sup>3</sup>.</span>
/// <br>
/// Taxicab numbers are also known as:
/// <span class="rosetta__text--indented">* &nbsp; taxi numbers</span>
/// <span class="rosetta__text--indented">* &nbsp; taxi-cab numbers</span>
/// <span class="rosetta__text--indented">* &nbsp; taxi cab numbers</span>
/// <span class="rosetta__text--indented">* &nbsp; Hardy-Ramanujan numbers</span>
/// <br>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">Write a function that returns the lowest N taxicab numbers.</li>
/// <li class="rosetta__list-item--unordered">For each of the taxicab numbers, show the number as well as it's constituent cubes.</li>
/// </ul>
/// <br>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Extra credit</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">Show the 2,000<sup>th</sup> taxicab number, and a half dozen more</li></ul>
/// <br>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">See also:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">[http://oeis.org/A001235 A001235 taxicab numbers] on The On-Line Encyclopedia of Integer Sequences.</li>
/// <li class="rosetta__list-item--unordered"><a href="http://mathworld.wolfram.com/Hardy-RamanujanNumber.html">Hardy-Ramanujan Number</a> on MathWorld.</li>
/// <li class="rosetta__list-item--unordered"><a href="http://mathworld.wolfram.com/TaxicabNumber.html">taxicab number</a> on MathWorld.</li>
/// <li class="rosetta__list-item--unordered"><a href="https://en.wikipedia.org/wiki/Taxicab_number">taxicab number</a> on Wikipedia.</li></ul><br><br>
/// </div>

/// challengeSeed:
function taxicabNumbers (n) {
  // Good luck!
  return true;
}

/// solutions:
function taxicabNumbers(nNumbers) {
  const cubeN = [];
  const s3s = {};

  const e = 100;
  for (let n = 1; n < e; n += 1) {
    cubeN[n] = n * n * n;
  }

  for (let a = 1; a < e - 1; a += 1) {
    const a3 = cubeN[a];
    for (let b = a; b < e; b += 1) {
      const b3 = cubeN[b];
      const s3 = a3 + b3;

      let abs = s3s[s3];
      if (!abs) {
        s3s[s3] = abs = [];
      }
      abs.push([a, b]);
    }
  }

  let i = 0;
  const res = [];
  for (const s3 in s3s) {
    const abs = s3s[s3];
    if (abs.length < 2) { // No two cube pairs found
      continue;
    }
    i += 1;
    if (i > nNumbers) {
      break;
    }
    res.push(s3);
  }
  return res.map(item => parseInt(item, 10));
}

/// tail:
const res4 = [1729, 4104, 13832, 20683];
const res25 = [
  1729, 4104, 13832, 20683, 32832, 39312, 40033, 46683, 64232, 65728, 110656,
  110808, 134379, 149389, 165464, 171288, 195841, 216027, 216125, 262656, 314496, 320264, 327763,
  373464, 402597
];

/// tests:
assert(typeof taxicabNumbers === 'function', 'message: <code>taxicabNumbers </code> is a function.');
assert(typeof taxicabNumbers(2) === 'object', 'message: <code>taxicabNumbers </code> should return an array.');
assert(typeof taxicabNumbers(100)[0] === 'number', 'message: <code>taxicabNumbers </code> should return an array of numbers.');
assert.deepEqual(taxicabNumbers(4), res4, 'message: <code>taxicabNumbers(4) </code> must return [1729, 4104, 13832, 20683].');
assert.deepEqual(taxicabNumbers(25), res25, 'message: taxicabNumbers(25) should return [1729, 4104, 13832, 20683, 32832, 39312, 40033, 46683, 64232, 65728, 110656, 110808, 134379, 149389, 165464, 171288, 195841, 216027, 216125, 262656, 314496, 320264, 327763, 373464, 402597]');
/// id: 594ecc0d9a8cf816e3340187
