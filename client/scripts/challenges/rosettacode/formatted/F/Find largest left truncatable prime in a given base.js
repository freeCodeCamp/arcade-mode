
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Find largest left truncatable prime in a given base
/// type: rosetta-code

/// categories:


/// difficulty: 4

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">A <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Truncatable primes" title="Truncatable primes">truncatable prime</a> is one where all non-empty substrings that finish at the end of the number (right-substrings) are also primes <span class="rosetta__text--italic">when understood as numbers in a particular base</span>. The largest such prime in a given (integer) base is therefore computable, provided the base is larger than 2.</p><br/><p class="rosetta__paragraph">Write a function that takes radix/base as parameter and returns the largest left trunctable prime for the given radix/base.</p></div>

/// challengeSeed:
function getLargestLeftTruncPrime(radix) {
  // Good luck!
}

/// solutions:
// noprotect
function getLargestLeftTruncPrime(radix)
{
  function isPrime(n) {
      if(n < 2) return false;
      if(n == 2 || n == 3) return true;
      if(n%2 == 0 || n%3 == 0) return false;
      var sqrtN = Math.sqrt(n)+1;
      for(var i = 6; i <= sqrtN; i += 6) {
          if(n%(i-1) == 0 || n%(i+1) == 0) return false;
      }
      return true;
  }
  function getNextLeftTruncatablePrimes(n,radix)
  {
    var probablePrimes = [];
    var baseString = n==0? "" : n.toString(radix);
    for (var i = 1; i < radix; i++)
    {
      var p = parseInt(i.toString(radix) + baseString, radix);
      if (isPrime(p))
        probablePrimes.push(p);
    }
    return probablePrimes;
  }
  var lastList = null;
  var list = getNextLeftTruncatablePrimes(0, radix);
  while (list.length!=0)
  {
    lastList = list;
    list = [];
    lastList.forEach(function(n){
      list.push.apply(list,getNextLeftTruncatablePrimes(n, radix));
    });
  }
  if (lastList == null)
    return null;
  lastList.sort();
  return lastList[lastList.length - 1];
}

/// tail:
let tests=[3,4,5,6,8]
let results=[23,4091,7817,4836525320399,14005650767869]

/// tests:
assert(typeof getLargestLeftTruncPrime=='function','message: <code>getLargestLeftTruncPrime</code> should be a function.');
assert(typeof getLargestLeftTruncPrime(3)=='number','message: <code>getLargestLeftTruncPrime(3)</code> should return a number.');
assert.equal(getLargestLeftTruncPrime(tests[0]),results[0],'message: <code>getLargestLeftTruncPrime('+tests[0]+')</code> should return <code>'+results[0]+'</code>.');
assert.equal(getLargestLeftTruncPrime(tests[1]),results[1],'message: <code>getLargestLeftTruncPrime('+tests[1]+')</code> should return <code>'+results[1]+'</code>.');
assert.equal(getLargestLeftTruncPrime(tests[2]),results[2],'message: <code>getLargestLeftTruncPrime('+tests[2]+')</code> should return <code>'+results[2]+'</code>.');
assert.equal(getLargestLeftTruncPrime(tests[3]),results[3],'message: <code>getLargestLeftTruncPrime('+tests[3]+')</code> should return <code>'+results[3]+'</code>.');
assert.equal(getLargestLeftTruncPrime(tests[4]),results[4],'message: <code>getLargestLeftTruncPrime('+tests[4]+')</code> should return <code>'+results[4]+'</code>.');
/// id: 5a5f6220598ea5191b9925bc
