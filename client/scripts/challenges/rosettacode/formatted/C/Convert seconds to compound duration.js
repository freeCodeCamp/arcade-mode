
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Convert seconds to compound duration
/// type: rosetta-code

/// categories:
/// Date and time

/// difficulty: 1

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="rosetta"><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Implement a function which:</p>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">takes a positive integer representing a duration in seconds as input (e.g., <code>100</code>), and</li>
/// <li class="rosetta__list-item--unordered">returns a string which shows the same duration decomposed into weeks, days, hours, minutes, and seconds as detailed below (e.g., "<code>1 min, 40 sec</code>").</li></ul><br>
/// <p class="rosetta__paragraph">Demonstrate that it passes the following three test-cases:</p><p class="rosetta__paragraph" style="font-size:115%; margin:1em 0 0 0"><span class="rosetta__text--bold"><span class="rosetta__text--italic">Test Cases</span></span></p><br/>
/// <table class="rosetta__wikitable">
/// <tbody>
/// <tr>
/// <th>input number</th>
/// <th>output number</th>
/// </tr>
/// <tr>
/// <td>7259</td>
/// <td><code>2 hr, 59 sec</code></td>
/// </tr>
/// <tr>
/// <td>86400</td>
/// <td><code>1 d</code></td>
/// </tr>
/// <tr>
/// <td>6000000</td>
/// <td><code>9 wk, 6 d, 10 hr, 40 min</code></td>
/// </tr>
/// </tbody>
/// </table>
/// <br/><p class="rosetta__paragraph" style="font-size:115%; margin:1em 0 0 0"><span class="rosetta__text--bold"><span class="rosetta__text--italic">Details</span></span></p><br/>
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered">The following five units should be used:
/// <table class="rosetta__wikitable">
/// <tbody>
/// <tr>
/// <th>unit</th>
/// <th>suffix used in output</th>
/// <th>conversion</th>
/// </tr>
/// <tr>
/// <td>week</td>
/// <td><code>wk</code></td>
/// <td>1 week = 7 days</td>
/// </tr>
/// <tr>
/// <td>day</td>
/// <td><code>d</code></td>
/// <td>1 day = 24 hours</td>
/// </tr>
/// <tr>
/// <td>hour</td>
/// <td><code>hr</code></td>
/// <td>1 hour = 60 minutes</td>
/// </tr>
/// <tr>
/// <td>minute</td>
/// <td><code>min</code></td>
/// <td>1 minute = 60 seconds</td>
/// </tr>
/// <tr>
/// <td>second</td>
/// <td><code>sec</code></td>
/// <td></td>
/// </tr>
/// </tbody>
/// </table>
/// </li><br/><li class="rosetta__list-item--unordered">However, <span class="rosetta__text--bold">only</span> include quantities with non-zero values in the output (e.g., return "<code>1 d</code>" and not "<code>0 wk, 1 d, 0 hr, 0 min, 0 sec</code>").</li><br/><li class="rosetta__list-item--unordered">Give larger units precedence over smaller ones as much as possible (e.g., return <code>2 min, 10 sec</code> and not <code>1 min, 70 sec</code> or <code>130 sec</code>)</li><br/><li class="rosetta__list-item--unordered">Mimic the formatting shown in the test-cases (quantities sorted from largest unit to smallest and separated by comma+space; value and unit of each quantity separated by space).</li>
/// </ul><br/><p class="rosetta__paragraph"><hr style="margin:1em 0;"/></p>
/// </div>

/// challengeSeed:
function convertSeconds (sec) {
  // Good luck!
  return true;
}

/// solutions:
function convertSeconds (sec) {
  const localNames = ['wk', 'd', 'hr', 'min', 'sec'];
  // compoundDuration :: [String] -> Int -> String
  const compoundDuration = (labels, intSeconds) =>
    weekParts(intSeconds)
    .map((v, i) => [v, labels[i]])
    .reduce((a, x) =>
      a.concat(x[0] ? [`${x[0]} ${x[1] || '?'}`] : []), []
    )
    .join(', ');

    // weekParts :: Int -> [Int]
  const weekParts = intSeconds => [0, 7, 24, 60, 60]
    .reduceRight((a, x) => {
      const r = a.rem;
      const mod = x !== 0 ? r % x : r;

      return {
        rem: (r - mod) / (x || 1),
        parts: [mod].concat(a.parts)
      };
    }, {
      rem: intSeconds,
      parts: []
    })
    .parts;

  return compoundDuration(localNames, sec);
}

/// tail:
const testCases = [7259, 86400, 6000000];
const results = ['2 hr, 59 sec', '1 d', '9 wk, 6 d, 10 hr, 40 min'];

/// tests:
assert(typeof convertSeconds === 'function', 'message: <code>convertSeconds</code> is a function.');
assert.equal(convertSeconds(testCases[0]), results[0], 'message: <code>convertSeconds(7259)</code> should return <code>2 hr, 59 sec</code>.');
assert.equal(convertSeconds(testCases[1]), results[1], 'message: <code>convertSeconds(86400)</code> should return <code>1 d</code>.');
assert.equal(convertSeconds(testCases[2]), results[2], 'message: <code>convertSeconds(6000000)</code> should return <code>9 wk, 6 d, 10 hr, 40 min</code>.');
/// id: 596fd036dc1ab896c5db98b1
