
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-mixed-operators: 0 */

const assert = require('chai').assert;

/// title: Circles of given radius through two points
/// type: rosetta-code

/// categories:


/// difficulty: 4

/// benchmark:


/// description:
/// <div class="rosetta">
/// <br/><p class="rosetta__paragraph">Given two points on a plane and a radius, usually two circles of given radius can be drawn through the points.</p>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Exceptions:</dt></dl>
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">A radius of zero should be treated as never describing circles (except in the case where the points are coincident).</li>
/// <li class="rosetta__list-item--ordered">If the points are coincident then an infinite number of circles with the point on their circumference can be drawn, unless the radius is equal to zero as well which then collapses the circles to a point.</li>
/// <li class="rosetta__list-item--ordered">If the points form a diameter then return a single circle.</li>
/// <li class="rosetta__list-item--ordered">If the points are too far apart then no circles can be drawn.</li></ol><br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">Implement a function that takes two points and a radius and returns the two circles through those points. For each resulting circle, provide the coordinates for the center of each circle rounded to four decimal digits. Return each coordinate as an array, and coordinates as an array of arrays.<br/><br/>
/// For edge cases, return the following:<br/>
/// If points are on the diameter, return one point. If the radius is also zero however, return <code>"Radius Zero"</code>.<br/>
/// If points are coincident, return <code>"Coincident point. Infinite solutions"</code>.<br/>
/// If points are farther apart than the diameter, return <code>"No intersection. Points further apart than circle diameter"</code>.<br/><br/>
/// <li class="rosetta__list-item--unordered">Sample inputs:</li></ul><br/>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
///       p1                p2           r
/// 0.1234, 0.9876    0.8765, 0.2345    2.0
/// 0.0000, 2.0000    0.0000, 0.0000    1.0
/// 0.1234, 0.9876    0.1234, 0.9876    2.0
/// 0.1234, 0.9876    0.8765, 0.2345    0.5
/// 0.1234, 0.9876    0.1234, 0.9876    0.0
/// </pre></div>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Ref:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered"><a class="rosetta__link--wiki" href="http://mathforum.org/library/drmath/view/53027.html" title="link: http://mathforum.org/library/drmath/view/53027.html">Finding the Center of a Circle from 2 Points and Radius</a> from Math forum @ Drexel</li></ul></div>

/// challengeSeed:
function getCircles (...args) {
  // Good luck!
  return true;
}

/// solutions:
const hDist = (p1, p2) => Math.hypot(...p1.map((e, i) => e - p2[i])) / 2;
const pAng = (p1, p2) => Math.atan(p1.map((e, i) => e - p2[i]).reduce((p, c) => c / p, 1));
const solveF = (p, r) => t => [parseFloat((r * Math.cos(t) + p[0]).toFixed(4)), parseFloat((r * Math.sin(t) + p[1]).toFixed(4))];
const diamPoints = (p1, p2) => p1.map((e, i) => parseFloat((e + (p2[i] - e) / 2).toFixed(4)));

function getCircles (...args) {
  const [p1, p2, s] = args;
  const solve = solveF(p1, s);
  const halfDist = hDist(p1, p2);

  let msg = [];
  switch (Math.sign(s - halfDist)) {
    case 0:
      msg = s ? diamPoints(p1, p2) :
        'Radius Zero';
      break;
    case 1:
      if (!halfDist) {
        msg = 'Coincident point. Infinite solutions';
      }
      else {
        const theta = pAng(p1, p2);
        const theta2 = Math.acos(halfDist / s);
        [1, -1].map(e => solve(theta + e * theta2)).forEach(
          e => msg.push(e));
      }
      break;
    case -1:
      msg = 'No intersection. Points further apart than circle diameter';
      break;
    default:
      msg = 'Reached the default';
  }
  return msg;
}

/// tail:
const testCases = [
  [[0.1234, 0.9876], [0.8765, 0.2345], 2.0],
  [[0.0000, 2.0000], [0.0000, 0.0000], 1.0],
  [[0.1234, 0.9876], [0.1234, 0.9876], 2.0],
  [[0.1234, 0.9876], [0.8765, 0.2345], 0.5],
  [[0.1234, 0.9876], [0.1234, 0.9876], 0.0]
];
const answers = [
  [[1.8631, 1.9742], [-0.8632, -0.7521]],
  [0, 1],
  'Coincident point. Infinite solutions',
  'No intersection. Points further apart than circle diameter',
  'Radius Zero'
];

/// tests:
assert(typeof getCircles === 'function', 'message: <code>getCircles</code> is a function.');
assert.deepEqual(getCircles(...testCases[0]), answers[0], 'message: <code>getCircles([0.1234, 0.9876], [0.8765, 0.2345], 2.0)</code> should return <code>[[1.8631, 1.9742], [-0.8632, -0.7521]]</code>.');
assert.deepEqual(getCircles(...testCases[1]), answers[1], 'message: <code>getCircles([0.0000, 2.0000], [0.0000, 0.0000], 1.0)</code> should return <code>[0, 1]</code>');
assert.deepEqual(getCircles(...testCases[2]), answers[2], 'message: <code>getCircles([0.1234, 0.9876], [0.1234, 0.9876], 2.0)</code> should return <code>Coincident point. Infinite solutions</code>');
assert.deepEqual(getCircles(...testCases[3]), answers[3], 'message: <code>getCircles([0.1234, 0.9876], [0.8765, 0.2345], 0.5)</code> should return <code>No intersection. Points further apart than circle diameter</code>');
assert.deepEqual(getCircles(...testCases[4]), answers[4], 'message: <code>getCircles([0.1234, 0.9876], [0.1234, 0.9876], 0.0)</code> should return <code>Radius Zero</code>');
/// id: 5951815dd895584b06884620
