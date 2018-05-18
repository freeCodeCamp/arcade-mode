
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Jaro distance
/// type: rosetta-code

/// categories:


/// difficulty: 3

/// description:
/// <div class="rosetta"><p class="rosetta__paragraph">The Jaro distance is a measure of similarity between two strings.</p><p class="rosetta__paragraph">The higher the Jaro distance for two strings is, the more similar the strings are.</p><p class="rosetta__paragraph">The score is normalized such that  <span class="rosetta__text--bold">0</span>  equates to no similarity and  <span class="rosetta__text--bold">1</span>  is an exact match.</p>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Definition</dt></dl><p class="rosetta__paragraph">The Jaro distance  $d_j$  of two given strings  $s_1$  and  $s_2$  is</p><p class="rosetta__paragraph">$d_j$=\begin{array}{l l}0&amp;{\text{if }}m=0\\{\frac {1}{3}}\left({\frac {m}{|s_{1}|}}+{\frac {m}{|s_{2}|}}+{\frac {m-t}{m}}\right)&amp;{\text{otherwise}}\end{array}</p><p class="rosetta__paragraph">Where:</p><ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">$m$  is the number of <span class="rosetta__text--italic">matching characters</span>;</li>
/// <li class="rosetta__list-item--unordered">$t$  is half the number of <span class="rosetta__text--italic">transpositions</span>.</li></ul><p class="rosetta__paragraph">Two characters from  $s_1$  and  $s_2$  respectively, are considered <span class="rosetta__text--italic">matching</span> only if they are the same and not farther than  $\left\lfloor\frac{\max(|s_1|,|s_2|)}{2}\right\rfloor-1$.</p><p class="rosetta__paragraph">Each character of  $s_1$  is compared with all its matching</p>
/// <p class="rosetta__paragraph">characters in  $s_2$.</p><p class="rosetta__paragraph">The number of matching (but different sequence order) characters</p>
/// <p class="rosetta__paragraph">divided by 2 defines the number of <span class="rosetta__text--italic">transpositions</span>.</p>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Example</dt></dl><p class="rosetta__paragraph">Given the strings  $s_1$  <span class="rosetta__text--italic">DWAYNE</span>  and  $s_2$  <span class="rosetta__text--italic">DUANE</span>  we find:</p><ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">$m = 4$</li>
/// <li class="rosetta__list-item--unordered">$|s_1| = 6$</li>
/// <li class="rosetta__list-item--unordered">$|s_2| = 5$</li>
/// <li class="rosetta__list-item--unordered">$t = 0$</li></ul><p class="rosetta__paragraph">We find a Jaro score of:</p><p class="rosetta__paragraph"><span class="rosetta__text--indented"> $d_j = \frac{1}{3}\left(\frac{4}{6} + \frac{4}{5} + \frac{4-0}{4}\right) = 0.822$</span></p><p class="rosetta__paragraph">Write a function a that takes two strings as parameters and returns the associated Jaro distance</p></div>

/// challengeSeed:
function jaro (s,t) {
  // Good luck!
}

/// solutions:
function jaro(s, t) {
  var s_len = s.length;
  var t_len = t.length;

  if (s_len == 0 && t_len == 0) return 1;

  var match_distance = Math.max(s_len, t_len) / 2 - 1;

  var s_matches = new Array(s_len);
  var t_matches = new Array(t_len);

  var matches = 0;
  var transpositions = 0;

  for (var i = 0; i < s_len; i++) {
    var start = Math.max(0, i - match_distance);
    var end = Math.min(i + match_distance + 1, t_len);

    for (var j = start; j < end; j++) {
      if (t_matches[j]) continue;
      if (s.charAt(i) != t.charAt(j)) continue;
      s_matches[i] = true;
      t_matches[j] = true;
      matches++;
      break;
    }
  }

  if (matches == 0) return 0;

  var k = 0;
  for (var i = 0; i < s_len; i++) {
    if (!s_matches[i]) continue;
    while (!t_matches[k]) k++;
    if (s.charAt(i) != t.charAt(k)) transpositions++;
    k++;
  }

  return ((matches / s_len) +
    (matches / t_len) +
    ((matches - transpositions / 2.0) / matches)) / 3.0;
}

/// tail:
let tests=[
  ["MARTHA", "MARHTA"],
  ["DIXON", "DICKSONX"],
  ["JELLYFISH", "SMELLYFISH"],
  ["HELLOS", "CHELLO"],
  ["ABCD", "BCDA"]
]

let results=[
  0.9444444444444445,
  0.7666666666666666,
  0.8962962962962964,
  0.888888888888889,
  0.8333333333333334
]

/// tests:
assert(typeof jaro=='function','message: <code>jaro</code> should be a function.');
assert(typeof jaro(tests[0][0],tests[0][1])=='number','message: <code>jaro()</code> should return a number.');
assert.equal(jaro(tests[0][0],tests[0][1]),results[0],'message: <code>jaro("'+tests[0][0]+'","'+tests[0][1]+'")</code> should return <code>'+results[0]+'</code>.');
assert.equal(jaro(tests[1][0],tests[1][1]),results[1],'message: <code>jaro("'+tests[1][0]+'","'+tests[1][1]+'")</code> should return <code>'+results[1]+'</code>.');
assert.equal(jaro(tests[2][0],tests[2][1]),results[2],'message: <code>jaro("'+tests[2][0]+'","'+tests[2][1]+'")</code> should return <code>'+results[2]+'</code>.');
assert.equal(jaro(tests[3][0],tests[3][1]),results[3],'message: <code>jaro("'+tests[3][0]+'","'+tests[3][1]+'")</code> should return <code>'+results[3]+'</code>.');
assert.equal(jaro(tests[4][0],tests[4][1]),results[4],'message: <code>jaro("'+tests[4][0]+'","'+tests[4][1]+'")</code> should return <code>'+results[4]+'</code>.');
/// id: 5a23c84252665b21eecc7ec2
