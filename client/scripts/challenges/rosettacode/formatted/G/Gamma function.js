
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Gamma function
/// type: rosetta-code

/// categories:


/// difficulty: 3

/// description:
/// <div class="rosetta"><p class="rosetta__paragraph">Implement one algorithm (or more) to compute the <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Gamma function" title="wp: Gamma function">Gamma</a> ($\Gamma$) function (in the real field only).</p><p class="rosetta__paragraph">The Gamma function can be defined as:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">::::: <big><big> $\Gamma(x) = \displaystyle\int_0^\infty t^{x-1}e^{-t} dt$</big></big></span></p></div>

/// challengeSeed:
function gamma (x) {
  // Good luck!
}

/// solutions:
function gamma(x) {
  var p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028,
  771.32342877765313, -176.61502916214059, 12.507343278686905,
  -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7
  ];
   
  var g = 7;
  if (x < 0.5) {
    return Math.PI / (Math.sin(Math.PI * x) * gamma(1 - x));
  }

  x -= 1;
  var a = p[0];
  var t = x + g + 0.5;
  for (var i = 1; i < p.length; i++) {
  a += p[i] / (x + i);
  }
   
  var result=Math.sqrt(2 * Math.PI) * Math.pow(t, x + 0.5) * Math.exp(-t) * a;

  return result;
}

/// tail:
let tests=[.1,.2,.3,.4,.5];
let results=[
  9.513507698668736,
  4.590843711998803,
  2.9915689876875904,
  2.218159543757687,
  1.7724538509055159
];

/// tests:
assert(typeof gamma=='function','message: <code>gamma</code> should be a function.');
assert(typeof gamma(tests[0])=='number','message: <code>gamma()</code> should return a type.');
assert.equal(gamma(tests[0]),results[0],'message: <code>gamma('+tests[0]+')</code> should return <code>'+results[0]+'</code>.');
assert.equal(gamma(tests[1]),results[1],'message: <code>gamma('+tests[1]+')</code> should return <code>'+results[1]+'</code>.');
assert.equal(gamma(tests[2]),results[2],'message: <code>gamma('+tests[2]+')</code> should return <code>'+results[2]+'</code>.');
assert.equal(gamma(tests[3]),results[3],'message: <code>gamma('+tests[3]+')</code> should return <code>'+results[3]+'</code>.');
assert.equal(gamma(tests[4]),results[4],'message: <code>gamma('+tests[4]+')</code> should return <code>'+results[4]+'</code>.');
/// id: 5a23c84252665b21eecc7e76
