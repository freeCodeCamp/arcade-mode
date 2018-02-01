
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 25: 1000-digit Fibonacci number
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The <a class="euler__link--wiki" href="https://en.wikipedia.org/wiki/Fibonacci_number" title="Fibonacci Numbers">Fibonacci sequence</a> is defined by the recurrence relation:</p>
/// <p class="euler__paragraph">F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>, where F<sub>1</sub> = 1 and F<sub>2</sub> = 1.</p>
/// <p class="euler__paragraph">Hence the first 12 terms will be:</p>
/// <p class="euler__paragraph">F<sub>1</sub> = 1</p>
/// <p class="euler__paragraph">F<sub>2</sub> = 1</p>
/// <p class="euler__paragraph">F<sub>3</sub> = 2</p>
/// <p class="euler__paragraph">F<sub>4</sub> = 3</p>
/// <p class="euler__paragraph">F<sub>5</sub> = 5</p>
/// <p class="euler__paragraph">F<sub>6</sub> = 8</p>
/// <p class="euler__paragraph">F<sub>7</sub> = 13</p>
/// <p class="euler__paragraph">F<sub>8</sub> = 21</p>
/// <p class="euler__paragraph">F<sub>9</sub> = 34</p>
/// <p class="euler__paragraph">F<sub>10</sub> = 55</p>
/// <p class="euler__paragraph">F<sub>11</sub> = 89</p>
/// <p class="euler__paragraph">F<sub>12</sub> = 144</p>
/// <p class="euler__paragraph">The 12th term, F<sub>12</sub>, is the first term to contain three digits.</p>
/// <br>
/// <p class="euler__paragraph">What is the index of the first term in the Fibonacci sequence to contain 1000 digits?</p></div>

/// challengeSeed:
// noprotect
function euler25() {
  // Good luck!
  return true;
}

euler25();

/// solutions:
// noprotect
function euler25() {
  function sumDigitArrays(arr1, arr2) {
    function addNumToDigitArr(arr, index, num) {
      // adds a number to a digit array at a specified index.
      const len = arr.length;
      const ones = num % 10;
      const tens = Math.floor((num % 100) / 10);
      const hundreds = Math.floor(num / 100);
      arr[index] = ones;
      if (tens > 0 || hundreds > 0) {
        if (index + 1 >= len) {
          // need to extend arr
          arr.push(tens);
        } else {
          addNumToDigitArr(arr, index + 1, tens + arr[index + 1]);
        }
      }
      if (hundreds > 0) {
        if (index + 2 >= len) {
          // need to extend arr
          arr.push(hundreds);
        } else {
          addNumToDigitArr(arr, index + 2, hundreds + arr[index + 2]);
        }
      }
    }

    const longArr = arr1.length > arr2.length ? arr1 : arr2;
    const shortArr = arr1.length <= arr2.length ? arr1 : arr2;
    const result = [0];
    let i = 0;
    while (i < shortArr.length) {
      addNumToDigitArr(result, i, shortArr[i] + longArr[i] + (result[i] ? result[i] : 0));
      i++;
    }
    while (i < longArr.length) {
      addNumToDigitArr(result, i, longArr[i] + (result[i] ? result[i] : 0));
      i++;
    }
    return result;
  }

  // fibList will store numbers as digit arrays
  const fibList = [[1]];
  let latestFib = [1];
  while (latestFib.length < 1000) {
    fibList.push(latestFib);
    const len = fibList.length;
    latestFib = sumDigitArrays(fibList[len - 2], fibList[len - 1]);
  }
  return fibList.length + 1;
}

/// tail:

/// tests:
assert(typeof euler25 === 'function', 'message: <code>euler25()</code> is a function.');
assert.strictEqual(euler25(), 4782, 'message: <code>euler25()</code> should return 4782.');
/// id: 5900f3851000cf542c50fe98
