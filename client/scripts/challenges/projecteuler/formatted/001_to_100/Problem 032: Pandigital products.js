
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 32: Pandigital products
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">We shall say that an n-digit number is pandigital if it makes use of all the digits 1 to n exactly once; for example, the 5-digit number, 15234, is 1 through 5 pandigital.</p>
/// <br>
/// <p class="euler__paragraph">The product 7254 is unusual, as the identity, 39 × 186 = 7254, containing multiplicand, multiplier, and product is 1 through 9 pandigital.</p>
/// <br>
/// <p class="euler__paragraph">Find the sum of all products whose multiplicand/multiplier/product identity can be written as a 1 through 9 pandigital.</p>
/// <br>
/// <p class="euler__paragraph"><small>HINT: Some products can be obtained in more than one way so be sure to only include it once in your sum.</small></p></div>

/// challengeSeed:
// noprotect
function euler32() {
  // Good luck!
  return true;
}

euler32();

/// solutions:
// noprotect
function euler32() {
  function is1to9Pandigital(...numbers) {
    const digitStr = concatenateNums(...numbers);

    // check if length is 9
    if (digitStr.length !== 9) {
      return false;
    }

    // check if pandigital
    for (let i = digitStr.length; i > 0; i--) {
      if (digitStr.indexOf(i.toString()) === -1) {
        return false;
      }
    }
    return true;
  }

  function concatenateNums(...numbers) {
    let digitStr = '';
    for (let i = 0; i < numbers.length; i++) {
      digitStr += numbers[i].toString();
    }
    return digitStr;
  }

  const pandigitalNums = [];
  let sum = 0;
  // limit mult 1 to 9876. Anything more than this will
  // result in a product with more than 4 digits, which means
  // the equation will have more than 9 digits
  for (let mult1 = 2; mult1 < 9876; mult1++) {
    // start mult 2 at 123. Anything lower than this will
    // create a equation with less than 9 digits
    let mult2 = 123;
    while (concatenateNums(mult1, mult2, mult1 * mult2).length < 10) {
      if (is1to9Pandigital(mult1, mult2, mult1 * mult2)
          && !pandigitalNums.includes(mult1 * mult2)) {
        pandigitalNums.push(mult1 * mult2);
        sum += mult1 * mult2;
      }
      mult2++;
    }
  }
  return sum;
}

/// tail:

/// tests:
assert(typeof euler32 === 'function', 'message: <code>euler32()</code> is a function.');
assert.strictEqual(euler32(), 45228, 'message: <code>euler32()</code> should return 45228.');
/// id: 5900f38c1000cf542c50fe9f
