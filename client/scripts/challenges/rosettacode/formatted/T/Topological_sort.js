/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Topological sort
/// type: rosetta-code

/// categories:
/// sort
/// dependencies

/// difficulty: 7

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">
/// Given a mapping between items, and items they depend on, a 
/// <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Topological sorting" title="wp: Topological sorting">topological sort</a> orders 
/// items so that no item precedes an item it depends upon.
/// </p>
/// <br/>
/// <p class="rosetta__paragraph">
/// The compiling of a library in the 
/// <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/VHDL" title="wp: VHDL">VHDL</a> language
/// has the constraint that a library must be compiled after any library it depends on.
/// </p>
/// <br/>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">
/// Write a function that will return a valid compile order of VHDL libraries from their dependencies.
/// </p>
/// <br/>
/// <ul class="rosetta__unordered-list">
///   <li class="rosetta__list-item--unordered">Assume library names are single words. </li>
///   <li class="rosetta__list-item--unordered">Items mentioned as only dependents have no dependents of their own, but their order of compiling must be given.</li>
///   <li class="rosetta__list-item--unordered">Any self dependencies should be ignored. </li>
///   <li class="rosetta__list-item--unordered">Any un-orderable dependencies should be ignored.</li>
/// </ul>
/// <br>
/// <p class="rosetta__paragraph">Use the following data as an example:</p>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
/// LIBRARY          LIBRARY DEPENDENCIES
/// =======          ====================
/// des_system_lib   std synopsys std_cell_lib des_system_lib dw02 dw01 ramlib ieee
/// dw01             ieee dw01 dware gtech
/// dw02             ieee dw02 dware
/// dw03             std synopsys dware dw03 dw02 dw01 ieee gtech
/// dw04             dw04 ieee dw01 dware gtech
/// dw05             dw05 ieee dware
/// dw06             dw06 ieee dware
/// dw07             ieee dware
/// dware            ieee dware
/// gtech            ieee gtech
/// ramlib           std ieee
/// std_cell_lib     ieee std_cell_lib
/// synopsys
/// </pre></div><br/><br>
/// <p class="rosetta__paragraph">
/// <small>Note: the above data would be un-orderable if, for example, <code>dw04</code> is added to the list of dependencies of <code>dw01</code>.</small>
/// </p>
/// <br/>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">C.f.:</dt></dl>
/// <ul class="rosetta__unordered-list">
///   <li class="rosetta__list-item--unordered"> 
///     <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Topological sort/Extracted top item" title="Topological sort/Extracted top item">Topological sort/Extracted top item</a>.
///   </li>
/// </ul>
/// <br>
/// <p class="rosetta__paragraph">There are two popular algorithms for topological sorting:</p>
/// <p class="rosetta__paragraph">
///   Kahn's 1962 topological sort, and depth-first search:
///   <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Topological sorting" title="wp: Topological sorting">topological sort</a>
/// </p>
/// <p class="rosetta__paragraph">
///   Jason Sachs:
///   <a class="rosetta__link--wiki" href="http://www.embeddedrelated.com/showarticle/799.php" title="link: http://www.embeddedrelated.com/showarticle/799.php">
///   "Ten little algorithms, part 4: topological sort"
///   </a>.
/// </p>
/// </div>

/// challengeSeed:
function topologicalSort(libs) {
  // Good luck!
  return true;
}

/// solutions:
function topologicalSort(libs) {
  // A map of the input data, with the keys as the packages, and the values as
  // and array of packages on which it depends.
  const D = libs
    .split('\n')
    .map(e => e.split(' ').filter(ep => ep !== ''))
    .reduce((p, c) =>
      p.set(c[0], c.filter((e, i) => (i > 0 && e !== c[0] ? e : null))), new Map());
  [].concat(...D.values()).forEach(e => {
    D.set(e, D.get(e) || []);
  });

  // The above map rotated so that it represents a DAG of the form
  // Map {
  //    A => [ A, B, C],
  //    B => [C],
  //    C => []
  // }
  // where each key represents a node, and the array contains the edges.
  const G = [...D.keys()].reduce((p, c) =>
    p.set(
      c,
      [...D.keys()].filter(e => D.get(e).includes(c))),
    new Map()
  );

  // An array of leaf nodes; nodes with 0 in degrees.
  const Q = [...D.keys()].filter(e => D.get(e).length === 0);

  // The result array.
  const S = [];
  while (Q.length) {
    const u = Q.pop();
    S.push(u);
    G.get(u).forEach(v => {
      D.set(v, D.get(v).filter(e => e !== u));
      if (D.get(v).length === 0) {
        Q.push(v);
      }
    });
  }

  return S;
}

/// tail:
const libsSimple =
  `aaa bbb
  bbb`;

const libsVHDL =
  `des_system_lib   std synopsys std_cell_lib des_system_lib dw02 dw01 ramlib ieee
  dw01             ieee dw01 dware gtech
  dw02             ieee dw02 dware
  dw03             std synopsys dware dw03 dw02 dw01 ieee gtech
  dw04             dw04 ieee dw01 dware gtech
  dw05             dw05 ieee dware
  dw06             dw06 ieee dware
  dw07             ieee dware
  dware            ieee dware
  gtech            ieee gtech
  ramlib           std ieee
  std_cell_lib     ieee std_cell_lib
  synopsys`;

const solutionVHDL = [
  'ieee', 'std_cell_lib', 'gtech', 'dware', 'dw07', 'dw06',
  'dw05', 'dw02', 'dw01', 'dw04', 'std', 'ramlib', 'synopsys',
  'dw03', 'des_system_lib'
];

const libsCustom =
  `a b c d
  b c d
  d c
  c base
  base`;
const solutionCustom = ['base', 'c', 'd', 'b', 'a'];

const libsUnorderable =
  `TestLib Base MainLib
  MainLib TestLib
  Base`;

const solutionUnorderable = ['Base'];

/// tests:
assert(typeof topologicalSort === 'function', 'message: <code>topologicalSort</code> is a function.');
assert.deepEqual(topologicalSort(libsSimple), ['bbb', 'aaa'], 'message: <code>topologicalSort</code> must return correct library order..');
assert.deepEqual(topologicalSort(libsVHDL), solutionVHDL, 'message: <code>topologicalSort</code> must return correct library order..');
assert.deepEqual(topologicalSort(libsCustom), solutionCustom, 'message: <code>topologicalSort</code> must return correct library order..');
assert.deepEqual(topologicalSort(libsUnorderable), solutionUnorderable, 'message: <code>topologicalSort</code> must ignore unorderable dependencies..');

/// id: 594fa2746886f41f7d8bf225
