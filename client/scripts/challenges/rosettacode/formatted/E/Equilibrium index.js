
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Equilibrium index
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">An equilibrium index of a sequence is an index into the sequence such that the sum of elements at lower indices is equal to the sum of elements at higher indices.</p>
/// <br/><p class="rosetta__paragraph">For example, in a sequence  <big>$A$</big>:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">::::  <big>$A_0 = -7$</big></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::::  <big>$A_1 =  1$</big></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::::  <big>$A_2 =  5$</big></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::::  <big>$A_3 =  2$</big></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::::  <big>$A_4 = -4$</big></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::::  <big>$A_5 =  3$</big></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::::  <big>$A_6 =  0$</big></span></p><br/><p class="rosetta__paragraph">3  is an equilibrium index, because:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">::::  <big>$A_0 + A_1 + A_2 = A_4 + A_5 + A_6$</big></span></p><br/><p class="rosetta__paragraph">6  is also an equilibrium index, because:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">::::  <big>$A_0 + A_1 + A_2 + A_3 + A_4 + A_5 = 0$</big></span></p><br/><p class="rosetta__paragraph">(sum of zero elements is zero)</p><br/><p class="rosetta__paragraph">7  is not an equilibrium index, because it is not a valid index of sequence <big>$A$</big>.</p>
/// <br/>
/// <p class="rosetta__paragraph">Write a function that, given a sequence, returns its equilibrium indices (if any).</p><br/><p class="rosetta__paragraph">Assume that the sequence may be very long.</p>
/// <br><br><br/></div>

/// challengeSeed:
function equilibrium (a) {
  // Good luck!
}

/// solutions:
function equilibrium(a) {
  let N = a.length,
    i,
    l = [],
    r = [],
    e = [];
  for (l[0] = a[0], r[N - 1] = a[N - 1], i = 1; i < N; i++)
    { l[i] = l[i - 1] + a[i], r[N - i - 1] = r[N - i] + a[N - i - 1]; }
  for (i = 0; i < N; i++)
    { if (l[i] === r[i]) e.push(i); }
  return e;
}

/// tail:
const tests =
  [[-7, 1, 5, 2, -4, 3, 0], // 3, 6
  [2, 4, 6], // empty
  [2, 9, 2], // 1
  [1, -1, 1, -1, 1, -1, 1], // 0,1,2,3,4,5,6
  [1], // 0
  [] // empty
  ];
const ans = [[3, 6], [], [1], [0, 1, 2, 3, 4, 5, 6], [0], []];

/// tests:
assert(typeof equilibrium === 'function', 'message: <code>equilibrium</code> is a function.');
assert.deepEqual(equilibrium(tests[0]), ans[0], 'message: <code>equilibrium([-7, 1, 5, 2, -4, 3, 0])</code> should return <code>[3,6]</code>.');
assert.deepEqual(equilibrium(tests[1]), ans[1], 'message: <code>equilibrium([2, 4, 6])</code> should return <code>[]</code>.');
assert.deepEqual(equilibrium(tests[2]), ans[2], 'message: <code>equilibrium([2, 9, 2])</code> should return <code>[1]</code>.');
assert.deepEqual(equilibrium(tests[3]), ans[3], 'message: <code>equilibrium([1, -1, 1, -1, 1, -1, 1])</code> should return <code>[0,1,2,3,4,5,6]</code>.');
assert.deepEqual(equilibrium(tests[4]), ans[4], 'message: <code>equilibrium([1])</code> should return <code>[0]</code>.');
assert.deepEqual(equilibrium(tests[5]), ans[5], 'message: <code>equilibrium([])</code> should return <code>[]</code>.');
/// id: 5987fd532b954e0f21b5d3f6
