
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */
/* eslint prefer-template: 0 */

const assert = require('chai').assert;

/// title: Date manipulation
/// type: rosetta-code

/// categories:
/// Date and time

/// difficulty: ?

/// benchmark:

/// description:
/// <div class="rosetta">
/// <br/><br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Given the date string "March 7 2009 7:30pm EST", <br></p>
/// <p class="rosetta__paragraph">output the time 12 hours later in any human-readable format.</p>
/// <br><br><br/></div>

/// challengeSeed:
function add12Hours (dateString) {
  // Good luck!
  return true;
}

/// solutions:
function add12Hours(dateString) {
  // Get the parts of the date string
  const parts = dateString.split(/\s+/);
  const date = parts[1];
  let month = parts[0];
  const year = parts[2];
  const time = parts[3];

  let hr = Number(time.split(':')[0]);
  const min = Number(time.split(':')[1].replace(/\D/g, ''));
  const ampm = time && time.match(/[a-z]+$/i)[0];
  const zone = parts[4].toUpperCase();

  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const zones = { 'EST': 300, 'AEST': -600 }; // Minutes to add to zone time to get UTC

  // Convert month name to number, zero indexed. Return if invalid month
  month = months.indexOf(month);
  if (month === -1) { return; }

  // Add 12 hours as specified. Add another 12 if pm for 24hr time
  hr += (ampm.toLowerCase() === 'pm') ? 24 : 12;

  // Create a date object in local zone
  const localTime = new Date(year, month, date);
  localTime.setHours(hr, min, 0, 0);

  // Adjust localTime minutes for the time zones so it is now a local date
  // representing the same moment as the source date plus 12 hours
  localTime.setMinutes((localTime.getMinutes() + zones[zone]) - localTime.getTimezoneOffset());
  return localTime.toString();
}

/// tail:
const dateString = 'March 7 2009 7:30pm EST';
const twelveHoursLater = 1236515400000;

/// tests:
assert(typeof add12Hours === 'function', 'message: <code>add12Hours</code> is a function.');
assert(typeof add12Hours(dateString) === 'string', 'message: <code>add12Hours(dateString)</code> should return a string.');
assert.deepEqual(new Date(twelveHoursLater), new Date(add12Hours(dateString)), 'message: <code>add12Hours(dateString)</code> should return a date and time of "' + new Date(twelveHoursLater).toUTCString() + '" in any format or time zone.');
/// id: 5966c21cf732a95f1b67dd28
