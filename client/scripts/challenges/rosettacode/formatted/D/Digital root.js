
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Digital root
/// type: rosetta-code

/// categories:


/// difficulty: 3


/// description:
/// <div class="rosetta"><p class="rosetta__paragraph">The digital root, $X$, of a number, $n$, is calculated:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> find $X$ as the sum of the digits of $n$</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> find a new $X$ by summing the digits of $X$, repeating until $X$ has only one digit.</span></p><br/><p class="rosetta__paragraph">The additive persistence is the number of summations required to obtain the single digit.</p><br/><p class="rosetta__paragraph">The task is to calculate the additive persistence and the digital root of a number, e.g.:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">$627615$ has additive persistence $2$ and digital root of $9$;</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">$39390$ has additive persistence $2$ and digital root of $6$;</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">$588225$ has additive persistence $2$ and digital root of $3$;</span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">$393900588225$ has additive persistence $2$ and digital root of $9$;</span></p>
/// </div>

/// challengeSeed:
function digitalRootBase (x) {
  // Good luck!
  return true;
}

/// solutions:
function digitalRootBase(x) {
  if (x < 10) {
    return { additivePersistence: 0, digitalRoot: x };
  }

  let fauxroot = 0;
  const numString = x.toString();
  for (let i = 0; i < numString.length; i += 1) {
    fauxroot += parseInt(numString[i], 10);
  }

  const rootobj = digitalRootBase(fauxroot);
  rootobj.additivePersistence += 1;
  return rootobj;
}


/// tests:
assert(typeof digitalRootBase === 'function', 'message: <code>digitalRootBase</code> should be a function.');
assert(typeof digitalRootBase(20) === 'object', 'message: <code>digitalRootBase(20)</code> should return an object.');
assert.deepEqual(digitalRootBase(20), { additivePersistence: 1, digitalRoot: 2 }, 'message: <code>digitalRootBase(20)</code> should return <code>{ additivePersistence: 1, digitalRoot: 2 }</code>');
assert.deepEqual(digitalRootBase(627615), { additivePersistence: 2, digitalRoot: 9 }, 'message: <code>digitalRootBase(627615)</code> should return <code>{ additivePersistence: 2, digitalRoot: 9 }</code>');
assert.deepEqual(digitalRootBase(393900588228), { additivePersistence: 3, digitalRoot: 3 }, 'message: <code>digitalRootBase(393900588225)</code> should return <code>{ additivePersistence: 3, digitalRoot: 3 }</code>');
/// id: 59f4dcf8c1e17225b8e6828b
