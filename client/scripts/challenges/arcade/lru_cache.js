/* eslint spaced-comment: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-redeclare: 0 */
const assert = require('chai').assert;

/// title: LRU Cache
/// type: arcade-mode

/// categories:
/// cache

/// difficulty: 2

/// description:
/// A cache is a lookup table (for example hash table) for getting and setting data.
/// Least-recently used (LRU) is a policy which evicts (removes) the item which was least-recently used in the cache.
/// In this challenge, you need to implement a cache with LRU eviction policy. The capacity of the cache is not known beforehand, so your solution must take that into account.

/// challengeSeed:
function LRUCache(capacity) {
  // Good luck!

  this.get = function(key) {
    // Insert your solution here
  };

  this.set = function(key, data) {
    // Insert your solution here
  };
}

/// solutions:
function LRUCache(capacity) {
  const hashTable = {};
  const lruList = [];

  this.get = function(key) {
    if (hashTable[key]) {
      const index = lruList.indexOf(key);
      lruList.splice(index, 1);
      lruList.push(key);
      return hashTable[key];
    }
    return null;
  };

  /* Sets an item into the cache. */
  this.set = function(key, data) {
    hashTable[key] = data;
    const index = lruList.indexOf(key);
    if (index === -1) {
      if (lruList.length === capacity) {
        const evictedKey = lruList.shift(); // Evict LRU data
        delete hashTable[evictedKey];
      }
      lruList.push(key);
    }
    else { // Move to the front of the list
      lruList.splice(index, 1);
      lruList.push(key);
    }
  };
}

/// tail:
const c1 = new LRUCache(4);
c1.set('abcde', { a: 'ccc' });

const c2 = new LRUCache(2);
c2.set('aaa', 10); c2.set('bbb', 11); c2.set('ccc', 12);

const c3 = new LRUCache(2);
c3.set('aaa', 10); c3.set('bbb', 11); c3.get('aaa'); c3.set('ccc', 80);

/// tests:
assert(c1.get('xav') === null, 'Cache miss returns null');
assert(c1.get('abcde').a === 'ccc', 'Should return the cache object');
assert(c2.get('aaa') === null, 'Item should be already evicted.');
assert(c2.get('ccc') === 12, 'Item should be still cached.');
assert(c3.get('bbb') === null, 'The item should be evicted.');
assert(c3.get('ccc') === 80, 'The item should be evicted.');
