
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Harshad or Niven series
/// type: rosetta-code

/// categories:

/// difficulty: 2

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">The <a class="rosetta__link--wiki" href="http://mathworld.wolfram.com/HarshadNumber.html" title="link: http://mathworld.wolfram.com/HarshadNumber.html">Harshad</a> or Niven numbers are positive integers ≥ 1 that are divisible by the sum of their digits.</p><br/><p class="rosetta__paragraph">For example,  <span class="rosetta__text--bold">42</span>  is a <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/oeis:A005349" title="oeis:A005349">Harshad number</a> as  <span class="rosetta__text--bold">42</span>  is divisible by  (<span class="rosetta__text--bold">4</span> + <span class="rosetta__text--bold">2</span>)  without remainder.</p>
/// <br>Assume that the series is defined as the numbers in increasing order.
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Implement a function to generate successive members of the Harshad sequence.</p><br/><p class="rosetta__paragraph">Use it to list the first twenty members of the sequence and list the first Harshad number greater than 1000.</p>
/// </div>

/// challengeSeed:
function isHarshadOrNiven () {
  const res = {
    firstTwenty: [],
    firstOver1000: undefined
  };
  // Change after this line

  return res;
}

/// solutions:
function isHarshadOrNiven() {
  const res = {
    firstTwenty: [],
    firstOver1000: undefined
  };

  function isHarshad(n) {
    let s = 0;
    const nStr = n.toString();
    for (let i = 0; i < nStr.length; ++i) {
      s += parseInt(nStr.charAt(i), 10);
    }
    return n % s === 0;
  }

  let count = 0;
  const harshads = [];

  for (let n = 1; count < 20; ++n) {
    if (isHarshad(n)) {
      count++;
      harshads.push(n);
    }
  }

  res.firstTwenty = harshads;

  let h = 1000;
  while (!isHarshad(++h));
  res.firstOver1000 = h;

  return res;
}

/// tail:
const res = {
  firstTwenty: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 18, 20, 21, 24, 27, 30, 36, 40, 42],
  firstOver1000: 1002
};

/// tests:
assert(typeof isHarshadOrNiven === 'function', 'message: <code>isHarshadOrNiven</code> is a function.');
assert.deepEqual(isHarshadOrNiven(), res, 'message: <code>isHarshadOrNiven()</code> should return <code>{"firstTwenty": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 18, 20, 21, 24, 27, 30, 36, 40, 42],"firstOver1000": 1002}</code>');
/// id: 595668ca4cfe1af2fb9818d4
