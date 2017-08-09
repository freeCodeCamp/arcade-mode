
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Factorial
/// type: rosetta-code

/// categories:
/// Recursion
/// Memoization
/// Classic CS problems and programs
/// Arithmetic
/// Simple

/// difficulty: 1

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function to return the factorial of a number.</p><br/>
/// <p>Factorial of a number is given by : </p>
/// n! = n * (n-1) * (n-2) * ..... * 1
/// <p>
/// For example :<br>
/// 3! = 3*2*1 = 6<br>
/// 4! = 4*3*2*1 = 24
/// </p>
/// <p>Note : <br>
/// 0! = 1 <br>
/// </p>
/// </div>

/// challengeSeed:
function factorial (n) {
  // Good luck!
}

/// solutions:
function factorial(n) {
  let sum = 1;
  while (n > 1) {
    sum *= n;
    n--;
  }
  return sum;
}


/// tail:
const results=[6,120,3628800];

/// tests:
assert(typeof factorial === 'function', 'message: <code>factorial</code> is a function.');
assert(typeof factorial(2) === 'number', 'message: <code>factorial(2)</code> should return a number.');
assert.equal(factorial(3),results[0],"message: <code>factorial(3)</code> should return 6.");
assert.equal(factorial(5),results[1],"message: <code>factorial(3)</code> should return 120.");
assert.equal(factorial(10),results[2],"message: <code>factorial(3)</code> should return 3,628,800.");
/// id: 597b2b2a2702b44414742771
