
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 19: Counting Sundays
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler">
/// <p class="euler__paragraph">You are given the following information, but you may prefer to do some research for yourself.</p>
/// <ul><li>1 Jan 1900 was a Monday.</li>
/// <li>Thirty days has September,
/// April, June and November.
/// All the rest have thirty-one,
/// Saving February alone,
/// Which has twenty-eight, rain or shine.
/// And on leap years, twenty-nine.</li>
/// <li>A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.</li></ul>
/// <p class="euler__paragraph">How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?</p></div>

/// challengeSeed:
function euler19() {
  // Good luck!
  return true;
}

euler19();

/// solutions:
function euler19() {
  const startDate = new Date('Jan 01 1901');
  const endDate = new Date('Dec 31 2000');

  let sundayCount = 0;
  while (startDate <= endDate) {
    if (startDate.getDate() === 1 && startDate.getDay() === 0) {
      // date is the 1st of the month and a Sunday
      sundayCount += 1;
    }
    // add 1 day to start date
    startDate.setDate(startDate.getDate() + 1);
  }
  return sundayCount;
}

/// tail:

/// tests:
assert(typeof euler19 === 'function', 'message: <code>euler19()</code> is a function.');
assert.strictEqual(euler19(), 171, 'message: <code>euler19()</code> should return 171.');
/// id: 5900f37f1000cf542c50fe92
