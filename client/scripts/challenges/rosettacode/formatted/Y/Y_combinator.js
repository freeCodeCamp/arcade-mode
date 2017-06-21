/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-prototype-builtins: 0 */

const assert = require('chai').assert;

/// title: Y combinator
/// difficulty: 6
/// type: rosetta-code

/// categories:
/// recursion

/// description:
/// In strict <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Functional programming" title="wp: functional programming">functional programming</a> and the <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/lambda calculus" title="wp: lambda calculus">lambda calculus</a>, functions (lambda expressions) don't have state and are only allowed to refer to arguments of enclosing functions. This rules out the usual definition of a recursive function wherein a function is associated with the state of a variable and this variable's state is used in the body of the function.<br/>
/// The <a href="http://mvanier.livejournal.com/2897.html">Y combinator</a> is itself a stateless function that, when applied to another stateless function, returns a recursive version of the function. The Y combinator is the simplest of the class of such functions, called <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Fixed-point combinator" title="wp: fixed-point combinator">fixed-point combinators</a>.<br/>
/// Define the stateless Y combinator function and use it to compute <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Factorial" title="wp: factorial">factorial</a>. factorial(N) function is already given to you. See also <a href="http://vimeo.com/45140590">Jim Weirich: Adventures in Functional Programming</a>.

/// challengeSeed:
function Y(f) {
  return function() {
  // Good luck!
  };
}

var factorial = Y(function(f) {
  return function (n) {
    return n > 1 ? n * f(n - 1) : 1;
  };
});

/// solutions:
var Y = f => (x => x(x))(y => f(x => y(y)(x)));

/// tail:
var factorial = Y(f => n => (n > 1 ? n * f(n - 1) : 1));

/// tests:
assert.equal(typeof Y(f => n => n), 'function', 'message: Y must return a function');
assert.equal(factorial(1), 1, 'message: factorial(1) must return 1.');
assert.equal(factorial(2), 2, 'message: factorial(2) must return 2.');
assert.equal(factorial(3), 6, 'message: factorial(3) must return 6.');
assert.equal(factorial(4), 24, 'message: factorial(4) must return 24.');
assert.equal(factorial(10), 3628800, 'message: factorial(10) must return 3628800.');
/// id: 594810f028c0303b75339ad5
