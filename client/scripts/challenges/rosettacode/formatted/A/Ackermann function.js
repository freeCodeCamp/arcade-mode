/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Ackermann function
/// type: rosetta-code

/// categories:
/// recursion

/// difficulty: 2

/// description:
/// The Ackermann function is a classic example of a recursive function, notable especially because it is not a primitive recursive function. It grows very quickly in value, as does the size of its call tree.
/// The Ackermann function is usually defined as follows:
/// $$A(m, n) =
///  \begin{cases}
///  n+1 & \mbox{if } m = 0 \\
///  A(m-1, 1) & \mbox{if } m > 0 \mbox{ and } n = 0 \\
///  A(m-1, A(m, n-1)) & \mbox{if } m > 0 \mbox{ and } n > 0.
///  \end{cases}$$
/// Its arguments are never negative and it always terminates. Write a function which returns the value of $A(m, n)$. Arbitrary precision is preferred (since the function grows so quickly), but not required.

/// challengeSeed:
function ack (m, n) {
  // Good luck!
}

/// solutions:
function ack (m, n) {
  return m === 0 ? n + 1 : ack(m - 1, n === 0 ? 1 : ack(m, n - 1));
}

/// tests:
assert(typeof ack === 'function', 'message: <code>ack</code> is a function.');
assert(ack(0, 0) === 1, 'message: <code>ack(0, 0)</code> should return 1.');
assert(ack(1, 1) === 3, 'message: <code>ack(1, 1)</code> should return 3.');
assert(ack(2, 5) === 13, 'message: <code>ack(2, 5)</code> should return 13.');
assert(ack(3, 3) === 61, 'message: <code>ack(3, 3)</code> should return 61.');
/// id: 594810f028c0303b75339acf
