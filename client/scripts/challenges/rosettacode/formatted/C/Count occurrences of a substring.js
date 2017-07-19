
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Count occurrences of a substring
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="rosetta"><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Create a function,  or show a built-in function,  to count the number of non-overlapping occurrences of a substring inside a string.</p><br/><p class="rosetta__paragraph">The function should take two arguments:</p>
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered">the first argument being the string to search,  and</li>
/// <li class="rosetta__list-item--unordered">the second a substring to be searched for.</li>
/// </ul>
/// <br/><p class="rosetta__paragraph">It should return an integer count.</p>
/// <br/><p class="rosetta__paragraph">The matching should yield the highest number of non-overlapping matches.</p><br/><p class="rosetta__paragraph">In general, this essentially means matching from left-to-right or right-to-left.</p>
/// </div>

/// challengeSeed:
function countSubstring (str, subStr) {
  // Good luck!
  return true;
}

/// solutions:
function countSubstring(str, subStr) {
  const escapedSubStr = subStr.replace(/[.+*?^$[\]{}()|/]/g, '\\$&');
  const matches = str.match(new RegExp(escapedSubStr, 'g'));
  return matches ? matches.length : 0;
}

/// tail:
const testCases = ['the three truths', 'ababababab', 'abaabba*bbaba*bbab'];
const searchString = ['th', 'abab', 'a*b'];
const results = [3, 2, 2];

/// tests:
assert(typeof countSubstring === 'function', 'message: <code>countSubstring</code> is a function.');
assert.equal(countSubstring(testCases[0], searchString[0]), results[0], 'message: <code>countSubstring("the three truths", "th")</code> should return <code>3</code>.');
assert.equal(countSubstring(testCases[1], searchString[1]), results[1], 'message: <code>countSubstring("ababababab", "abab")</code> should return <code>2</code>.');
assert.equal(countSubstring(testCases[2], searchString[2]), results[2], 'message: <code>countSubstring("abaabba*bbaba*bbab", "a*b")</code> should return <code>2</code>.');
/// id: 596fda99c69f779975a1b67d
