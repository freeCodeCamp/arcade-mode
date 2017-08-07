
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Fibonacci sequence
/// type: rosetta-code

/// categories:
/// Recursion
/// Memoization
/// Classic CS problems and programs

/// difficulty: 2


/// description:
/// <div class="rosetta">
/// <p>Write a function to generate the  <big> n<sup>th</sup> </big>  Fibonacci number.</p>
///<p>The <big> n<sup>th</sup> </big>  Fibonacci number is given by :<br>
///<p>F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub></p>
///<p>The first two terms of the series are 0, 1.</p>
///<p>Hence, the series is : 0, 1, 1, 2, 3, 5, 8, 13...</p>
///</div>

/// challengeSeed:
function fibonacci(n) {
  // Good luck!
}

/// solutions:
function fibonacci(n) {
  let a = 0, b = 1, t;
  while (--n > 0) {
    t = a;
    a = b;
    b += t;
  }
  return a;
}

/// tail:

/// tests:
assert(typeof fibonacci === 'function', 'message: <code>fibonacci</code> is a function.');
assert(typeof fibonacci(2) == 'number', 'message: <code>fibonacci(2)</code> should return a number.');
assert.equal(fibonacci(3),1,"message: <code>fibonacci(3)</code> should return 1.");
assert.equal(fibonacci(5),3,"message: <code>fibonacci(5)</code> should return 3.");
assert.equal(fibonacci(10),34,"message: <code>fibonacci(10)</code> should return 34.");
/// id: 597f24c1dda4e70f53c79c81
