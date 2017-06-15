/* eslint spaced-comment: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-redeclare: 0 */

/* @: time-based assert tests capable of producing different results/run; TODO? */

const assert = require('chai').assert;

/// title: Conventurist
/// type: arcade-mode

/// categories:
/// algorithms
/// closures
/// debounce
/// throttle

/// difficulty: 4

/// images:
/// public/img/challenges/conventurist.png

/// description:
/// <img class='challenge__image' src='public/img/challenges/conventurist.png'>
/// Your love of programming, games, and adventuring with friends have led you to create a simple sidescroller game that you call 'Conventurist,' a portmanteau of the 'con-' prefix meaning 'together or with,' 'adventurer,' and '-ist' suffix meaning 'person who is concerned with.' As you playtest your own creation, you note that when the character collides with another collidable object, the collision sound you added 'bmph,' plays to the tune of 'bmpbmpbmpbmpbmpbmpbmpbmpbmph.' Of course, you immediately understand the collision sound needs to be attentuated.
/// Having done some research, you learn that throttling enforces a maximum rate-limit whereas debounce prevents a called function from being called again until a certain time has passed. You decide to add both into your game.
/// Implement a throttle function and a debounce function such that when applied to another function, attentuates said function. For both throttle and debounce, use a corresponding delay of 200ms.

/// challengeSeed:
function throttle (fn) {
  // Good luck!
  return true;
}

function debounce (fn) {
  // Good luck!
  return true;
}

/// solutions:
function throttle (fn) {
  const delay = 200;
  let isThrottled = false;
  return (...args) => {
    if (!isThrottled) {
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, 200);
      return fn.apply(this, args);
    }
    return null;
  };
}

function debounce (fn) {
  const delay = 200;
  let isDebounced = false;
  let debounceTimer;
  return (...args) => {
    if (!isDebounced) {
      isDebounced = true;
      return fn.apply(this, args);
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      isDebounced = false;
    }, 200);
    return null;
  };
}

/// tail:
function testFn () {
  // function that throttle and debounce fires
  return 'bmph';
}

function callFn (fn) {
  // function that will call the throttle and debounce functions
  return new Promise((resolve, reject) => {
    if (typeof fn !== 'function') {
      return reject('Throttle and/or debounce should return a function.');
    }
    const results = [];
    const intervalAction = () => { results.push(fn()); };
    const interval = setInterval(intervalAction, 16.7);

    setTimeout(() => {
      clearInterval(interval);
    }, 225);

    let interval2;

    setTimeout(() => {
      interval2 = setInterval(intervalAction, 16.7);
    }, 450);

    setTimeout(() => {
      clearInterval(interval2);
      resolve(results);
    }, 500);
  });
}

const answerThrottle = ['bmph', ...Array(12).fill(null), 'bmph', 'bmph', null, null];
const answerDebounce = ['bmph', ...Array(13).fill(null), 'bmph', null, null];

/// tests:
assert(typeof throttle === 'function', 'message: <code>throttle</code> is a function.');
assert(typeof debounce === 'function', 'message: <code>debounce</code> is a function.');
assert(typeof throttle(testFn) === 'function', 'message: <code>throttle</code> should return a function.');
assert(typeof debounce(testFn) === 'function', 'message: <code>debounce</code> should return a function.');
assert.becomes(callFn(throttle(testFn)), answerThrottle, 'message: Throttle test case failed.');
assert.becomes(callFn(debounce(testFn)), answerDebounce, 'message: Debounce test case failed.');
