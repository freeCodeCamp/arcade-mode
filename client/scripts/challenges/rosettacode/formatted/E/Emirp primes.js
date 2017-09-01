
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Emirp primes
/// type: rosetta-code

/// categories:


/// difficulty: 4

/// benchmark:
emirps(10000);

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">An  <span class="rosetta__text--italic">emirp</span>  (<span class="rosetta__text--bold">prime</span> spelled backwards)  are primes that when reversed  (in their decimal representation)  are a different prime.</p>
/// <p class="rosetta__paragraph">Write a function that should be able to : <ul><li>Show the first <b>n</b> eprimes numbers.</li><li>Show the eprimes numbers in a range.</li><li>Show the number of eprimes in a range.</li><li>Show the <b>n<sup>th</sup></b> eprimes number.</li></ul><p>The function should have two paramters. The first will recieve <b>n</b> or the range as an array. The second will recieve a boolean, that specifies if the function returns the eprimes as an array or a single number(the number of primes in the range or the <b>n<sup>th</sup></b> prime). According to the parameters the function should return an array or a number.</div>


/// challengeSeed:
function emirps(n) {
  // Good luck!
}

/// solutions:
// noprotect
function emirps(num, showEmirps)
{
  const is_prime = function(n)
	{
    if (!(n % 2) || !(n % 3)) return false;
    let p = 1;
    while (p * p < n)
			        { if (n % (p += 4) == 0 || n % (p += 2) == 0)
			                { return false; } }
    return true;
  };
  const is_emirp = function(n) {
    const r = parseInt(n.toString().split('').reverse().join(''));
    return r != n && is_prime(n) && is_prime(r);
  };

  let i,
    arr = [];
  if (typeof num === 'number') {
    for (i = 0; arr.length < num; i++) if (is_emirp(i)) arr.push(i);
    // first x emirps
    if (showEmirps) return arr;
    // xth emirp
    return arr.pop();
  }

  if (Array.isArray(num)) {
    for (i = num[0]; i <= num[1]; i++) if (is_emirp(i)) arr.push(i);
    // emirps between x .. y
    if (showEmirps) return arr;
    // number of emirps between x .. y
    return arr.length;
  }
}

/// tests:
assert(typeof emirps === 'function', 'message: <code>emirps</code> is a function.');
assert.deepEqual(emirps(20, true), [13, 17, 31, 37, 71, 73, 79, 97, 107, 113, 149, 157, 167, 179, 199, 311, 337, 347, 359, 389], 'message:<code>emirps(20,true)</code> should return <code>[13,17,31,37,71,73,79,97,107,113,149,157,167,179,199,311,337,347,359,389]</code>');
assert.deepEqual(emirps(10000), 948349, 'message:<code>emirps(10000)</code> should return <code>948349</code>');
assert.deepEqual(emirps([7700, 8000], true), [7717, 7757, 7817, 7841, 7867, 7879, 7901, 7927, 7949, 7951, 7963], 'message:<code>emirps([7700,8000],true)</code> should return <code>[7717,7757,7817,7841,7867,7879,7901,7927,7949,7951,7963]</code>');
assert.deepEqual(emirps([7700, 8000], false), 11, 'message:<code>emirps([7700,8000],true)</code> should return <code>11</code>');
/// id: 599d0ba974141b0f508b37d5
