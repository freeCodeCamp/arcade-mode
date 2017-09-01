
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Entropy
/// type: rosetta-code

/// categories:


/// difficulty: 4

/// description:
/// <div class="rosetta"><br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Calculate the Shannon entropy  H  of a given input string.</p><br/><p class="rosetta__paragraph">Given the discreet random variable $X$ that is a string of $N$ "symbols" (total characters) consisting of $n$ different characters (n=2 for binary), the Shannon entropy of X in <span class="rosetta__text--bold">bits/symbol</span> is :</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">$H_2(X) = -\sum_{i=1}^n \frac{count_i}{N} \log_2 \left(\frac{count_i}{N}\right)$</span></p><br/><p class="rosetta__paragraph">where $count_i$ is the count of character $n_i$.</p><br/></div>

/// challengeSeed:
function entropy (s) {
  // Good luck!
}

/// solutions:
function entropy(s) {
	// Create a dictionary of character frequencies and iterate over it.
	function process(s, evaluator) {
		let h = Object.create(null), k;
		s.split('').forEach(function(c) {
		h[c] && h[c]++ || (h[c] = 1); });
		if (evaluator) for (k in h) evaluator(k, h[k]);
		return h;
	};
	// Measure the entropy of a string in bits per symbol.

	let sum = 0,len = s.length;
	process(s, function(k, f) {
		let p = f/len;
		sum -= p * Math.log(p) / Math.log(2);
	});
	return sum;
};

/// tests:
assert(typeof entropy === 'function', 'message: <code>entropy</code> is a function.');
assert.equal(entropy("0"),0,'message: <code>entropy("0")</code> should return <code>0</code>');
assert.equal(entropy("01"),1,'message: <code>entropy("01")</code> should return <code>1</code>');
assert.equal(entropy("0123"),2,'message: <code>entropy("0123")</code> should return <code>2</code>');
assert.equal(entropy("01234567"),3,'message: <code>entropy("01234567")</code> should return <code>3</code>');
assert.equal(entropy("0123456789abcdef"),4,'message: <code>entropy("0123456789abcdef")</code> should return <code>4</code>');
assert.equal(entropy("1223334444"),1.8464393446710154,'message: <code>entropy("1223334444")</code> should return <code>1.8464393446710154</code>');
/// id: 599d15309e88c813a40baf58
