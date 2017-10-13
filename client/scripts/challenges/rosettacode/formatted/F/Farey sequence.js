
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Farey sequence
/// type: rosetta-code

/// categories:


/// difficulty: 3

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">Write a function that returns the Farey sequence of order n. The function should have one parameter that is n. It should return the sequence as an array. Read the following for more details : </p><p class="rosetta__paragraph">The  <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Farey sequence" title="wp: Farey sequence">Farey sequence</a>  <span class="rosetta__text--bold"> <span class="rosetta__text--italic">F</span><sub>n</sub></span>  of order  <span class="rosetta__text--bold">n</span>  is the sequence of completely reduced fractions between  <span class="rosetta__text--bold">0</span>  and  <span class="rosetta__text--bold">1</span>  which, when in lowest terms, have denominators less than or equal to  <span class="rosetta__text--bold">n</span>,  arranged in order of increasing size.</p><br/><p class="rosetta__paragraph">The  <span class="rosetta__text--italic">Farey sequence</span>  is sometimes incorrectly called a  <span class="rosetta__text--italic">Farey series</span>.</p>
/// <br/><p class="rosetta__paragraph">Each Farey sequence:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  starts with the value  <span class="rosetta__text--bold">0</span>,  denoted by the fraction  $ \frac{0}{1} $</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  ends with the value  <span class="rosetta__text--bold">1</span>,  denoted by the fraction  $ \frac{1}{1}$.</span></p>
/// <br/><p class="rosetta__paragraph">The Farey sequences of orders  <span class="rosetta__text--bold">1</span>  to  <span class="rosetta__text--bold">5</span>  are:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">${\bf\it{F}}_1 = \frac{0}{1}, \frac{1}{1}$</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"><br></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">${\bf\it{F}}_2 = \frac{0}{1}, \frac{1}{2}, \frac{1}{1}$</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"><br></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">${\bf\it{F}}_3 = \frac{0}{1}, \frac{1}{3}, \frac{1}{2}, \frac{2}{3}, \frac{1}{1}$</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"><br></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">${\bf\it{F}}_4 = \frac{0}{1}, \frac{1}{4}, \frac{1}{3}, \frac{1}{2}, \frac{2}{3}, \frac{3}{4}, \frac{1}{1}$</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"><br></span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">${\bf\it{F}}_5 = \frac{0}{1}, \frac{1}{5}, \frac{1}{4}, \frac{1}{3}, \frac{2}{5}, \frac{1}{2}, \frac{3}{5}, \frac{2}{3}, \frac{3}{4}, \frac{4}{5}, \frac{1}{1}$</span></p></div>

/// challengeSeed:
function farey (n) {
  // Good luck!
}

/// solutions:
function farey(n){
	let farSeq=[];
	for(let den = 1; den <= n; den++){
		for(let num = 1; num < den; num++){
			farSeq.push({
				str:num+"/"+den,
				val:num/den});
		}
	}
	farSeq.sort(function(a,b){
		return a.val-b.val;
	});
	farSeq=farSeq.map(function(a){
		return a.str;
	});
	return farSeq;
}

/// tests:
assert(typeof farey === 'function', 'message: <code>farey</code> is a function.');
assert(Array.isArray(farey(3)),'<code>farey(3)</code> should return an array');
assert.deepEqual(farey(3),["1/3","1/2","2/3"],'<code>farey(3)</code> should return <code>["1/3","1/2","2/3"]</code>');
assert.deepEqual(farey(4),["1/4","1/3","1/2","2/4","2/3","3/4"],'<code>farey(4)</code> should return <code>["1/4","1/3","1/2","2/4","2/3","3/4"]</code>');
assert.deepEqual(farey(5),["1/5","1/4","1/3","2/5","1/2","2/4","3/5","2/3","3/4","4/5"],'<code>farey(5)</code> should return <code>["1/5","1/4","1/3","2/5","1/2","2/4","3/5","2/3","3/4","4/5"]</code>');
/// id: 59c3ec9f15068017c96eb8a3
