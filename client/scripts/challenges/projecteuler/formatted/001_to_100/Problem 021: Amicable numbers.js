
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 21: Amicable numbers
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">Let d(<span class="euler__text--italic">n</span>) be defined as the sum of proper divisors of <span class="euler__text--italic">n</span> (numbers less than <span class="euler__text--italic">n</span> which divide evenly into <span class="euler__text--italic">n</span>).</p>
/// <p class="euler__paragraph">If d(<span class="euler__text--italic">a</span>) = <span class="euler__text--italic">b</span> and d(<span class="euler__text--italic">b</span>) = <span class="euler__text--italic">a</span>, where <span class="euler__text--italic">a</span> ≠ <span class="euler__text--italic">b</span>, then <span class="euler__text--italic">a</span> and <span class="euler__text--italic">b</span> are an amicable pair and each of <span class="euler__text--italic">a</span> and <span class="euler__text--italic">b</span> are called amicable numbers.</p>
/// <p class="euler__paragraph">For example, the proper divisors of 220 are 1, 2, 4, 5, 10, 11, 20, 22, 44, 55 and 110; therefore d(220) = 284. The proper divisors of 284 are 1, 2, 4, 71 and 142; so d(284) = 220.</p>
/// <p class="euler__paragraph">Evaluate the sum of all the amicable numbers under 10000.</p></div>

/// challengeSeed:
// noprotect
function euler21() {
  // Good luck!
  return true;
}

euler21();

/// solutions:
// noprotect
function euler21() {
  function sumOfDivisors(num) {
    let i = 2;
    let sum = 1;
    while (i <= num ** 0.5) {
      if (num % i === 0) {
        sum += i;
        if (i !== num ** 0.5) {
          sum += num / i;
        }
      }
      i += 1;
    }
    return sum;
  }

  function findAmicablePairs(limit) {
    let i = 2;
    const amicablePairs = [];
    while (i < limit) {
      const sumOfDivs = sumOfDivisors(i);
      if (sumOfDivisors(sumOfDivs) === i && sumOfDivs !== i && amicablePairs.indexOf(i) < 0) {
        amicablePairs.push(i);
        amicablePairs.push(sumOfDivs);
      }
      i += 1;
    }
    return amicablePairs;
  }

  const amacablePairs = findAmicablePairs(10000);
  let sum = 0;
  amacablePairs.forEach(element => {
    sum += element;
  });
  return sum;
}

/// tail:

/// tests:
assert(typeof euler21 === 'function', 'message: <code>euler21()</code> is a function.');
assert.strictEqual(euler21(), 31626, 'message: <code>euler21()</code> should return 31626.');
/// id: 5900f3811000cf542c50fe94
