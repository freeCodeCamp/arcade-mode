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


/// difficulty: ?

/// benchmark:

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
/// <li class="rosetta__list-item--ordered">Show the count of how many triangles are found.</li>
/// <li class="rosetta__list-item--ordered">Order the triangles by first increasing area, then by increasing perimeter, then by increasing maximum side lengths</li>
/// <li class="rosetta__list-item--ordered">Show the first ten ordered triangles in a table of sides, perimeter, and area.</li>
/// <li class="rosetta__list-item--ordered">Show a similar ordered table for those triangles with area = 210</li></ol>
/// <br>
/// <p class="rosetta__paragraph">Show all output here.</p><br/><p class="rosetta__paragraph"><small><span class="rosetta__text--bold">Note</span>: when generating triangles it may help to restrict</small> $a <= b <= c$</p>
/// <br/></div>

/// challengeSeed:
// noprotect
function heronianTriangle () {
  function Triangle(sides = [], perimeter = 0, area = 0) {
    this.sides = sides;
    this.perimeter = perimeter;
    this.area = area;
  }
  const firstTen = [Triangle];
  const area210 = [Triangle];
  const result = {
    task3: 0,
    task5: firstTen,
    task6: area210
  };
  // Change after this code
  // Good luck!

  return result;
}

/// solutions:
// noprotect
function heronianTriangle() {
  const list = [];
  function Triangle(sides = [], perimeter = 0, area = 0) {
    this.sides = sides;
    this.perimeter = perimeter;
    this.area = area;
  }
  const firstTen = [Triangle];
  const area210 = [Triangle];
  const result = {
    task3: 0,
    task5: firstTen,
    task6: area210
  };

  let j = 0;
  for (let c = 1; c <= 200; c++) {
    for (let b = 1; b <= c; b++) {
      for (let a = 1; a <= b; a++) {
        if (gcd(gcd(a, b), c) === 1 && isHeron(heronArea(a, b, c))) {
          list[j++] = new Array(a, b, c, a + b + c, heronArea(a, b, c));
        }
      }
    }
  }

  sort(list);

  result.task3 = list.length;

  for (let i = 0; i < 10; i++) {
    firstTen[i] = new Triangle([list[i][0], list[i][1], list[i][2]], list[i][3], list[i][4]);
  }
  result.task5 = firstTen;

  for (let i = 0, count = 0; i < list.length; i++) {
    if (list[i][4] === 210) {
      area210[count++] = new Triangle([list[i][0], list[i][1], list[i][2]], list[i][3], list[i][4]);
    }
  }
  result.task6 = area210;

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

  return result;
}

/// tail:
function Triangle(sides = [], perimeter = 0, area = 0) {
  this.sides = sides;
  this.perimeter = perimeter;
  this.area = area;
}

const res = {
  task3: 517,
  task5: [
    new Triangle([3, 4, 5], 12, 6),
    new Triangle([5, 5, 6], 16, 12),
    new Triangle([5, 5, 8], 18, 12),
    new Triangle([4, 13, 15], 32, 24),
    new Triangle([5, 12, 13], 30, 30),
    new Triangle([9, 10, 17], 36, 36),
    new Triangle([3, 25, 26], 54, 36),
    new Triangle([7, 15, 20], 42, 42),
    new Triangle([10, 13, 13], 36, 60),
    new Triangle([8, 15, 17], 40, 60)
  ],
  task6: [
    new Triangle([17, 25, 28], 70, 210),
    new Triangle([20, 21, 29], 70, 210),
    new Triangle([12, 35, 37], 84, 210),
    new Triangle([17, 28, 39], 84, 210),
    new Triangle([7, 65, 68], 140, 210),
    new Triangle([3, 148, 149], 300, 210)
  ]
};

/// tests:
assert(typeof heronianTriangle === 'function', 'message: <code>heronianTriangle</code> is a function.');
assert.equal(heronianTriangle().task3, res.task3, 'message: <code>heronianTriangle()</code> should return <code>517</code>');
assert.deepEqual(heronianTriangle().task5, res.task5, 'message: <code>heronianTriangle()</code> should return <code>[{[3, 4, 5], 12, 6},{[5, 5, 6], 16, 12},{[5, 5, 8], 18, 12},{[4, 13, 15], 32, 24},{[5, 12, 13], 30, 30},{[9, 10, 17], 36, 36},{[3, 25, 26], 54, 36},{[7, 15, 20], 42, 42},{[10, 13, 13], 36, 60},{[8, 15, 17], 40, 6})]</code>');
assert.deepEqual(heronianTriangle().task6, res.task6, 'message: <code>heronianTriangle()</code> should return <code>[{  sides: [17, 25, 28],   perimeter: 70,  area: 210},{  sides: [20, 21, 29],  perimeter: 70,  area: 210},{  sides: [12, 35, 37],  perimeter: 84,  area: 210},{  sides: [17, 28, 39],  perimeter: 84,  area: 210},{  sides: [7, 65, 68],  perimeter: 140,  area: 210},{  sides: [3, 148, 149],  perimeter: 300,  area: 210}]</code>');
/// id: 595b98f8b5a2245e243aa831
