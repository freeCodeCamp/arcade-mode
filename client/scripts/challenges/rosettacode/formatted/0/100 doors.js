/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-bitwise: 0 */

/* @: the user may feel duped with the final solution; TODO? */

const assert = require('chai').assert;

/// title: 100 doors
/// type: rosetta-code

/// categories:
/// ?

/// difficulty: 2

/// benchmark:
getFinalOpenedDoors(10000);

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">There are 100 doors in a row that are all initially closed. You make 100 passes by the doors. The first time through, visit every door and 'toggle' the door (if the door is closed, open it; if it is open, close it). The second time, only visit every 2nd door (i.e., door #2, #4, #6, ...) and toggle it. The third time, visit every 3rd door (i.e., door #3, #6, #9, ...), etc., until you only visit the 100th door.</p><br/>
/// <p class="rosetta__paragraph">Implement a function to determine the state of the doors after the last pass. Return the final result in an array, with only the door number included in the array if it is open.</p>
/// </div>

/// challengeSeed:
function getFinalOpenedDoors (numDoors) {
  // Good luck!
}

/// solutions:
function getFinalOpenedDoors (numDoors) {
  // this is the final pattern (always squares).
  // thus, the most efficient solution simply returns an array of squares up to numDoors).
  const finalState = [];
  let i = 1;
  while (i ** 2 <= numDoors) {
    finalState.push(i ** 2);
    i++;
  }
  return finalState;
}

/// naive:
function getFinalOpenedDoors (numDoors) {
  const doors = [];
  const openedDoors = [];
  for (let i = 0; i < numDoors; i++) {
    doors[i] = false; // create doors
  }
  for (let i = 1; i <= numDoors; i++) {
    for (let i2 = i - 1; i2 < numDoors; i2 += i) {
      doors[i2] = !doors[i2]; // toggle doors
    }
  }
  for (let i = 0; i < numDoors; i++) {
    if (doors[i]) {
      openedDoors.push(i + 1);
    }
  }

  return openedDoors;
}

/// tail:
const solution = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];

/// tests:
assert(typeof getFinalOpenedDoors === 'function', 'message: <code>getFinalOpenedDoors</code> is a function.');
assert(Array.isArray(getFinalOpenedDoors(100)), 'message: <code>getFinalOpenedDoors</code> should return an array.');
assert.deepEqual(getFinalOpenedDoors(100), solution, 'message: <code>getFinalOpenedDoors</code> did not produce the correct results.');
/// id: 594810f028c0303b75339acb
