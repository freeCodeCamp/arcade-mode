
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: SEDOLs
/// type: rosetta-code

/// categories:
/// checksum


/// difficulty: 4

/// benchmark:

/// description: SEDOLS.html

/// challengeSeed:
function sedol (input) {
  // Good luck!
  return true;
}

/// solutions:
function sedol(input) {
  const checkDigit = sedolCheckDigit(input);
  if (checkDigit !== null) {
    return input + checkDigit;
  }
  return null;
}

const weight = [1, 3, 1, 7, 3, 9, 1];
function sedolCheckDigit(char6) {
  if (char6.search(/^[0-9BCDFGHJKLMNPQRSTVWXYZ]{6}$/) === -1) {
    return null;
  }

  let sum = 0;
  for (let i = 0; i < char6.length; i++) {
    sum += weight[i] * parseInt(char6.charAt(i), 36);
  }
  const check = (10 - (sum % 10)) % 10;
  return check.toString();
}

/// tail:
const input = [
  '710889', 'B0YBKJ', '406566', 'B0YBLH', '228276',
  'B0YBKL', '557910', 'B0YBKR', '585284', 'B0YBKT',
  'BOATER', '12345', '123456', '1234567', 'ABBAAC',
  '767642', 'B33FAC', 'H3FH3F', 'C0M3D1', 'GOOGL3',
  'APPPL3'
];

const expected = [
  '7108899', 'B0YBKJ7', '4065663', 'B0YBLH2', '2282765',
  'B0YBKL9', '5579107', 'B0YBKR5', '5852842', 'B0YBKT7',
  null, null, '1234563', null, null, '7676426',
  null, 'H3FH3F6', 'C0M3D17', null, null
];

const inputLen = input.length;
const randIndex = Math.floor(Math.random(new Date().getTime()) * inputLen);
const inputVal = input[randIndex];
const expVal = expected[randIndex];
const randMsg = `message: <code>sedol('${inputVal}')</code> should return '${expVal}'.`;

/// tests:
assert(typeof sedol === 'function', 'message: <code>sedol</code> is a function.');
assert(sedol('a') === null, "message: <code>sedol('a')</code> should return null.");
assert(sedol('710889') === '7108899', "message: <code>sedol('710889')</code> should return '7108899'.");
assert(sedol('BOATER') === null, "message: <code>sedol('BOATER')</code> should return null.");
assert(sedol('228276') === '2282765', "message: <code>sedol('228276')</code> should return '2282765'.");
assert(sedol(inputVal) === expVal, randMsg);
/// id: 59d9c6bc214c613ba73ff012
