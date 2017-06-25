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
/// <br/><p class="rosetta__paragraph">Write a function or program that can split a string at each non-escaped occurrence of a separator character.</p><br/><p class="rosetta__paragraph">It should accept three input parameters:</p>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">The <b>string</b></li>
/// <li class="rosetta__list-item--unordered">The <b>separator character</b></li>
/// <li class="rosetta__list-item--unordered">The <b>escape character</b></li></ul>
/// <br>
/// <p class="rosetta__paragraph">It should output a list of strings.</p>
/// <br/>
/// <p class="rosetta__paragraph">Rules for splitting:</p>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">The fields that were separated by the separators, become the elements of the output list.</li>
/// <li class="rosetta__list-item--unordered">Empty fields should be preserved, even at the start and end.</li></ul>
/// <br>
/// <p class="rosetta__paragraph">Rules for escaping:</p>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">"Escaped" means preceded by an occurrence of the escape character that is not already escaped itself.</li>
/// <li class="rosetta__list-item--unordered">When the escape character precedes a character that has no special meaning, it still counts as an escape (but does not do anything special).</li>
/// <li class="rosetta__list-item--unordered">Each occurrences of the escape character that was used to escape something, should <span class="rosetta__text--bold">not</span> become part of the output.</li></ul>
/// <br/><p class="rosetta__paragraph">Demonstrate that your function satisfies the following test-case:</p>
/// <p class="rosetta__paragraph">{| class="wikitable"</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">! Input</p>
/// <p class="rosetta__paragraph">! Output</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="vertical-align:top" |</p>
/// <p class="rosetta__paragraph">{| style="border-collapse:collapse; border:none" border="0"</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="border:none; text-align:right" | string:</p>
/// <p class="rosetta__paragraph">| style="border:none" | <pre style="display:inline;padding:0.1em;margin:0.3em;">one^|uno||three^^^^|four^^^|^cuatro|</pre></p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="border:none; text-align:right" | separator character:</p>
/// <p class="rosetta__paragraph">| style="border:none" | <pre style="display:inline;padding:0.1em;margin:0.3em;">|</pre></p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="border:none; text-align:right" | escape character:</p>
/// <p class="rosetta__paragraph">| style="border:none" | <pre style="display:inline;padding:0.1em;margin:0.3em;">^</pre></p>
/// <p class="rosetta__paragraph">|}</p>
/// <p class="rosetta__paragraph">|</p>
/// <p class="rosetta__paragraph">{| style="border-collapse:collapse; border:none" border="0"</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="border:none" | <pre style="display:inline;padding:0.1em;margin:0.3em;">one|uno</pre></p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="border:none" | <pre style="display:inline;padding:0.1em;margin:0.3em;"></pre></p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="border:none" | <pre style="display:inline;padding:0.1em;margin:0.3em;">three^^</pre></p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="border:none" | <pre style="display:inline;padding:0.1em;margin:0.3em;">four^|cuatro</pre></p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="border:none" | <pre style="display:inline;padding:0.1em;margin:0.3em;"></pre></p>
/// <p class="rosetta__paragraph">|}</p>
/// <p class="rosetta__paragraph">|}</p>
/// <p class="rosetta__paragraph">(Print the output list in any format you like, as long as it is it easy to see what the fields are.)</p>
/// <br/>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered"><a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Tokenize a string" title="Tokenize a string">Tokenize a string</a></li>
/// <li class="rosetta__list-item--unordered"><a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Brace expansion" title="Brace expansion">Brace expansion</a></li></ul><br><br><br/><p class="rosetta__paragraph">====</p>
/// <br/><p class="rosetta__paragraph"><lang AppleScript>-- tokenize :: String -> Character -> Character -> [String]</p>
/// <p class="rosetta__paragraph">on tokenize(str, chrDelim, chrEsc)</p><br/><p class="rosetta__paragraph">script charParse</p>
/// <p class="rosetta__paragraph">-- Record: {esc:Bool, token:String, tokens:[String]}</p>
/// <p class="rosetta__paragraph">-- charParse :: Record -> Character -> Record</p>
/// <p class="rosetta__paragraph">on lambda(a, x)</p>
/// <p class="rosetta__paragraph">set blnEsc to esc of a</p>
/// <p class="rosetta__paragraph">set blnEscChar to ((not blnEsc) and (x = chrEsc))</p><br/><p class="rosetta__paragraph">if ((not blnEsc) and (x = chrDelim)) then</p>
/// <p class="rosetta__paragraph">set strToken to ""</p>
/// <p class="rosetta__paragraph">set lstTokens to (tokens of a) & token of a</p>
/// <p class="rosetta__paragraph">else</p>
/// <p class="rosetta__paragraph">set strToken to (token of a) & cond(blnEscChar, "", x)</p>
/// <p class="rosetta__paragraph">set lstTokens to tokens of (a)</p>
/// <p class="rosetta__paragraph">end if</p><br/><p class="rosetta__paragraph">{esc:blnEscChar, token:strToken, tokens:lstTokens}</p>
/// <p class="rosetta__paragraph">end lambda</p>
/// <p class="rosetta__paragraph">end script</p><br/><p class="rosetta__paragraph">set recParse to foldl(charParse, ¬</p>
/// <p class="rosetta__paragraph">{esc:false, token:"", tokens:[]}, splitOn("", str))</p><br/><p class="rosetta__paragraph">tokens of recParse & token of recParse</p>
/// <p class="rosetta__paragraph">end tokenize</p>
/// <br/><p class="rosetta__paragraph">-- TEST</p>
/// <p class="rosetta__paragraph">on run</p><br/><p class="rosetta__paragraph">script numberedLine</p>
/// <p class="rosetta__paragraph">on lambda(a, s)</p>
/// <p class="rosetta__paragraph">set iLine to lineNum of a</p>
/// <p class="rosetta__paragraph">{lineNum:iLine + 1, report:report of a & iLine & ":" & tab & s & linefeed}</p>
/// <p class="rosetta__paragraph">end lambda</p>
/// <p class="rosetta__paragraph">end script</p><br/><p class="rosetta__paragraph">report of foldl(numberedLine, {lineNum:1, report:""}, ¬</p>
/// <p class="rosetta__paragraph">tokenize("one^|uno||three^^^^|four^^^|^cuatro|", "|", "^"))</p>
/// <p class="rosetta__paragraph">end run</p>
/// <br/><p class="rosetta__paragraph">-- GENERIC FUNCTIONS</p><br/><p class="rosetta__paragraph">-- foldl :: (a -> b -> a) -> a -> [b] -> a</p>
/// <p class="rosetta__paragraph">on foldl(f, startValue, xs)</p>
/// <p class="rosetta__paragraph">tell mReturn(f)</p>
/// <p class="rosetta__paragraph">set v to startValue</p>
/// <p class="rosetta__paragraph">set lng to length of xs</p>
/// <p class="rosetta__paragraph">repeat with i from 1 to lng</p>
/// <p class="rosetta__paragraph">set v to lambda(v, item i of xs, i, xs)</p>
/// <p class="rosetta__paragraph">end repeat</p>
/// <p class="rosetta__paragraph">return v</p>
/// <p class="rosetta__paragraph">end tell</p>
/// <p class="rosetta__paragraph">end foldl</p><br/><p class="rosetta__paragraph">-- Lift 2nd class handler function into 1st class script wrapper</p>
/// <p class="rosetta__paragraph">-- mReturn :: Handler -> Script</p>
/// <p class="rosetta__paragraph">on mReturn(f)</p>
/// <p class="rosetta__paragraph">if class of f is script then</p>
/// <p class="rosetta__paragraph">f</p>
/// <p class="rosetta__paragraph">else</p>
/// <p class="rosetta__paragraph">script</p>
/// <p class="rosetta__paragraph">property lambda : f</p>
/// <p class="rosetta__paragraph">end script</p>
/// <p class="rosetta__paragraph">end if</p>
/// <p class="rosetta__paragraph">end mReturn</p><br/><p class="rosetta__paragraph">-- splitOn :: Text -> Text -> [Text]</p>
/// <p class="rosetta__paragraph">on splitOn(strDelim, strMain)</p>
/// <p class="rosetta__paragraph">set {dlm, my text item delimiters} to {my text item delimiters, strDelim}</p>
/// <p class="rosetta__paragraph">set xs to text items of strMain</p>
/// <p class="rosetta__paragraph">set my text item delimiters to dlm</p>
/// <p class="rosetta__paragraph">return xs</p>
/// <p class="rosetta__paragraph">end splitOn</p><br/><p class="rosetta__paragraph">-- cond :: Bool -> a -> a -> a</p>
/// <p class="rosetta__paragraph">on cond(bool, f, g)</p>
/// <p class="rosetta__paragraph">if bool then</p>
/// <p class="rosetta__paragraph">f</p>
/// <p class="rosetta__paragraph">else</p>
/// <p class="rosetta__paragraph">g</p>
/// <p class="rosetta__paragraph">end if</p>
/// <p class="rosetta__paragraph">end cond</lang></p>
/// <br/><div class="rosetta__pre-wrap"><pre class="rosetta__pre">1:    one|uno
/// 2:
/// 3:    three^^
/// 4:    four^|cuatro
/// 5:
/// </pre></div><br/></div>

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

/// tests:
assert(typeof tokenize === 'function', 'message: <code>tokenize</code> is a function.');
assert(typeof tokenize('a', 'b', 'c') === 'object', 'message: <code>tokenize</code> should return an array.');
assert.deepEqual(tokenize(testStr1, '|', '^'), res1, "message: <code>tokenize('one^|uno||three^^^^|four^^^|^cuatro|', '|', '^') </code> should return ['one|uno', '', 'three^^', 'four^|cuatro', '']");
/// id: 594faaab4e2a8626833e9c3d
