
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-mixed-operators: 0 */

const assert = require('assert');

/// title: Averages/Root mean square
/// type: rosetta-code

/// categories:

/// difficulty: 2

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Compute the  <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Root mean square" title="wp: Root mean square">Root mean square</a>  of the numbers 1 through 10 inclusive.</p>
/// <br/><p class="rosetta__paragraph">The  <span class="rosetta__text--italic">root mean square</span>  is also known by its initials RMS (or rms), and as the <span class="rosetta__text--bold">quadratic mean</span>.</p><br/><p class="rosetta__paragraph">The RMS is calculated as the mean of the squares of the numbers, square-rooted:</p>
/// <p class="rosetta__paragraph"><big>$$x_{\mathrm{rms}} = \sqrt {{{x_1}^2 + {x_2}^2 + \cdots + {x_n}^2} \over n}. $$</big></p>
/// </div>

/// challengeSeed:
function rms (arr) {
  // Good luck!
}

/// solutions:
function rms (arr) {
  const sumOfSquares = arr.reduce((s, x) => s + x * x, 0);
  return Math.sqrt(sumOfSquares / arr.length);
}

/// tail:
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const answer1 = 6.2048368229954285;

/// tests:
assert(typeof rms === 'function', 'message: <code>rms</code> is a function.');
assert.equal(rms(arr1), answer1, 'message: <code>rms([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])</code> should equal <code>6.2048368229954285</code>.');
/// id: 594da033de4190850b893874
