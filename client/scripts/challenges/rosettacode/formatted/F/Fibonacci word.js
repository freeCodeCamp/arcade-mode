/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Fibonacci word
/// type: rosetta-code

/// categories:


/// difficulty: 5

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">Write a function to return the Fibonacci Words upto N. N will be provided as a parameter to the function. The function should return an array of objects. The objects should be of the form : { N: 1, Length: 1, Entropy: 0, Word: '1' }. More details are given below : </p><p class="rosetta__paragraph">The  Fibonacci Word  may be created in a manner analogous to the  Fibonacci Sequence   <a class="rosetta__link--wiki" href="http://hal.archives-ouvertes.fr/docs/00/36/79/72/PDF/The_Fibonacci_word_fractal.pdf" title="link: http://hal.archives-ouvertes.fr/docs/00/36/79/72/PDF/The_Fibonacci_word_fractal.pdf">as described here</a>:</p><br/><p class="rosetta__paragraph">Define  F_Word<sub>1</sub>  as  <span class="rosetta__text--bold">1</span></p>
/// <p class="rosetta__paragraph">Define  F_Word<sub>2</sub>  as  <span class="rosetta__text--bold">0</span></p>
/// <p class="rosetta__paragraph">Form   F_Word<sub>3</sub>  as  F_Word<sub>2</sub>   concatenated with  F_Word<sub>1</sub>   i.e.:  <span class="rosetta__text--bold">01</span></p>
/// <p class="rosetta__paragraph">Form   F_Word<sub>n</sub>  as  F_Word<sub>n-1</sub>  concatenated with  F_word<sub>n-2</sub></p>
/// <br/></div>

/// challengeSeed:
function fibWord (n) {
  // Good luck!
}

/// solutions:
function fibWord(n) {
    function entropy(s) {
         //create an object containing each individual char
      //and the amount of iterations per char 
        function prob(s) {
            var h = Object.create(null);
            s.split('').forEach(function(c) {
               h[c] && h[c]++ || (h[c] = 1); 
            });
            return h;
        }

        s = s.toString(); //just in case 
        var e = 0, l = s.length, h = prob(s);

        for (var i in h ) {
            var p = h[i]/l;
            e -= p * Math.log(p) / Math.log(2);
        }
        return e;
    }
    var wOne = "1", wTwo = "0", wNth = [wOne, wTwo], w = "", o = [];
 
    for (var i = 0; i < n; i++) {
        if (i === 0 || i === 1) {
            w = wNth[i];
        } else {
            w = wNth[i - 1] + wNth[i - 2];
            wNth.push(w);
        }
        var l = w.length;
        var e = entropy(w);
 
        if (l <= 21) {
        	o.push({
            	N: i + 1,
            	Length: l,
            	Entropy: e,
            	Word: w
        	});
        } else {
        	o.push({
            	N: i + 1,
            	Length: l,
            	Entropy: e,
            	Word: "..."
        	});
        }            
    }
  return o;
}

/// tail:
let ans=[ { N: 1, Length: 1, Entropy: 0, Word: '1' },

  { N: 2, Length: 1, Entropy: 0, Word: '0' },

  { N: 3, Length: 2, Entropy: 1, Word: '01' },

  { N: 4, Length: 3, Entropy: 0.9182958340544896, Word: '010' },

  { N: 5, Length: 5, Entropy: 0.9709505944546688, Word: '01001' }];

/// tests:
assert(typeof fibWord === 'function', 'message: <code>fibWord</code> is a function.');
assert(Array.isArray(fibWord(5)),'message: <code>fibWord(5)</code> should return an array.');
assert.deepEqual(fibWord(5),ans,'message: <code>fibWord(5)</code> should return <code>'+JSON.stringify(ans)+'</code>.');
/// id: 5992e222d397f00d21122931
