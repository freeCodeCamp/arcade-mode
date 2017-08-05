/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-bitwise: 0 */
/* eslint no-param-reassign: 0 */

const assert = require('chai').assert;

/// title: Problem 112: Bouncy numbers
/// type: project-euler

/// categories:
/// math

/// difficulty: 4

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">Working from left-to-right if no digit is exceeded by the digit to its left it is called an increasing number; for example, 134468.</p>
/// <p class="euler__paragraph">Similarly if no digit is exceeded by the digit to its right it is called a decreasing number; for example, 66420.</p>
/// <p class="euler__paragraph">We shall call a positive integer that is neither increasing nor decreasing a "bouncy" number; for example, 155349.</p>
/// <p class="euler__paragraph">Clearly there cannot be any bouncy numbers below one-hundred, but just over half of the numbers below one-thousand (525) are bouncy. In fact, the least number for which the proportion of bouncy numbers first reaches 50% is 538.</p>
/// <p class="euler__paragraph">Surprisingly, bouncy numbers become more and more common and by the time we reach 21780 the proportion of bouncy numbers is equal to 90%.</p>
/// <p class="euler__paragraph">Find the least number for which the proportion of bouncy numbers is exactly 99%.</p></div>

/// challengeSeed:
// noprotect
function euler112() {
  // Good luck!
  return true;
}

euler112();

/// solutions:
// noprotect
function euler112() {
  const isBouncy = function(num) {
    let increasing = true;
    let decreasing = true;

    let maxDigit = 0;
    let minDigit = 9;
    while (num >= 1 && (increasing || decreasing)) {
      const bottomDigit = num % 10;
      num = num / 10 | 0;

      if (increasing) {
        if (bottomDigit <= minDigit) {
          minDigit = bottomDigit;
        } else {
          increasing = false;
        }
      }

      if (decreasing) {
        if (bottomDigit >= maxDigit) {
          maxDigit = bottomDigit;
        } else {
          decreasing = false;
        }
      }
    }

    return !(increasing || decreasing);
  };

  let i = 1;
  let numBouncy = 0;
  let ratio = 0;
  while (ratio < 0.99) {
    if (isBouncy(i)) {
      numBouncy++;
    }

    ratio = numBouncy / i;
    i++;
  }

  return (i - 1);
}

/// tail:

/// tests:
assert(typeof euler112 === 'function', 'message: <code>euler112()</code> is a function.');
assert.strictEqual(euler112(), 1587000, 'message: <code>euler112()</code> should return 1587000.');
/// id: 5900f3dd1000cf542c50feef
