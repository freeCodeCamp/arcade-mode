
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

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">This task is a variation of the <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/The Nine Billion Names of God#Plot_summary" title="wp: The Nine Billion Names of God#Plot_summary">short story by Arthur C. Clarke</a>.</p><br/>
/// <p class="rosetta__paragraph">(Solvers should be aware of the consequences of completing this task.)</p><br/>
/// <p class="rosetta__paragraph">In detail, to specify what is meant by a  “name”:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">The integer 1 has 1 name “1”.</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">The integer 2 has 2 names “1+1”, and “2”.</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">The integer 3 has 3 names “1+1+1”, “2+1”,  and “3”.</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">The integer 4 has 5 names “1+1+1+1”, “2+1+1”, “2+2”, “3+1”, “4”.</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">The integer 5 has 7 names “1+1+1+1+1”, “2+1+1+1”, “2+2+1”, “3+1+1”, “3+2”, “4+1”, “5”.</span></p><br/>
/// <p class="rosetta__paragraph">This can be visualized in the following form:</p>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
///           1
///         1   1
///       1   1   1
///     1   2   1   1
///   1   2   2   1   1
/// 1   3   3   2   1   1
/// </pre></div>
/// <p class="rosetta__paragraph">Where row  $n$  corresponds to integer  $n$,  and each column  $C$  in row  $m$  from left to right corresponds to the number of names beginning with $C$.</p>
/// <p class="rosetta__paragraph">Optionally note that the sum of the  $n$-th  row  $P(n)$  is the   <a class="rosetta__link--wiki" href="http://mathworld.wolfram.com/PartitionFunctionP.html" title="link: http://mathworld.wolfram.com/PartitionFunctionP.html">integer partition function</a>.</p>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task</dt></dl>
/// <p class="rosetta__paragraph">Implement a function that returns the sum of the  $n$-th  row.</p>
/// </div>

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
