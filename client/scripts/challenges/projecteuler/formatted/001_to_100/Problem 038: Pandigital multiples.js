
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 38: Pandigital multiples
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">Take the number $192$ and multiply it by each of $1$, $2$, and $3$:</p>
/// <p class="euler__paragraph euler__text--centered">$192 × 1 = 192$</p>
/// <p class="euler__paragraph euler__text--centered">$192 × 2 = 384$</p>
/// <p class="euler__paragraph euler__text--centered">$192 × 3 = 576$</p>
/// <br>
/// <p class="euler__paragraph">By concatenating each product we get the $1$ to $9$ pandigital, $192384576$. We will call $192384576$ the concatenated product of $192$ and $(1,2,3)$</p>
/// <br>
/// <p class="euler__paragraph">The same can be achieved by starting with $9$ and multiplying by $1$, $2$, $3$, $4$, and $5$, giving the pandigital, $918273645$, which is the concatenated product of $9$ and $(1,2,3,4,5)$.</p>
/// <br>
/// <p class="euler__paragraph">What is the largest $1$ to $9$ pandigital $9$-digit number that can be formed as the concatenated product of an integer with $(1,2, ... , n)$ where $n > 1$?</p></div>

/// challengeSeed:
function euler38() {
  // Good luck!
  return true;
}

euler38();

/// solutions:
function euler38() {
  function get9DigitConcatenatedProduct(num) {
    // returns false if concatenated product
    // is not 9 digits
    let concatenatedProduct = num.toString();
    let i = 2;
    while (concatenatedProduct.length < 9) {
      concatenatedProduct += num * i;
      i++;
    }
    return concatenatedProduct.length === 9 ? concatenatedProduct : false;
  }

  function is1to9Pandigital(num) {
    const numStr = num.toString();

    // check if length is 9
    if (numStr.length !== 9) {
      return false;
    }

    // check if pandigital
    for (let i = 9; i > 0; i--) {
      if (numStr.indexOf(i.toString()) === -1) {
        return false;
      }
    }
    return true;
  }

  let largestNum = 0;
  for (let i = 1; i < 9876; i++) {
    const concatenatedProduct = get9DigitConcatenatedProduct(i);
    if (is1to9Pandigital(concatenatedProduct)
      && concatenatedProduct > largestNum) {
      largestNum = concatenatedProduct;
    }
  }
  return parseInt(largestNum, 10);
}

/// tail:

/// tests:
assert(typeof euler38 === 'function', 'message: <code>euler38()</code> is a function.');
assert.strictEqual(euler38(), 932718654, 'message: <code>euler38()</code> should return 932718654.');
/// id: 5900f3931000cf542c50fea5
