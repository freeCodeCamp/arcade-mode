/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-param-reassign: 0 */
/* eslint no-shadow: 0 */

const assert = require('chai').assert;

/// title: Hofstadter Figure-Figure sequences
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// benchmark:
Promise.resolve(() => ffr(100000))
  .then(() => ffs(100000));

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">These two sequences of positive integers are defined as:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"><big>$$R(1)=1\ ;\ S(1)=2 \\R(n)=R(n-1)+S(n-1), \quad n>1.$$</big></span></p><br/>
/// <p class="rosetta__paragraph">The sequence <big>$S(n)$</big> is further defined as the sequence of positive integers <span class="rosetta__text--bold"><span class="rosetta__text--italic">not</span></span> present in <big>$R(n)$</big>.</p><br/><p class="rosetta__paragraph">Sequence <big>$R$</big> starts:</p>
/// <p class="rosetta__paragraph">1, 3, 7, 12, 18, ...</p>
/// <p class="rosetta__paragraph">Sequence <big>$S$</big> starts:</p>
/// <p class="rosetta__paragraph">2, 4, 5, 6, 8, ...</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Create two functions named <span class="rosetta__text--bold">ffr</span> and <span class="rosetta__text--bold">ffs</span> that when given <span class="rosetta__text--bold">n</span> return <span class="rosetta__text--bold">R(n)</span> or <span class="rosetta__text--bold">S(n)</span> respectively.<br>(Note that R(1) = 1 and S(1) = 2 to avoid off-by-one errors).</li>
/// <li class="rosetta__list-item--ordered">No maximum value for <span class="rosetta__text--bold">n</span> should be assumed.</li>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">Sloane's <a class="rosetta__link--wiki" href="http://oeis.org/A005228" title="link: http://oeis.org/A005228">A005228</a> and <a class="rosetta__link--wiki" href="http://oeis.org/A030124" title="link: http://oeis.org/A030124">A030124</a>.</li>
/// <li class="rosetta__list-item--unordered"><a class="rosetta__link--wiki" href="http://mathworld.wolfram.com/HofstadterFigure-FigureSequence.html" title="link: http://mathworld.wolfram.com/HofstadterFigure-FigureSequence.html">Wolfram MathWorld</a></li>
/// <li class="rosetta__list-item--unordered">Wikipedia: <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Hofstadter_sequence#Hofstadter_Figure-Figure_sequences" title="wp: Hofstadter_sequence#Hofstadter_Figure-Figure_sequences">Hofstadter Figure-Figure sequences</a>.</li></ul><br/></div>

/// challengeSeed:
// noprotect
function ffr(n) {
  return n;
}

function ffs(n) {
  return n;
}

/// solutions:
// noprotect
const R = [null, 1];
const S = [null, 2];

function extendSequences (n) {
  let current = Math.max(R[R.length - 1], S[S.length - 1]);
  let i;
  while (R.length <= n || S.length <= n) {
    i = Math.min(R.length, S.length) - 1;
    current += 1;
    if (current === R[i] + S[i]) {
      R.push(current);
    } else {
      S.push(current);
    }
  }
}

function ffr (n) {
  extendSequences(n);
  return R[n];
}

function ffs (n) {
  extendSequences(n);
  return S[n];
}

/// tail:
const ffrParamRes = [[10, 69], [50, 1509], [100, 5764], [1000, 526334]];
const ffsParamRes = [[10, 14], [50, 59], [100, 112], [1000, 1041]];


/// tests:
assert(typeof ffr === 'function', 'message: <code>ffr</code> is a function.');
assert(typeof ffs === 'function', 'message: <code>ffs</code> is a function.');
assert.isNumber(ffr(1), 'message: <code>ffr</code> should return integer.');
assert.isNumber(ffs(1), 'message: <code>ffs</code> should return integer.');
assert.equal(ffr(ffrParamRes[0][0]), ffrParamRes[0][1], 'message: <code>ffr()</code> should return <code>69</code>');
assert.equal(ffr(ffrParamRes[1][0]), ffrParamRes[1][1], 'message: <code>ffr()</code> should return <code>1509</code>');
assert.equal(ffr(ffrParamRes[2][0]), ffrParamRes[2][1], 'message: <code>ffr()</code> should return <code>5764</code>');
assert.equal(ffr(ffrParamRes[3][0]), ffrParamRes[3][1], 'message: <code>ffr()</code> should return <code>526334</code>');
assert.equal(ffs(ffsParamRes[0][0]), ffsParamRes[0][1], 'message: <code>ffs()</code> should return <code>14</code>');
assert.equal(ffs(ffsParamRes[1][0]), ffsParamRes[1][1], 'message: <code>ffs()</code> should return <code>59</code>');
assert.equal(ffs(ffsParamRes[2][0]), ffsParamRes[2][1], 'message: <code>ffs()</code> should return <code>112</code>');
assert.equal(ffs(ffsParamRes[3][0]), ffsParamRes[3][1], 'message: <code>ffs()</code> should return <code>1041</code>');

/// id: 59622f89e4e137560018a40e
