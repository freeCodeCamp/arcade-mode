
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Flatten a list
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// benchmark:

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function to flatten the nesting in an arbitrary list of values.</p></div>

/// challengeSeed:
function flatten (list) {
  // Good luck!
}

/// solutions:
function flatten(list) {

  return list.reduce(function (acc, val) {

    return acc.concat(val.constructor === Array ? flatten(val) : val);

  }, []);

}

/// tail:
let tests=[
  [1,[3,4],6,[11,[10]]],
  [[44],[53,66],11,[32,11,10]],
  [1,2,3,4,[5,6,7,8]],
  [100,101,[102,104,[11,205]]],
  [[1], 2, [[3, 4], 5], [[[]]], [[[6]]], 7, 8, []]
]

let results=[
  [ 1, 3, 4, 6, 11, 10 ],
  [ 44, 53, 66, 11, 32, 11, 10 ],
  [ 1, 2, 3, 4, 5, 6, 7, 8 ],
  [ 100, 101, 102, 104, 11, 205 ],
  [ 1, 2, 3, 4, 5, 6, 7, 8 ]
]

/// tests:
assert(typeof flatten=='function','message: <code>flatten</code> should be a function.');
assert(Array.isArray(flatten(tests[0].slice())),'message: <code>flatten('+JSON.stringify(tests[0])+')</code> should return an array.');
assert.deepEqual(flatten(tests[0].slice()),results[0],'message: <code>flatten('+JSON.stringify(tests[0])+')</code> should return <code>'+JSON.stringify(results[0])+'</code>.');
assert.deepEqual(flatten(tests[1].slice()),results[1],'message: <code>flatten('+JSON.stringify(tests[1])+')</code> should return <code>'+JSON.stringify(results[1])+'</code>.');
assert.deepEqual(flatten(tests[2].slice()),results[2],'message: <code>flatten('+JSON.stringify(tests[2])+')</code> should return <code>'+JSON.stringify(results[2])+'</code>.');
assert.deepEqual(flatten(tests[3].slice()),results[3],'message: <code>flatten('+JSON.stringify(tests[3])+')</code> should return <code>'+JSON.stringify(results[3])+'</code>.');
assert.deepEqual(flatten(tests[4].slice()),results[4],'message: <code>flatten('+JSON.stringify(tests[4])+')</code> should return <code>'+JSON.stringify(results[4])+'</code>.');
/// id: 5a72d22b6597c20d7cfc2557
