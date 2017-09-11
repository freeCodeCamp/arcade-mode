/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-bitwise: 0 */

const assert = require('assert');

/// title: Petch
/// type: arcade-mode

/// categories:
/// algorithms
/// xor
/// encryption
/// bit manipulation

/// difficulty: 2

/// images:
/// public/img/challenges/petch.png

/// description:
/// <img class='challenge__image' src='public/img/challenges/petch.png'>
/// Despite what others say, you and Petch were the best of friends in childhood long before she became famous. In fact during that last summer before she moved away, you two were especially fond of solving cryptography puzzles after finding out about them one day from a magazine at the local market. Among the topics learned, you two learned of the XOR (exclusive-or) function which only outputs true when both inputs are different. In a table concerning bits, it would look like this.
/// Input Output
/// A B
/// 0 0     0
/// 0 1     1
/// 1 0     1
/// 1 1     0
/// Accompanying the XOR function description was a 6-bit abbreviated ASCII set. 
///  !"#$%&'()*+,-./0123456789:;=?@[\]^_abcdefghijklmnopqrstuvwxyz|~
/// With the corresponding numbering in decimal,
///   ! " ...
/// 0 1 2 ...
/// And in binary,
///    0 000000
/// !  1 000001
/// "  2 000010
/// ...
/// z 61 111101
/// | 62 111110
/// ~ 63 111111
/// You both also learned of the one-time pad, an uncrackable encryption technique that uses a one-time pre-shared key the same or longer than the message being sent. You two were inseparable.
/// There then came a day when you found out. She had to move because her father had to relocate for work. You both knew what this meant. A few days before she left, she handed you a one-time pad. "In case anything happens," she said with a smirk on her face. "In case," you replied with a grin across yours.
/// Fast forward to the present, you found out a few years ago that Petch has become a famous singer with millions of Twitter followers. Thinking that she may have long forgotten about you, you decide to anonymously follow her on Twitter, once in a while checking to see how her life is evolving.
/// Then one day it happened. You saw the string of seemingly random characters in her most recent tweet. You knew beyond a doubt it was directed to you. You need to deciper her message.
/// Implement a function that uses the XOR cipher to encrypt/decrypt messages when provided with a key and message.

/// challengeSeed:
const characterSet = ` !"#$%&'()*+,-./0123456789:;=?@[\\]^_abcdefghijklmnopqrstuvwxyz|~`;

const OTP = `;'z@qxkw]0i"'8]mn64'y.x2*@xj87zy]k:xf"!p,!e(-xuar%!19#[t,@ &n r cido3j7( w_^$8^hyj1#d[rt.8_/4(1)]_c.l.75[r-mt]%8n$2[:y"7,:j:9)c_/"?l?u3pwbgt`;

const petchMsg = `h_(^&tk667:"tm]#9]oio.(z^w-%8y532kg3d"jqy!-\\]*2a@jks9ej!xwgknb) 1'/os8bos26_`;

function XOR (key, msg) {
  // Good luck!
}
// Run the following to get user output:
// XOR(OTP, petchMsg);

/// solutions:
const characterSet = ` !"#$%&'()*+,-./0123456789:;=?@[\\]^_abcdefghijklmnopqrstuvwxyz|~`;

const OTP = `;'z@qxkw]0i"'8]mn64'y.x2*@xj87zy]k:xf"!p,!e(-xuar%!19#[t,@ &n r cido3j7( w_^$8^hyj1#d[rt.8_/4(1)]_c.l.75[r-mt]%8n$2[:y"7,:j:9)c_/"?l?u3pwbgt`;

const petchMsg = `h_(^&tk667:"tm]#9]oio.(z^w-%8y532kg3d"jqy!-\\]*2a@jks9ej!xwgknb) 1'/os8bos26_`;

function XOR (key, msg) {
  let totalKey = key;
  while (msg.length > totalKey.length) {
    totalKey = key.concat(key);
  }
  return [...msg].map((ch, i) => {
    return characterSet[characterSet.indexOf(ch) ^ characterSet.indexOf(totalKey[i])]
  }).join('');
}

// XOR(OTP, petchMsg);

/// tail:
const encryptedMsg = '';
const decipheredMsg = '';

/// tests:
assert(typeof XOR === 'function', 'message: <code>XOR</code> is a function.');
assert(XOR(OTP, encryptedMsg) === decipheredMsg, 'message: <code>XOR</code> did not produce the right message.');
/// id: 59481016e949d6392ed98d4c
