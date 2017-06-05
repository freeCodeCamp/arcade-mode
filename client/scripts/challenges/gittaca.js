/* eslint spaced-comment: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-redeclare: 0 */
const assert = require('chai').assert;

/// title: Gittaca
/// type: arcade-mode

/// categories:
/// algorithms
/// dynamic programming
/// longest common subsequence

/// difficulty: 8

/// benchmark:
diff(benchmark[0], benchmark[1]);

/// images:
/// public/img/challenges/pexels-photo-127556.jpeg

/// description:
/// <img class='challenge__image' src='public/img/challenges/pexels-photo-127556.jpeg'>
/// With the arrival of precision genetic editing tools such as CRISPR/cas9 and the emerging field of nanoengineering, you wish to create a version control system for tracking modifications of genetic data. Instead of line-based diffing, your algorithm will be nucleotide (character) based. Knowing that most genomes are in the ballpark of billions of DNA base pairs (Gbp), diffing complete genomes cannot be completed in a reasonable amount of time or space given current technology levels. Therefore, you decide to focus on diffing genetic data at the gene level and lower in the ballpark of hundred thousands base pairs (Mbp). Since you just are just beginning, you test small strings first.
/// Implement an algorithm that will output the diff of two provided strings
/// Sample input
/// diff('GTAGACA', 'GATTACA');
/// Sample outputs (multiple answers possible)
/// G +A T +T A -G -A C A
/// G -T A +T +T -G A C A
/// G -T A -G +T +T A C A

/// challengeSeed:
function diff (oldStr, newStr) {
  // Good luck!
  return true;
}

/// solutions:
function createLCSTable (str1, str2, l1, l2) {
  const arr = new Array(l1 + 1).fill(0).map(() => new Array(l2 + 1).fill(0));
  for (let row = 1; row <= l1; row++) {
    for (let col = 1; col <= l2; col++) {
      if (str1[row - 1] === str2[col - 1]) {
        arr[row][col] = arr[row - 1][col - 1] + 1;
      }
      else arr[row][col] = Math.max(arr[row - 1][col], arr[row][col - 1]);
    }
  }
  return arr;
}

function generateDiff (oldStr, newStr, lcsTable, diffArr) {
  const osl = oldStr.length;
  const nsl = newStr.length;

  if (osl > 0 && nsl > 0 && oldStr[osl - 1] === newStr[nsl - 1]) {
    diffArr.unshift(oldStr[osl - 1]);
    generateDiff(oldStr.slice(0, -1), newStr.slice(0, -1), lcsTable, diffArr);
  }
  else if (nsl > 0 && (osl === 0 || lcsTable[osl][nsl - 1] >= lcsTable[osl - 1][nsl])) {
    diffArr.unshift(`+${newStr[nsl - 1]}`);
    generateDiff(oldStr, newStr.slice(0, -1), lcsTable, diffArr);
  }
  else if (osl > 0 && (nsl === 0 || lcsTable[osl][nsl - 1] < lcsTable[osl - 1][nsl])) {
    diffArr.unshift(`-${oldStr[osl - 1]}`);
    generateDiff(oldStr.slice(0, -1), newStr, lcsTable, diffArr);
  }
}

function diff (oldStr, newStr) {
  const lcsTable = createLCSTable(oldStr, newStr, oldStr.length, newStr.length);
  const diffArr = [];
  generateDiff(oldStr, newStr, lcsTable, diffArr);

  return diffArr.join(' ');
}

/// tail:
const testCase1 = ['GTTG', 'GTTAC'];
const tc1Answers = [['G', 'T', 'T', '+A', '+C', '-G'], ['G', 'T', 'T', '-G', '+A', '+C']].map(arr => arr.join(' '));
const testCase2 = ['ATCGTGT', 'AGTGCAGC'];
const tc2Answers = [
  ['A', '-T', '-C', 'G', 'T', 'G', '-T', '+C', '+A', '+G', '+C'],
  ['A', '-T', '-C', 'G', 'T', 'G', '+C', '+A', '+G', '+C', '-T']
].map(arr => arr.join(' '));
const benchmark = [
  'TGTAGAAGTGTCAGCATCGATCGGTCCAATCGACAAATAAAGGTTTCAACACTGTTCTCTTAGGAATCGGTGGGCGATTAGAGCGTGGC',
  'TCGATTCAAAATTGCCCTCCATAGGTAGACACATTATATCGATCGTGGTGCGTTGCCTAGTGTCACATCATAGGTAATTGCAGTAGAGT'
];

/// tests:
assert(typeof diff === 'function', 'message: <code>diff</code> is a function.');
assert.include(tc1Answers, diff(testCase1[0], testCase1[1]), 'message: diff("GTTG", "GTTAC") should return either "G T T +A +C -G" or "G T T -G +A +C"');
assert.include(tc2Answers, diff(testCase2[0], testCase2[1]), 'message: diff("ATCGTGT", "AGTGCAGC") should return either "A -T -C G T G -T +C +A +G +C" or "A -T -C G T G +C +A +G +C -T"');
