/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-param-reassign: 0 */
/* eslint no-mixed-operators: 0 */

const assert = require('assert');

/// title: Hailstone sequence
/// type: rosetta-code

/// categories:

/// difficulty: 2

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">The Hailstone sequence of numbers can be generated from a starting positive integer,  n  by:</p>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered"> If  n  is   <span class="rosetta__text--bold">1</span>   then the sequence ends.</li>
/// <li class="rosetta__list-item--unordered"> If  n  is  <span class="rosetta__text--bold">even</span> then the next  n  of the sequence <code> = n/2 </code></li>
/// <li class="rosetta__list-item--unordered"> If  n  is  <span class="rosetta__text--bold">odd</span>   then the next  n  of the sequence <code> = (3 * n) + 1 </code></li></ul><br/><p class="rosetta__paragraph">The (unproven) <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Collatz conjecture" title="wp: Collatz conjecture">Collatz conjecture</a> is that the hailstone sequence for any starting number always terminates.</p>
/// <br/><p class="rosetta__paragraph">The hailstone sequence is also known as <span class="rosetta__text--italic">hailstone numbers</span> (because the values are usually subject to multiple descents and ascents like hailstones in a cloud), or as the <span class="rosetta__text--italic">Collatz sequence</span>.</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Create a routine to generate the hailstone sequence for a number.</li>
/// <li class="rosetta__list-item--ordered">Use the routine to show that the hailstone sequence for the number 27 has 112 elements starting with <code>27, 82, 41, 124</code> and ending with <code>8, 4, 2, 1</code></li>
/// <li class="rosetta__list-item--ordered">Show the number less than 100,000 which has the longest hailstone sequence together with that sequence's length.<br>   (But don't show the actual sequence!)</li></ol><br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">See also:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered"> <a class="rosetta__link--wiki" href="http://xkcd.com/710" title="link: http://xkcd.com/710">xkcd</a> (humourous).</li></ul></div>

/// challengeSeed:
// noprotect
function hailstoneSequence () {
  const res = [];
  // Good luck!

  return res;
}

/// solutions:
// noprotect
function hailstoneSequence () {
  const res = [];

  function hailstone(n) {
    const seq = [n];
    while (n > 1) {
      n = n % 2 ? 3 * n + 1 : n / 2;
      seq.push(n);
    }
    return seq;
  }

  const h = hailstone(27);
  const hLen = h.length;
  res.push([...h.slice(0, 4), ...h.slice(hLen - 4, hLen)]);

  let n = 0;
  let max = 0;
  for (let i = 100000; --i;) {
    const seq = hailstone(i);
    const sLen = seq.length;

    if (sLen > max) {
      n = i;
      max = sLen;
    }
  }
  res.push([max, n]);

  return res;
}

/// tail:
const res = [[27, 82, 41, 124, 8, 4, 2, 1], [351, 77031]];

/// tests:
assert(typeof hailstoneSequence === 'function', 'message: <code>hailstoneSequence</code> is a function.');
assert.deepEqual(hailstoneSequence(), res, 'message: <code>hailstoneSequence()</code> should return <code>[[27,82,41,124,8,4,2,1], [351, 77031]]</code>');
/// id: 595608ff8bcd7a50bd490181
