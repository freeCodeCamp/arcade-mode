
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-cond-assign: 0 */

const assert = require('chai').assert;

/// title: 9 billion names of God the integer
/// type: rosetta-code

/// categories:
/// math
/// integer partition

/// difficulty: 8

/// benchmark:

/// description:
/// This task is a variation of the <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/The Nine Billion Names of God#Plot_summary" title="wp: The Nine Billion Names of God#Plot_summary">short story by Arthur C. Clarke</a>.
/// (Solvers should be aware of the consequences of completing this task.)
/// In detail, to specify what is meant by a &nbsp; “name”:
/// <span class="rosetta__text--indented">The integer 1 has 1 name  &nbsp; &nbsp;  “1”.</span>
/// <span class="rosetta__text--indented">The integer 2 has 2 names &nbsp; “1+1”, &nbsp; and &nbsp; “2”.</span>
/// <span class="rosetta__text--indented">The integer 3 has 3 names &nbsp; “1+1+1”, &nbsp; “2+1”, &nbsp; and &nbsp; “3”.</span>
/// <span class="rosetta__text--indented">The integer 4 has 5 names &nbsp; “1+1+1+1”, &nbsp; “2+1+1”, &nbsp; “2+2”, &nbsp; “3+1”, &nbsp; “4”.</span>
/// <span class="rosetta__text--indented">The integer 5 has 7 names &nbsp; “1+1+1+1+1”, &nbsp; “2+1+1+1”, &nbsp; “2+2+1”, &nbsp; “3+1+1”, &nbsp; “3+2”, &nbsp; “4+1”, &nbsp; “5”.</span>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task</dt></dl>
/// Display the first 25 rows of a number triangle which begins:
/// <pre>
///                                       1
///                                     1   1
///                                   1   1   1
///                                 1   2   1   1
///                               1   2   2   1   1
///                             1   3   3   2   1   1
/// </pre>
/// Where row &nbsp; $n$ &nbsp; corresponds to integer &nbsp; $n$, &nbsp; and each column &nbsp; $C$ &nbsp; in row &nbsp; $m$ &nbsp; from left to right corresponds to the number of names beginning with &nbsp; $C$.
/// Your function &nbsp; $G(n)$ &nbsp; should return the sum of the &nbsp; $n$-th &nbsp; row.
/// Optionally note that the sum of the &nbsp; $n$-th &nbsp; row &nbsp; $P(n)$ &nbsp; is the &nbsp;  [http://mathworld.wolfram.com/PartitionFunctionP.html &nbsp; integer partition function].

/// challengeSeed:
function numberOfNames (num) {
  // Good luck!
  return true;
}

/// solutions:
function numberOfNames (num) {
  const cache = [
    [1]
  ];
  for (let l = cache.length; l < num + 1; l++) {
    let Aa;
    let Mi;
    const r = [0];
    for (let x = 1; x < l + 1; x++) {
      r.push(r[r.length - 1] + (Aa = cache[l - x < 0 ? cache.length - (l - x) : l - x])[(Mi = Math.min(x, l - x)) < 0 ? Aa.length - Mi : Mi]);
    }
    cache.push(r);
  }
  return cache[num][cache[num].length - 1];
}

/// tests:
assert(typeof numberOfNames === 'function', 'message: <code>numberOfNames</code> is a function.');
assert.equal(numberOfNames(5), 7, 'message: <code>numberOfNames(5)</code> should equal 7.');
assert.equal(numberOfNames(12), 77, 'message: <code>numberOfNames(12)</code> should equal 77.');
assert.equal(numberOfNames(18), 385, 'message: <code>numberOfNames(18)</code> should equal 385.');
assert.equal(numberOfNames(23), 1255, 'message: <code>numberOfNames(23)</code> should equal 1255.');
assert.equal(numberOfNames(42), 53174, 'message: <code>numberOfNames(42)</code> should equal 53174.');
assert.equal(numberOfNames(123), 2552338241, 'message: <code>numberOfNames(123)</code> should equal 2552338241.');
/// id: 5949b579404977fbaefcd736
