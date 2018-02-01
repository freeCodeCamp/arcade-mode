
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Filter
/// type: rosetta-code

/// categories:
/// Iteration

/// difficulty: 1

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function that takes an array as input. The function should return an array with all the even numbers from the input array, i.e. filter the even numbers from the input array and return the new array.</p>
/// <br><br><br/></div>

/// challengeSeed:
function filter (arr) {
  // Good luck!
}

/// solutions:
function filter(arr){
	arr = arr.filter(function(a) {return a % 2 == 0});
	return arr;
}

/// tests:
assert(typeof filter === 'function', 'message: <code>filter</code> is a function.');
assert.deepEqual(filter([1,2,3,4,5]),[2,4],'message: <code>filter([1,2,3,4,5])</code> should return <code>[2,4]</code>.');
assert.deepEqual(filter([13,22,113,24,54,21,19]),[22,24,54],'message: <code>filter([13,22,113,24,54,21,19])</code> should return <code>[22,24,54]</code>.');
assert.deepEqual(filter([66,23,31,14,34]),[66,14,34],'message: <code>filter([66,23,31,14,34])</code> should return <code>[66,14,34]</code>.');
assert.deepEqual(filter([10,20,33,40,50]),[10,20,40,50],'message: <code>filter([10,20,33,40,50])</code> should return <code>[10,20,40,50]</code>.');
assert.deepEqual(filter([1999,2014,1985,2000,2017]),[2014,2000],'message: <code>filter([1999,2014,1985,2000,2017])</code> should return <code>[2014,2000]</code>.');
/// id: 5a5dafbc992d5b1e20b083c2
