
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-underscore-dangle: 0 */

const assert = require('chai').assert;

/// title: Define a primitive data type
/// type: rosetta-code

/// categories:
/// Type System

/// difficulty: 3

/// benchmark:

/// description:
/// <div class="rosetta"><br/>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Define a type that behaves like an integer but has a lowest valid value of 1 and a highest valid value of 10.</p>
/// <br/>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Errors:</dt></dl>
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered">If you try to instantiate a <code>Num</code> with a value outside of 1 - 10
/// it should throw a <code>TypeError</code> with an error message of <code>'Out of range'</code>.</li>
/// <li class="rosetta__list-item--unordered">If you try to instantiate a <code>Num</code> with a value that is not a number
/// it should throw a <code>TypeError</code> with an error message of <code>'Not a Number'</code>.</li>
/// </ul>
/// <br />
/// </div>

/// challengeSeed:
function Num (n) {
  // Good luck!
  return n;
}

/// solutions:
function Num(n) {
  const num = Math.floor(n);
  if (isNaN(num)) {
    throw new TypeError('Not a Number');
  }
  if (num < 1 || num > 10) {
    throw new TypeError('Out of range');
  }

  this._value = num;
}
Num.prototype.valueOf = function() { return this._value; };
Num.prototype.toString = function () { return this._value.toString(); };

/// tail:

/// tests:
assert(typeof Num === 'function', 'message: <code>Num</code> should be a function.');
assert(typeof (new Num(4)) === 'object', 'message: <code>new Num(4)</code> should return an object.');
assert.throws(() => new Num('test'), TypeError, 'Not a Number', 'message: <code>new Num(\'test\')</code> should throw a TypeError with message \'Not a Number\'.');
assert.throws(() => new Num(0), TypeError, 'Out of range', 'message: <code>new Num(0)</code> should throw a TypeError with message \'Out of range\'.');
assert.throws(() => new Num(-5), TypeError, 'Out of range', 'message: <code>new Num(-5)</code> should throw a TypeError with message \'Out of range\'.');
assert.throws(() => new Num(11), TypeError, 'Out of range', 'message: <code>new Num(10)</code> should throw a TypeError with message \'Out of range\'.');
assert.throws(() => new Num(20), TypeError, 'Out of range', 'message: <code>new Num(20)</code> should throw a TypeError with message \'Out of range\'.');
assert.equal(new Num(3) + new Num(4), 7, 'message: <code>new Num(3) + new Num(4)</code> should equal 7.');
assert.equal(new Num(3) - new Num(4), -1, 'message: <code>new Num(3) - new Num(4)</code> should equal -1.');
assert.equal(new Num(3) * new Num(4), 12, 'message: <code>new Num(3) * new Num(4)</code> should equal 12.');
assert.equal(new Num(3) / new Num(4), 0.75, 'message: <code>new Num(3) / new Num(4)</code> should equal 0.75.');
assert(new Num(3) < new Num(4), 'message: <code>new Num(3) < new Num(4)</code> should be true.');
assert(!(new Num(3) > new Num(4)), 'message: <code>new Num(3) > new Num(4)</code> should be false.');
assert.equal((new Num(5)).toString(), '5', 'message: <code>(new Num(5)).toString()</code> should return \'5\'');
/// id: 597089c87eec450c68aa1643
