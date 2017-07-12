/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-sequences: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Zeckendorf number representation
/// type: rosetta-code
/// difficulty: 3

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">
/// Just as numbers can be represented in a
/// positional notation as sums of multiples of the powers of ten (decimal)
/// or two (binary); all the positive integers can be represented as the sum
/// of one or zero times the distinct members of the Fibonacci series.
/// </p>
/// <p class="rosetta__paragraph">
/// Recall that the first six distinct Fibonacci
/// numbers are:  <code>1, 2, 3, 5, 8, 13</code>. The decimal number eleven can
/// be written as <code>0*13 + 1*8 + 0*5 + 1*3 + 0*2 + 0*1</code> or
/// <code>010100</code> in positional notation where the columns represent
/// multiplication by a particular member of the sequence. Leading zeroes are
/// dropped so that 11 decimal becomes <code>10100</code>.
/// </p>
/// <p class="rosetta__paragraph">
/// 10100 is not the only way to make 11 from the Fibonacci numbers however
/// <code>0*13 + 1*8 + 0*5 + 0*3 + 1*2 + 1*1</code> or 010011 would also
/// represent decimal 11. For a true Zeckendorf number there is the added
/// restriction that ''no two consecutive Fibonacci numbers can be used''
/// which leads to the former unique solution.
/// </p>
/// <p class="rosetta__paragraph">
/// Write a function that generates and returns an array of first N Zeckendorf numbers in order.
/// </p>
/// </div>

/// challengeSeed:
function zeckendorf(n) {
  // good luck!
}

/// solutions:
// zeckendorf :: Int -> String
function zeckendorf(n) {
  const f = (m, x) => (m < x ? [m, 0] : [m - x, 1]);
  return (n === 0 ? ([0]) :
    mapAccumL(f, n, reverse(
      tail(fibUntil(n))
    ))[1]).join('');
}

// fibUntil :: Int -> [Int]
let fibUntil = n => {
  const xs = [];
  until(
      ([a]) => a > n,
      ([a, b]) => (xs.push(a), [b, a + b]), [1, 1]
  );
  return xs;
};

let mapAccumL = (f, acc, xs) => (
  xs.reduce((a, x) => {
    const pair = f(a[0], x);

    return [pair[0], a[1].concat(pair[1])];
  }, [acc, []])
);

let until = (p, f, x) => {
  let v = x;
  while (!p(v)) v = f(v);
  return v;
};

const tail = xs => (
   xs.length ? xs.slice(1) : undefined
);

const reverse = xs => xs.slice(0).reverse();

/// tail:
const range = (m, n) => (
  Array.from({
    length: Math.floor(n - m) + 1
  }, (_, i) => m + i)
);

const solution20 = [
  '1', '10', '100', '101', '1000', '1001', '1010', '10000', '10001',
  '10010', '10100', '10101', '100000', '100001', '100010', '100100', '100101',
  '101000', '101001', '101010'
];

const answer = range(1, 20).map(zeckendorf);

/// tests:
assert.equal(typeof zeckendorf, 'function', 'message: zeckendorf must be function');
assert.deepEqual(answer, solution20);
/// id: 594810f028c0303b75339ad6
