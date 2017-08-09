
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Count the coins
/// type: rosetta-code

/// categories:


/// difficulty: 1

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">There are four types of common coins in <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/United_States" title="link: https://en.wikipedia.org/wiki/United_States">US</a> currency:</p>
/// <ol class="rosetta__ordered-list">
/// <li class="rosetta__list-item--ordered">quarters (25 cents)</li>
/// <li class="rosetta__list-item--ordered">dimes (10 cents)</li>
/// <li class="rosetta__list-item--ordered">nickels (5 cents),  and </li>
/// <li class="rosetta__list-item--ordered">pennies (1 cent)  </li>
/// </ol>
/// <br/><p class="rosetta__paragraph">There are six ways to make change for 15 cents:</p>
/// <ol class="rosetta__ordered-list">
/// <li class="rosetta__list-item--ordered">A dime and a nickel </li>
/// <li class="rosetta__list-item--ordered">A dime and 5 pennies</li>
/// <li class="rosetta__list-item--ordered">3 nickels</li>
/// <li class="rosetta__list-item--ordered">2 nickels and 5 pennies</li>
/// <li class="rosetta__list-item--ordered">A nickel and 10 pennies</li>
/// <li class="rosetta__list-item--ordered">15 pennies</li>
/// <br><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Implement a function to determine how many ways there are to make change for a dollar using these common coins? (1 dollar = 100 cents).</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Reference:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered"> <a class="rosetta__link--wiki" href="http://mitpress.mit.edu/sicp/full-text/book/book-Z-H-11.html#%_sec_Temp_52" title="link: http://mitpress.mit.edu/sicp/full-text/book/book-Z-H-11.html#%_sec_Temp_52">an algorithm from MIT Press</a>. </li></ul></div>

/// challengeSeed:
function countCoins () {
  // Good luck!
  return true;
}

/// solutions:
function countCoins () {
  let t = 100;
  const operands = [1, 5, 10, 25];
  const targetsLength = t + 1;
  const operandsLength = operands.length;
  t = [1];

  for (let a = 0; a < operandsLength; a++) {
    for (let b = 1; b < targetsLength; b++) {
      // initialise undefined target
      t[b] = t[b] ? t[b] : 0;

      // accumulate target + operand ways
      t[b] += (b < operands[a]) ? 0 : t[b - operands[a]];
    }
  }

  return t[targetsLength - 1];
}

/// tests:
assert(typeof countCoins === 'function', 'message: <code>countCoins</code> is a function.');
assert.equal(countCoins(), 242, 'message: <code>countCoints()</code> should return 242.');
/// id: 59713bd26bdeb8a594fb9413
