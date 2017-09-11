
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Ethiopian multiplication
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Ethiopian multiplication is a method of multiplying integers using only addition, doubling, and halving.</p>
/// <br/><p class="rosetta__paragraph"><span class="rosetta__text--bold">Method:</span> <br></p>
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Take two numbers to be multiplied and write them down at the top of two columns.</li>
/// <li class="rosetta__list-item--ordered">In the left-hand column repeatedly halve the last number, discarding any remainders, and write the result below the last in the same column, until you write a value of 1.</li>
/// <li class="rosetta__list-item--ordered">In the right-hand column repeatedly double the last number and write the result below. stop when you add a result in the same row as where the left hand column shows 1.</li>
/// <li class="rosetta__list-item--ordered">Examine the table produced and discard any row where the value in the left column is even.</li>
/// <li class="rosetta__list-item--ordered">Sum the values in the right-hand column that remain to produce the result of multiplying the original two numbers together</li></ol>
/// <br>
/// <p class="rosetta__paragraph"><span class="rosetta__text--bold">For example:</span>  17 &times; 34</p>
/// <p class="rosetta__paragraph">17    34</p>
/// <p class="rosetta__paragraph">Halving the first column:</p>
/// <p class="rosetta__paragraph">17    34</p>
/// <p class="rosetta__paragraph">8</p>
/// <p class="rosetta__paragraph">4</p>
/// <p class="rosetta__paragraph">2</p>
/// <p class="rosetta__paragraph">1</p>
/// <p class="rosetta__paragraph">Doubling the second column:</p>
/// <p class="rosetta__paragraph">17    34</p>
/// <p class="rosetta__paragraph">8    68</p>
/// <p class="rosetta__paragraph">4   136</p>
/// <p class="rosetta__paragraph">2   272</p>
/// <p class="rosetta__paragraph">1   544</p>
/// <p class="rosetta__paragraph">Strike-out rows whose first cell is even:</p>
/// <p class="rosetta__paragraph">17    34</p>
/// <p class="rosetta__paragraph">8    <strike>68</strike></p>
/// <p class="rosetta__paragraph">4   <strike>136</strike></p>
/// <p class="rosetta__paragraph">2   <strike>272</strike></p>
/// <p class="rosetta__paragraph">1   544</p>
/// <p class="rosetta__paragraph">Sum the remaining numbers in the right-hand column:</p>
/// <p class="rosetta__paragraph">17    34</p>
/// <p class="rosetta__paragraph">8    --</p>
/// <p class="rosetta__paragraph">4   ---</p>
/// <p class="rosetta__paragraph">2   ---</p>
/// <p class="rosetta__paragraph">1   544</p>
/// <p class="rosetta__paragraph">====</p>
/// <p class="rosetta__paragraph">578</p>
/// <p class="rosetta__paragraph">So 17 multiplied by 34, by the Ethiopian method is 578.</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">The task is to <span class="rosetta__text--bold">define three named functions</span>/methods/procedures/subroutines:</p>
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">one to <span class="rosetta__text--bold">halve an integer</span>,</li>
/// <li class="rosetta__list-item--ordered">one to <span class="rosetta__text--bold">double an integer</span>, and</li>
/// <li class="rosetta__list-item--ordered">one to <span class="rosetta__text--bold">state if an integer is even</span>.</li></ol>
/// <br>
/// <p class="rosetta__paragraph">Use these functions to <span class="rosetta__text--bold">create a function that does Ethiopian multiplication</span>.</p>
/// </div>

/// challengeSeed:
function eth_mult (a, b) {
  // Good luck!
}

/// solutions:
function eth_mult(a, b) {
  let sum = 0; a = [a]; b = [b];

  let half = a => a / 2,
    double = a => a * 2,
    is_even = a => a % 2 == 0;

  while (a[0] !== 1) {
    a.unshift(Math.floor(half(a[0])));
    b.unshift(double(b[0]));
  }

  for (let i = a.length - 1; i > 0; i -= 1) {
    if (!is_even(a[i])) {
      sum += b[i];
    }
  }
  return sum + b[0];
}
/// tests:
assert(typeof eth_mult === 'function', 'message: <code>eth_mult</code> is a function.');
assert.equal(eth_mult(17, 34), 578, 'message: <code>eth_mult(17,34)</code> should return <code>578</code>.');
assert.equal(eth_mult(23, 46), 1058, 'message: <code>eth_mult(23,46)</code> should return <code>1058</code>.');
assert.equal(eth_mult(12, 27), 324, 'message: <code>eth_mult(12,27)</code> should return <code>324</code>.');
assert.equal(eth_mult(56, 98), 5488, 'message: <code>eth_mult(56,98)</code> should return <code>5488</code>.');
assert.equal(eth_mult(63, 74), 4662, 'message: <code>eth_mult(63,74)</code> should return <code>4662</code>.');
/// id: 599d1566a02b571412643b84
