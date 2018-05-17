
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Josephus problem
/// type: rosetta-code

/// categories:


/// difficulty:3

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph"><a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Josephus problem" title="wp: Josephus problem">Josephus problem</a> is a math puzzle with a grim description: $n$ prisoners are standing on a circle, sequentially numbered from $0$ to $n-1$.</p><p class="rosetta__paragraph">An executioner walks along the circle, starting from prisoner $0$,</p>
/// <p class="rosetta__paragraph">removing every $k$-th prisoner and killing him.</p><p class="rosetta__paragraph">As the process goes on, the circle becomes smaller and smaller, until only one prisoner remains, who is then freed. ></p><p class="rosetta__paragraph">For example, if there are $n=5$ prisoners and $k=2$, the order the prisoners are killed in (let's call it the "killing sequence") will be 1, 3, 0, and 4, and the survivor will be #2.</p>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Given any  <big>$n, k > 0$</big>,  find out which prisoner will be the final survivor.</p><p class="rosetta__paragraph">In one such incident, there were 41 prisoners and every 3<sup>rd</sup> prisoner was being killed  (<big>$k=3$</big>).</p><p class="rosetta__paragraph">Among them was a clever chap name Josephus who worked out the problem, stood at the surviving position, and lived on to tell the tale.</p><p class="rosetta__paragraph">Which number was he?</p><p>Write a function that takes the initial number of prisoners and 'k' as parameter and returns the number of the prisoner that survives.</p></div>

/// challengeSeed:
function josephus (init,kill) {
  // Good luck!
}

/// solutions:
function josephus(init,kill) {
  var Josephus = {
    init: function(n) {
      this.head = {};
      var current = this.head;
      for (var i = 0; i < n - 1; i++) {
        current.label = i + 1;
        current.next = {
          prev: current
        };
        current = current.next;
      }
      current.label = n;
      current.next = this.head;
      this.head.prev = current;
      return this;
    },
    kill: function(spacing) {
      var current = this.head;
      while (current.next !== current) {
        for (var i = 0; i < spacing - 1; i++) {
          current = current.next;
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
        current = current.next;
      }
      return current.label;
    }
  }

  return Josephus.init(init).kill(kill)
}


/// tests:
assert(typeof josephus=='function','message: <code>josephus</code> should be a function.');
assert(typeof josephus(30,3)=='number','message: <code>josephus(30,3)</code> should return a number.');
assert.equal(josephus(30,3),29,'message: <code>josephus(30,3)</code> should return <code>29</code>.');
assert.equal(josephus(30,5),3,'message: <code>josephus(30,5)</code> should return <code>3</code>.');
assert.equal(josephus(20,2),9,'message: <code>josephus(20,2)</code> should return <code>9</code>.');
assert.equal(josephus(17,6),2,'message: <code>josephus(17,6)</code> should return <code>2</code>.');
assert.equal(josephus(29,4),2,'message: <code>josephus(29,4)</code> should return <code>2</code>.');
/// id: 5a23c84252665b21eecc7ec5
