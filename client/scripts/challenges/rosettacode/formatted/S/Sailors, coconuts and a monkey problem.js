
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Sailors, coconuts and a monkey problem
/// type: rosetta-code

/// categories:
/// Puzzles

/// difficulty: ?

/// benchmark:

/// description: Sailors, coconuts and a monkey problem.html

/// challengeSeed:
// noprotect
function splitCoconuts(intSailors) {
  // Good luck!
  return true;
}

/// solutions:
// noprotect
function splitCoconuts(intSailors) {
  let intNuts = intSailors;
  let result = splitCoconutsHelper(intNuts, intSailors);
  while (!result) {
    intNuts += 1;
    result = splitCoconutsHelper(intNuts, intSailors);
  }

  return intNuts;
}

function splitCoconutsHelper(intNuts, intSailors, intDepth) {
  const nDepth = intDepth !== undefined ? intDepth : intSailors;
  const portion = Math.floor(intNuts / intSailors);
  const remain = intNuts % intSailors;

  if (portion <= 0 || remain !== (nDepth ? 1 : 0)) {
    return null;
  }

  if (nDepth) {
    return splitCoconutsHelper(
      intNuts - portion - remain, intSailors, nDepth - 1
    );
  }

  return intNuts;
}

/// tail:

/// tests:
assert(typeof splitCoconuts === 'function', 'message: <code>splitCoconuts</code> is a function.');
assert(splitCoconuts(5) === 3121, 'message: <code>splitCoconuts(5)</code> should return 3121.');
assert(splitCoconuts(6) === 233275, 'message: <code>splitCoconuts(6)</code> should return 233275.');
assert(splitCoconuts(7) === 823537, 'message: <code>splitCoconuts(7)</code> should return 823537.');

/// id: 59da22823d04c95919d46269
