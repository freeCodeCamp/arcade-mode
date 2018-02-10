
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Fractran
/// type: rosetta-code

/// categories:


/// difficulty: 3


/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph"><span class="rosetta__text--bold"><a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/FRACTRAN" title="wp: FRACTRAN">FRACTRAN</a></span> is a Turing-complete esoteric programming language invented by the mathematician <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/John Horton Conway" title="wp: John Horton Conway">John Horton Conway</a>.</p><br/><p class="rosetta__paragraph">A FRACTRAN program is an ordered list of positive fractions $P = (f_1, f_2, \ldots, f_m)$, together with an initial positive integer input $n$.</p>
/// <br/><p class="rosetta__paragraph">The program is run by updating the integer $n$ as follows:</p><br/><ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">for the first fraction, $f_i$, in the list for which $nf_i$ is an integer, replace $n$ with $nf_i$ ;</li>
/// <li class="rosetta__list-item--unordered">repeat this rule until no fraction in the list produces an integer when multiplied by $n$, then halt.</li></ul>
/// <br>
/// <p class="rosetta__paragraph">Conway gave a program for primes in FRACTRAN:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented"> $17/91$, $78/85$, $19/51$, $23/38$, $29/33$, $77/29$, $95/23$, $77/19$, $1/17$, $11/13$, $13/11$, $15/14$, $15/2$, $55/1$</span></p><br/><p class="rosetta__paragraph">Starting with $n=2$, this FRACTRAN program will change $n$ to $15=2\times (15/2)$, then $825=15\times (55/1)$, generating the following sequence of integers:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented"> $2$, $15$, $825$, $725$, $1925$, $2275$, $425$, $390$, $330$, $290$, $770$, $\ldots$</span></p><br/><p class="rosetta__paragraph">After 2, this sequence contains the following powers of 2:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">$2^2=4$, $2^3=8$, $2^5=32$, $2^7=128$, $2^{11}=2048$, $2^{13}=8192$, $2^{17}=131072$, $2^{19}=524288$, $\ldots$</span></p><br/><p class="rosetta__paragraph">which are the prime powers of 2.</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Write a function that takes a fractran program as a string parameter and returns the first 10 numbers of the program as an array. If the result does not have 10 numbers then return the numbers as is.</p></div>

/// challengeSeed:
function fractran (progStr) {
  // Good luck!
}

/// solutions:
function fractran(progStr){
  var num = new Array();
  var den = new Array();
  var val ;
  var out="";
  function compile(prog){
    var regex = /\s*(\d*)\s*\/\s*(\d*)\s*(.*)/m;
    while(regex.test(prog)){
      num.push(regex.exec(prog)[1]);
      den.push(regex.exec(prog)[2]);
      prog = regex.exec(prog)[3];
    }
  }

  function step(val){
    var i=0;
    while(i<den.length && val%den[i] != 0) i++;
    return num[i]*val/den[i];
  }

  var seq=[]

  function exec(val){
    var i = 0;
    while(val && i<limit){
      seq.push(val)
      val = step(val);
      i ++;
    }
  }

  // Main
  compile(progStr);
  var limit = 10;
  exec(2);
  return seq;
}

/// tail:
let tests=[
  '3/2,1/3',
  '3/2,5/3,1/5',
  '3/2,6/3',
  '2/7,7/2',
  '17/91 78/85 19/51 23/38 29/33 77/29 95/23 77/19 1/17 11/13 13/11 15/14 15/2 55/1'
]
let results=[
  [ 2, 3, 1 ],
  [ 2, 3, 5, 1 ],
  [ 2, 3, 6, 9, 18, 27, 54, 81, 162, 243 ],
  [ 2, 7, 2, 7, 2, 7, 2, 7, 2, 7 ],
  [ 2, 15, 825, 725, 1925, 2275, 425, 390, 330, 290 ]
]

/// tests:
assert(typeof fractran=='function','message: <code>fractran</code> should be a function.');
assert(Array.isArray(fractran(tests[0])),'message: <code>fractran("'+tests[0]+'")</code> should return an array.');
assert.deepEqual(fractran(tests[0]),results[0],'message: <code>fractran("'+tests[0]+'")</code> should return <code>'+JSON.stringify(results[0])+'</code>.');
assert.deepEqual(fractran(tests[1]),results[1],'message: <code>fractran("'+tests[1]+'")</code> should return <code>'+JSON.stringify(results[1])+'</code>.');
assert.deepEqual(fractran(tests[2]),results[2],'message: <code>fractran("'+tests[2]+'")</code> should return <code>'+JSON.stringify(results[2])+'</code>.');
assert.deepEqual(fractran(tests[3]),results[3],'message: <code>fractran("'+tests[3]+'")</code> should return <code>'+JSON.stringify(results[3])+'</code>.');
assert.deepEqual(fractran(tests[4]),results[4],'message: <code>fractran("'+tests[4]+'")</code> should return <code>'+JSON.stringify(results[4])+'</code>.');
/// id: 5a7eeebf59c8b10bc15598dc
