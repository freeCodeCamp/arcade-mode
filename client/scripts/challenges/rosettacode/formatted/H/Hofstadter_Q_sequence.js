/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Hofstadter Q sequence
/// type: rosetta-code

/// categories:


/// difficulty: 1

/// benchmark:
hofstadterQ(10000);

/// description:
/// <div class="rosetta"><p class="rosetta__paragraph">The <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Hofstadter_sequence#Hofstadter_Q_sequence" title="wp: Hofstadter_sequence#Hofstadter_Q_sequence">Hofstadter Q sequence</a> is defined as:</p>
/// <p class="rosetta__text--indented">$Q(1)=Q(2)=1, \\ Q(n)=Q\big(n-Q(n-1)\big)+Q\big(n-Q(n-2)), \quad n>2.$</p><br/>
/// <p class="rosetta__paragraph">It is defined like the <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Fibonacci sequence" title="Fibonacci sequence">Fibonacci sequence</a>, but whereas the next term in the Fibonacci sequence is the sum of the previous two terms, in the Q sequence the previous two terms tell you how far to go back in the Q sequence to find the two numbers to sum to make the next term of the sequence.</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <li class="rosetta__list-item--unordered">Implement the Hofstadter Q Sequence equation into JavaScript</li></ul><br/></div>

/// challengeSeed:
function hofstadterQ (n) {
  // Good luck!
  return n;
}

/// solutions:
function hofstadterQ (n) {
  const memo = [1, 1, 1];
  const Q = function (i) {
    let result = memo[i];
    if (typeof result !== 'number') {
      result = Q(i - Q(i - 1)) + Q(i - Q(i - 2));
      memo[i] = result;
    }
    return result;
  };
  return Q(n);
}

/// tail:
const testCase = [1000, 1500, 2000, 2500];
const res = [502, 755, 1005, 1261];

/// tests:
assert(typeof hofstadterQ === 'function', 'message: <code>hofstadterQ</code> is a function.');
assert(Number.isInteger(hofstadterQ(1000)), 'message: <code>hofstadterQ()</code> should return <code>integer</code>');
assert.equal(hofstadterQ(testCase[0]), res[0], 'message: <code>hofstadterQ(1000)</code> should return <code>502</code>');
assert.equal(hofstadterQ(testCase[1]), res[1], 'message: <code>hofstadterQ(1500)</code> should return <code>755</code>');
assert.equal(hofstadterQ(testCase[2]), res[2], 'message: <code>hofstadterQ(2000)</code> should return <code>1005</code>');
assert.equal(hofstadterQ(testCase[3]), res[3], 'message: <code>hofstadterQ(2500)</code> should return <code>1261</code>');
/// id: 59637c4d89f6786115efd814
