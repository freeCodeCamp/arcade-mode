
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Extensible prime generator
/// type: rosetta-code

/// categories:

/// benchmark:
primeGenerator(10000, false)

/// difficulty: 2

/// description:
/// <div class="rosetta"><br/>
/// <p class="rosetta__paragraph">Write a generator of prime numbers, in order, that will automatically adjust to accommodate the generation of any reasonably high prime.</p> The generator should be able to : <ul><li>Show the first <b>n</b> prime numbers.</li><li>Show the prime numbers in a range.</li><li>Show the number of primes in a range.</li><li>Show the <b>n<sup>th</sup></b> prime number.</li></ul><p>The function should have two paramters. The first will recieve <b>n</b> or the range as an array. The second will recieve a boolean, that specifies if the function returns the prime numbers as an array or a single number(the number of primes in the range or the <b>n<sup>th</sup></b> prime). According to the parameters the function should return an array.</div>

/// challengeSeed:
function primeGenerator (num, showPrimes) {
  // Good luck!
}

/// solutions:
function primeGenerator(num, showPrimes) {
  let i,
      arr = [];

  function isPrime(num) {
    // try primes <= 16
    if (num <= 16) return (
      num == 2 || num == 3 || num == 5 || num == 7 || num == 11 || num == 13
    );
    // cull multiples of 2, 3, 5 or 7
    if (num % 2 == 0 || num % 3 == 0 || num % 5 == 0 || num % 7 == 0)
      return false;
    // cull square numbers ending in 1, 3, 7 or 9
    for (var i = 10; i * i <= num; i += 10) {
      if (num % (i + 1) == 0) return false;
      if (num % (i + 3) == 0) return false;
      if (num % (i + 7) == 0) return false;
      if (num % (i + 9) == 0) return false;
    }
    return true;
  }

  if (typeof num == "number") {
    for (i = 0; arr.length < num; i++) if (isPrime(i)) arr.push(i);
    // first x primes
    if (showPrimes) return arr;
    // xth prime
    else return arr.pop();
  }

  if (Array.isArray(num)) {
    for (i = num[0]; i <= num[1]; i++) if (isPrime(i)) arr.push(i);
    // primes between x .. y
    if (showPrimes) return arr;
    // number of primes between x .. y
    else return arr.length;
  }
}

/// tests:
assert(typeof primeGenerator === 'function', 'message: <code>primeGenerator</code> is a function.');
assert.deepEqual(primeGenerator([100, 150], true),[ 101, 103, 107, 109, 113, 127, 131, 137, 139, 149 ],'message: <code>primeGenerator</code> is a function.');
assert.equal(primeGenerator([7700, 8000], false),30,'message: <code>primeGenerator</code> is a function.');
assert.equal(primeGenerator(10000, false),104729,'message: <code>primeGenerator</code> is a function.');
assert.deepEqual(primeGenerator(20, true),[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71],'message: <code>primeGenerator</code> is a function.');
/// id: 598ee8b91b410510ae82efef
