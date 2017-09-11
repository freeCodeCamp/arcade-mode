/* eslint spaced-comment: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-redeclare: 0 */
const assert = require('assert');

/// title: Balanced parenthesis
/// type: arcade-mode

/// difficulty: 3

/// description:
/// <p>Write a function which accepts one string, and returns true if it has
/// balanced parentheses. </p>
/// <p>It should handle the following characters: <code>(</code>, <code>)</code>, <code>[</code>, <code>]</code>, <code>{</code> and
/// <code>}</code>.</p>
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
assert(isBalanced(''), 'message: Empty expression is balanced.');
assert(!isBalanced('('), 'message: <code>(</code> is not balanced.');
assert(isBalanced('([{}])'), 'message: <code>([{}])</code> should return true.');
assert(!isBalanced('([{}}])'), 'message: <code>([{}}])</code> should return false.');
assert(!isBalanced('((())))'), 'message: <code>((())))</code> should return false.');
assert(isBalanced('(a(v(b(fdasf)a)a)e)'), 'message: <code>(a(v(b(fdasf)a)a)e)</code> should return false.');
/// id: 59481016e949d6392ed98d48
