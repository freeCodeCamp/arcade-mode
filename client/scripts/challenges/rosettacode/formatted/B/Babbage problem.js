
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint radix: 0 */

const assert = require('chai').assert;

/// title: Babbage problem
/// type: rosetta-code

/// categories:


/// difficulty: ?

/// benchmark:


/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph"><a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Charles_Babbage" title="wp: Charles_Babbage">Charles Babbage</a>, looking ahead to the sorts of problems his Analytical Engine would be able to solve, gave this example:</p><br/>
/// <blockquote class="rosetta__blockquote">What is the smallest positive integer whose square ends in the digits 269,696?</blockquote>
///  <p class="rosetta__paragraph"><span class="rosetta__text--indented"> - Babbage, letter to Lord Bowden, 1837; see Hollingdale and Tootill, <i>Electronic Computers</i>, second edition, 1970, p. 125.</span></p><br/>
/// <p class="rosetta__paragraph">He thought the answer might be 99,736, whose square is 9,947,269,696; but he couldn't be certain.</p><br/>
/// <p class="rosetta__paragraph">The task is to find out if Babbage had the right answer.</p><br/>
/// <p class="rosetta__paragraph">Implement a function to return the lowest integer that satisfies the Babbage problem. If Babbage was right, return Babbage's number.</p>
/// </div>

/// challengeSeed:
function babbage (babbageNum, endDigits) {
  // Good luck!
  return true;
}

/// solutions:
function babbage (babbageAns, endDigits) {
  const babbageNum = babbageAns ** 2;
  const babbageStartDigits = parseInt(babbageNum.toString().replace('269696', ''));
  let answer = 99736;

  // count down from this answer and save any sqrt int result. return lowest one
  for (let i = babbageStartDigits; i >= 0; i--) {
    const num = parseInt(i.toString().concat('269696'));
    const result = Math.sqrt(num);
    if (result === Math.floor(Math.sqrt(num))) {
      answer = result;
    }
  }

  return answer;
}

/// tail:
const babbageAns = 99736;
const endDigits = 269696;
const answer = 25264;

/// tests:
assert(typeof babbage === 'function', 'message: <code>babbage</code> is a function.');
assert.equal(babbage(babbageAns, endDigits), answer, 'message: <code>babbage(99736, 269696)</code> should not return 99736 (there is a smaller answer).');
/// id: 594db4d0dedb4c06a2a4cefd
