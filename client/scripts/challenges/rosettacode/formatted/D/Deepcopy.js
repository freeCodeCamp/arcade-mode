
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Deepcopy
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// benchmark:

/// description:
/// <div class="rosetta"><br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Write a function that returns a deep copy of a given object.</p>
/// <p class="rosetta__paragraph">The copy must not be the same object that was given.</p>
/// <br /><br />


/// challengeSeed:
function deepcopy (obj) {
  // Good luck!
  return true;
}

/// solutions:
function deepcopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}


/// tail:
const obj1 = { test: 'test' };
const obj2 = {
  t: 'test',
  a: ['an', 'array']
};
const obj3 = {
  t: 'try',
  o: obj2
};

/// tests:
assert.isFunction(deepcopy, 'message: <code>deepcopy</code> should be a function.');
assert.isObject(deepcopy(obj1), 'message: <code>deepcopy({test: "test"})</code> should return an object.');
assert.notEqual(deepcopy(obj2, obj2, 'message: Should not return the same object that was provided.'));
assert.deepEqual(deepcopy(obj2), obj2, 'message: When passed an object containing an array, should return a deep copy of the object.');
assert.deepEqual(deepcopy(obj3), obj3, 'message: When passed an object containing another object, should return a deep copy of the object.');
/// id: 596a8888ab7c01048de257d5
