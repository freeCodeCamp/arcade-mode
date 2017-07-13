/* eslint spaced-comment: 0 */
/* eslint no-continue: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-shadow: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-trailing-spaces: 0 */

const assert = require('chai').assert;

/// title: Zhang-Suen thinning algorithm
/// type: rosetta-code
/// difficulty: 7

/// description:
/// <div class="rosetta">
/// This is an algorithm used to thin a black and white i.e. one bit per pixel images.
/// <br/>
/// For example, with an input image of:
/// <pre>
///  #################                   #############
///  ##################               ################
///  ###################            ##################
///  ########     #######          ###################
///    ######     #######         #######       ######
///    ######     #######        #######
///    #################         #######
///    ################          #######
///    #################         #######
///    ######     #######        #######
///    ######     #######        #######
///    ######     #######         #######       ######
///  ########     #######          ###################
///  ########     ####### ######    ################## ######
///  ########     ####### ######      ################ ######
///  ########     ####### ######         ############# ######
///                                                            </pre>
/// It produces the thinned output:
/// <pre>
///                                                            
///     # ##########                       #######
///      ##        #                   ####       #
///      #          #                 ##
///      #          #                #
///      #          #                #
///      #          #                #
///      ############               #
///      #          #               #
///      #          #                #
///      #          #                #
///      #          #                #
///      #                            ##
///      #                             ############
///                        ###                          ###
///                                                            
///                                                            </pre>
/// <br/>
/// <h2>Algorithm</h2>
/// Assume black pixels are one and white pixels zero, and that the input image is a rectangular N by M array of ones and zeroes.
/// <br/>
/// The algorithm operates on all black pixels P1 that can have eight neighbours. The neighbours are, in order, arranged as:
/// <table class="table" border="1">
///   <tr><td>P9</td><td>P2</td><td>P3</td></tr>
///   <tr><td>P8</td><td><b>P1</b></td><td>P4</td></tr>
///   <tr><td>P7</td><td>P6</td><td>P5</td></tr>
/// </table>
/// <br/>
/// Obviously the boundary pixels of the image cannot have the full eight neighbours.
/// <br/>
/// <ul class="rosetta__unordered-list">
///   <li class="rosetta__list-item--unordered">
///     Define $A(P1)$ = the number of transitions from white to black, (0 -> 1) in the sequence P2,P3,P4,P5,P6,P7,P8,P9,P2. (Note the extra P2 at the end - it is circular).
///   </li>
///   <li class="rosetta__list-item--unordered">
///     Define $B(P1)$ = the number of black pixel neighbours of P1. ( = sum(P2 .. P9) )
///   </li>
/// </ul>
/// <br/>
/// <h3>Step 1:</h3>
/// All pixels are tested and pixels satisfying all the following conditions (simultaneously) are just noted at this stage.
/// <ul class="rosetta__unordered-list">
///   <li class="rosetta__list-item--unordered">(0) The pixel is black and has eight neighbours</li>
///   <li class="rosetta__list-item--unordered">(1) $2 <= B(P1) <= 6$</li>
///   <li class="rosetta__list-item--unordered">(2) $A(P1) = 1$</li>
///   <li class="rosetta__list-item--unordered">(3) At least one of P2 and P4 and P6 is white</li>
///   <li class="rosetta__list-item--unordered">(4) At least one of P4 and P6 and P8 is white</li>
/// </ul>
/// After iterating over the image and collecting all the pixels satisfying all step 1 conditions, all these condition satisfying pixels are set to white.
/// <br/>
/// <h3>Step 2:</h3>
/// All pixels are again tested and pixels satisfying all the following conditions are just noted at this stage.
/// <ul class="rosetta__unordered-list">
///   <li class="rosetta__list-item--unordered">(0) The pixel is black and has eight neighbours</li>
///   <li class="rosetta__list-item--unordered">(1) $2 <= B(P1) <= 6$</li>
///   <li class="rosetta__list-item--unordered">(2) $A(P1) = 1$</li>
///   <li class="rosetta__list-item--unordered">(3) At least one of P2 and P4 and '''P8''' is white</li>
///   <li class="rosetta__list-item--unordered">(4) At least one of '''P2''' and P6 and P8 is white</li>
/// </ul>
/// After iterating over the image and collecting all the pixels satisfying all step 2 conditions, all these condition satisfying pixels are again set to white.
/// <br/>
/// Iteration:
/// If any pixels were set in this round of either step 1 or step 2 then all steps are repeated until no image pixels are so changed.
/// <br/>
/// <p class="rosetta__paragraph">
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">Write a routine to perform Zhang-Suen thinning on an image matrix of ones and zeroes.</li></ul>
/// </p>
/// </div>

/// challengeSeed:
const testImage = [
  '                                                          ',
  ' #################                   #############        ',
  ' ##################               ################        ',
  ' ###################            ##################        ',
  ' ########     #######          ###################        ',
  '   ######     #######         #######       ######        ',
  '   ######     #######        #######                      ',
  '   #################         #######                      ',
  '   ################          #######                      ',
  '   #################         #######                      ',
  '   ######     #######        #######                      ',
  '   ######     #######        #######                      ',
  '   ######     #######         #######       ######        ',
  ' ########     #######          ###################        ',
  ' ########     ####### ######    ################## ###### ',
  ' ########     ####### ######      ################ ###### ',
  ' ########     ####### ######         ############# ###### ',
  '                                                          '];

function thinImage(image) {
  // Good luck!
}

/// solutions:
function Point(x, y) {
  this.x = x;
  this.y = y;
}

const ZhangSuen = (function () {
  function ZhangSuen() {
  }

  ZhangSuen.nbrs = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]];

  ZhangSuen.nbrGroups = [[[0, 2, 4], [2, 4, 6]], [[0, 2, 6], [0, 4, 6]]];

  ZhangSuen.toWhite = [];

  ZhangSuen.main = function (image) {
    ZhangSuen.grid = new Array(image);
    for (let r = 0; r < image.length; r++) {
      ZhangSuen.grid[r] = image[r].split('');
    }
    ZhangSuen.thinImage();
    return ZhangSuen.getResult();
  };

  ZhangSuen.thinImage = function () {
    let firstStep = false;
    let hasChanged;
    do {
      hasChanged = false;
      firstStep = !firstStep;
      for (let r = 1; r < ZhangSuen.grid.length - 1; r++) {
        for (let c = 1; c < ZhangSuen.grid[0].length - 1; c++) {
          if (ZhangSuen.grid[r][c] !== '#') {
            continue;
          }
          const nn = ZhangSuen.numNeighbors(r, c);
          if (nn < 2 || nn > 6) {
            continue;
          }
          if (ZhangSuen.numTransitions(r, c) !== 1) {
            continue;
          }
          if (!ZhangSuen.atLeastOneIsWhite(r, c, firstStep ? 0 : 1)) {
            continue;
          }
          ZhangSuen.toWhite.push(new Point(c, r));
          hasChanged = true;
        }
      }
      for (let i = 0; i < ZhangSuen.toWhite.length; i++) {
        const p = ZhangSuen.toWhite[i];
        ZhangSuen.grid[p.y][p.x] = ' ';
      }
      ZhangSuen.toWhite = [];
    } while ((firstStep || hasChanged));
  };

  ZhangSuen.numNeighbors = function (r, c) {
    let count = 0;
    for (let i = 0; i < ZhangSuen.nbrs.length - 1; i++) {
      if (ZhangSuen.grid[r + ZhangSuen.nbrs[i][1]][c + ZhangSuen.nbrs[i][0]] === '#') {
        count++;
      }
    }
    return count;
  };

  ZhangSuen.numTransitions = function (r, c) {
    let count = 0;
    for (let i = 0; i < ZhangSuen.nbrs.length - 1; i++) {
      if (ZhangSuen.grid[r + ZhangSuen.nbrs[i][1]][c + ZhangSuen.nbrs[i][0]] === ' ') {
        if (ZhangSuen.grid[r + ZhangSuen.nbrs[i + 1][1]][c + ZhangSuen.nbrs[i + 1][0]] === '#') {
          count++;
        }
      }
    }
    return count;
  };

  ZhangSuen.atLeastOneIsWhite = function (r, c, step) {
    let count = 0;
    const group = ZhangSuen.nbrGroups[step];
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < group[i].length; j++) {
        const nbr = ZhangSuen.nbrs[group[i][j]];
        if (ZhangSuen.grid[r + nbr[1]][c + nbr[0]] === ' ') {
          count++;
          break;
        }
      }
    }
    return count > 1;
  };

  ZhangSuen.getResult = function () {
    const result = [];
    for (let i = 0; i < ZhangSuen.grid.length; i++) {
      const row = ZhangSuen.grid[i].join('');
      result.push(row);
    }
    return result;
  };
  return ZhangSuen;
}());

function thinImage(image) {
  return ZhangSuen.main(image);
}

/// tail:

const imageForTests = [
  '                                                          ',
  ' #################                   #############        ',
  ' ##################               ################        ',
  ' ###################            ##################        ',
  ' ########     #######          ###################        ',
  '   ######     #######         #######       ######        ',
  '   ######     #######        #######                      ',
  '   #################         #######                      ',
  '   ################          #######                      ',
  '   #################         #######                      ',
  '   ######     #######        #######                      ',
  '   ######     #######        #######                      ',
  '   ######     #######         #######       ######        ',
  ' ########     #######          ###################        ',
  ' ########     ####### ######    ################## ###### ',
  ' ########     ####### ######      ################ ###### ',
  ' ########     ####### ######         ############# ###### ',
  '                                                          '];
const expected = [
  '                                                          ',
  '                                                          ',
  '    # ##########                       #######            ',
  '     ##        #                   ####       #           ',
  '     #          #                 ##                      ',
  '     #          #                #                        ',
  '     #          #                #                        ',
  '     #          #                #                        ',
  '     ############               #                         ',
  '     #          #               #                         ',
  '     #          #                #                        ',
  '     #          #                #                        ',
  '     #          #                #                        ',
  '     #                            ##                      ',
  '     #                             ############           ',
  '                       ###                          ###   ',
  '                                                          ',
  '                                                          '
];
const result = thinImage(imageForTests);

/// tests:
assert.equal(typeof thinImage, 'function', 'thinImage must be a function');
assert.equal(typeof result, 'object', 'thinImage must return an array of strings');
assert.equal(typeof result[0], 'string', 'thinImage must return an array of strings');
assert.deepEqual(result, expected, 'thinImage must return an array of strings');
/// id: 594810f028c0303b75339ad7
