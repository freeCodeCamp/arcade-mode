
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: General FizzBuzz
/// type: rosetta-code

/// categories:
/// Iteration
/// Recursion

/// difficulty: 2

/// benchmark:

/// <div class="rosetta">
/// <p class="rosetta__paragraph">Write a generalized version of <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/FizzBuzz" title="FizzBuzz">FizzBuzz</a> that works for any list of factors, along with their words.</p><p class="rosetta__paragraph">This is basically a "fizzbuzz" implementation where the user supplies the parameters.</p><p>Write a function to implement this. The function should take two parameters. The first will be an array with the FizzBuzz parameters. For example: <code>[ [3,"Fizz"] , [5,"Buzz"] ]</code>. This indcates that Fizz should be printed if the number is a multiple of 3 and Buzz if it is a multiple of 5. If it is a multiple of both then the strings should be concatenated in the order specified in the array. In this case FizzBuzz if the number is a multiple of 3 and 5. The second parameter is the number for which the function should return a string as stated above.</p></div>

/// challengeSeed:
function genFizzBuzz (rules, num) {
  // Good luck!
}

/// solutions:
function genFizzBuzz(rules, num) {
  let res='';
  rules.forEach(function (e) {
    if(num % e[0] == 0)
      res+=e[1];
  })

  if(res==''){
    res=num.toString();
  }

  return res;
}




/// tail:
let tests=[
  [ [[3, 'Fizz'],[5, 'Buzz']], 6 ],
  [ [[3, 'Fizz'],[5, 'Buzz']], 10 ],
  [ [[3, 'Buzz'],[5, 'Fizz']], 12 ],
  [ [[3, 'Buzz'],[5, 'Fizz']], 13 ],
  [ [[3, 'Buzz'],[5, 'Fizz']], 15 ],
  [ [[3, 'Fizz'],[5, 'Buzz']], 15 ],
  [ [[3, 'Fizz'],[5, 'Buzz'],[7, 'Baxx']], 105 ],
]
let results=[
  "Fizz",
  "Buzz",
  "Buzz",
  "13",
  "BuzzFizz",
  "FizzBuzz",
  "FizzBuzzBaxx"
]

/// tests:
assert(typeof genFizzBuzz=='function','message: <code>genFizzBuzz</code> should be a function.');
assert(typeof genFizzBuzz(tests[0][0],tests[0][1])=='string','message: <code>genFizzBuzz('+JSON.stringify(tests[0][0])+','+tests[0][1]+')</code> should return a type.');
assert.equal(genFizzBuzz(tests[0][0],tests[0][1]),results[0],'message: <code>genFizzBuzz('+JSON.stringify(tests[0][0])+','+tests[0][1]+')</code> should return <code>"'+results[0]+'"</code>.');
assert.equal(genFizzBuzz(tests[1][0],tests[1][1]),results[1],'message: <code>genFizzBuzz('+JSON.stringify(tests[1][0])+','+tests[1][1]+')</code> should return <code>"'+results[1]+'"</code>.');
assert.equal(genFizzBuzz(tests[2][0],tests[2][1]),results[2],'message: <code>genFizzBuzz('+JSON.stringify(tests[2][0])+','+tests[2][1]+')</code> should return <code>"'+results[2]+'"</code>.');
assert.equal(genFizzBuzz(tests[3][0],tests[3][1]),results[3],'message: <code>genFizzBuzz('+JSON.stringify(tests[3][0])+','+tests[3][1]+')</code> should return <code>"'+results[3]+'"</code>.');
assert.equal(genFizzBuzz(tests[4][0],tests[4][1]),results[4],'message: <code>genFizzBuzz('+JSON.stringify(tests[4][0])+','+tests[4][1]+')</code> should return <code>"'+results[4]+'"</code>.');
assert.equal(genFizzBuzz(tests[5][0],tests[5][1]),results[5],'message: <code>genFizzBuzz('+JSON.stringify(tests[5][0])+','+tests[5][1]+')</code> should return <code>"'+results[5]+'"</code>.');
assert.equal(genFizzBuzz(tests[6][0],tests[6][1]),results[6],'message: <code>genFizzBuzz('+JSON.stringify(tests[6][0])+','+tests[6][1]+')</code> should return <code>"'+results[6]+'"</code>.');
/// id: 5a23c84252665b21eecc7e78
