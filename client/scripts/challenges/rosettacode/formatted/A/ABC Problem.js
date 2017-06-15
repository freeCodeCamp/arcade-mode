/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-restricted-syntax: 0 */
/* eslint prefer-const: 0 */

/* no benchmark expected as there were no "optimal" solutions in the solution list */

const assert = require('chai').assert;

/// title: ABC Problem
/// type: rosetta-code

/// categories:
/// ?

/// difficulty: ?

/// description:
/// You are given a collection of ABC blocks (e.g., childhood alphabet blocks). There are 20 blocks with two letters on each block. A complete alphabet is guaranteed amongst all sides of the blocks. The sample collection of blocks,
/// (B O)
/// (X K)
/// (D Q)
/// (C P)
/// (N A)
/// (G T)
/// (R E)
/// (T G)
/// (Q D)
/// (F S)
/// (J W)
/// (H U)
/// (V I)
/// (A N)
/// (O B)
/// (E R)
/// (F S)
/// (L Y)
/// (P C)
/// (Z M)
/// Some rules to keep in mind,
/// 1. Once a letter on a block is used, that block cannot be used again
/// 2. the function should be case-insensitive
/// Implement a function that takes a string (word) and determines whether the word can be spelled with the given collection of blocks.

/// challengeSeed:
function canMakeWord (word) {
  // Good luck!
}

/// solutions:
function canMakeWord (word) {
  const characters = 'BO XK DQ CP NA GT RE TG QD FS JW HU VI AN OB ER FS LY PC ZM';
  const blocks = characters.split(' ').map(pair => pair.split(''));

  const letters = [...word.toUpperCase()];
  let length = letters.length;
  const copy = new Set(blocks);

  letters.forEach(letter => {
    for (let block of copy) {
      const index = block.indexOf(letter);

      if (index !== -1) {
        length--;
        copy.delete(block);
        break;
      }
    }
  });
  return !length;
}

/// tail:
const words = ['bark', 'BooK', 'TReAT', 'COMMON', 'squAD', 'conFUSE'];

/// tests:
assert(typeof canMakeWord === 'function', 'message: <code>canMakeWord</code> is a function.');
assert(typeof canMakeWord('hi') === 'boolean', 'message: <code>canMakeWord</code> should return a boolean.');
assert.isTrue(canMakeWord(words[0]), 'message: <code>canMakeWord("bark")</code> should return true.');
assert.isFalse(canMakeWord(words[1]), 'message: <code>canMakeWord("BooK")</code> should return false.');
assert.isTrue(canMakeWord(words[2]), 'message: <code>canMakeWord("TReAT")</code> should return true.');
assert.isFalse(canMakeWord(words[3]), 'message: <code>canMakeWord("COMMON")</code> should return false.');
assert.isTrue(canMakeWord(words[4]), 'message: <code>canMakeWord("squAD")</code> should return true.');
assert.isTrue(canMakeWord(words[5]), 'message: <code>canMakeWord("conFUSE")</code> should return true.');
