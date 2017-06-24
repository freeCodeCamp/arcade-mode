
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Balanced brackets
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// benchmark:


/// description:
/// <div class='rosetta'>
/// <p class="rosetta__paragraph">Determine whether a generated string of brackets is <span class='rosetta__text--italic'>balanced</span>; that is, whether it consists entirely of pairs of opening/closing brackets (in that order), none of which mis-nest.</p><br/>
/// <dl class='rosetta__description-list'><dt class='rosetta__description-title'>Examples:</dt></dl>
/// <p class='rosetta__paragraph'>(empty) true</p>
/// <p class='rosetta__paragraph'><code>[]</code> true</p>
/// <p class='rosetta__paragraph'><code>][</code> false</p>
/// <p class='rosetta__paragraph'><code>[][]</code> true</p>
/// <p class='rosetta__paragraph'><code>][][</code> false</p>
/// <p class='rosetta__paragraph'><code>[]][[]</code> false</p>
/// <p class='rosetta__paragraph'><code>[[[[]]]]</code> true</p>
/// </div>

/// challengeSeed:
function isBalanced (str) {
  // Good luck!
  return true;
}

/// solutions:
function isBalanced (str) {
  if (str === '') return true;
  let a = str;
  let b;
  do {
    b = a;
    a = a.replace(/\[\]/g, '');
  } while (a !== b);
  return !a;
}

/// tail:
const testCases = [
  '[]',
  ']][[[][][][]][',
  '[][[[[][][[[]]]]]]',
  '][',
  '[[[]]]][[]',
  '][[]',
  '][[][]][[[]]',
  '[[][]]][',
  '[[[]]][[]]]][][[',
  '[]][[]]][[[[][]]',
  '][]][[][',
  '[[]][[][]]',
  '[[]]',
  ']][]][[]][[[',
  '][]][][[',
  '][][',
  '[[]]][][][[]][',
  ''
];

/// tests:
assert(typeof isBalanced === 'function', 'message: <code>isBalanced</code> is a function.');
assert.isTrue(isBalanced(testCases[0]), 'message: <code>isBalanced("[]")</code> should return true.');
assert.isFalse(isBalanced(testCases[1]), 'message: <code>isBalanced("]][[[][][][]][")</code> should return false.');
assert.isTrue(isBalanced(testCases[2]), 'message: <code>isBalanced("[][[[[][][[[]]]]]]")</code> should return true.');
assert.isFalse(isBalanced(testCases[3]), 'message: <code>isBalanced("][")</code> should return true.');
assert.isFalse(isBalanced(testCases[4]), 'message: <code>isBalanced("[[[]]]][[]")</code> should return true.');
assert.isFalse(isBalanced(testCases[5]), 'message: <code>isBalanced("][[]")</code> should return true.');
assert.isFalse(isBalanced(testCases[6]), 'message: <code>isBalanced("][[][]][[[]]")</code> should return true.');
assert.isFalse(isBalanced(testCases[7]), 'message: <code>isBalanced("[[][]]][")</code> should return true.');
assert.isFalse(isBalanced(testCases[8]), 'message: <code>isBalanced("[[[]]][[]]]][][[")</code> should return true.');
assert.isFalse(isBalanced(testCases[9]), 'message: <code>isBalanced("[]][[]]][[[[][]]")</code> should return true.');
assert.isFalse(isBalanced(testCases[10]), 'message: <code>isBalanced("][]][[][")</code> should return true.');
assert.isTrue(isBalanced(testCases[11]), 'message: <code>isBalanced("[[]][[][]]")</code> should return true.');
assert.isTrue(isBalanced(testCases[12]), 'message: <code>isBalanced("[[]]")</code> should return true.');
assert.isFalse(isBalanced(testCases[13]), 'message: <code>isBalanced("]][]][[]][[[")</code> should return true.');
assert.isFalse(isBalanced(testCases[14]), 'message: <code>isBalanced("][]][][[")</code> should return true.');
assert.isFalse(isBalanced(testCases[15]), 'message: <code>isBalanced("][][")</code> should return true.');
assert.isFalse(isBalanced(testCases[16]), 'message: <code>isBalanced("[[]]][][][[]][")</code> should return true.');
assert.isTrue(isBalanced(testCases[17]), 'message: <code>isBalanced("")</code> should return true.');
/// id: 594dc6c729e5700999302b45
