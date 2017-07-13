
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Day of the week
/// type: rosetta-code

/// categories:
/// Date

/// difficulty: 1

/// description:
/// <div class="rosetta">
/// <br/><br/>
/// <p class="rosetta__paragraph">A company decides that whenever Xmas falls on a Sunday they will give their workers all extra paid holidays so that, together with any public holidays, workers will not have to work the following week (between the 25th of December and the first of January).</p>
/// <br/>
/// <p class="rosetta__paragraph"><span class="rosetta__text--bold">Task:</span></p>
/// <p class="rosetta__paragraph">Write a function that takes a start year and an end year and return an array of all the years where the 25th of December will be a Sunday.</p>
/// <br><br><br/></div>

/// challengeSeed:
function findXmasSunday (start, end) {
  // Good luck!
  return true;
}

/// solutions:
function findXmasSunday (start, end) {
  const xmasSunday = [];
  for (let year = start; year <= end; year++) {
    const xmas = new Date(year, 11, 25);
    if (xmas.getDay() === 0) {
      xmasSunday.push(year);
    }
  }
  return xmasSunday;
}

/// tail:
const firstSolution = [1977, 1983, 1988, 1994, 2005, 2011, 2016];
const secondSolution = [2011, 2016, 2022, 2033, 2039, 2044, 2050, 2061, 2067, 2072, 2078, 2089, 2095, 2101, 2107, 2112, 2118];

/// tests:
assert(typeof findChristmasSunday === 'function', 'message: <code>replaceMe</code> is a function.');
assert(typeof findXmasSunday(2000, 2100) === 'object', 'message: <code>findChristmasSunday(2000, 2100)</code> should return an array.');
assert.deepEqual(findXmasSunday(1970, 2017), firstSolution, 'message: <code>findChristmasSunday(2008, 2121</code> should return [1977, 1983, 1988, 1994, 2005, 2011, 2016]');
assert.deepEqual(findXmasSunday(2008, 2121), secondSolution, 'message: <code>findChristmasSunday(2008, 2121</code> should return [2011, 2016, 2022, 2033, 2039, 2044, 2050, 2061, 2067, 2072, 2078, 2089, 2095, 2101, 2107, 2112, 2118]');
/// id: 5966f99c45e8976909a85575
