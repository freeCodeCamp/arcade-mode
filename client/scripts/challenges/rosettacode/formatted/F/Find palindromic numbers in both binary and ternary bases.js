
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Find palindromic numbers in both binary and ternary bases
/// type: rosetta-code

/// categories:
/// Palindromes

/// difficulty: 3

/// benchmark:
binTernPalin()

/// description:
/// <div class="rosetta">
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">The task:</dt></dl><br/><p class="rosetta__paragraph">Write a function that returns the first five numbers (non-negative integers) that are <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Palindrome detection" title="Palindrome detection">palindromes</a> in  <span class="rosetta__text--italic">both</span>  base 2 and base 3.</p><br/><p class="rosetta__paragraph">Use zero (0) as the first number found, even though some other definitions ignore it.</p><br/><p class="rosetta__paragraph">The function should return the decimal form of the numbers as an array.</p></div>792">Sequence A60792</a>,  numbers that are palindromic in bases 2 and 3 on <span class="rosetta__text--italic">The On-Line Encyclopedia of Integer Sequences</span>.</li></ul><br><br><br/></div>

/// challengeSeed:
function binTernPalin () {
  // Good luck!
}

/// solutions:
function binTernPalin(){
    // GENERIC FUNCTIONS
    // range :: Int -> Int -> [Int]

    const range = (m, n) =>

        Array.from({

            length: Math.floor(n - m) + 1

        }, (_, i) => m + i);


    // compose :: (b -> c) -> (a -> b) -> (a -> c)

    const compose = (f, g) => x => f(g(x));

    // reverse :: [a] -> [a]

    const reverse = xs =>

        typeof xs === 'string' ? (

            xs.split('')

            .reverse()

            .join('')

        ) : xs.slice(0)

        .reverse();


    // take :: Int -> [a] -> [a]

    const take = (n, xs) => xs.slice(0, n);


    // drop :: Int -> [a] -> [a]

    const drop = (n, xs) => xs.slice(n);


    // quotRem :: Integral a => a -> a -> (a, a)

    const quotRem = (m, n) => [Math.floor(m / n), m % n];


    // length :: [a] -> Int

    const length = xs => xs.length;

    // BASES AND PALINDROMES

    // show, showBinary, showTernary :: Int -> String

    const show = n => n.toString(10);

    const showBinary = n => n.toString(2);

    const showTernary = n => n.toString(3);


    // readBase3 :: String -> Int

    const readBase3 = s => parseInt(s, 3);


    // base3Palindrome :: Int -> String

    const base3Palindrome = n => {

        const s = showTernary(n);

        return s + '1' + reverse(s);

    };


    // isBinPal :: Int -> Bool

    const isBinPal = n => {

        const

            s = showBinary(n),

            [q, r] = quotRem(s.length, 2);

        return (r !== 0) && drop(q + 1, s) === reverse(take(q, s));

    };


    // solutions :: [Int]

    const solutions = [0, 1].concat(range(1, 50000)

        .map(compose(readBase3, base3Palindrome))

        .filter(isBinPal));


    return solutions;
};

/// tail:

/// tests:
assert(typeof binTernPalin=='function','message: <code>binTernPalin</code> should be a function.');
assert(Array.isArray(binTernPalin()),'message: <code>binTernPalin()</code> should return an Array.');
assert.deepEqual(binTernPalin(),[ 0, 1, 6643, 1422773, 5415589 ],'message: <code>binTernPalin()</code> should return <code>[ 0, 1, 6643, 1422773, 5415589 ]</code>.');
/// id: 5a5f63e8b869a71a01cdb41d
