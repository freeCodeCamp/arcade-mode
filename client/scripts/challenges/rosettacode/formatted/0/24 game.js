
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-eval: 0 */

const assert = require('chai').assert;

/// title: 24 game
/// type: rosetta-code

/// categories:


/// difficulty: 5

/// benchmark:
// solve24('1234');

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Implement a function that takes a string of four digits as its argument, with each digit from 1 ──► 9 (inclusive) with repetitions allowed, and returns an arithmetic expression that evaluates to the number 24. If no such solution exists, return "no solution exists."</p><br/>
/// <p class="rosetta__paragraph">Rules:</p>
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered"> Only the following operators/functions are allowed: multiplication, division, addition, subtraction</li>
/// <li class="rosetta__list-item--unordered"> Division should use floating point or rational arithmetic, etc, to preserve remainders.</li>
/// <li class="rosetta__list-item--unordered"> Forming multiple digit numbers from the supplied digits is <span class="rosetta__text--italic">disallowed</span>. (So an answer of 12+12 when given 1, 2, 2, and 1 is wrong).</li>
/// <li class="rosetta__list-item--unordered"> The order of the digits when given does not have to be preserved.</li>
/// </ul><br/>
/// <p class="rosetta__paragraph">Example inputs:</p>
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered"><code>solve24("4878");</code></li>
/// <li class="rosetta__list-item--unordered"><code>solve24("1234");</code></li>
/// <li class="rosetta__list-item--unordered"><code>solve24("6789");</code></li>
/// <li class="rosetta__list-item--unordered"><code>solve24("1127");</code></li>
/// </ul><br/>
/// <p class="rosetta__paragraph">Example outputs (strings):</p>
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered"><code>(7-8/8)*4</code></li>
/// <li class="rosetta__list-item--unordered"><code>3*1*4*2</code></li>
/// <li class="rosetta__list-item--unordered"><code>(6*8)/(9-7)</code></li>
/// <li class="rosetta__list-item--unordered"><code>(1+7)*(2+1)</code></li>
/// </ul>
/// </div>

/// challengeSeed:
function solve24 (numStr) {
  // Good luck!
  return true;
}

/// solutions:
// noprotect

function solve24 (numStr) {
  const digitsArr = numStr.split('');
  const answers = [];

  const digitPermutations = [];
  const operatorPermutations = [];

  function generateDigitPermutations (digits, permutations = []) {
    if (digits.length === 0) {
      digitPermutations.push(permutations);
    }
    else {
      for (let i = 0; i < digits.length; i++) {
        const curr = digits.slice();
        const next = curr.splice(i, 1);
        generateDigitPermutations(curr.slice(), permutations.concat(next));
      }
    }
  }

  function generateOperatorPermutations (permutations = []) {
    const operators = ['+', '-', '*', '/'];
    if (permutations.length === 3) {
      operatorPermutations.push(permutations);
    }
    else {
      for (let i = 0; i < operators.length; i++) {
        const curr = permutations.slice();
        curr.push(operators[i]);
        generateOperatorPermutations(curr);
      }
    }
  }

  generateDigitPermutations(digitsArr);
  generateOperatorPermutations();

  interleave();

  return answers[0];

  function interleave () {
    for (let i = 0; i < digitPermutations.length; i++) {
      for (let j = 0; j < operatorPermutations.length; j++) {
        const d = digitPermutations[i];
        const o = operatorPermutations[j];
        const perm = [
          `${d[0]}${o[0]}${d[1]}${o[1]}${d[2]}${o[2]}${d[3]}`,
          `(${d[0]}${o[0]}${d[1]})${o[1]}${d[2]}${o[2]}${d[3]}`,
          `${d[0]}${o[0]}(${d[1]}${o[1]}${d[2]})${o[2]}${d[3]}`,
          `${d[0]}${o[0]}${d[1]}${o[1]}(${d[2]}${o[2]}${d[3]})`,
          `${d[0]}${o[0]}(${d[1]}${o[1]}${d[2]}${o[2]}${d[3]})`,
          `(${d[0]}${o[0]}${d[1]}${o[1]}${d[2]})${o[2]}${d[3]}`,
          `(${d[0]}${o[0]}${d[1]})${o[1]}(${d[2]}${o[2]}${d[3]})`
        ];

        perm.forEach(combination => {
          const res = eval(combination);

          if (res === 24) {
            return answers.push(combination);
          }
        });
      }
    }
  }
}

/// tail:
const testCases = [
  '4878',
  '1234',
  '6789',
  '1127'
];

const answers = [
  ['(7-8/8)*4', '4*(7-8/8)', '(4-8+7)*8', '(4+7-8)*8', '(7+4-8)*8', '(7-8+4)*8', '8*(4-8+7)', '8*(4+7-8)', '8*(7+4-8)', '8*(7-8+4)'],
  ['1*2*3*4', '1*2*4*3', '1*3*2*4', '1*3*4*2', '1*4*2*3', '1*4*3*2', '2*1*3*4', '2*1*4*3', '2*3*1*4', '2*3*4*1', '2*4*3*1', '2*4*1*3', '3*1*2*4', '3*1*4*2', '3*2*1*4', '3*2*4*1', '3*4*1*2', '3*4*2*1', '4*1*2*3', '4*1*3*2', '4*2*1*3', '4*2*3*1', '4*3*1*2', '4*3*2*1', '(1+2+3)*4', '(1+3+2)*4', '(2+1+3)*4', '(2+3+1)*4', '(3+1+2)*4', '(3+2+1)*4', '4*(1+2+3)', '4*(2+1+3)', '4*(2+3+1)', '4*(3+1+2)', '4*(3+2+1)'],
  ['(6*8)/(9-7)', '(8*6)/(9-7)', '6*8/(9-7)', '8*6/(9-7)'],
  ['(1+7)*(2+1)', '(1+7)*(1+2)', '(1+2)*(1+7)', '(1+2)*(7+1)', '(2+1)*(1+7)', '(7+1)*(2+1)']
];

/// tests:
assert(typeof solve24 === 'function', 'message: <code>solve24</code> is a function.');
assert.include(answers[0], solve24(testCases[0]), 'message: <code>solve24("4878")</code> should return <code>(7-8/8)*4</code> or <code>4*(7-8/8)</code>');
assert.include(answers[1], solve24(testCases[1]), 'message: <code>solve24("1234")</code> should return any arrangement of <code>1*2*3*4</code>');
assert.include(answers[2], solve24(testCases[2]), 'message: <code>solve24("6789")</code> should return <code>(6*8)/(9-7)</code> or <code>(8*6)/(9-7)</code>');
assert.include(answers[3], solve24(testCases[3]), 'message: <code>solve24("1127")</code> should return a permutation of <code>(1+7)*(1*2)</code>');
/// id: 5951e88f64ebf159166a1176
