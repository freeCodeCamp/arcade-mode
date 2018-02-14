
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Floyd's triangle
/// type: rosetta-code

/// categories:


/// difficulty: 1

/// benchmark:

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph"><a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Floyd's triangle" title="wp: Floyd's triangle">Floyd's triangle</a>  lists the natural numbers in a right triangle aligned to the left where</p>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">the first row is  <span class="rosetta__text--bold">1</span>   (unity)</li>
/// <li class="rosetta__list-item--unordered">successive rows start towards the left with the next number followed by successive naturals listing one more number than the line above.</li></ul><br/><p class="rosetta__paragraph">The first few lines of a Floyd triangle looks like this:</p>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
///  1
///  2  3
///  4  5  6
///  7  8  9 10
/// 11 12 13 14 15
/// </pre></div>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Write a function to generate and return the first  n  lines of a Floyd triangle as a string. Use '|' as line separator</p>
/// </div>

/// challengeSeed:
function floydTri (n) {
  // Good luck!
}

/// solutions:
function floydTri(n){
	let c=1,i,j,out="";
	for(i=0;i<n;i++){
		for(j=0;j<=i;j++){
			out+=c.toString()+((j==i)?"":" ");
			c++;
		}
		out+=((i==n-1)?"":"|");
	}

	return out;
}

/// tail:
let tests=[2,3,4,5,6]
let results=[
  "1|2 3",
  "1|2 3|4 5 6",
  "1|2 3|4 5 6|7 8 9 10",
  "1|2 3|4 5 6|7 8 9 10|11 12 13 14 15",
  "1|2 3|4 5 6|7 8 9 10|11 12 13 14 15|16 17 18 19 20 21"
]

/// tests:
assert(typeof floydTri=='function','message: <code>floydTri</code> should be a function.');
assert(typeof floydTri(2)=='string','message: <code>floydTri(2)</code> should return a string.');
assert.equal(floydTri(2),results[0],'message: <code>floydTri(2)</code> should return <code>"'+results[0]+'"</code>.');
assert.equal(floydTri(3),results[1],'message: <code>floydTri(2)</code> should return <code>"'+results[1]+'"</code>.');
assert.equal(floydTri(4),results[2],'message: <code>floydTri(2)</code> should return <code>"'+results[2]+'"</code>.');
assert.equal(floydTri(5),results[3],'message: <code>floydTri(2)</code> should return <code>"'+results[3]+'"</code>.');
assert.equal(floydTri(6),results[4],'message: <code>floydTri(2)</code> should return <code>"'+results[4]+'"</code>.');
/// id: 5a759ffc85c3b30c98df1418
