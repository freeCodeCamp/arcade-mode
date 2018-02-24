
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Generate lower case ASCII alphabet
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// benchmark:

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function to generate an array of lower case ASCII characters, for a given range. For example: for range 1 to 4 the function should return <code>['a','b','c','d']</code>.</p></div>

/// challengeSeed:
function lascii (cFrom, cTo) {
  // Good luck!
}

/// solutions:
function lascii(cFrom, cTo) {

  function cRange(cFrom, cTo) {
    var iStart = cFrom.charCodeAt(0);

    return Array.apply(
      null, Array(cTo.charCodeAt(0) - iStart + 1)
    ).map(function (_, i) {

      return String.fromCharCode(iStart + i);

    });
  }

  return cRange(cFrom, cTo);

}

/// tail:
let results=[
  [ 'a', 'b', 'c', 'd' ],
  [ 'c', 'd', 'e', 'f', 'g', 'h', 'i' ],
  [ 'm', 'n', 'o', 'p', 'q' ],
  [ 'k', 'l', 'm', 'n' ],
  [ 't', 'u', 'v', 'w', 'x', 'y', 'z' ]
]

/// tests:
assert(typeof lascii=='function','message: <code>lascii</code> should be a function.');
assert(Array.isArray(lascii('a','d')),'message: <code>lascii("a","d")</code> should return an array.');
assert.deepEqual(lascii("a","d"),results[0],"message: <code>lascii('a','d')</code> should return <code>[ 'a', 'b', 'c', 'd' ]</code>.");
assert.deepEqual(lascii("c","i"),results[1],"message: <code>lascii('c','i')</code> should return <code>[ 'c', 'd', 'e', 'f', 'g', 'h', 'i' ]</code>.");
assert.deepEqual(lascii("m","q"),results[2],"message: <code>lascii('m','q')</code> should return <code>[ 'm', 'n', 'o', 'p', 'q' ]</code>.");
assert.deepEqual(lascii("k","n"),results[3],"message: <code>lascii('k','n')</code> should return <code>[ 'k', 'l', 'm', 'n' ]</code>.");
assert.deepEqual(lascii("t","z"),results[4],"message: <code>lascii('t','z')</code> should return <code>[ 't', 'u', 'v', 'w', 'x', 'y', 'z' ]</code>.");
/// id: 5a23c84252665b21eecc7e7a
