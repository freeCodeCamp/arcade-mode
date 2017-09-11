
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Euler method
/// type: rosetta-code

/// categories:


/// difficulty: 2


/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">Euler's method numerically approximates solutions of first-order ordinary differential equations (ODEs) with a given initial value.  It is an explicit method for solving initial value problems (IVPs), as described in <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Euler method" title="wp: Euler method">the wikipedia page</a>.</p><br/><p class="rosetta__paragraph">The ODE has to be provided in the following form:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">:: <big>$\frac{dy(t)}{dt} = f(t,y(t))$</big></span></p><br/><p class="rosetta__paragraph">with an initial value</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">:: <big>$y(t_0) = y_0$</big></span></p><br/><p class="rosetta__paragraph">To get a numeric solution, we replace the derivative on the  LHS  with a finite difference approximation:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">:: <big>$\frac{dy(t)}{dt}  \approx \frac{y(t+h)-y(t)}{h}$</big></span></p><br/><p class="rosetta__paragraph">then solve for $y(t+h)$:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">:: <big>$y(t+h) \approx y(t) + h \, \frac{dy(t)}{dt}$</big></span></p><br/><p class="rosetta__paragraph">which is the same as</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">:: <big>$y(t+h) \approx y(t) + h \, f(t,y(t))$</big></span></p><br/><p class="rosetta__paragraph">The iterative solution rule is then:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">:: <big>$y_{n+1} = y_n + h \, f(t_n, y_n)$</big></span></p><br/><p class="rosetta__paragraph">where  <big>$h$</big>  is the step size, the most relevant parameter for accuracy of the solution.  A smaller step size increases accuracy but also the computation cost, so it has always has to be hand-picked according to the problem at hand.</p>
/// <br/><p class="rosetta__paragraph"><span class="rosetta__text--bold">Example: Newton's Cooling Law</span></p><br/><p class="rosetta__paragraph">Newton's cooling law describes how an object of initial temperature  <big>$T(t_0) = T_0$</big>  cools down in an environment of temperature  <big>$T_R$</big>:</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--indented">:: <big>$\frac{dT(t)}{dt} = -k \, \Delta T$</big></span></p>
/// <p class="rosetta__paragraph">or</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">:: <big>$\frac{dT(t)}{dt} = -k \, (T(t) - T_R)$</big></span></p><br/><br>
/// <p class="rosetta__paragraph">It says that the cooling rate  <big>$\frac{dT(t)}{dt}$</big>  of the object is proportional to the current temperature difference  <big>$\Delta T = (T(t) - T_R)$</big>  to the surrounding environment.</p><br/><p class="rosetta__paragraph">The analytical solution, which we will compare to the numerical approximation, is</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">:: <big>$T(t) = T_R + (T_0 - T_R) \; e^{-k t}$</big></span></p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Implement a routine of Euler's method and then to use it to solve the given example of Newton's cooling law with it for three different step sizes of:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  2 s</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  5 s    and </span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  10 s </span></p>
/// <p class="rosetta__paragraph">and to compare with the analytical solution.</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Initial values:</dt></dl>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  initial temperature  <big>$T_0$</big>  shall be  100 °C</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  room temperature  <big>$T_R$</big>  shall be  20 °C</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  cooling constant   <big>$k$</big>   shall be  0.07  </span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">::*  time interval to calculate shall be from  0 s  ──►  100 s</span></p></div>

/// challengeSeed:
function eulersMethod (x1, y1, x2, h) {
  // Good luck!
}

/// solutions:
function eulersMethod(x1, y1, x2, h) {
  let x = x1;
  let y = y1;

  while ((x < x2 && x1 < x2) || (x > x2 && x1 > x2)) {
    y += h * (-0.07 * (y - 20));
    x += h;
  }

  return y;
}

/// tests:
assert(typeof eulersMethod === 'function', 'message: <code>eulersMethod</code> is a function.');
assert(typeof eulersMethod(0, 100, 100, 10) === 'number', 'message: <code>eulersMethod(0, 100, 100, 10)</code> should return a number.');
assert.equal(eulersMethod(0, 100, 100, 2), 20.0424631833732, 'message: <code>eulersMethod(0, 100, 100, 10)</code> should return 20.0424631833732.');
assert.equal(eulersMethod(0, 100, 100, 5), 20.01449963666907, 'message: <code>eulersMethod(0, 100, 100, 10)</code> should return 20.01449963666907.');
assert.equal(eulersMethod(0, 100, 100, 10), 20.000472392, 'message: <code>eulersMethod(0, 100, 100, 10)</code> should return 20.000472392.');
/// id: 59880443fb36441083c6c20e
