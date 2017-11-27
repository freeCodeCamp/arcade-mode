
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Department Numbers
/// type: rosetta-code

/// categories:
/// Puzzles

/// difficulty: 3

/// benchmark:

/// description:
/// <div class="rosetta">
/// <br/><p class="rosetta__paragraph">There is a highly organized city that has decided to assign a number to each of their departments:</p>
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered">Police department</li>
/// <li class="rosetta__list-item--unordered">Sanitation department</li>
/// <li class="rosetta__list-item--unordered">Fire department </li>
/// </ul>
/// <br/><p class="rosetta__paragraph">Each department can have a number between <span class="rosetta__text--bold">1</span> and <span class="rosetta__text--bold">7</span>  (inclusive).</p><br/><p class="rosetta__paragraph">The three department numbers are to be unique (different from each other) and must add up to the number <span class="rosetta__text--bold">12</span>.</p><br/><p class="rosetta__paragraph">The Chief of the Police doesn't like odd numbers and wants to have an even number for his department.</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Write a program which outputs all valid combinations:</p>
/// <br/><p class="rosetta__paragraph">[2, 3, 7]<br></p>
/// <p class="rosetta__paragraph">[2, 4, 6]</p>
/// <p class="rosetta__paragraph">[2, 6, 4]</p>
/// <p class="rosetta__paragraph">[2, 7, 3]</p>
/// <p class="rosetta__paragraph">[4, 1, 7]</p>
/// <p class="rosetta__paragraph">[4, 2, 6]</p>
/// <p class="rosetta__paragraph">[4, 3, 5]</p>
/// <p class="rosetta__paragraph">[4, 5, 3]</p>
/// <p class="rosetta__paragraph">[4, 6, 2]</p>
/// <p class="rosetta__paragraph">[4, 7, 1]</p>
/// <p class="rosetta__paragraph">[6, 1, 5]</p>
/// <p class="rosetta__paragraph">[6, 2, 4]</p>
/// <p class="rosetta__paragraph">[6, 4, 2]</p>
/// <p class="rosetta__paragraph">[6, 5, 1]</p>
/// <br><br><br/></div>

/// challengeSeed:
function combinations (possibleNumbers, total) {
  // Good luck!
  return true;
}

/// solutions:
function combinations (possibleNumbers, total) {
  let firstNumber;
  let secondNumber;
  let thridNumber;
  const allCombinations = [];

  for (let i = 0; i < possibleNumbers.length; i += 1) {
    firstNumber = possibleNumbers[i];

    if (firstNumber % 2 === 0) {
      for (let j = 0; j < possibleNumbers.length; j += 1) {
        secondNumber = possibleNumbers[j];

        if (j !== i && firstNumber + secondNumber <= total) {
          thridNumber = total - firstNumber - secondNumber;

          if (thridNumber !== firstNumber && thridNumber !== secondNumber && possibleNumbers.includes(thridNumber)) {
            allCombinations.push([firstNumber, secondNumber, thridNumber]);
          }
        }
      }
    }
  }
  return allCombinations;
}

/// tail:
const nums = [1, 2, 3, 4, 5, 6, 7];
const total = 12;
const len = 14;
const result = [
  [2, 3, 7],
  [2, 4, 6],
  [2, 6, 4],
  [2, 7, 3],
  [4, 1, 7],
  [4, 2, 6],
  [4, 3, 5],
  [4, 5, 3],
  [4, 6, 2],
  [4, 7, 1],
  [6, 1, 5],
  [6, 2, 4],
  [6, 4, 2],
  [6, 5, 1]
];

/// tests:
assert(typeof combinations === 'function', 'message: <code>combinations</code> should be a function.');
assert(Array.isArray(combinations([1, 2, 3], 6)), 'message: <code>combinations([1, 2, 3], 6)</code> should return an Array.');
assert(combinations(nums, total).length === len, 'message: <code>combinations([1, 2, 3, 4, 5, 6, 7], 12)</code> should return an array of length 14.');
assert.deepEqual(combinations(nums, total), result, 'message: <code>combinations([1, 2, 3, 4, 5, 6, 7], 12)</code> should return all valid combinations.');
/// id: 59f40b17e79dbf1ab720ed7a
