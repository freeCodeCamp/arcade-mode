
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: JortSort
/// type: rosetta-code

/// categories:

/// difficulty: 1

/// description:
/// <div class="rosetta">
/// <br/><p class="rosetta__paragraph">jortSort is a sorting toolset that makes the user do the work and guarantees efficiency because you don't have to sort ever again. It was originally presented by Jenn "Moneydollars" Schiffer at the prestigious <a class="rosetta__link--wiki" href="https://www.youtube.com/watch?v=pj4U_W0OFoE" title="link: https://www.youtube.com/watch?v=pj4U_W0OFoE">JSConf</a>.</p><br/><p class="rosetta__paragraph">jortSort is a function that takes a single array of comparable objects as its argument. It then sorts the array in ascending order and compares the sorted array to the originally provided array. If the arrays match (i.e. the original array was already sorted), the function returns true. If the arrays do not match (i.e. the original array was not sorted), the function returns false.</p><br/></div>

/// challengeSeed:
function jortsort (array) {
  // Good luck!
}

/// solutions:
function jortsort( array ) {
  // sort the array
  var originalArray = array.slice(0);
  array.sort( function(a,b){return a - b} );

  // compare to see if it was originally sorted
  for (var i = 0; i < originalArray.length; ++i) {
    if (originalArray[i] !== array[i]) return false;
  }

  return true;
};

/// tail:
let tests=[[1,2,3,4,5],
          [1,2,13,4,5],
          [12,4,51,2,4],
          [1,2],
          [5,4,3,2,1],
          [1,1,1,1,1]]

/// tests:
assert(typeof jortsort=='function','message: <code>jortsort</code> should be a function.');
assert(typeof jortsort(tests[0].slice())=='boolean','message: <code>jortsort('+JSON.stringify(tests[0])+')</code> should return a boolean.');
assert.equal(jortsort(tests[0].slice()),true,'message: <code>jortsort('+JSON.stringify(tests[0])+')</code> should return <code>true</code>.');
assert.equal(jortsort(tests[1].slice()),false,'message: <code>jortsort('+JSON.stringify(tests[1])+')</code> should return <code>false</code>.');
assert.equal(jortsort(tests[2].slice()),false,'message: <code>jortsort('+JSON.stringify(tests[2])+')</code> should return <code>false</code>.');
assert.equal(jortsort(tests[3].slice()),true,'message: <code>jortsort('+JSON.stringify(tests[3])+')</code> should return <code>true</code>.');
assert.equal(jortsort(tests[4].slice()),false,'message: <code>jortsort('+JSON.stringify(tests[4])+')</code> should return <code>false</code>.');
assert.equal(jortsort(tests[5].slice()),true,'message: <code>jortsort('+JSON.stringify(tests[5])+')</code> should return <code>true</code>.');
/// id: 5a23c84252665b21eecc7ec4
