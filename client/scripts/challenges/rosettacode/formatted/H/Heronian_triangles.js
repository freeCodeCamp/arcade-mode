/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-array-constructor: 0 */
/* eslint no-mixed-operators: 0 */
/* eslint no-shadow: 0 */

const assert = require('chai').assert;

/// title: Heronian triangles
/// type: rosetta-code

/// categories:


/// difficulty: 4

/// benchmark:
heronianTriangle(517);

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph"><a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Heron's formula" title="wp: Heron's formula">Hero's formula</a> for the area of a triangle given the length of its three sides  <big> <span class="rosetta__text--italic">a</span>,</big>  <big><span class="rosetta__text--italic">b</span>,</big>  and  <big><span class="rosetta__text--italic">c</span></big>  is given by:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">::: <big>$A = \sqrt{s(s-a)(s-b)(s-c)},$</big></span></p><br/><p class="rosetta__paragraph">where  <big><span class="rosetta__text--italic">s</span></big>  is half the perimeter of the triangle; that is,</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">::: <big>$s=\frac{a+b+c}{2}.$</big></span></p><br/><br>
/// <p class="rosetta__paragraph"><span class="rosetta__text--bold"><a class="rosetta__link--wiki" href="http://www.had2know.com/academics/heronian-triangles-generator-calculator.html" title="link: http://www.had2know.com/academics/heronian-triangles-generator-calculator.html">Heronian triangles</a></span></p>
/// <p class="rosetta__paragraph">are triangles whose sides <span class="rosetta__text--italic">and area</span> are all integers.</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> An example is the triangle with sides  <span class="rosetta__text--bold">3, 4, 5</span>  whose area is  <span class="rosetta__text--bold">6</span>  (and whose perimeter is  <span class="rosetta__text--bold">12</span>). </span></p><br/><br>
/// <p class="rosetta__paragraph">Note that any triangle whose sides are all an integer multiple of  <span class="rosetta__text--bold">3, 4, 5</span>;  such as  <span class="rosetta__text--bold">6, 8, 10,</span>  will also be a Heronian triangle.</p><br/><p class="rosetta__paragraph">Define a <span class="rosetta__text--bold">Primitive Heronian triangle</span> as a Heronian triangle where the greatest common divisor</p>
/// <p class="rosetta__paragraph">of all three sides is  <span class="rosetta__text--bold">1</span>  (unity).</p><br/><p class="rosetta__paragraph">This will exclude, for example, triangle  <span class="rosetta__text--bold">6, 8, 10.</span></p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Create a named function/method/procedure/... that implements Hero's formula.</li>
/// <li class="rosetta__list-item--ordered">Use the function to generate all the <span class="rosetta__text--italic">primitive</span> Heronian triangles with sides <= 200.</li>
/// <li class="rosetta__list-item--ordered">Show the first <code>n<sub>th</sub></code> ordered triangles in a table of sides..</li>
/// <br>
/// <p class="rosetta__paragraph">Show all output here.</p><br/><p class="rosetta__paragraph"><small><span class="rosetta__text--bold">Note</span>: when generating triangles it may help to restrict</small> $a <= b <= c$</p>
/// <br/></div>

/// challengeSeed:
// noprotect
function heronianTriangle(n) {
  // Good luck!

  return [];
}

/// solutions:
// noprotect
function heronianTriangle(n) {
  const list = [];
  const result = [];

  let j = 0;
  for (let c = 1; c <= 200; c++) {
    for (let b = 1; b <= c; b++) {
      for (let a = 1; a <= b; a++) {
        if (gcd(gcd(a, b), c) === 1 && isHeron(heronArea(a, b, c))) {
          list[j++] = new Array(a, b, c, heronArea(a, b, c));
        }
      }
    }
  }

  sort(list);

  for (let i = 0; i < n; i++) {
    result[i] = [list[i][0], list[i][1], list[i][2]];
  }

  return result;

  function heronArea(a, b, c) {
    const s = (a + b + c) / 2;
    return Math.sqrt(s * (s - a) * (s - b) * (s - c));
  }

  function isHeron(h) { return h % 1 === 0 && h > 0; }

  function gcd(a, b) {
    let leftover = 1;
    let dividend = a > b ? a : b;
    let divisor = a > b ? b : a;
    while (leftover !== 0) {
      leftover = dividend % divisor;
      if (leftover > 0) {
        dividend = divisor;
        divisor = leftover;
      }
    }
    return divisor;
  }

  function sort(arg) {
    let swapped = true;
    let temp = [];
    while (swapped) {
      swapped = false;
      for (let i = 1; i < arg.length; i++) {
        if (arg[i][4] < arg[i - 1][4] || arg[i][4] === arg[i - 1][4] && arg[i][3] < arg[i - 1][3]) {
          temp = arg[i];
          arg[i] = arg[i - 1];
          arg[i - 1] = temp;
          swapped = true;
        }
      }
    }
  }
}

/// tail:
const testCases = [10, 15, 20, 25];

const res = [
  [[3, 4, 5], [5, 5, 6], [5, 5, 8], [4, 13, 15], [5, 12, 13], [9, 10, 17], [3, 25, 26], [7, 15, 20], [10, 13, 13], [8, 15, 17]],
  [[3, 4, 5], [5, 5, 6], [5, 5, 8], [4, 13, 15], [5, 12, 13], [9, 10, 17], [3, 25, 26], [7, 15, 20], [10, 13, 13], [8, 15, 17], [13, 13, 24], [6, 25, 29], [11, 13, 20], [5, 29, 30], [13, 14, 15]],
  [[3, 4, 5], [5, 5, 6], [5, 5, 8], [4, 13, 15], [5, 12, 13], [9, 10, 17], [3, 25, 26], [7, 15, 20], [10, 13, 13], [8, 15, 17], [13, 13, 24], [6, 25, 29], [11, 13, 20], [5, 29, 30], [13, 14, 15], [10, 17, 21], [7, 24, 25], [8, 29, 35], [12, 17, 25], [4, 51, 53]],
  [[3, 4, 5], [5, 5, 6], [5, 5, 8], [4, 13, 15], [5, 12, 13], [9, 10, 17], [3, 25, 26], [7, 15, 20], [10, 13, 13], [8, 15, 17], [13, 13, 24], [6, 25, 29], [11, 13, 20], [5, 29, 30], [13, 14, 15], [10, 17, 21], [7, 24, 25], [8, 29, 35], [12, 17, 25], [4, 51, 53], [19, 20, 37], [16, 17, 17], [17, 17, 30], [16, 25, 39], [13, 20, 21]]
];

/// tests:
assert(typeof heronianTriangle === 'function', 'message: <code>heronianTriangle</code> is a function.');
assert.deepEqual(heronianTriangle(testCases[0]), res[0], 'message: <code>heronianTriangle()</code> should return <code>[[3, 4, 5], [5, 5, 6], [5, 5, 8], [4, 13, 15], [5, 12, 13], [9, 10, 17], [3, 25, 26], [7, 15, 20], [10, 13, 13], [8, 15, 17]]</code>');
assert.deepEqual(heronianTriangle(testCases[1]), res[1], 'message: <code>heronianTriangle()</code> should return <code>[[3, 4, 5], [5, 5, 6], [5, 5, 8], [4, 13, 15], [5, 12, 13], [9, 10, 17], [3, 25, 26], [7, 15, 20], [10, 13, 13], [8, 15, 17], [13, 13, 24], [6, 25, 29], [11, 13, 20], [5, 29, 30], [13, 14, 15]],</code>');
assert.deepEqual(heronianTriangle(testCases[2]), res[2], 'message: <code>heronianTriangle()</code> should return <code>[[3, 4, 5], [5, 5, 6], [5, 5, 8], [4, 13, 15], [5, 12, 13], [9, 10, 17], [3, 25, 26], [7, 15, 20], [10, 13, 13], [8, 15, 17], [13, 13, 24], [6, 25, 29], [11, 13, 20], [5, 29, 30], [13, 14, 15], [10, 17, 21], [7, 24, 25], [8, 29, 35], [12, 17, 25], [4, 51, 53]],</code>');
assert.deepEqual(heronianTriangle(testCases[3]), res[3], 'message: <code>heronianTriangle()</code> should return <code>[[3, 4, 5], [5, 5, 6], [5, 5, 8], [4, 13, 15], [5, 12, 13], [9, 10, 17], [3, 25, 26], [7, 15, 20], [10, 13, 13], [8, 15, 17], [13, 13, 24], [6, 25, 29], [11, 13, 20], [5, 29, 30], [13, 14, 15], [10, 17, 21], [7, 24, 25], [8, 29, 35], [12, 17, 25], [4, 51, 53], [19, 20, 37],[16, 17, 17], [17, 17, 30], [16, 25, 39], [13, 20, 21]]</code>');

/// id: 595b98f8b5a2245e243aa831
