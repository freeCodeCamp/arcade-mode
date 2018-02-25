
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Generator/Exponential
/// type: rosetta-code

/// categories:
/// Non parametric generators
/// Stateful transactions

/// difficulty: 3

/// benchmark:

/// description:
/// <div class="rosetta">
/// <br/>
/// <p class="rosetta__paragraph">A generator is an executable entity (like a function or procedure) that contains code that yields a sequence of values, one at a time, so that each time you call the generator, the next value in the sequence is provided.</p>
/// <p class="rosetta__paragraph">Generators are often built on top of coroutines or objects so that the internal state of the object is handled “naturally”.</p>
/// <p class="rosetta__paragraph">Generators are often used in situations where a sequence is potentially infinite, and where it is possible to construct the next value of the sequence with only minimal state.</p>
/// <p class="rosetta__paragraph">Write a function that uses generators to generate squares and cubes. Create a new generator that filters all cubes from the generator of squares. The function should return the n<sup>th</sup> value of the filtered generator. For example for n=7, the function should return 81 as the sequence would be 4,9,16,25,36,49,81. Here 64 is filtered out, as it is a cube.</p>
/// </div>

/// challengeSeed:
function exponentialGenerator (n) {
  // Good luck!
}

/// solutions:
function exponentialGenerator(n){
  function* PowersGenerator(m) {
  	var n=0;
  	while(1) {
  		yield Math.pow(n, m);
  		n += 1;
  	}
  }

  function* FilteredGenerator(g, f){
  	var value = g.next().value;
  	var filter = f.next().value;
  	while(1) {
  		if( value < filter ) {
  			yield value;
  			value = g.next().value;
  		} else if ( value > filter ) {
  			filter = f.next().value;
  		} else {
  			value = g.next().value;
  			filter = f.next().value;
  		}
  	}
  }

  var squares = PowersGenerator(2);
  var cubes = PowersGenerator(3);

  var filtered = FilteredGenerator(squares, cubes);

  var curr=0;
  for(var i=0;i<n;i++) curr=filtered.next();

  return curr.value;
}

/// tail:

/// tests:
assert(typeof exponentialGenerator=='function','message: <code>exponentialGenerator</code> should be a function.');
assert(typeof exponentialGenerator(10)=='number','message: <code>exponentialGenerator()</code> should return a number.');
assert.equal(exponentialGenerator(10),144,'message: <code>exponentialGenerator(10)</code> should return <code>144</code>.');
assert.equal(exponentialGenerator(12),196,'message: <code>exponentialGenerator(12)</code> should return <code>196</code>.');
assert.equal(exponentialGenerator(14),256,'message: <code>exponentialGenerator(14)</code> should return <code>256</code>.');
assert.equal(exponentialGenerator(20),484,'message: <code>exponentialGenerator(20)</code> should return <code>484</code>.');
assert.equal(exponentialGenerator(25),784,'message: <code>exponentialGenerator(25)</code> should return <code>784</code>.');
/// id: 5a23c84252665b21eecc7e7b
