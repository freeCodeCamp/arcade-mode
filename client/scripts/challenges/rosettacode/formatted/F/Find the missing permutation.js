
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Find the missing permutation
/// type: rosetta-code

/// categories:


/// difficulty: 4

/// description:
/// <div class="rosetta"><p class="rosetta__paragraph">Write a function that takes a string and an array as parameters. The array contains some of the permutation of the string. The function should return the missing permutations.</p>
/// </div>

/// challengeSeed:
function permute (str,perms) {
  // Good luck!
}

/// solutions:
function permute(str,perms){
  var x,v=str;
    for(var p = -1, j, k, f, r, l = v.length, q = 1, i = l + 1; --i; q *= i);
    for(x = [new Array(l), new Array(l), new Array(l), new Array(l)], j = q, k = l + 1, i = -1;
        ++i < l; x[2][i] = i, x[1][i] = x[0][i] = j /= --k);
    for(r = new Array(q); ++p < q;)
        for(r[p] = new Array(l), i = -1; ++i < l; !--x[1][i] && (x[1][i] = x[0][i],
            x[2][i] = (x[2][i] + 1) % l), r[p][i] = 0 ? x[3][i] : v[x[3][i]])
            for(x[3][i] = x[2][i], f = 0; !f; f = !f)
                for(j = i; j; x[3][--j] == x[2][i] && (x[3][i] = x[2][i] = (x[2][i] + 1) % l, f = 1));

    var all = r.map(function(elem) {return elem.join('')});

    var missing = all.filter(function(elem) {return perms.indexOf(elem) == -1});
    return missing;
};

/// tail:
const tests=[['AB'],
          ['BA'],
          [ 'BAC', 'CAB', 'CBA' ],
          [ 'ABC', 'BCA' ],
          [ 'ABDC','ADBC','BADC','BACD','ABCD', 'CABD', 'ACDB', 'DACB', 'BCDA', 'ACBD', 'ADCB', 'CDAB']];

const results=[['BA'],
             ['AB'],
             [ 'ABC', 'ACB', 'BCA' ],
             [ 'ACB', 'BAC', 'CAB', 'CBA' ],
             [ 'BCAD','BDCA','BDAC','CADB','CBAD','CBDA','CDBA','DABC','DBCA','DBAC','DCBA','DCAB' ]];

/// tests:
assert(typeof permute=="function","message: <code>permute</code> should be a function.");
assert(Array.isArray(permute('AB',tests[0].slice())),"message: <code>permute('AB',['AB'])</code> return an array.");
assert.deepEqual(permute('AB',tests[0].slice()),results[0],"message:<code>permute('AB',"+JSON.stringify(tests[0])+")</code> should return <code>"+JSON.stringify(results[0])+"</code>");assert.deepEqual(permute('AB',tests[1].slice()),results[1],"message:<code>permute('AB',"+JSON.stringify(tests[1])+")</code> should return <code>"+JSON.stringify(results[1])+"</code>");
assert.deepEqual(permute('ABC',tests[2].slice()),results[2],"message:<code>permute('ABC',"+JSON.stringify(tests[2])+")</code> should return <code>"+JSON.stringify(results[2])+"</code>");
assert.deepEqual(permute('ABC',tests[3].slice()),results[3],"message:<code>permute('ABC',"+JSON.stringify(tests[3])+")</code> should return <code>"+JSON.stringify(results[3])+"</code>");
assert.deepEqual(permute('ABCD',tests[4].slice()),results[4],"message:<code>permute('ABCD',"+JSON.stringify(tests[4])+")</code> should return <code>"+JSON.stringify(results[4])+"</code>");
/// id: 5a6091c34d579c0c906e2037
