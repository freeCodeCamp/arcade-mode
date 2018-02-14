
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Forward difference
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// description:
/// <div class="rosetta"><br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Write a function that produces a list of numbers which is the  <big>n<sup>th</sup></big> order forward difference, given a non-negative integer (specifying the order) and a list of numbers.</p>
/// <br/><p class="rosetta__paragraph">The first-order forward difference of a list of numbers  <big><span class="rosetta__text--bold">A</span></big>  is a new list  <big><span class="rosetta__text--bold">B</span></big>,  where  <big><b>B</b><sub>n</sub> = <b>A</b><sub>n+1</sub> - <b>A</b><sub>n</sub></big>.</p><p class="rosetta__paragraph">The goal of this task is to repeat this process up to the desired order.</p></div>

/// challengeSeed:
function forwardDifference (n, xs) {
  // Good luck!
}

/// solutions:
function forwardDifference(n, xs){
  for(var i=0;i<n;i++){
    xs=xs.map(function (e,i){
      if(i==0){
        return 0;
      }else{
        return e-xs[i-1];
      }
    });
    xs.shift();
  }
  return xs;
};

/// tail:
const tests = [[90, 47, 58, 29, 22],
              [32, 55, 5, 55, 7],
              [33,11,65,22,51,86],
              [43,12,45,89,34,14,63],
              [12,43,67,13,46,56,87]];
const results=[[-43,11,-29,-7],
              [23,-50,50,-48],
              [76,-97,72,6],
              [64,11,-99,35,69],
              [-71,165,-110,44]];

/// tests:
assert(typeof forwardDifference=='function','message: <code>forwardDifference</code> should be a function.');
assert(Array.isArray(forwardDifference(1,tests[0])),'message: <code>forwardDifference()</code> should return a array.');
assert.deepEqual(forwardDifference(1,tests[0]),results[0],'message: <code>forwardDifference(1,'+JSON.stringify(tests[0])+')</code> should return <code>'+JSON.stringify(results[0])+'</code>.');
assert.deepEqual(forwardDifference(1,tests[1]),results[1],'message: <code>forwardDifference(1,'+JSON.stringify(tests[1])+')</code> should return <code>'+JSON.stringify(results[1])+'</code>.');
assert.deepEqual(forwardDifference(2,tests[2]),results[2],'message: <code>forwardDifference(2,'+JSON.stringify(tests[2])+')</code> should return <code>'+JSON.stringify(results[2])+'</code>.');
assert.deepEqual(forwardDifference(2,tests[3]),results[3],'message: <code>forwardDifference(2,'+JSON.stringify(tests[3])+')</code> should return <code>'+JSON.stringify(results[3])+'</code>.');
assert.deepEqual(forwardDifference(3,tests[4]),results[4],'message: <code>forwardDifference(3,'+JSON.stringify(tests[4])+')</code> should return <code>'+JSON.stringify(results[4])+'</code>.');
/// id: 5a7c46af2f741d0d27ef515b
