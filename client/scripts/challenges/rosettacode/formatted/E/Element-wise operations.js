
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Element-wise operations
/// type: rosetta-code

/// categories:
/// Mathematics

/// difficulty: 3

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Implement basic element-wise matrix-matrix and scalar-matrix operations.</p><p class="rosetta__paragraph">Implement:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  addition</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  subtraction</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  multiplication</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  division</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  exponentiation</span></p>
/// <p>The first parameter will be the operation to be performed, for example : "m_add" for matrix addition and "s_add" for scalar addition. The second and third parameters will be the matrices on which the operations are to be performed.
/// </div>

/// challengeSeed:
function operation (op, arr1, arr2) {
  // Good luck!
}

/// solutions:
function operation(op, arr1, arr2) {
  const ops = {
    add: ((a, b) => a + b),
    sub: ((a, b) => a - b),
    mult: ((a, b) => a * b),
    div: ((a, b) => a / b),
    exp: ((a, b) => a ** b)
  };
  const ifm = op.startsWith('m');
  const doOp = ops[op.substring(2)];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[0].length; j++) {
      arr1[i][j] = doOp(arr1[i][j], (ifm) ? (arr2[i][j]) : (arr2));
    }
  }
  return arr1;
}

/// tests:
assert(typeof operation === 'function', 'message: <code>operation</code> is a function.');
assert.deepEqual(operation('m_add', [[1, 2], [3, 4]], [[1, 2], [3, 4]]), [[2, 4], [6, 8]], 'message: <code>operation("m_add",[[1,2],[3,4]],[[1,2],[3,4]])</code> should return <code>[[2,4],[6,8]]</code>.');
assert.deepEqual(operation('s_add', [[1, 2], [3, 4]], 2), [[3, 4], [5, 6]], 'message: <code>operation("s_add",[[1,2],[3,4]],[[1,2],[3,4]])</code> should return <code>[[3,4],[5,6]]</code>.');
assert.deepEqual(operation('m_sub', [[1, 2], [3, 4]], [[1, 2], [3, 4]]), [[0, 0], [0, 0]], 'message: <code>operation("m_sub",[[1,2],[3,4]],[[1,2],[3,4]])</code> should return <code>[[0,0],[0,0]]</code>.');
assert.deepEqual(operation('m_mult', [[1, 2], [3, 4]], [[1, 2], [3, 4]]), [[1, 4], [9, 16]], 'message: <code>operation("m_mult",[[1,2],[3,4]],[[1,2],[3,4]])</code> should return <code>[[1,4],[9,16]]</code>.');
assert.deepEqual(operation('m_div', [[1, 2], [3, 4]], [[1, 2], [3, 4]]), [[1, 1], [1, 1]], 'message: <code>operation("m_div",[[1,2],[3,4]],[[1,2],[3,4]])</code> should return <code>[[1,1],[1,1]]</code>.');
assert.deepEqual(operation('m_exp', [[1, 2], [3, 4]], [[1, 2], [3, 4]]), [[1, 4], [27, 256]], 'message: <code>operation("m_exp",[[1,2],[3,4]],[[1,2],[3,4]])</code> should return <code>[[1,4],[27,256]]</code>.');
assert.deepEqual(operation('m_add', [[1, 2, 3, 4], [5, 6, 7, 8]], [[9, 10, 11, 12], [13, 14, 15, 16]]), [[10, 12, 14, 16], [18, 20, 22, 24]], 'message: <code>operation("m_add",[[1,2,3,4],[5,6,7,8]],[[9,10,11,12],[13,14,15,16]])</code> should return <code>[[10,12,14,16],[18,20,22,24]]</code>.');
/// id: 599c333915e0ea32d04d4bec
