/* eslint spaced-comment: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-redeclare: 0 */
const assert = require('chai').assert;

/// title: Balanced parenthesis
/// type: arcade-mode

/// difficulty: 3

/// description:
/// HINT: Do not try to parse the full expression with a single regular expression.

/// challengeSeed:
function isBalanced(str) {
  // Good luck!
  return false;
}

/// solutions:
function isBalanced(str) {
  const matches = { '(': ')', '[': ']', '{': '}' };
  const chars = str.split('');
  const stack = [];
  let isOk = true;
  chars.forEach(char => {
    if (/[[({]/.test(char)) { // Handle opening ([{
      stack.push(char);
    }
    if (/[\])}]/.test(char)) { // Handle closing )]}
      const prevChar = stack.pop();
      if (char !== matches[prevChar]) {
        isOk = false;
      }
    }
  });
  if (stack.length > 0) {
    isOk = false;
  }
  return isOk;
}

/// tests:
assert.isOk(isBalanced(''), 'message: Empty expression is balanced.');
assert.isNotOk(isBalanced('('), 'message: <code>(</code> is not balanced.');
assert.isOk(isBalanced('([{}])'), 'message: <code>([{}])</code> should return true.');
assert.isNotOk(isBalanced('([{}}])'), 'message: <code>([{}}])</code> should return false.');
assert.isNotOk(isBalanced('((())))'), 'message: <code>((())))</code> should return false.');
assert.isOk(isBalanced('(a(v(b(fdasf)a)a)e)'), 'message: <code>(a(v(b(fdasf)a)a)e)</code> should return false.');
/// id: 59481016e949d6392ed98d48
