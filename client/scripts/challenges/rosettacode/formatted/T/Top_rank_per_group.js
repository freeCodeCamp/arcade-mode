/// WIP

/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Top rank per group
/// type: rosetta-code

/// categories:
/// ranking

/// difficulty: 7

/// description:
/// <div class="rosetta">
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Find the top <span class="rosetta__text--italic">N</span> ranked data in each group, where <span class="rosetta__text--italic">N</span>  is provided as a parameter. Name of the rank and the group are also provided as parameter.</p><br/>
/// Given the following data:
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
/// [
///   { name: 'Tyler Bennett', id: 'E10297', salary: 32000, dept: 'D101' },
///   { name: 'John Rappl', id: 'E21437', salary: 47000, dept: 'D050' },
///   { name: 'George Woltman', id: 'E00127', salary: 53500, dept: 'D101' },
///   { name: 'Adam Smith', id: 'E63535', salary: 18000, dept: 'D202' },
///   { name: 'Claire Buckman', id: 'E39876', salary: 27800, dept: 'D202' },
///   { name: 'David McClellan', id: 'E04242', salary: 41500, dept: 'D101' },
///   { name: 'Rich Holcomb', id: 'E01234', salary: 49500, dept: 'D202' },
///   { name: 'Nathan Adams', id: 'E41298', salary: 21900, dept: 'D050' },
///   { name: 'Richard Potter', id: 'E43128', salary: 15900, dept: 'D101' },
///   { name: 'David Motsinger', id: 'E27002', salary: 19250, dept: 'D202' },
///   { name: 'Tim Sampair', id: 'E03033', salary: 27000, dept: 'D101' },
///   { name: 'Kim Arlich', id: 'E10001', salary: 57000, dept: 'D190' },
///   { name: 'Timothy Grove', id: 'E16398', salary: 29900, dept: 'D190' }
/// ];
/// </pre></div>
/// one could rank top 10 employees in each department by calling
/// <code>topRankPerGroup(10, data, 'dept', 'salary')</code>
/// <br>
/// Given the following data:
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
/// [
///   { name: 'Friday 13th', genre: 'horror', rating: 9.9 },
///   { name: "Nightmare on Elm's Street", genre: 'horror', rating: 5.7 },
///   { name: 'Titanic', genre: 'drama', rating: 7.3 },
///   { name: 'Maze Runner', genre: 'scifi', rating: 7.1 },
///   { name: 'Blade runner', genre: 'scifi', rating: 8.9 }
/// ];
/// </pre></div>
/// one could rank the top-rated movie in each genre by calling
/// <code>topRankPerGroup(1, data, 'genre', 'rating')</code>
/// </div>

/// challengeSeed:
function topRankPerGroup(n, data, groupName, rankName) {
  // Good luck!
  return true;
}

/// solutions:

const collectDept = function (arrOfObj, groupName) {
  const collect = arrOfObj.reduce((rtnObj, obj) => {
    if (rtnObj[obj[groupName]] === undefined) {
      rtnObj[obj[groupName]] = [];
    }
    rtnObj[obj[groupName]].push(obj);
    return rtnObj;
  }, {} // initial value to reduce
  );

  return Object.keys(collect).sort().map(key => collect[key]);
};

const sortRank = function (arrOfRankArrs, rankName) {
  return arrOfRankArrs.map(item => item.sort((a, b) => {
    if (a[rankName] > b[rankName]) { return -1; }
    if (a[rankName] < b[rankName]) { return 1; }
    return 0;
  }));
};

function topRankPerGroup(n, data, groupName, rankName) {
  if (n < 0) { return; }
  return sortRank(collectDept(data, groupName),
    rankName).map(list => list.slice(0, n));
}

/// tail:
const testData1 = [
  { name: 'Tyler Bennett', id: 'E10297', salary: 32000, dept: 'D101' },
  { name: 'John Rappl', id: 'E21437', salary: 47000, dept: 'D050' },
  { name: 'George Woltman', id: 'E00127', salary: 53500, dept: 'D101' },
  { name: 'Adam Smith', id: 'E63535', salary: 18000, dept: 'D202' },
  { name: 'Claire Buckman', id: 'E39876', salary: 27800, dept: 'D202' },
  { name: 'David McClellan', id: 'E04242', salary: 41500, dept: 'D101' },
  { name: 'Rich Holcomb', id: 'E01234', salary: 49500, dept: 'D202' },
  { name: 'Nathan Adams', id: 'E41298', salary: 21900, dept: 'D050' },
  { name: 'Richard Potter', id: 'E43128', salary: 15900, dept: 'D101' },
  { name: 'David Motsinger', id: 'E27002', salary: 19250, dept: 'D202' },
  { name: 'Tim Sampair', id: 'E03033', salary: 27000, dept: 'D101' },
  { name: 'Kim Arlich', id: 'E10001', salary: 57000, dept: 'D190' },
  { name: 'Timothy Grove', id: 'E16398', salary: 29900, dept: 'D190' }
];

const res1 = topRankPerGroup(10, testData1, 'dept', 'salary');

const testData2 = [
  { name: 'Friday 13th', genre: 'horror', rating: 9.9 },
  { name: "Nightmare on Elm's Street", genre: 'horror', rating: 5.7 },
  { name: 'Titanic', genre: 'drama', rating: 7.3 },
  { name: 'Maze Runner', genre: 'scifi', rating: 7.1 },
  { name: 'Blade runner', genre: 'scifi', rating: 8.9 }
];

const res2 = topRankPerGroup(1, testData2, 'genre', 'rating');
const res3 = topRankPerGroup(2, testData2, 'genre', 'rating');

//console.log(JSON.stringify(topRankPerGroup(10, testData1)));

/// tests:
assert(typeof topRankPerGroup === 'function', 'message: <code>topRankPerGroup</code> is a function.');
assert(typeof topRankPerGroup(-1, []) === 'undefined', 'message: <code>topRankPerGroup</code> returns undefined on negative n values.');
assert.equal(res1[0][0].dept, 'D050', 'message: First department must be D050');
assert.equal(res1[0][1].salary, 21900, 'message: First department must be D050');
assert.equal(res1[3][3].dept, 'D202', 'message: The last department must be D202');
assert.equal(res2[2].length, 1, 'message: <code>topRankPerGroup(1, ...)</code> must return only top ranking result per group.');
assert.equal(res3[2][1].name, 'Maze Runner', 'message: <code>topRankPerGroup(1, ...)</code> must return only top ranking result per group.');
