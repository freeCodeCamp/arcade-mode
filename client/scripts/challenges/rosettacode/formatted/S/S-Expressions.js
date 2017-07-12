
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: S-Expressions
/// type: rosetta-code

/// categories:
/// parsing
/// s-expressions

/// difficulty: ?

/// benchmark:
parseSexpr('((data "quoted data" 123 4.5) (data (!@# (4.5) "(more" "data)")))');

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">
/// <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/S-Expression" title="wp: S-Expression">S-Expressions</a> are one convenient way to parse and store data.
/// </p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">
///     Write a simple reader/parser for S-Expressions that handles quoted and unquoted strings, integers and floats.
/// </p>
/// <p class="rosetta__paragraph">
/// The function should read a single but nested S-Expression from a string and
/// return it as a (nested) array.
/// </p>
/// <p class="rosetta__paragraph">
///     Newlines and other whitespace may be ignored unless contained within a quoted string.
/// </p>
/// <p class="rosetta__paragraph">“<tt>()</tt>”  inside quoted strings are not interpreted, but treated as part of the string.
/// </p>
/// <p class="rosetta__paragraph">
/// Handling escaped quotes inside a string is optional;  thus “<tt>(foo"bar)</tt>” maybe treated as a string “<tt>foo"bar</tt>”, or as an error.
/// </p>
/// <p class="rosetta__paragraph">
/// For this, the reader need not recognize “<tt>\</tt>” for escaping, but should, in addition, recognize numbers if the language has appropriate datatypes.
/// </p>
/// <p class="rosetta__paragraph">
/// Note that with the exception of “<tt>()"</tt>” (“<tt>\</tt>” if escaping is supported) and whitespace there are no special characters. Anything else is allowed without quotes.
/// </p>
/// <p class="rosetta__paragraph">The reader should be able to read the following input</p>
/// <p class="rosetta__paragraph">
/// <pre>
///     ((data "quoted data" 123 4.5)
///     (data (!@# (4.5) "(more" "data)")))
/// </pre>
/// </p>
/// <p class="rosetta__paragraph">
/// and turn it into a native datastructure. (see the
/// <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/#Pike" title="#Pike">Pike</a>, 
/// <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/#Python" title="#Python">Python</a> and
/// <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/#Ruby" title="#Ruby">Ruby</a> implementations
/// for examples of native data structures.)
/// </p>
/// </div>

/// challengeSeed:
function parseSexpr(str) {
  // Good luck!
  return true;
}

/// solutions:
function parseSexpr(str) {
  const t = str.match(/\s*("[^"]*"|\(|\)|"|[^\s()"]+)/g);
  for (var o, c = 0, i = t.length - 1; i >= 0; i--) {
    var n,
      ti = t[i].trim();
    if (ti == '"') return;
    else if (ti == '(') t[i] = '[', c += 1;
    else if (ti == ')') t[i] = ']', c -= 1;
    else if ((n = +ti) == ti) t[i] = n;
    else t[i] = `'${ti.replace('\'', '\\\'')}'`;
    if (i > 0 && ti != ']' && t[i - 1].trim() != '(') t.splice(i, 0, ',');
    if (!c) if (!o) o = true; else return;
  }
  return c ? undefined : eval(t.join(''));
}

/// tail:
const simpleSExpr = '(data1 data2 data3)';
const simpleSolution = ['data1', 'data2', 'data3'];

const basicSExpr = '((data "quoted data" 123 4.5) (data (!@# (4.5) "(more" "data)")))';
const basicSolution = [["data","\"quoted data\"",123,4.5],["data",["!@#",[4.5],"\"(more\"","\"data)\""]]];

/// tests:
assert(typeof parseSexpr === 'function', 'message: <code>parseSexpr</code> is a function.');
assert.deepEqual(parseSexpr(simpleSExpr), simpleSolution, "message: <code>parseSexpr('(data1 data2 data3)')</code> should return ['data1', 'data2', 'data3']");
assert.deepEqual(parseSexpr(basicSExpr), basicSolution, "message: <code>parseSexpr('(data1 data2 data3)')</code> should return an array with 3 elements");

/// id: 59667989bf71cf555dd5d2ff
