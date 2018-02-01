
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Problem 43: Sub-string divisibility
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <div class="euler"><p class="euler__paragraph">The number, 1406357289, is a 0 to 9 pandigital number because it is made up of each of the digits 0 to 9 in some order, but it also has a rather interesting sub-string divisibility property.</p>
/// <br>
/// <p class="euler__paragraph">Let $d_1$ be the 1st digit, $d_2$ be the 2nd digit, and so on. In this way, we note the following:</p>
/// <br>
/// <p class="euler__paragraph">$d_2d_3d_4=406$ is divisible by 2</p>
/// <p class="euler__paragraph">$d_3d_4d_5=063$ is divisible by 3</p>
/// <p class="euler__paragraph">$d_4d_5d_6=635$ is divisible by 5</p>
/// <p class="euler__paragraph">$d_5d_6d_7=357$ is divisible by 7</p>
/// <p class="euler__paragraph">$d_6d_7d_8=572$ is divisible by 11</p>
/// <p class="euler__paragraph">$d_7d_8d_9=728$ is divisible by 13</p>
/// <p class="euler__paragraph">$d_8d_9d_{10}=289$ is divisible by 17</p>
/// <br>
/// <p class="euler__paragraph">Find the sum of all 0 to 9 pandigital numbers with this property.</p></div>

/// challengeSeed:
// noprotect
function euler43() {
  // Good luck!
  return true;
}

euler43();

/// solutions:
// noprotect
function euler43() {
  function getPermutations(digitString) {
    if (digitString.length === 1) {
      return digitString;
    }
    const oldPerms = getPermutations(digitString.slice(1));
    const newPerms = [];

    for (let i = 0; i < oldPerms.length; i++) {
      const ithPerm = oldPerms[i];
      for (let j = 0; j < oldPerms[i].length + 1; j++) {
        const newPerm = ithPerm.slice(0, j) + digitString[0] + ithPerm.slice(j);
        newPerms.push(newPerm);
      }
    }
    return newPerms;
  }

  let pandigitalNums = getPermutations('0123456789');

  pandigitalNums = pandigitalNums.filter(num =>
    num[0] !== 0
    && num.substring(7, 10) % 17 === 0
    && num.substring(6, 9) % 13 === 0
    && num.substring(5, 8) % 11 === 0
    && num.substring(4, 7) % 7 === 0
    && num[5] % 5 === 0
    && num.substring(2, 5) % 3 === 0
    && num[3] % 2 === 0);

  const total = pandigitalNums.reduce((sum, num) =>
    sum + parseInt(num, 10), 0);

  return total;
}

/// tail:
const replaceThis = 3;

/// tests:
assert(typeof euler43 === 'function', 'message: <code>euler43()</code> is a function.');
assert.strictEqual(euler43(), 16695334890, 'message: <code>euler43()</code> should return 16695334890.');
/// id: 5900f3971000cf542c50feaa
