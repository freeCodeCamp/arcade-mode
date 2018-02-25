
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Greatest subsequential sum
/// type: rosetta-code

/// categories:
/// Arithmetic operations

/// difficulty: 2

/// benchmark:

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Given a sequence of integers, find a continuous subsequence which maximizes the sum of its elements, that is, the elements of no other single subsequence add up to a value larger than this one.</p>
/// <br/><p class="rosetta__paragraph">An empty subsequence is considered to have the sum of  <span class="rosetta__text--bold">0</span>;  thus if all elements are negative, the result must be the empty sequence.</p></div>

/// challengeSeed:
function MaximumSubsequence (population) {
  // Good luck!
}

/// solutions:
function MaximumSubsequence(population) {
  function sumValues(arr) {
      var result = 0;
      for (var i = 0, len = arr.length; i < len; i++) {
          result += arr[i];
      }
      return result;
  }
  var greatest;
  var maxValue = 0;
  var subsequence = [];

  for (var i = 0, len = population.length; i < len; i++) {
      for (var j = i; j <= len; j++) {
          var subsequence = population.slice(i, j);
          var value = sumValues(subsequence);
          if (value > maxValue) {
              maxValue = value;
              greatest = subsequence;
          };
      }
  }

  return greatest;
}



/// tail:
let tests=[ [1,2,-1,3,10,-10],
            [0, 8, 10, -2, -4, -1, -5, -3],
            [9, 9, -10, 1],
            [7, 1, -5, -3, -8, 1],
            [-3, 6, -1, 4, -4, -6],
            [-1, -2, 3, 5, 6, -2, -1, 4, -4, 2, -1]]
let results=[ [ 1, 2, -1, 3, 10 ],
          [ 0, 8, 10 ],
          [ 9, 9 ],
          [ 7, 1 ],
          [ 6, -1, 4 ],
          [ 3, 5, 6, -2, -1, 4 ] ]

/// tests:
assert(typeof MaximumSubsequence=='function','message: <code>MaximumSubsequence</code> should be a function.');
assert(Array.isArray(MaximumSubsequence(tests[0])),'message: <code>MaximumSubsequence('+JSON.stringify(tests[0])+')</code> should return an array.');
assert.deepEqual(MaximumSubsequence(tests[0]),results[0],'message: <code>MaximumSubsequence('+JSON.stringify(tests[0])+')</code> should return <code>'+JSON.stringify(results[0])+'</code>.');
assert.deepEqual(MaximumSubsequence(tests[1]),results[1],'message: <code>MaximumSubsequence('+JSON.stringify(tests[1])+')</code> should return <code>'+JSON.stringify(results[1])+'</code>.');
assert.deepEqual(MaximumSubsequence(tests[2]),results[2],'message: <code>MaximumSubsequence('+JSON.stringify(tests[2])+')</code> should return <code>'+JSON.stringify(results[2])+'</code>.');
assert.deepEqual(MaximumSubsequence(tests[3]),results[3],'message: <code>MaximumSubsequence('+JSON.stringify(tests[3])+')</code> should return <code>'+JSON.stringify(results[3])+'</code>.');
assert.deepEqual(MaximumSubsequence(tests[4]),results[4],'message: <code>MaximumSubsequence('+JSON.stringify(tests[4])+')</code> should return <code>'+JSON.stringify(results[4])+'</code>.');
assert.deepEqual(MaximumSubsequence(tests[5]),results[5],'message: <code>MaximumSubsequence('+JSON.stringify(tests[5])+')</code> should return <code>'+JSON.stringify(results[5])+'</code>.');
/// id: 5a23c84252665b21eecc7e84
