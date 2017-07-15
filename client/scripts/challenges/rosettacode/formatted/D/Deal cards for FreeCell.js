
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-bitwise: 0 */

const assert = require('chai').assert;

/// title: Deal cards for FreeCell
/// type: rosetta-code

/// categories:
/// Cards

/// difficulty: 4

/// benchmark:

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph"><span class="rosetta__text--italic">Free Cell</span> is the solitaire card game that Paul Alfille introduced to the PLATO system in 1978. Jim Horne, at Microsoft, changed the name to <span class="rosetta__text--italic">FreeCell</span> and reimplemented the game for <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/DOS" title="DOS">DOS</a>, then <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Windows" title="Windows">Windows</a>. <br></p>
/// <p class="rosetta__paragraph">This version introduced 32000 numbered deals. (The <a class="rosetta__link--wiki" href="http://www.solitairelaboratory.com/fcfaq.html" title="link: http://www.solitairelaboratory.com/fcfaq.html">FreeCell FAQ</a> tells this history.)</p><br/><p class="rosetta__paragraph">As the game became popular, Jim Horne disclosed <a class="rosetta__link--wiki" href="http://www.solitairelaboratory.com/mshuffle.txt" title="link: http://www.solitairelaboratory.com/mshuffle.txt">the algorithm</a>, and other implementations of FreeCell began to reproduce the Microsoft deals. <br></p>
/// <p class="rosetta__paragraph">These deals are numbered from 1 to 32000.</p>
/// <p class="rosetta__paragraph">Newer versions from Microsoft have 1 million deals, numbered from 1 to 1000000; some implementations allow numbers outside that range.</p><br/><p class="rosetta__paragraph">The algorithm uses this <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/linear congruential generator" title="linear congruential generator">linear congruential generator</a> from Microsoft C:</p><br/><ul class="rosetta__unordered-list"><li class="rosetta__list-item--unordered">$state_{n + 1} \equiv 214013 \times state_n + 2531011 \pmod{2^{31}}$</li>
/// <li class="rosetta__list-item--unordered">$rand_n = state_n \div 2^{16}$</li>
/// <li class="rosetta__list-item--unordered">$rand_n$ is in range 0 to 32767.</li>
/// <br>
/// <p class="rosetta__paragraph">The algorithm follows:</p><br/><ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Seed the RNG with the number of the deal.</li>
/// <li class="rosetta__list-item--ordered">Create an <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/array" title="array">array</a> of 52 cards: Ace of Clubs, Ace of Diamonds, Ace of Hearts, Ace of Spades, 2 of Clubs, 2 of Diamonds, and so on through the ranks: Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King. The array indexes are 0 to 51, with Ace of Clubs at 0, and King of Spades at 51.</li>
/// <li class="rosetta__list-item--ordered">Until the array is empty:</li>
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered"> Choose a random card at <span class="rosetta__text--italic">index</span> &equiv; <span class="rosetta__text--italic">next random number</span> (mod <span class="rosetta__text--italic">array length</span>). </li>
/// <li class="rosetta__list-item--unordered"> Swap this random card with the last card of the array.</li>
/// <li class="rosetta__list-item--unordered"> Remove this random card from the array. (Array length goes down by 1.)</li>
/// <li class="rosetta__list-item--unordered"> Deal this random card.</li>
/// </ul>
/// <li class="rosetta__list-item--ordered">Deal all 52 cards, face up, across 8 columns. The first 8 cards go in 8 columns, the next 8 cards go on the first 8 cards, and so on.</li></ol>
/// <br />
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Example:</dt></dl>
/// <p class="rosetta__paragraph">Order to deal cards</p>
/// <p class="rosetta__paragraph"><div class="rosetta__pre-wrap"><pre class="rosetta__pre"> 1  2  3  4  5  6  7  8
///  9 10 11 12 13 14 15 16
/// 17 18 19 20 21 22 23 24
/// 25 26 27 28 29 30 31 32
/// 33 34 35 36 37 38 39 40
/// 41 42 43 44 45 46 47 48
/// 49 50 51 52</pre></div></p>
/// <p class="rosetta__paragraph">Game #1</p>
/// <p class="rosetta__paragraph"><div class="rosetta__pre-wrap"><pre class="rosetta__pre">[
/// ['JD', '2D', '9H', 'JC', '5D', '7H', '7C', '5H'],
/// ['KD', 'KC', '9S', '5S', 'AD', 'QC', 'KH', '3H'],
/// ['2S', 'KS', '9D', 'QD', 'JS', 'AS', 'AH', '3C'],
/// ['4C', '5C', 'TS', 'QH', '4H', 'AC', '4D', '7S'],
/// ['3S', 'TD', '4S', 'TH', '8H', '2C', 'JH', '7D'],
/// ['6D', '8S', '8D', 'QS', '6C', '3D', '8C', 'TC'],
/// ['6S', '9C', '2H', '6H']
/// ]</pre></div></p>
/// <p class="rosetta__paragraph">Game #617</p>
/// <p class="rosetta__paragraph"><div class="rosetta__pre-wrap"><pre class="rosetta__pre">[
/// ['7D', 'AD', '5C', '3S', '5S', '8C', '2D', 'AH'],
/// ['TD', '7S', 'QD', 'AC', '6D', '8H', 'AS', 'KH'],
/// ['TH', 'QC', '3H', '9D', '6S', '8D', '3D', 'TC'],
/// ['KD', '5H', '9S', '3C', '8S', '7H', '4D', 'JS'],
/// ['4C', 'QS', '9C', '9H', '7C', '6H', '2C', '2S'],
/// ['4S', 'TS', '2H', '5D', 'JC', '6C', 'JH', 'QH'],
/// ['JD', 'KS', 'KC', '4H']
/// ]</pre></div></p>
/// <br />
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Write a function to take a deal number and deal cards in the same order as this algorithm.</p>
/// <p class="rosetta__paragraph">The function must return a two dimentional array representing the FreeCell board.</p>
/// <br/>
/// <p class="rosetta__paragraph">Deals can also be checked against <a class="rosetta__link--wiki" href="http://freecellgamesolutions.com/" title="link: http://freecellgamesolutions.com/">FreeCell solutions to 1000000 games</a>.</p>
/// <p class="rosetta__paragraph">(Summon a video solution, and it displays the initial deal.)</p>
/// <br><br><br/></div>

/// challengeSeed:
function dealFreeCell (seed) {
  // Good luck!
  return true;
}

/// solutions:
// RNG
function FreeCellRNG (seed) {
  return {
    lastNum: seed,
    next() {
      this.lastNum = ((214013 * this.lastNum) + 2531011) % (2 ** 31);
      return this.lastNum >> 16;
    }
  };
}
// Get cards
function getDeck() {
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
  const suits = ['C', 'D', 'H', 'S'];
  const cards = [];
  for (let i = 0; i < ranks.length; i += 1) {
    for (let j = 0; j < suits.length; j += 1) {
      cards.push(`${ranks[i]}${suits[j]}`);
    }
  }
  return cards;
}
function dealFreeCell(seed) {
  const rng = FreeCellRNG(seed);
  const deck = getDeck();

  const deltCards = [[], [], [], [], [], [], []];
  let currentColumn = 0;
  let currentRow = 0;

  let rand;
  let temp;
  let card;
  while (deck.length > 0) {
    // Choose a random card
    rand = rng.next() % deck.length;

    // Swap this random card with the last card in the array
    temp = deck[deck.length - 1];
    deck[deck.length - 1] = deck[rand];
    deck[rand] = temp;

    // Remove this card from the array
    card = deck.pop();

    // Deal this card
    deltCards[currentRow].push(card);
    currentColumn += 1;
    if (currentColumn === 8) {
      currentColumn = 0;
      currentRow += 1;
    }
  }

  return deltCards;
}

/// tail:
const replaceThis = 3;
const game1 = [
  ['JD', '2D', '9H', 'JC', '5D', '7H', '7C', '5H'],
  ['KD', 'KC', '9S', '5S', 'AD', 'QC', 'KH', '3H'],
  ['2S', 'KS', '9D', 'QD', 'JS', 'AS', 'AH', '3C'],
  ['4C', '5C', 'TS', 'QH', '4H', 'AC', '4D', '7S'],
  ['3S', 'TD', '4S', 'TH', '8H', '2C', 'JH', '7D'],
  ['6D', '8S', '8D', 'QS', '6C', '3D', '8C', 'TC'],
  ['6S', '9C', '2H', '6H']
];
const game617 = [
  ['7D', 'AD', '5C', '3S', '5S', '8C', '2D', 'AH'],
  ['TD', '7S', 'QD', 'AC', '6D', '8H', 'AS', 'KH'],
  ['TH', 'QC', '3H', '9D', '6S', '8D', '3D', 'TC'],
  ['KD', '5H', '9S', '3C', '8S', '7H', '4D', 'JS'],
  ['4C', 'QS', '9C', '9H', '7C', '6H', '2C', '2S'],
  ['4S', 'TS', '2H', '5D', 'JC', '6C', 'JH', 'QH'],
  ['JD', 'KS', 'KC', '4H']
];

/// tests:
assert(typeof dealFreeCell === 'function', 'message: <code>dealFreeCell</code> is a function.');
assert(typeof dealFreeCell(1) === 'object', 'message: <code>dealFreeCell(seed)</code> should return an object.');
assert(dealFreeCell(1).length === 7, 'message: <code>dealFreeCell(seed)</code> should return an array of length 7.');
assert.deepEqual(dealFreeCell(1), game1, 'message: <code>dealFreeCell(1)</code> should return an array identical to example "Game #1"');
assert.deepEqual(dealFreeCell(617), game617, 'message: <code>dealFreeCell(617)</code> should return an array identical to example "Game #617"');
/// id: 59694356a6e7011f7f1c5f4e
