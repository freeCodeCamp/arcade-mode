
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint quotes: 0 */
/* eslint prefer-template: 0 */

const assert = require('assert');

/// title: Comma quibbling
/// type: rosetta-code

/// categories:


/// difficulty: 1

/// benchmark:
//poorcandidateforbenchmarking

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Comma quibbling is a task originally set by Eric Lippert in his <a class="rosetta__link--wiki" href="http://blogs.msdn.com/b/ericlippert/archive/2009/04/15/comma-quibbling.aspx" title="link: http://blogs.msdn.com/b/ericlippert/archive/2009/04/15/comma-quibbling.aspx">blog</a>.</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl><br/><p class="rosetta__paragraph">Write a function to generate a string output which is the concatenation of input words from a list/sequence where:</p>
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">An input of no words produces the output string of just the two brace characters "{}".</li>
/// <li class="rosetta__list-item--ordered">An input of just one word, e.g. ["ABC"], produces the output string of the word inside the two braces, e.g. "{ABC}".</li>
/// <li class="rosetta__list-item--ordered">An input of two words, e.g. ["ABC", "DEF"], produces the output string of the two words inside the two braces with the words separated by the string " and ", e.g. "{ABC and DEF}".</li>
/// <li class="rosetta__list-item--ordered">An input of three or more words, e.g. ["ABC", "DEF", "G", "H"], produces the output string of all but the last word separated by ", " with the last word separated by " and " and all within braces; e.g. "{ABC, DEF, G and H}".</li></ol>
/// <br>
/// <p class="rosetta__paragraph">Test your function with the following series of inputs showing your output here on this page:</p>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">[]                       # (No input words).</li>
/// <li class="rosetta__list-item--unordered">["ABC"]</li>
/// <li class="rosetta__list-item--unordered">["ABC", "DEF"]</li>
/// <li class="rosetta__list-item--unordered">["ABC", "DEF", "G", "H"]</li></ul>
/// <br>
/// <p class="rosetta__paragraph">Note: Assume words are non-empty strings of uppercase characters for this task.</p>
/// <br><br><br/></div>

/// challengeSeed:
function quibble (words) {
  // Good luck!
  return true;
}

/// solutions:
function quibble (words) {
  return "{" +
    words.slice(0, words.length - 1).join(",") +
   (words.length > 1 ? " and " : "") +
   (words[words.length - 1] || '') +
  "}";
}

/// tail:
const testCases = [[], ["ABC"], ["ABC", "DEF"], ["ABC", "DEF", "G", "H"]];
const results = ["{}", "{ABC}", "{ABC and DEF}", "{ABC,DEF,G and H}"];

/// tests:
assert(typeof quibble === 'function', 'message: <code>quibble</code> is a function.');
assert(typeof quibble(["ABC"]) === 'string', 'message: <code>quibble(["ABC"])</code> should return a string.');
assert.equal(quibble(testCases[0]), results[0], 'message: <code>quibble([])</code> should return "{}".');
assert.equal(quibble(testCases[1]), results[1], 'message: <code>quibble(["ABC"])</code> should return "{ABC}".');
assert.equal(quibble(testCases[2]), results[2], 'message: <code>quibble(["ABC", "DEF"])</code> should return "{ABC and DEF}".');
assert.equal(quibble(testCases[3]), results[3], 'message: <code>quibble(["ABC", "DEF", "G", "H"])</code> should return "{ABC,DEF,G and H}".');
/// id: 596e414344c3b2872167f0fe
