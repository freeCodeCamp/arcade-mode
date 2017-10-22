
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Fibonacci n-step number sequences
/// type: rosetta-code

/// categories:


/// difficulty: 3

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a function to generate Fibonacci n-step number sequences and Lucas sequences. The first parameter will be n. The second parameter will be the number of elements to be returned. The third paramter will specify whether to output the Fibonacci sequence or the Lucas sequence. If the parameter is "f" then return the Fibonacci sequence and if it is "l", then return the Lucas sequence. The sequences must be returned as an array. More details are given below : </p><p class="rosetta__paragraph">These number series are an expansion of the ordinary <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Fibonacci sequence" title="Fibonacci sequence">Fibonacci sequence</a> where:</p>
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">For $n = 2$ we have the Fibonacci sequence; with initial values $[1, 1]$ and $F_k^2 = F_{k-1}^2 + F_{k-2}^2$</li>
/// <li class="rosetta__list-item--ordered">For $n = 3$ we have the tribonacci sequence; with initial values $[1, 1, 2]$ and $F_k^3 = F_{k-1}^3 + F_{k-2}^3 + F_{k-3}^3$</li>
/// <li class="rosetta__list-item--ordered">For $n = 4$ we have the tetranacci sequence; with initial values $[1, 1, 2, 4]$ and $F_k^4 = F_{k-1}^4 + F_{k-2}^4 + F_{k-3}^4 + F_{k-4}^4$<br>...</li>
/// <li class="rosetta__list-item--ordered">For general $n>2$ we have the Fibonacci $n$-step sequence - $F_k^n$; with initial values of the first $n$ values of the $(n-1)$'th Fibonacci $n$-step sequence $F_k^{n-1}$; and $k$'th value of this $n$'th sequence being $F_k^n = \sum_{i=1}^{(n)} {F_{k-i}^{(n)}}$</li></ol>
/// <p class="rosetta__paragraph">For small values of $n$, <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Number prefix#Greek_series" title="wp: Number prefix#Greek_series">Greek numeric prefixes</a> are sometimes used to individually name each series.</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">{| style="text-align: left;" border="4" cellpadding="2" cellspacing="2"</span></p>
/// <p class="rosetta__paragraph">|+ Fibonacci $n$-step sequences</p>
/// <p class="rosetta__paragraph">|- style="background-color: rgb(255, 204, 255);"</p>
/// <p class="rosetta__paragraph">! $n$ !! Series name !! Values</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">|  2 ||  fibonacci || 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610 ...</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">|  3 || tribonacci || 1 1 2 4 7 13 24 44 81 149 274 504 927 1705 3136 ...</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">|  4 || tetranacci || 1 1 2 4 8 15 29 56 108 208 401 773 1490 2872 5536 ...</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">|  5 || pentanacci || 1 1 2 4 8 16 31 61 120 236 464 912 1793 3525 6930 ...</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">|  6 ||  hexanacci || 1 1 2 4 8 16 32 63 125 248 492 976 1936 3840 7617 ...</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">|  7 || heptanacci || 1 1 2 4 8 16 32 64 127 253 504 1004 2000 3984 7936 ...</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">|  8 ||  octonacci || 1 1 2 4 8 16 32 64 128 255 509 1016 2028 4048 8080 ...</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">|  9 ||  nonanacci || 1 1 2 4 8 16 32 64 128 256 511 1021 2040 4076 8144 ...</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| 10 ||  decanacci || 1 1 2 4 8 16 32 64 128 256 512 1023 2045 4088 8172 ...</p>
/// <p class="rosetta__paragraph">|}</p><br/><p class="rosetta__paragraph">Allied sequences can be generated where the initial values are changed:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <span class="rosetta__text--bold">The <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Lucas number" title="wp: Lucas number">Lucas series</a></span> sums the two preceding values like the fibonacci series for $n=2$ but uses $[2, 1]$ as its initial values.</span></p><br/><p class="rosetta__paragraph"><!-- Lucas numbers, Lucas number, Lucas series     [added to make searches easier.] --></p><br/><br></div>

/// challengeSeed:
function fib_luc (n, len, w) {
  // Good luck!
}

/// solutions:
function fib_luc(n, len, w) {
	function nacci(a, n, len) {
		while (a.length < len) {
		    let sum = 0;
		    for (let i = Math.max(0, a.length - n); i < a.length; i++)
		        sum += a[i];
		    a.push(sum);
		}
		return a;
	}
	if(w=="f"){
    	return nacci(nacci([1,1], n, n), n, len);
	}else{
    	return nacci(nacci([2,1], n, n), n, len);
	}
}

/// tail:
const ans = [[1,1,2,3,5,8,13,21,34,55],
[1,1,2,4,7,13,24,44,81,149,274,504,927,1705,3136],
[1,1,2,4,8,15,29,56,108,208,401,773,1490,2872,5536],
[ 2, 1, 3, 4, 7, 11, 18, 29, 47, 76],
[ 2, 1, 3, 6, 10, 19, 35, 64, 118, 217, 399, 734, 1350, 2483, 4567 ],
[ 2, 1, 3, 6, 12, 22, 43, 83, 160, 308, 594, 1145, 2207, 4254, 8200 ],
[ 2, 1, 3, 6, 12, 24, 46, 91, 179, 352, 692, 1360, 2674, 5257, 10335 ]];

/// tests:
assert(typeof fib_luc === 'function', 'message: <code>fib_luc</code> is a function.');
assert.deepEqual(fib_luc(2,10,"f"),ans[0],'message: <code>fib_luc(2,10,"f")</code> should return <code>[1,1,2,3,5,8,13,21,34,55]</code>.');
assert.deepEqual(fib_luc(3,15,"f"),ans[1],'message: <code>fib_luc(3,15,"f")</code> should return <code>[1,1,2,4,7,13,24,44,81,149,274,504,927,1705,3136]</code>.');
assert.deepEqual(fib_luc(4,15,"f"),ans[2],'message: <code>fib_luc(4,15,"f")</code> should return <code>[1,1,2,4,8,15,29,56,108,208,401,773,1490,2872,5536]</code>.');
assert.deepEqual(fib_luc(2,10,"l"),ans[3],'message: <code>fib_luc(2,10,"l")</code> should return <code>[ 2, 1, 3, 4, 7, 11, 18, 29, 47, 76]</code>.');
assert.deepEqual(fib_luc(3,15,"l"),ans[4],'message: <code>fib_luc(3,15,"l")</code> should return <code>[ 2, 1, 3, 6, 10, 19, 35, 64, 118, 217, 399, 734, 1350, 2483, 4567 ]</code>.');
assert.deepEqual(fib_luc(4,15,"l"),ans[5],'message: <code>fib_luc(4,15,"l")</code> should return <code>[ 2, 1, 3, 6, 12, 22, 43, 83, 160, 308, 594, 1145, 2207, 4254, 8200 ]</code>.');
assert.deepEqual(fib_luc(5,15,"l"),ans[6],'message: <code>fib_luc(5,15,"l")</code> should return <code>[ 2, 1, 3, 6, 12, 24, 46, 91, 179, 352, 692, 1360, 2674, 5257, 10335 ]</code>.');
/// id: 598eef80ba501f1268170e1e
