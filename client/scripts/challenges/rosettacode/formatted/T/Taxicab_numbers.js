/// WIP

/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-continue: 0 */

const assert = require('chai').assert;

/// title: Taxicab numbers
/// type: rosetta-code

/// categories:


/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
/// <br>
/// A &nbsp; <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Hardy–Ramanujan number" title="wp: Hardy–Ramanujan number">taxicab number</a> &nbsp; (the definition that is being used here) &nbsp; is a positive integer that can be expressed as the sum of two positive cubes in more than one way.
/// <br>
/// The first taxicab number is &nbsp; <span class="rosetta__text--bold">1729</span>, &nbsp; which is:
/// <span class="rosetta__text--indented">:: 1<sup>3</sup> &nbsp; + &nbsp; 12<sup>3</sup> &nbsp; &nbsp; &nbsp; and</span>
/// <span class="rosetta__text--indented">:: 9<sup>3</sup> &nbsp; + &nbsp; 10<sup>3</sup>.</span>
/// <br>
/// Taxicab numbers are also known as:
/// <span class="rosetta__text--indented">:* &nbsp; taxi numbers</span>
/// <span class="rosetta__text--indented">:* &nbsp; taxi-cab numbers</span>
/// <span class="rosetta__text--indented">:* &nbsp; taxi cab numbers</span>
/// <span class="rosetta__text--indented">:* &nbsp; Hardy-Ramanujan numbers</span>
/// <br>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">Compute and display the lowest 25 taxicab numbers (in numeric order, and in a human-readable format).</li>
/// <li class="rosetta__list-item--unordered">For each of the taxicab numbers, show the number as well as it's constituent cubes.</li></ul>
/// <br>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Extra credit</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">Show the 2,000<sup>th</sup> taxicab number, and a half dozen more</li></ul>
/// <br>
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">See also:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">[http://oeis.org/A001235 A001235 taxicab numbers] on The On-Line Encyclopedia of Integer Sequences.</li>
/// <li class="rosetta__list-item--unordered">[http://mathworld.wolfram.com/Hardy-RamanujanNumber.html Hardy-Ramanujan Number] on MathWorld.</li>
/// <li class="rosetta__list-item--unordered">[http://mathworld.wolfram.com/TaxicabNumber.html taxicab number] on MathWorld.</li>
/// <li class="rosetta__list-item--unordered">[https://en.wikipedia.org/wiki/Taxicab_number taxicab number] on Wikipedia.</li></ul><br><br>
/// <br>

/// challengeSeed:
function taxicabNumbers (n) {
  // Good luck!
  return true;
}

/// solutions:
function taxicabNumbers(nNumbers) {
  const cubeN = [];
  const s3s = {};

  const e = 1200;
  for (let n = 1; n < e; n += 1) {
    cubeN[n] = n * n * n;
  }

  for (let a = 1; a < e - 1; a += 1) {
    const a3 = cubeN[a];
    for (let b = a; b < e; b += 1) {
      const b3 = cubeN[b];
      const s3 = a3 + b3;

      let abs = s3s[s3];
      if (!abs) {
        s3s[s3] = abs = [];
      }
      abs.push([a, b]);
    }
  }

  let i = 0;
  const res = [];
  for (const s3 in s3s) {
    const abs = s3s[s3];
    if (abs.length < 2) { // No two cube pairs found
      continue;
    }
    i += 1;
    if (i > nNumbers) {
      break;
    }
    res.push(s3);
    /*
    document.write(i, ': ', s3)
    for (const ab of abs) {
      document.write(' = ', ab[0], '<sup>3</sup>+', ab[1], '<sup>3</sup>');
    }
    document.write('<br>');
    */
  }
  return res.map(item => parseInt(item, 10));

  /*
  const res = [];
  Object.keys(s3s).sort().forEach(s3 => {
    res.push([s3, s3s[s3][0], s3s[s3][1]]);
  });
  return res;
  */
  /*
  for (const s3 in s3s) {
    const abs = s3s[s3];
    if (abs.length < 2) {
      continue;
    }
    i += 1;
    if (abs.length == 2 && i > 25 && i < 2000) {
      continue;
    }
    if (i > 2006) {
      break;
    }
    res[i] = s3;
    document.write(i, ': ', s3)
    for (var ab of abs) {
      document.write(' = ', ab[0], '<sup>3</sup>+', ab[1], '<sup>3</sup>')
    }
    document.write('<br>')
  }
  */
}

/*
 1: 1729 = 1<sup>3</sup>+12<sup>3</sup> = 9<sup>3</sup>+10<sup>3</sup>
 2: 4104 = 2<sup>3</sup>+16<sup>3</sup> = 9<sup>3</sup>+15<sup>3</sup>
 3: 13832 = 2<sup>3</sup>+24<sup>3</sup> = 18<sup>3</sup>+20<sup>3</sup>
 4: 20683 = 10<sup>3</sup>+27<sup>3</sup> = 19<sup>3</sup>+24<sup>3</sup>
 5: 32832 = 4<sup>3</sup>+32<sup>3</sup> = 18<sup>3</sup>+30<sup>3</sup>
 6: 39312 = 2<sup>3</sup>+34<sup>3</sup> = 15<sup>3</sup>+33<sup>3</sup>
 7: 40033 = 9<sup>3</sup>+34<sup>3</sup> = 16<sup>3</sup>+33<sup>3</sup>
 8: 46683 = 3<sup>3</sup>+36<sup>3</sup> = 27<sup>3</sup>+30<sup>3</sup>
 9: 64232 = 17<sup>3</sup>+39<sup>3</sup> = 26<sup>3</sup>+36<sup>3</sup>
 10: 65728 = 12<sup>3</sup>+40<sup>3</sup> = 31<sup>3</sup>+33<sup>3</sup>
 11: 110656 = 4<sup>3</sup>+48<sup>3</sup> = 36<sup>3</sup>+40<sup>3</sup>
 12: 110808 = 6<sup>3</sup>+48<sup>3</sup> = 27<sup>3</sup>+45<sup>3</sup>
 13: 134379 = 12<sup>3</sup>+51<sup>3</sup> = 38<sup>3</sup>+43<sup>3</sup>
 14: 149389 = 8<sup>3</sup>+53<sup>3</sup> = 29<sup>3</sup>+50<sup>3</sup>
 15: 165464 = 20<sup>3</sup>+54<sup>3</sup> = 38<sup>3</sup>+48<sup>3</sup>
 16: 171288 = 17<sup>3</sup>+55<sup>3</sup> = 24<sup>3</sup>+54<sup>3</sup>
 17: 195841 = 9<sup>3</sup>+58<sup>3</sup> = 22<sup>3</sup>+57<sup>3</sup>
 18: 216027 = 3<sup>3</sup>+60<sup>3</sup> = 22<sup>3</sup>+59<sup>3</sup>
 19: 216125 = 5<sup>3</sup>+60<sup>3</sup> = 45<sup>3</sup>+50<sup>3</sup>
 20: 262656 = 8<sup>3</sup>+64<sup>3</sup> = 36<sup>3</sup>+60<sup>3</sup>
 21: 314496 = 4<sup>3</sup>+68<sup>3</sup> = 30<sup>3</sup>+66<sup>3</sup>
 22: 320264 = 18<sup>3</sup>+68<sup>3</sup> = 32<sup>3</sup>+66<sup>3</sup>
 23: 327763 = 30<sup>3</sup>+67<sup>3</sup> = 51<sup>3</sup>+58<sup>3</sup>
 24: 373464 = 6<sup>3</sup>+72<sup>3</sup> = 54<sup>3</sup>+60<sup>3</sup>
 25: 402597 = 42<sup>3</sup>+69<sup>3</sup> = 56<sup>3</sup>+61<sup>3</sup>
 455: 87539319 = 167<sup>3</sup>+436<sup>3</sup> = 228<sup>3</sup>+423<sup>3</sup> = 255<sup>3</sup>+414<sup>3</sup>
 535: 119824488 = 11<sup>3</sup>+493<sup>3</sup> = 90<sup>3</sup>+492<sup>3</sup> = 346<sup>3</sup>+428<sup>3</sup>
 588: 143604279 = 111<sup>3</sup>+522<sup>3</sup> = 359<sup>3</sup>+460<sup>3</sup> = 408<sup>3</sup>+423<sup>3</sup>
 655: 175959000 = 70<sup>3</sup>+560<sup>3</sup> = 198<sup>3</sup>+552<sup>3</sup> = 315<sup>3</sup>+525<sup>3</sup>
 888: 327763000 = 300<sup>3</sup>+670<sup>3</sup> = 339<sup>3</sup>+661<sup>3</sup> = 510<sup>3</sup>+580<sup>3</sup>
 1299: 700314552 = 334<sup>3</sup>+872<sup>3</sup> = 456<sup>3</sup>+846<sup>3</sup> = 510<sup>3</sup>+828<sup>3</sup>
 1398: 804360375 = 15<sup>3</sup>+930<sup>3</sup> = 198<sup>3</sup>+927<sup>3</sup> = 295<sup>3</sup>+920<sup>3</sup>
 1515: 958595904 = 22<sup>3</sup>+986<sup>3</sup> = 180<sup>3</sup>+984<sup>3</sup> = 692<sup>3</sup>+856<sup>3</sup>
 1660: 1148834232 = 222<sup>3</sup>+1044<sup>3</sup> = 718<sup>3</sup>+920<sup>3</sup> = 816<sup>3</sup>+846<sup>3</sup>
 1837: 1407672000 = 140<sup>3</sup>+1120<sup>3</sup> = 396<sup>3</sup>+1104<sup>3</sup> = 630<sup>3</sup>+1050<sup>3</sup>
 2000: 1671816384 = 428<sup>3</sup>+1168<sup>3</sup> = 940<sup>3</sup>+944<sup>3</sup>
 2001: 1672470592 = 29<sup>3</sup>+1187<sup>3</sup> = 632<sup>3</sup>+1124<sup>3</sup>
 2002: 1673170856 = 458<sup>3</sup>+1164<sup>3</sup> = 828<sup>3</sup>+1034<sup>3</sup>
 2003: 1675045225 = 522<sup>3</sup>+1153<sup>3</sup> = 744<sup>3</sup>+1081<sup>3</sup>
 2004: 1675958167 = 492<sup>3</sup>+1159<sup>3</sup> = 711<sup>3</sup>+1096<sup>3</sup>
 2005: 1676926719 = 63<sup>3</sup>+1188<sup>3</sup> = 714<sup>3</sup>+1095<sup>3</sup>
 2006: 1677646971 = 99<sup>3</sup>+1188<sup>3</sup> = 891<sup>3</sup>+990<sup>3</sup>
*/

/// tail:
const replaceThis = 3;

const res4 = [1729, 4104, 13832, 20683];
const res25 = [
  1729, 4104, 13832, 20683, 32832, 39312, 40033, 46683, 64232, 65728, 110656,
  110808, 134379, 149389, 165464, 171288, 195841, 216027, 216125, 262656, 314496, 320264, 327763,
  373464, 402597
];

/// tests:
assert(typeof taxicabNumbers === 'function', 'message: <code>taxicabNumbers </code> is a function.');
assert(typeof taxicabNumbers(2) === 'object', 'message: <code>taxicabNumbers </code> should return an array.');
assert(typeof taxicabNumbers(100)[0] === 'number', 'message: <code>taxicabNumbers </code> should return an array of numbers.');
assert.deepEqual(taxicabNumbers(4), res4, 'message: <code>taxicabNumbers(4) </code> must return [1729, 4104, 13832, 20683].');
assert.deepEqual(taxicabNumbers(25), res25,
    `message: taxicabNumbers(25) should return [1729, 4104, 13832, 20683, 32832, 39312, 40033, 46683, 64232, 65728, 110656,
    110808, 134379, 149389, 165464, 171288, 195841, 216027, 216125, 262656, 314496, 320264, 327763,
    373464, 402597]`);
