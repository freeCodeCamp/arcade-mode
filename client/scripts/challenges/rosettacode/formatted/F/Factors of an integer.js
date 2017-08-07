
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Factors of an integer
/// type: rosetta-code

/// categories:
/// Arithmetic operations
/// Mathematical_operations

/// difficulty: 2

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function that returns the factors  of a positive integer.</p><p class="rosetta__paragraph">These factors are the positive integers by which the number being factored can be divided to yield a positive integer result.</p>
///</div>

/// challengeSeed:
function factors (num) {
  // Good luck!
}

/// solutions:
function factors(num)
{
 let n_factors = [], i, sqr=Math.floor(Math.sqrt(num));

 for (i = 1; i <=sqr ; i += 1)
  if (num % i === 0)
  {
   n_factors.push(i);
   if (num / i !== i)
    n_factors.push(num / i);
  }
 n_factors.sort(function(a, b){return a - b;});
 return n_factors;
}

/// tail:
const ans=[[1,3,5,9,15,45],[1,53],[1,2,4,8,16,32,64]];

/// tests:
assert(typeof factors === 'function', 'message: <code>factors</code> is a function.');
assert.deepEqual(factors(45), ans[0], 'message: <code>factors(45)</code> should return <code>[1,3,5,9,15,45]</code>.');
assert.deepEqual(factors(53), ans[1], 'message: <code>factors(53)</code> should return <code>[1,53]</code>.');
assert.deepEqual(factors(64), ans[2], 'message: <code>factors(64)</code> should return <code>[1,2,4,8,16,32,64]</code>.');
/// id: 597f1e7fbc206f0e9ba95dc4
