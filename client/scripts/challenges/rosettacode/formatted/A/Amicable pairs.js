
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-bitwise: 0 */

const assert = require('chai').assert;

/// title: Amicable pairs
/// type: rosetta-code

/// categories:


/// difficulty: 4

/// benchmark:

/// description:
/// Two integers $N$ and $M$ are said to be <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Amicable numbers" title="wp: Amicable numbers">amicable pairs</a> if $N \neq M$ and the sum of the <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Proper divisors" title="Proper divisors">proper divisors</a> of $N$ ($\mathrm{sum}(\mathrm{propDivs}(N))$) $= M$ as well as $\mathrm{sum}(\mathrm{propDivs}(M)) = N$.
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Example:</dt></dl>
/// <span class="rosetta__text--bold">1184</span> and <span class="rosetta__text--bold">1210</span> are an amicable pair, with proper divisors:
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered">&nbsp; 1, 2, 4, 8, 16, 32, 37, 74, 148, 296, 592 &nbsp; and </li>
/// <li class="rosetta__list-item--unordered">&nbsp; 1, 2, 5, 10, 11, 22, 55, 110, 121, 242, 605  &nbsp; respectively.</li>
/// </ul>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// Calculate and show here the Amicable pairs below 20,000; (there are eight).
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Related tasks</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered"><a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Proper divisors" title="Proper divisors">Proper divisors</a></li>
/// <li class="rosetta__list-item--unordered"><a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Abundant, deficient and perfect number classifications" title="Abundant, deficient and perfect number classifications">Abundant, deficient and perfect number classifications</a></li>
/// <li class="rosetta__list-item--unordered"><a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Aliquot sequence classifications" title="Aliquot sequence classifications">Aliquot sequence classifications</a> and its amicable <span class="rosetta__text--italic">classification</span>.</li></ul>

/// challengeSeed:
function amicablePairsUpTo (maxNum) {
  // Good luck!
  return true;
}

/// solutions:
// amicablePairsUpTo :: Int -> [(Int, Int)]
function amicablePairsUpTo (maxNum) {
  return range(1, maxNum)
    .map(x => properDivisors(x)
      .reduce((a, b) => a + b, 0))
    .reduce((a, m, i, lst) => {
      const n = i + 1;

      return (m > n) && lst[m - 1] === n ?
        a.concat([
          [n, m]
        ]) : a;
    }, []);
}

// properDivisors :: Int -> [Int]
function properDivisors (n) {
  if (n < 2) return [];

  const rRoot = Math.sqrt(n);
  const intRoot = Math.floor(rRoot);
  const blnPerfectSquare = rRoot === intRoot;
  const lows = range(1, intRoot)
  .filter(x => (n % x) === 0);

  return lows.concat(lows.slice(1)
    .map(x => n / x)
    .reverse()
    .slice(blnPerfectSquare | 0));
}

// Int -> Int -> Maybe Int -> [Int]
function range (m, n, step) {
  const d = (step || 1) * (n >= m ? 1 : -1);

  return Array.from({
    length: Math.floor((n - m) / d) + 1
  }, (_, i) => m + (i * d));
}

/// tail:
const answer300 = [[220, 284]];
const answer3000 = [
  [220, 284],
  [1184, 1210],
  [2620, 2924]
];
const answer20000 = [
  [220, 284],
  [1184, 1210],
  [2620, 2924],
  [5020, 5564],
  [6232, 6368],
  [10744, 10856],
  [12285, 14595],
  [17296, 18416]
];

/// tests:
assert(typeof amicablePairsUpTo === 'function', 'message: <code>amicablePairsUpTo</code> is a function.');
assert.deepEqual(amicablePairsUpTo(300), answer300, 'message: <code>amicablePairsUpTo(300)</code> should return <code>[[220,284]]</code>.');
assert.deepEqual(amicablePairsUpTo(3000), answer3000, 'message: <code>amicablePairsUpTo(3000)</code> should return <code>[[220,284],[1184,1210],[2620,2924]]</code>.');
assert.deepEqual(amicablePairsUpTo(20000), answer20000, 'message: <code>amicablePairsUpTo(20000)</code> should return <code>[[220,284],[1184,1210],[2620,2924],[5020,5564],[6232,6368],[10744,10856],[12285,14595],[17296,18416]]</code>.');
/// id: 5949b579404977fbaefcd737
