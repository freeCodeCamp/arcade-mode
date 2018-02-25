
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Gray code
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// benchmark:

/// description:
/// <div class="rosetta"><p class="rosetta__paragraph"><a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Gray code" title="wp: Gray code">Gray code</a> is a form of binary encoding where transitions between consecutive numbers differ by only one bit. This is a useful encoding for reducing hardware data hazards with values that change rapidly and/or connect to slower hardware as inputs. It is also useful for generating inputs for <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Karnaugh map" title="wp: Karnaugh map">Karnaugh maps</a> in order from left to right or top to bottom.</p><br/><p class="rosetta__paragraph">Create a function to encode a number to and decode a number from Gray code. The function should will have 2 parameters. The first would be a boolean. The function should encode for true and decode for false. The second parameter would be the number to be encoded/decoded.</p><br/><p class="rosetta__paragraph">Display the normal binary representations, Gray code representations, and decoded Gray code values for all 5-bit binary numbers (0-31 inclusive, leading 0's not necessary).</p><br/><p class="rosetta__paragraph">There are many possible Gray codes. The following encodes what is called "binary reflected Gray code."</p><br/><p class="rosetta__paragraph">Encoding (MSB is bit 0, b is binary, g is Gray code):</p><br/><div class="rosetta__pre-wrap"><pre class="rosetta__pre">if b[i-1] = 1
///    g[i] = not b[i]
/// else
///    g[i] = b[i]</pre></div><br/><p class="rosetta__paragraph">Or:</p><br/><div class="rosetta__pre-wrap"><pre class="rosetta__pre">g = b xor (b logically right shifted 1 time)</pre></div><br/><p class="rosetta__paragraph">Decoding (MSB is bit 0, b is binary, g is Gray code):</p><br/><div class="rosetta__pre-wrap"><pre class="rosetta__pre">b[0] = g[0]<br/>for other bits:
/// b[i] = g[i] xor b[i-1]</pre></div>
/// </div>

/// challengeSeed:
function gray (enc,number) {
  // Good luck!
}

/// solutions:
function gray(enc,number){
  if(enc){
      return number ^ (number >> 1);
  }else{
      let n = number;

      while (number >>= 1) {
          n ^= number;
      }
      return n;
  }
}

/// tests:
assert(typeof gray=='function','message: <code>gray</code> should be a function.');
assert(typeof gray(true,177)=='number','message: <code>gray(true,177)</code> should return a number.');
assert.equal(gray(true,177),233,'message: <code>gray(true,177)</code> should return <code>233</code>.');
assert.equal(gray(true,425),381,'message: <code>gray(true,425)</code> should return <code>381</code>.');
assert.equal(gray(true,870),725,'message: <code>gray(true,870)</code> should return <code>725</code>.');
assert.equal(gray(false,233),177,'message: <code>gray(false,233)</code> should return <code>177</code>.');
assert.equal(gray(false,381),425,'message: <code>gray(false,381)</code> should return <code>425</code>.');
assert.equal(gray(false,725),870,'message: <code>gray(false,725)</code> should return <code>870</code>.');
/// id: 5a23c84252665b21eecc7e80
