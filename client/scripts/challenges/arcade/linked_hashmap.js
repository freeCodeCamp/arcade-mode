/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-prototype-builtins: 0 */

const assert = require('chai').assert;

/// title: Linked Hash Map
/// type: arcade-mode
/// difficulty: 3

/// categories:
/// data structures
/// hash map

/// description:
/// In a hash map, the order of the keys is unspecified. We can use
/// Linked hash map data structure to retain the insertion order of the keys, when iterating
/// through the hash map.
/// Instructions:
/// Implement a Linked hash map. It should have the following functions:
///   <code>set</code> for adding data with specific key
///   <code>get</code> for retrieving data with special key
///   <code>delete</code> for deleting data with specific key
///   <code>has</code> for checking if key exists.
///   <code>keys</code> for returning all keys in insertion order
///   <code>forEach</code> to iterate through the hash map
/// Note: Re-inserting an existing key does not change the order of the keys.

/// challengeSeed:
function LinkedHashMap() {
  // Good luck!
  this.set = (key, data) => {
  };

  this.get = key => {
  };

  this.delete = key => {
  };

  this.keys = () => {
  };

  /* Call fn(key, value) */
  this.forEach = fn => {
  };
}

/// solutions:
function LinkedHashMap() {
  this.orderList = [];
  this.hashMap = {};

  this.set = (key, data) => {
    if (!this.has(key)) {
      this.orderList.push(key);
    }
    this.hashMap[key] = data;
  };

  this.get = key => this.hashMap[key];

  this.delete = key => {
    if (this.has(key)) {
      this.orderList.splice(this.orderList.indexOf(key));
      delete this.hashMap[key];
    }
  };

  this.has = key => (
    this.hashMap.hasOwnProperty(key)
  );

  this.keys = () => this.orderList;

  this.forEach = fn => {
    this.orderList.forEach((key, index) => {
      fn(key, this.hashMap[key]);
    });
  };
}

/// tail:
const hashmap = new LinkedHashMap();
hashmap.set('aaa', 'bbb');

const hashmap2 = new LinkedHashMap();
hashmap2.set('123', '123');
hashmap2.delete('123');

const hashmap3 = new LinkedHashMap();
hashmap3.set('123', '123');
hashmap3.set('567', '123');
hashmap3.set('890', '123');

const testArr4 = [1, 2, 3, 4, 5, 6];
const hashmap4 = new LinkedHashMap();
testArr4.forEach(num => { hashmap4.set(num, num); });

const accumul = function(hm) {
  let result = 0;
  hm.forEach((key, value) => {
    result += value;
  });
  return result;
};
const correctSum = testArr4.reduce((acc, val) => acc + val);

/// tests:
assert.equal(typeof LinkedHashMap, 'function');
assert.equal(hashmap.get('aaa'), 'bbb');
assert.deepEqual(hashmap.keys(), ['aaa']);
assert.equal(hashmap2.keys().length, 0);
assert.deepEqual(hashmap3.keys(), ['123', '567', '890']);
assert.equal(accumul(hashmap4), correctSum);
