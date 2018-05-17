
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: I before E except after C
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// description:
/// <div class="rosetta"><p class="rosetta__paragraph">The phrase   <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/I before E except after C" title="wp: I before E except after C"> "I before E, except after C"</a> is a widely known mnemonic which is supposed to help when spelling English words.</p>
/// <p class="rosetta__paragraph">Check if the two sub-clauses of the phrase are plausible individually:
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::#  <span class="rosetta__text--italic">"I before E when not preceded by C"</span></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::#  <span class="rosetta__text--italic">"E before I when preceded by C"</span></span></p>
/// <p class="rosetta__paragraph">If both sub-phrases are plausible then the original phrase can be said to be plausible.</p><p class="rosetta__paragraph">Write a function that accepts a word and check if the word follows this rule. The function should return true if it follows the rule otherwise false.</p></div>

/// challengeSeed:
function IBeforeExceptC (word) {
  // Good luck!
}

/// solutions:
function IBeforeExceptC(word)
{
	if(word.indexOf("c")==-1 && word.indexOf("ie")!=-1)
		return true;
	else if(word.indexOf("cei")!=-1)
		return true;
	return false;
}

/// tail:

/// tests:
assert(typeof IBeforeExceptC=='function','message: <code>IBeforeExceptC</code> should be a function.');
assert(typeof IBeforeExceptC("receive")=='boolean','message: <code>IBeforeExceptC("receive")</code> should return a boolean.');
assert.equal(IBeforeExceptC("receive"),true,'message: <code>IBeforeExceptC("receive")</code> should return <code>true</code>.');
assert.equal(IBeforeExceptC("science"),false,'message: <code>IBeforeExceptC("science")</code> should return <code>false</code>.');
assert.equal(IBeforeExceptC("imperceivable"),true,'message: <code>IBeforeExceptC("imperceivable")</code> should return <code>true</code>.');
assert.equal(IBeforeExceptC("inconceivable"),true,'message: <code>IBeforeExceptC("inconceivable")</code> should return <code>true</code>.');
assert.equal(IBeforeExceptC("insufficient"),false,'message: <code>IBeforeExceptC("insufficient")</code> should return <code>false</code>.');
assert.equal(IBeforeExceptC("omniscient"),false,'message: <code>IBeforeExceptC("omniscient")</code> should return <code>false</code>.');
/// id: 5a23c84252665b21eecc7eb0
