
// WIP

/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Anagrams
/// type: rosetta-code

/// categories:


/// difficulty: ?

/// benchmark:
replaceWithActualFunctionHere;

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">When two or more words are composed of the same characters, but in a different order, they are called <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Anagram" title="wp: Anagram">anagrams</a>.</p>
/// <br/>
/// <p class="rosetta__paragraph">Using the word list at  http://www.puzzlers.org/pub/wordlists/unixdict.txt,</p>
/// <br>find the sets of words that share the same characters that contain the most words in them.
/// <br/>
/// <br/><p class="rosetta__paragraph"><hr></p><br/></div>

/// challengeSeed:
function replaceMe (foo) {
  // Good luck!
  return true;
}

/// solutions:
var fs = require('fs');
var words = fs.readFileSync('unixdict.txt', 'UTF-8').split('\n');

var i, item, max = 0,
    anagrams = {};
 
for (i = 0; i < words.length; i += 1) {
  var key = words[i].split('').sort().join('');
  if (!anagrams.hasOwnProperty(key)) {//check if property exists on current obj only
      anagrams[key] = [];
  }
  var count = anagrams[key].push(words[i]); //push returns new array length
  max = Math.max(count, max);
}

//note, this returns all arrays that match the maximum length
for (item in anagrams) {
  if (anagrams.hasOwnProperty(item)) {//check if property exists on current obj only
    if (anagrams[item].length === max) {
        console.log(anagrams[item].join(' '));
    }
  }
}

/// tail:
const replaceThis = 3;

/// tests:
assert(typeof replaceMe === 'function', 'message: <code>replaceMe</code> is a function.');
/// id: 594c3b89fbfbca5c71d1939b
