
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 51: Prime digit replacements
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">By replacing the 1st digit of the 2-digit number *3, it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.</p><br/>
/// <p class="euler__paragraph">By replacing the 3rd and 4th digits of 56**3 with the same digit, this 5-digit number is the first example having seven primes among the ten generated numbers, yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993. Consequently 56003, being the first member of this family, is the smallest prime with this property.</p><br/>
/// <p class="euler__paragraph">Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits) with the same digit, is part of an eight prime value family.</p></div>

/// challengeSeed:
// noprotect
function euler51() {
  // Good luck!
  return true;
}

euler51();

/// solutions:
// noprotect
function euler51() {
  // Returns true if prime, false if non-prime
  function isPrime(num) {
    const sqrtNum = Math.sqrt(num);
    for (let i = 3; i <= sqrtNum; i += 2) {
      if (num % i === 0) {
        return false;
      }
    }
    return num !== 1;
  }
  // Given a number string, make digit replacements. The 1's in the binary
  // code tell you where to make them. (ex. numStr='423' and binaryCode='110' means 423=>**3
  // with the same digit replacements taking place at the asterisks.
  // 113, 223, 333, 443, and so on.)
  function howManyPrimeFamilyMembers(numStr, binaryCode) {
    let primeFamilyMemberCount = 0;
    let notPrimeCount = 0;
    let locNumStr = numStr;
    const primeFamilyArr = [];// Store all prime family members
    // h will be a digit 0-9 that will be substituted into numStr based on
    // the location of 1's in the binary code
    for (let h = 0; h < 10; h += 1) {
      // For every 1 in the binary code, replace the corresponding digit in numStr with h
      for (let i = 0; i < binaryCode.length; i += 1) {
        if (binaryCode.charAt(i) === '1') {
          locNumStr = locNumStr.slice(0, i) + h + locNumStr.slice(i + 1);
        }
      }
      // After inserting h into numStr based on the binary code, if the result is prime,
      // store it as a prime family member and increment the count to keep track
      // of how many prime family members.
      if (locNumStr.charAt(0) !== '0' && isPrime(locNumStr)) {
        primeFamilyArr.push(locNumStr);
        primeFamilyMemberCount += 1;
        // If, after insertion of h based on the binary code, the result is not prime, increment
        // the not prime count. If there are more than 2 not prime members, than it is impossible
        // to have the desired 8 family member set and thus not worth continuing to check the
        // rest of the potential family members. This is done to lower code execution time.
      } else {
        notPrimeCount += 1;
        if (notPrimeCount > 2) {
          break;
        }
      }
    }
    // return the count so the calling function can know if 8 members were found, and the array
    // storing the prime family members so that the calling function can access the first member
    // of the array (i.e. the smallest number in the family).
    return [primeFamilyMemberCount, primeFamilyArr];
  }
  // returns a binary string 0-padded to specified finalLength
  function paddedBinary(unpadDecimal, finalLength) {
    const unpadBinaryStr = unpadDecimal.toString(2);
    let padBinaryStr = unpadBinaryStr;
    for (let i = 0; i < finalLength - unpadBinaryStr.length; i += 1) {
      padBinaryStr = `0${padBinaryStr}`;
    }
    return padBinaryStr;
  }
  // Generate binary codes which will be used by howManyPrimeFamilyMembers
  // to see where to make substitutions. If an 8 member prime family is found
  // return true and the first member of that family
  function generatePrimeFamilies(num) {
    const numStr = num.toString(10);
    const numStrLength = numStr.length;
    let result = [];
    // the binary limit is the decimal number representing the largest binary number that
    // can be represented with the same number of digits as num
    // (ex. for num=3245, binary limit=2^4 - 1=31=b1111)
    const binaryLimit = (2 ** numStrLength) - 1;
    for (let i = 1; i <= binaryLimit; i += 1) {
      // each binary number tells howManyPrimeFamilyMembers where to make digit replacements (1)
      // and where to leave the digit alone (0)
      // paddedBinary is called to make sure that the binary code is 0-padded to the same
      // length as numStr
      result = howManyPrimeFamilyMembers(numStr, paddedBinary(i, numStrLength));
      if (result[0] >= 8) {
        // If the result says we found an 8-member prime family, tell main we can stop searching
        // and also send it the 8-member prime family
        return [true, result[1]];
      }
    }
    return [false, 0];
  }
  // Check all numbers up to limit for prime families. An 8-member prime family will end
  // the function with a return of the smallest member of the 8-member prime family
  function main(limit) {
    let result = [];
    for (let i = 11; i < limit; i += 2) {
      if (isPrime(i)) {
        result = generatePrimeFamilies(i);
        if (result[0]) {
          return parseInt(result[1][0], 10);
        }
      }
    }
    return 0;
  }
  return main(1000000);
}
/// tail:

/// tests:
assert(typeof euler51 === 'function', 'message: <code>euler51()</code> is a function.');
assert.strictEqual(euler51(), 121313, 'message: <code>euler51()</code> should return 121313.');
/// id: 5900f39f1000cf542c50feb2
