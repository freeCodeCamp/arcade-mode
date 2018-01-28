
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: FizzBuzz
/// type: rosetta-code

/// categories:
/// Iteration
/// Recursion
/// Simple

/// difficulty: 1

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function that takes a number as a parameter and returns a string as follows:</p>
/// <ul>
/// 	<li>for multiples of three, print Fizz (instead of the number)</li>
/// 	<li>for multiples of five, print Buzz (instead of the number)</li>
/// 	<li>for multiples of both three and five, print FizzBuzz (instead of the number) </li>
/// 	<li>for all other numbers returns the number itself (as a string) </li>
/// </ul>
/// </div>

/// challengeSeed:
function fizzBuzz (i) {
  // Good luck!
}

/// solutions:
function fizzBuzz(i) {
  if(!(i%3) && !(i%5))
    return 'FizzBuzz'

  if (!(i % 3))
   return 'Fizz';

  if (!(i % 5))
    return 'Buzz';

  return i.toString();
}

/// tail:

/// tests:
assert(typeof fizzBuzz=='function','message: <code>fizzBuzz</code> should be a function.');
assert(typeof fizzBuzz(3)=='string','message: <code>fizzBuzz(3)</code> should return a string.');
assert.equal(fizzBuzz(3),"Fizz",'message: <code>fizzBuzz(3)</code> should return <code>"Fizz"</code>.');
assert.equal(fizzBuzz(5),"Buzz",'message: <code>fizzBuzz(5)</code> should return <code>"Buzz"</code>.');
assert.equal(fizzBuzz(10),"Buzz",'message: <code>fizzBuzz(10)</code> should return <code>"Buzz"</code>.');
assert.equal(fizzBuzz(19),"19",'message: <code>fizzBuzz(21)</code> should return <code>"19"</code>.');
assert.equal(fizzBuzz(1875),"FizzBuzz",'message: <code>fizzBuzz(1875)</code> should return <code>"FizzBuzz"</code>.');
/// id: 5a6dd7f02bf89b132fcac7bd
