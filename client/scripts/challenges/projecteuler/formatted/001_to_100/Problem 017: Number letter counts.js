
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 17: Number letter counts
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.</p>
/// <p class="euler__paragraph">If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used? </p>
/// <p class="euler__paragraph">NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.</p></div>

/// challengeSeed:
function euler17() {
  // Good luck!
  return true;
}

euler17();

/// solutions:
function euler17() {
  const oneToNineteen = [0, 'one', 'two', 'three', 'four', 'five',
    'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen',
    'sixteen', 'seventeen', 'eighteen', 'nineteen'];

  const tens = [0, 'ten', 'twenty', 'thirty', 'forty', 'fifty',
    'sixty', 'seventy', 'eighty', 'ninety'];

  function numToWord(num) {
    if (num > 999) {
      return 'onethousand';
    } else if (num > 99) {
      const hundred = Math.floor(num / 100);
      const numberWord = `${oneToNineteen[hundred]}hundred`;
      if (num % (100 * hundred) === 0) {
        return numberWord;
      }
      return `${numberWord}and${numToWord(num % (100 * hundred))}`;
    } else if (num > 19) {
      const ten = Math.floor(num / 10);
      const numberWord = tens[ten];
      if (num % (10 * ten) === 0) {
        return numberWord;
      }
      return numberWord + numToWord(num % (10 * ten));
    }
    return oneToNineteen[num];
  }

  let sum = 0;
  for (let i = 1; i <= 1000; i++) {
    sum += numToWord(i).length;
  }
  return sum;
}

/// tail:

/// tests:
assert(typeof euler17 === 'function', 'message: <code>euler17()</code> is a function.');
assert.strictEqual(euler17(), 21124, 'message: <code>euler17()</code> should return 21124.');
/// id: 5900f37d1000cf542c50fe90
