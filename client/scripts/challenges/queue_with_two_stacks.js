/* eslint spaced-comment: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-redeclare: 0 */
const assert = require('chai').assert;

/// title: Queue using two stacks
/// type: arcade-mode
/// difficulty: 2

/// categories:
/// data structures

/// description:
/// A queue is  a data structure with FIFO (first-in first-out) properties. Elements are removed in the same order as they are inserted. In this challenge, you need to implement Queue class using two Stack data structures.
/// Implement a Queue class with two methods: enqueue() which inserts an element into a queue and dequeue() which removes an element in an insertion order.

/// head:
function Stack() {
  this.list = [];

  this.size = function() {
    return this.list.length;
  };

  this.pop = function() {
    return this.list.pop();
  };

  this.push = function(elem) {
    return this.list.push(elem);
  };
}

/// challengeSeed:

// You have the following data structure available
// Stack:
//    push(elem): Push new element to the top
//    pop():  Remove and return the top element
//    size(): Return the number of elements in Stack
//
// Don't declare any other variables or use arrays!
// Good luck!

function Queue () {
  this.s1 = new Stack();
  this.s2 = new Stack();

  this.enqueue = function(elem) {
    // Your solution
  };

  this.dequeue = function() {
    // Your solution
  };
}

/// solutions:
function Queue () {
  this.s1 = new Stack();
  this.s2 = new Stack();

  this.enqueue = function(elem) {
    this.s1.push(elem);
  };

  this.dequeue = function() {
    if (this.s2.size() > 0) {
      return this.s2.pop();
    }
    while (this.s1.size() > 0) {
      this.s2.push(this.s1.pop());
    }
    return this.s2.pop();
  };
}

/// tail:
const q = new Queue();
q.enqueue(1); q.enqueue(2); q.enqueue(3);

const q2 = new Queue();
[1, 2, 3, 4, 5, 6].forEach(num => q2.enqueue(num));
q2.dequeue(); q2.dequeue(); q2.dequeue(); q2.dequeue();
[7, 8, 9, 10].forEach(num => q2.enqueue(num));

const q3 = new Queue();
q3.enqueue(1); q3.enqueue(2); q3.dequeue(); q3.dequeue();
q3.enqueue('aaa'); q3.enqueue('bbb');

/// tests:
assert(typeof Queue === 'function', 'message: Queue must be a constructor function.');
assert(q.dequeue() === 1, 'message: 1 is dequeued correctly');
assert(q2.dequeue() === 5, 'message: 5 is dequeued correctly');
assert(q3.dequeue() === 'aaa', 'message: aaa is dequeued correctly');
