
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint prefer-spread: 0 */

const assert = require('chai').assert;

/// title: Hash from two arrays
/// type: rosetta-code

/// categories:
/// Data Structures

/// difficulty: 1

/// benchmark:
arrToObj(Array.apply(null, { length: 10000 }).map(String.call, String), Array.apply(null, { length: 10000 }).map(Number.call, Number));

/// description:
/// <div class="rosetta">
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Using two Arrays of equal length, create a Hash object where the elements from one array (the keys) are linked to the elements of the other (the values)</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Related task:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered"> <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Associative arrays/Creation" title="Associative arrays/Creation">Associative arrays/Creation</a></li></ul>
/// </div>

/// challengeSeed:
function arrToObj (keys, vals) {
  // Good luck!
  return true;
}

/// solutions:
function arrToObj (keys, vals) {
  return keys.reduce((map, key, index) => {
    map[key] = vals[index];
    return map;
  }, {});
}
/// tail:
const testCases = [
  [[1, 2, 3, 4, 5], ['a', 'b', 'c', 'd', 'e']],
  [[1, 2, 3, 4, 5], ['a', 'b', 'c', 'd']],
  [[1, 2, 3], ['a', 'b', 'c', 'd', 'e']],
  [['a', 'b', 'c', 'd', 'e'], [1, 2, 3, 4, 5]],
  [['a', 'b', 'c', 'd', 'e'], [1, 2, 3, 4]],
  [['a', 'b', 'c'], [1, 2, 3, 4, 5]]
];

const res = [
  { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e' },
  { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: undefined },
  { 1: 'a', 2: 'b', 3: 'c' },
  { a: 1, b: 2, c: 3, d: 4, e: 5 },
  { a: 1, b: 2, c: 3, d: 4, e: undefined },
  { a: 1, b: 2, c: 3 }
];

/// tests:
assert(typeof arrToObj === 'function', 'message: <code>arrToObj</code> is a function.');
assert.deepEqual(arrToObj(...testCases[0]), res[0], 'message: <code>arrToObj([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"])</code> should return <code>{ 1: "a", 2: "b", 3: "c", 4: "d", 5: "e" }</code>');
assert.deepEqual(arrToObj(...testCases[1]), res[1], 'message: <code>arrToObj([1, 2, 3, 4, 5], ["a", "b", "c", "d"])</code> should return <code>{ 1: "a", 2: "b", 3: "c", 4: "d", 5: undefined }</code>');
assert.deepEqual(arrToObj(...testCases[2]), res[2], 'message: <code>arrToObj([1, 2, 3], ["a", "b", "c", "d", "e"])</code> should return <code>{ 1: "a", 2: "b", 3: "c" }</code>');
assert.deepEqual(arrToObj(...testCases[3]), res[3], 'message: <code>arrToObj(["a", "b", "c", "d", "e"], [1, 2, 3, 4, 5])</code> should return <code>{ "a": 1, "b": 2, "c": 3 , "d": 4, "e": 5 }</code>');
assert.deepEqual(arrToObj(...testCases[4]), res[4], 'message: <code>arrToObj(["a", "b", "c", "d", "e"], [1, 2, 3, 4])</code> should return <code>{ "a": 1, "b": 2, "c": 3 , "d": 4, "e": undefined }</code>');
assert.deepEqual(arrToObj(...testCases[5]), res[5], 'message: <code>arrToObj(["a", "b", "c"], [1, 2, 3, 4, 5])</code> should return <code>{ "a": 1, "b": 2, "c": 3  }</code>');
/// id: 595671d4d2cdc305f0d5b36f
