/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Tokenize a string with escaping
/// type: rosetta-code

/// categories:
/// strings
/// text processing

/// difficulty: 4

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">
/// Write a function or program that can split a string at each non-escaped occurrence of a separator character.
/// </p>
/// <br/>
/// <p class="rosetta__paragraph">
/// It should accept three input parameters:
/// </p>
/// <ul class="rosetta__unordered-list">
///   <li class="rosetta__list-item--unordered">The <b>string</b></li>
///   <li class="rosetta__list-item--unordered">The <b>separator character</b></li>
///   <li class="rosetta__list-item--unordered">The <b>escape character</b></li>
/// </ul>
/// <br>
/// <p class="rosetta__paragraph">It should output a list of strings.</p>
/// <br/>
/// <p class="rosetta__paragraph">Rules for splitting:</p>
/// <ul class="rosetta__unordered-list">
///   <li class="rosetta__list-item--unordered">The fields that were separated by the separators, become the elements of the output list.</li>
///   <li class="rosetta__list-item--unordered">Empty fields should be preserved, even at the start and end.</li>
/// </ul>
/// <br>
/// <p class="rosetta__paragraph">Rules for escaping:</p>
/// <ul class="rosetta__unordered-list">
///   <li class="rosetta__list-item--unordered">"Escaped" means preceded by an occurrence of the escape character that is not already escaped itself.</li>
///   <li class="rosetta__list-item--unordered">When the escape character precedes a character that has no special meaning, it still counts as an escape (but does not do anything special).</li>
///   <li class="rosetta__list-item--unordered">Each occurrences of the escape character that was used to escape something, should <span class="rosetta__text--bold">not</span> become part of the output.</li>
/// </ul>
/// <br/>
/// <p class="rosetta__paragraph">Demonstrate that your function satisfies the following test-case:
///   Given string <pre>one^|uno||three^^^^|four^^^|^cuatro|</pre> and using
///   <pre>|</pre> as a separator and <pre>^</pre> as escape character, your
///   function should output the following array:
/// </p>
/// <br>
/// <div class="rosetta__pre-wrap">
///   <pre class="rosetta__pre">
///   ['one|uno', '', 'three^^', 'four^|quatro', '']
///   </pre>
/// </div>
/// </div>

/// challengeSeed:
function tokenize(str, esc, sep) {
  return true;
}

/// solutions:
// tokenize :: String -> Character -> Character -> [String]
function tokenize(str, charDelim, charEsc) {
  const dctParse = str.split('')
    .reduce((a, x) => {
      const blnEsc = a.esc;
      const blnBreak = !blnEsc && x === charDelim;
      const blnEscChar = !blnEsc && x === charEsc;

      return {
        esc: blnEscChar,
        token: blnBreak ? '' : (
          a.token + (blnEscChar ? '' : x)
        ),
        list: a.list.concat(blnBreak ? a.token : [])
      };
    }, {
      esc: false,
      token: '',
      list: []
    });

  return dctParse.list.concat(
    dctParse.token
  );
}

/// tail:
const testStr1 = 'one^|uno||three^^^^|four^^^|^cuatro|';
const res1 = ['one|uno', '', 'three^^', 'four^|cuatro', ''];

// TODO add more tests
const testStr2 = 'a@&bcd&ef&&@@hi';
const res2 = ['a&bcd', 'ef', '', '@hi'];

/// tests:
assert(typeof tokenize === 'function', 'message: <code>tokenize</code> is a function.');
assert(typeof tokenize('a', 'b', 'c') === 'object', 'message: <code>tokenize</code> should return an array.');
assert.deepEqual(tokenize(testStr1, '|', '^'), res1, "message: <code>tokenize('one^|uno||three^^^^|four^^^|^cuatro|', '|', '^') </code> should return ['one|uno', '', 'three^^', 'four^|cuatro', '']");
assert.deepEqual(tokenize(testStr2, '&', '@'), res2, "message: <code>tokenize('a@&bcd&ef&&@@hi', '&', '@')</code> should return ['a&bcd', 'ef', '', '@hi']");
/// id: 594faaab4e2a8626833e9c3d
