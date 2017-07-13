/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-prototype-builtins: 0 */

const assert = require('chai').assert;

/// title: Word wrap
/// difficulty: 2
/// type: rosetta-code

/// categories:
/// strings

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">
/// Even today, with proportional fonts and complex layouts, there are still
/// cases where you need to wrap text at a specified
/// column.  The basic task is to wrap a paragraph of text in a simple way.
/// Example text:
/// </p>
/// <pre>
/// Wrap text using a more sophisticated algorithm such as the Knuth and Plass TeX algorithm.
/// If your language provides this, you get easy extra credit,
/// but you ''must reference documentation'' indicating that the algorithm
/// is something better than a simple minimimum length algorithm.
/// </pre>
/// <p class="rosetta__paragraph">
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <ul class="rosetta__unordered-list">
///   <li class="rosetta__list-item--unordered">
///     Write a function that can wrap this text to any number of characters.
///   </li>
/// </ul>
/// <br>
/// As an example, the text wrapped to 80 characters should look like the following:
/// </p>
/// <pre>
/// Wrap text using a more sophisticated algorithm such as the Knuth and Plass TeX
/// algorithm. If your language provides this, you get easy extra credit, but you
/// must reference documentation indicating that the algorithm is something better
/// than a simple minimimum length algorithm.
/// </pre>
/// </div>

/// challengeSeed:
function wrap (text, limit) {
  return text;
}

/// solutions:
function wrap (text, limit) {
  const noNewlines = text.replace('\n', '');
  if (noNewlines.length > limit) {
    // find the last space within limit
    const edge = noNewlines.slice(0, limit).lastIndexOf(' ');
    if (edge > 0) {
      const line = noNewlines.slice(0, edge);
      const remainder = noNewlines.slice(edge + 1);
      return line + '\n' + wrap(remainder, limit);
    }
  }
  return text;
}

/// tail:
const text =
`Wrap text using a more sophisticated algorithm such as the Knuth and Plass TeX algorithm.
If your language provides this, you get easy extra credit,
but you ''must reference documentation'' indicating that the algorithm
is something better than a simple minimimum length algorithm.`;

const wrapped80 = wrap(text, 80);
const wrapped42 = wrap(text, 42);

const firstRow80 =
    'Wrap text using a more sophisticated algorithm such as the Knuth and Plass TeX';

const firstRow42 = 'Wrap text using a more sophisticated';

/// tests:
assert.equal(typeof wrap, 'function', 'message: wrap must be a function.');
assert.equal(typeof wrap('abc', 10), 'string', 'message: wrap must return a string.');
assert(wrapped80.split('\n').length === 4, 'message: wrap(80) must return 4 lines.');
assert.equal(wrapped80.split('\n')[0], firstRow80);
assert(wrapped42.split('\n').length === 7, 'message: wrap(42) must return 7 lines.');
assert.equal(wrapped42.split('\n')[0], firstRow42);
/// id: 594810f028c0303b75339ad4
