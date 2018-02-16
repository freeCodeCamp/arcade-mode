
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Five weekends
/// type: rosetta-code

/// categories:
/// Puzzles

/// difficulty: 3

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function that counts the months with five full weekends(five Fridays, Saturdays and Sundays) for a given year range. The year range is passed as parameter to the function.</p>
/// </div>

/// challengeSeed:
function fiveWeekends (startYear,endYear) {
  // Good luck!
}

/// solutions:
function fiveWeekends(startYear,endYear){
  function startsOnFriday(month, year){
   return new Date(year, month, 1).getDay() === 5;
  }

  function has31Days(month, year){
    return new Date(year, month, 31).getDate() === 31;
  }

  function checkMonths(year){
   var month, count = 0;
   for (month = 0; month < 12; month += 1){
    if (startsOnFriday(month, year) && has31Days(month, year)){
     count += 1;
    }
   }
   return count;
  }
 var year,monthTotal = 0,total = 0;

 for (year = startYear; year <= endYear; year += 1){
  monthTotal = checkMonths(year);
  total += monthTotal;
 }
 return total;
}

/// tail:

/// tests:
assert(typeof fiveWeekends=='function','message: <code>fiveWeekends</code> should be a function.');
assert(typeof fiveWeekends(2000,2018)=='number','message: <code>fiveWeekends(2000,2018)</code> should return a number.');
assert.equal(fiveWeekends(2000,2018),17,'message: <code>fiveWeekends(2000,2018)</code should return <code>17</code>.');
assert.equal(fiveWeekends(1900,2100),201,'message: <code>fiveWeekends(1900,2100)</code should return <code>201</code>.');
assert.equal(fiveWeekends(1950,2000),52,'message: <code>fiveWeekends(1950,2000)</code should return <code>52</code>.');
assert.equal(fiveWeekends(2010,2015),6,'message: <code>fiveWeekends(2010,2015)</code should return <code>6</code>.');
assert.equal(fiveWeekends(1500,2000),502,'message: <code>fiveWeekends(1500,2000)</code should return <code>502</code>.');
/// id: 5a6093ece13c260dfda0caf0
