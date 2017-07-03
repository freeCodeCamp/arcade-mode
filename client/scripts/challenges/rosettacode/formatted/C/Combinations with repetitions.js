
/// WIP

/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Combinations with repetitions
/// type: rosetta-code

/// categories:


/// difficulty: ?

/// benchmark:
replaceWithActualFunctionHere;

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">The set of combinations with repetitions is computed from a set, $S$ (of cardinality $n$), and a size of resulting selection, $k$, by reporting the sets of cardinality $k$ where each member of those sets is chosen from $S$.</p>
/// <p class="rosetta__paragraph">In the real world, it is about choosing sets where there is a “large” supply of each type of element and where the order of choice does not matter.</p>
/// <p class="rosetta__paragraph">For example:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">Q: How many ways can a person choose two doughnuts from a store selling three types of doughnut: iced, jam, and plain? (i.e., $S$ is $\{\mathrm{iced}, \mathrm{jam}, \mathrm{plain}\}$, $|S| = 3$, and $k = 2$.)</span></p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">A: 6: {iced, iced}; {iced, jam}; {iced, plain}; {jam, jam}; {jam, plain}; {plain, plain}.</span></p><br/><p class="rosetta__paragraph"><small>Note that both the order of items within a pair, and the order of the pairs given in the answer is not significant; the pairs represent multisets.</small></p>
/// <br><small>Also note that <span class="rosetta__text--italic">doughnut</span> can also be spelled <span class="rosetta__text--italic">donut</span>.</small> 
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">Write a function/program/routine/.. to generate all the combinations with repetitions of $n$ types of things taken $k$ at a time and use it to <span class="rosetta__text--italic">show</span> an answer to the doughnut example above.</li>
/// <li class="rosetta__list-item--unordered">For extra credit, use the function to compute and show <span class="rosetta__text--italic">just the number of ways</span> of choosing three doughnuts from a choice of ten types of doughnut. Do not show the individual choices for this part.</li></ul><br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">References:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered"><a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Combination" title="wp: Combination">k-combination with repetitions</a></li></ul><br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">See also:</dt></dl><br/><br><br><br/></div>

/// challengeSeed:
function replaceMe (foo) {
  // Good luck!
  return true;
}

/// solutions:
function testing () {

  // n -> [a] -> [[a]]
  function combsWithRep(n, lst) {
    return n ? (
      lst.length ? combsWithRep(n - 1, lst).map(function (t) {
        return [lst[0]].concat(t);
      }).concat(combsWithRep(n, lst.slice(1))) : []
    ) : [[]];
  };

  // If needed, we can derive a significantly faster version of
  // the simple recursive function above by memoizing it

  // f -> f
  function memoized(fn) {
    m = {};
    return function (x) {
      var args = [].slice.call(arguments),
        strKey = args.join('-');

      v = m[strKey];
      if ('u' === (typeof v)[0])
        m[strKey] = v = fn.apply(null, args);
      return v;
    }
  }

  // [m..n]
  function range(m, n) {
    return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
      return m + i;
    });
  }


  return [

      combsWithRep(2, ["iced", "jam", "plain"]),

    // obtaining and applying a memoized version of the function
      memoized(combsWithRep)(3, range(1, 10)).length
    ];

}

/// tail:
const replaceThis = 3;

/// tests:
assert(typeof replaceMe === 'function', 'message: <code>replaceMe</code> is a function.');
/// id: 595acdb120eaa61dea6ce20f
