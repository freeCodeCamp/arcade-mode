
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 24: Lexicographic permutations
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">A permutation is an ordered arrangement of objects. For example, 3124 is one possible permutation of the digits 1, 2, 3 and 4. If all of the permutations are listed numerically or alphabetically, we call it lexicographic order. The lexicographic permutations of 0, 1 and 2 are:</p>
/// <p class="euler__paragraph">012   021   102   120   201   210</p>
/// <p class="euler__paragraph">What is the millionth lexicographic permutation of the digits 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9?</p></div>

/// challengeSeed:
function euler24() {
  // Good luck!
  return true;
}

euler24();

/// solutions:
function euler24() {
  let digitString = '0123456789';
  let permIndex = 999999;
  // Sort the digits
  const digitStringArr = digitString.split('');
  digitStringArr.sort();
  digitString = digitStringArr.join('');

  // Calculate the number of permutations
  // using digitString.length!
  let numberOfPerms = 1;
  for (let i = 1; i <= digitString.length; i++) {
    numberOfPerms *= i;
  }

  // The 1000000th permutation can be found without
  // creating all permutations.
  // The first 1/10th of the permutations start with a 0/
  // The second 1/10th of the permutations start with a 1 etc.
  // The first 1/9th of the first 1/10th of the permutations
  // have a 1 as the second digit.
  // Following this method, we can find the ith permutation.

  // find the ith permutation
  let ithPermutation = '';
  let digitsLeft = digitString;
  while (digitsLeft.length > 0) {
    // find the ith character
    const characterIndex = Math.floor((permIndex / numberOfPerms) * digitsLeft.length);
    const character = digitsLeft[characterIndex];
    ithPermutation += character;

    // update permIndex so that it points to the right permutations
    // for the next itteration
    permIndex -= ((numberOfPerms / digitsLeft.length) * Math.floor((permIndex / numberOfPerms) * digitsLeft.length));

    // update numberOfPerms
    numberOfPerms /= digitsLeft.length;

    // delete used character from digit string.
    digitsLeft = digitsLeft.slice(0, characterIndex) + digitsLeft.slice(characterIndex + 1);
  }
  return parseInt(ithPermutation, 10);
}

/// tail:

/// tests:
assert(typeof euler24 === 'function', 'message: <code>euler24()</code> is a function.');
assert.strictEqual(euler24(), 2783915460, 'message: <code>euler24()</code> should return 2783915460.');
/// id: 5900f3841000cf542c50fe97
