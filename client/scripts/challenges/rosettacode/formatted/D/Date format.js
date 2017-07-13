
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint prefer-template: 0 */

const assert = require('chai').assert;

/// title: Date format
/// type: rosetta-code

/// categories:


/// difficulty: 1

/// benchmark:
/* no benchmark expected as there were no "optimal" solutions in the solution list */

/// description:
/// <div class="rosetta">
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Return an array with the current date in the formats:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">-   <span class="rosetta__text--bold">2007-11-23</span>   and </span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">-   <span class="rosetta__text--bold">Sunday, November 23, 2007</span></span></p>
/// <br>
/// <p class="rosetta__paragraph">Example output: <span class="rosetta__text--bold"><code>['2007-11-23', 'Sunday, November 23, 2007']</code></span></p>
/// <br/></div>

/// challengeSeed:
function getDateFormats () {
  // Good luck!
  return true;
}

/// solutions:
function getDateFormats () {
  const date = new Date();
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fmt1 = `${date.getFullYear()}-${(1 + date.getMonth())}-${date.getDate()}`;
  const fmt2 = `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return [fmt1, fmt2];
}

/// tail:
const getDateSolution = () => {
  const date = new Date();
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const fmt1 = `${date.getFullYear()}-${(1 + date.getMonth())}-${date.getDate()}`;
  const fmt2 = `${weekdays[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return [fmt1, fmt2];
};

const dates = getDateSolution();
const equalsMessage = `message: <code>getDataFormats()</code> should return <code>["${dates[0]}", "${dates[1]}"]</code>.`;

/// tests:
assert(typeof getDateFormats === 'function', 'message: <code>getDateFormats</code> is a function.');
assert(typeof getDateFormats() === 'object', 'message: Should return an object.');
assert(getDateFormats().length === 2, 'message: Should returned an array with 2 elements.');
assert.deepEqual(getDateFormats(), dates, equalsMessage);
/// id: 59669d08d75b60482359409f
