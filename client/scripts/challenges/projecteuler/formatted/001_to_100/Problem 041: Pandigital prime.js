
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 41: Pandigital prime
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once. For example, 2143 is a 4-digit pandigital and is also prime.</p>
/// <br>
/// <p class="euler__paragraph">What is the largest n-digit pandigital prime that exists?</p></div>

/// challengeSeed:
// noprotect
function euler41() {
  // Good luck!
  return true;
}

euler41();

/// solutions:
// noprotect
function euler41() {
  function isPrime(num) {
    if (num < 2) {
      return false;
    } else if (num === 2) {
      return true;
    }
    const sqrtOfNum = Math.floor(num ** 0.5);
    for (let i = 2; i <= sqrtOfNum + 1; i++) {
      if (num % i === 0) {
        return false;
      }
    }
    return true;
  }

  function isPandigital(num) {
    const digitStr = num.toString();

    // check if pandigital
    for (let i = digitStr.length; i > 0; i--) {
      if (digitStr.indexOf(i.toString()) === -1) {
        return false;
      }
    }
    return true;
  }

  function getPermutations(digitString) {
    if (digitString.length === 1) {
      return digitString;
    }
    const oldPerms = getPermutations(digitString.slice(1));
    const newPerms = [];

    for (let i = 0; i < oldPerms.length; i++) {
      const ithPerm = oldPerms[i];
      for (let j = 0; j < oldPerms[i].length + 1; j++) {
        const newPerm = ithPerm.slice(0, j) + digitString[0] + ithPerm.slice(j);
        newPerms.push(newPerm);
      }
    }
    return newPerms;
  }

  // number has to be less than 9 digits to be pandigital
  const maxPossible = '987654321';
  let max = 0;
  for (let i = 0; i < 9; i++) {
    const currMax = maxPossible.slice(i);
    const permutations = getPermutations(currMax);
    for (let j = 0; j < permutations.length; j++) {
      const num = permutations[j];
      if (isPrime(num) && num > max) {
        max = num;
      }
    }
  }
  return parseInt(max, 10);
}

/// tail:
const replaceThis = 3;

/// tests:
assert(typeof euler41 === 'function', 'message: <code>euler41()</code> is a function.');
assert.strictEqual(euler41(), 7652413, 'message: <code>euler41()</code> should return 7652413.');
/// id: 5900f3951000cf542c50fea8
