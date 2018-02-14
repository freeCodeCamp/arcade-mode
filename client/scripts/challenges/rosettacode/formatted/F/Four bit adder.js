
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Four bit adder
/// type: rosetta-code

/// categories:
/// Electronics

/// difficulty: 3

/// benchmark:

/// description:
/// <div class="rosetta"><br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">"<span class="rosetta__text--italic">Simulate</span>" a four-bit adder "chip".</p><br/><p class="rosetta__paragraph">This "chip" can be realized using four <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Adder_(electronics)#Full_adder" title="wp: Adder_(electronics)#Full_adder">1-bit full adder</a>s.</p>
/// <p class="rosetta__paragraph">Each of these 1-bit full adders can be built with two <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Adder_(electronics)#Half_adder" title="wp: Adder_(electronics)#Half_adder">half adder</a>s and an <span class="rosetta__text--italic">or</span> <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Logic gate" title="wp: Logic gate">gate</a>. Finally a half adder can be made using a <span class="rosetta__text--italic">xor</span> gate and an <span class="rosetta__text--italic">and</span> gate.</p>
/// <p class="rosetta__paragraph">The <span class="rosetta__text--italic">xor</span> gate can be made using two <span class="rosetta__text--italic">not</span>s, two <span class="rosetta__text--italic">and</span>s and one <span class="rosetta__text--italic">or</span>.</p><br/><p class="rosetta__paragraph"><span class="rosetta__text--bold">Not</span>, <span class="rosetta__text--bold">or</span> and <span class="rosetta__text--bold">and</span>, the only allowed "gates" for the task, can be "imitated" by using the <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Bitwise operations" title="Bitwise operations">bitwise operators.</a></p>
/// <p class="rosetta__paragraph">Write a function that takes two 4-bit binary numbers as strings and returns the sum as a string. The addition should to be done as stated above.</p></div>
/// <br><br><br/></div>

/// challengeSeed:
function fourBitAdder (a, b) {
  // Good luck!
}

/// solutions:
function fourBitAdder(a, b) {
	function acceptedBinFormat(bin) {
		if (bin == 1 || bin === 0 || bin === '0')
		    return true;
		else
		    return bin;
	}

	function arePseudoBin() {
		var args = [].slice.call(arguments), len = args.length;
		while(len--)
		    if (acceptedBinFormat(args[len]) !== true)
		        throw new Error('argument must be 0, \'0\', 1, or \'1\', argument ' + len + ' was ' + args[len]);
		return true;
	}
	function not(a) {
		if (arePseudoBin(a))
		    return a == 1 ? 0 : 1;
	}

	function and(a, b) {
		if (arePseudoBin(a, b))
		    return a + b < 2 ? 0 : 1;
	}

	function nand(a, b) {
		if (arePseudoBin(a, b))
		    return not(and(a, b));
	}

	function or(a, b) {
		if (arePseudoBin(a, b))
		    return nand(nand(a,a), nand(b,b));
	}

	function xor(a, b) {
		if (arePseudoBin(a, b))
		    return nand(nand(nand(a,b), a), nand(nand(a,b), b));
	}

	function halfAdder(a, b) {
		if (arePseudoBin(a, b))
		    return { carry: and(a, b), sum: xor(a, b) };
	}

	function fullAdder(a, b, c) {
		if (arePseudoBin(a, b, c)) {
		    var h0 = halfAdder(a, b),
		        h1 = halfAdder(h0.sum, c);
		    return {carry: or(h0.carry, h1.carry), sum: h1.sum };
		}
	}
    if (typeof a.length == 'undefined' || typeof b.length == 'undefined')
        throw new Error('bad values');
    
    var inA = Array(4),
        inB = Array(4),
        out = Array(4),
        i = 4,
        pass;

    while (i--) {
        inA[i] = a[i] != 1 ? 0 : 1;
        inB[i] = b[i] != 1 ? 0 : 1;
    }

    pass = halfAdder(inA[3], inB[3]);
    out[3] = pass.sum;
    pass = fullAdder(inA[2], inB[2], pass.carry);
    out[2] = pass.sum;
    pass = fullAdder(inA[1], inB[1], pass.carry);
    out[1] = pass.sum;
    pass = fullAdder(inA[0], inB[0], pass.carry);
    out[0] = pass.sum;
    return out.join('');
}

/// tail:

/// tests:
assert(typeof fourBitAdder=='function','message: <code>fourBitAdder</code> should be a function.');
assert(typeof fourBitAdder('0000','0001')=='string','message: <code>fourBitAdder("0000","0001")</code> should return a string.');
assert.equal(fourBitAdder('0000', '0001'),'0001',"message: <code>fourBitAdder('0000', '0001')</code> should return <code>'0001'</code>.");
assert.equal(fourBitAdder('1010', '0101'),'1111',"message: <code>fourBitAdder('1010', '0101')</code> should return <code>'1111'</code>.");
assert.equal(fourBitAdder('0100', '0001'),'0101',"message: <code>fourBitAdder('0100', '0001')</code> should return <code>'0101'</code>.");
assert.equal(fourBitAdder('0110', '0100'),'1010',"message: <code>fourBitAdder('0110', '0100')</code> should return <code>'1010'</code>.");
assert.equal(fourBitAdder('1111', '1111'),'1110',"message: <code>fourBitAdder('1111', '1111')</code> should return <code>'1110'</code>.");
/// id: 5a7dad05be01840e1778a0d1
