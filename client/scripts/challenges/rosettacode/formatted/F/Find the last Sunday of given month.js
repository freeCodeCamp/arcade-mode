
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Find the last Sunday of given month
/// type: rosetta-code

/// categories:
/// Date and time

/// difficulty: 2

/// description:
<<<<<<< HEAD
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function that returns the date of the last Sunday of a given month of a given year. The month and year are the parameters of the function. The date should be returned as a string in the format "yyyy-mm-dd"</p><br/>
/// </div>

/// challengeSeed:
function lastSundayOfMonth (month,year) {
=======
/// <div class='rosetta'>
/// <p class='rosetta__paragraph'>Write a function that returns the date of the last Sunday of a given month of a given year. The month and year are the parameters of the function. The date should be returned as a string in the format 'yyyy-mm-dd'</p><br/>
/// </div>

/// challengeSeed:
function lastSundayOfMonth (month, year) {
>>>>>>> 2ab2a4b1eadd9f219132243bdb37e609df584196
  // Good luck!
}

/// solutions:
<<<<<<< HEAD
function lastSundayOfMonth(month,year) {
	month--;
	let lastDay = [31,28,31,30,31,30,31,31,30,31,30,31],dates=[];    
  
  if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) lastDay[2] = 29;
  let date = new Date();
	date.setFullYear(year, month, lastDay[month]);                                
	date.setDate(date.getDate()-date.getDay());                              
	return date.toISOString().substring(0,10);          
}



/// tail:

/// tests:            
assert(typeof lastSundayOfMonth === 'function', 'message: <code>lastSundayOfMonth </code> is a function.');               
assert(typeof lastSundayOfMonth(6,2013)=='string','message: <code>lastSundayOfMonth(6,2013)</code> should return a <code>string</code>.');
assert.equal(lastSundayOfMonth(6,2013),"2013-06-30",'message: <code>lastSundayOfMonth(6,2013)</code> should return <code>"2013-06-30"</code>.');
assert.equal(lastSundayOfMonth(2,2013),"2013-02-24",'message: <code>lastSundayOfMonth(2,2013)</code> should return <code>"2013-02-24"</code>.');
assert.equal(lastSundayOfMonth(9,1999),"1999-09-26",'message: <code>lastSundayOfMonth(9,1999)</code> should return <code>"1999-09-26"</code>.');
assert.equal(lastSundayOfMonth(12,2010),"2010-12-26",'message: <code>lastSundayOfMonth(12,2010)</code> should return <code>"2010-12-26"</code>.');
assert.equal(lastSundayOfMonth(11,2005),"2005-11-27",'message: <code>lastSundayOfMonth(11,2005)</code> should return <code>"2005-11-27"</code>.');
=======
function lastSundayOfMonth(month, year) {
  const lastDay = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const dates = [];

  if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) lastDay[1] = 29;
  const date = new Date(Date.UTC());
  date.setUTCFullYear(year, month - 1, lastDay[month - 1]);
  date.setUTCDate(date.getUTCDate() - date.getUTCDay());
  return date.toISOString().substring(0, 10);
}


/// tail:

/// tests:
assert(typeof lastSundayOfMonth === 'function', 'message: <code>lastSundayOfMonth </code> is a function.');
assert(typeof lastSundayOfMonth(6, 2013) === 'string', 'message: <code>lastSundayOfMonth(6,2013)</code> should return a <code>string</code>.');
assert.equal(lastSundayOfMonth(6, 2013), '2013-06-30', 'message: <code>lastSundayOfMonth(6,2013)</code> should return <code>2013-06-30</code>.');
assert.equal(lastSundayOfMonth(2, 2013), '2013-02-24', 'message: <code>lastSundayOfMonth(2,2013)</code> should return <code>2013-02-24</code>.');
assert.equal(lastSundayOfMonth(9, 1999), '1999-09-26', 'message: <code>lastSundayOfMonth(9,1999)</code> should return <code>1999-09-26</code>.');
assert.equal(lastSundayOfMonth(12, 2010), '2010-12-26', 'message: <code>lastSundayOfMonth(12,2010)</code> should return <code>2010-12-26</code>.');
assert.equal(lastSundayOfMonth(11, 2005), '2005-11-27', 'message: <code>lastSundayOfMonth(11,2005)</code> should return <code>2005-11-27</code>.');
>>>>>>> 2ab2a4b1eadd9f219132243bdb37e609df584196
/// id: 5a5f66cf09e7bd1b6b4157e1
