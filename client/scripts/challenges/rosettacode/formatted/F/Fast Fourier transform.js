
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Fast Fourier transform
/// type: rosetta-code

/// categories:


/// difficulty:4


/// description:
/// <div class="rosetta">
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Write a function to calculate the  FFT  (<u>F</u>ast <u>F</u>ourier <u>T</u>ransform)  of an input array.</p><br/><p class="rosetta__paragraph">The  output should be an array of length same as that of the input array. The elements of the output array sould be objects of the form <code>{"re":value,"im":value}</code>. It can be seen that the objects represent complex numbers with a real and an imaginary part.</p>
/// </div>

/// challengeSeed:
function fourier (amps) {
  // Good luck!
}

/// solutions:
function fourier(amps){
  function Complex(re, im) 
  {
    this.re = re;
    this.im = im || 0.0;
  }
  Complex.prototype.add = function(other, dst)
  {
    dst.re = this.re + other.re;
    dst.im = this.im + other.im;
    return dst;
  }
  Complex.prototype.sub = function(other, dst)
  {
    dst.re = this.re - other.re;
    dst.im = this.im - other.im;
    return dst;
  }
  Complex.prototype.mul = function(other, dst)
  {
    //cache re in case dst === this
    var r = this.re * other.re - this.im * other.im;
    dst.im = this.re * other.im + this.im * other.re;
    dst.re = r;
    return dst;
  }
  Complex.prototype.cexp = function(dst)
  {
    var er = Math.exp(this.re);
    dst.re = er * Math.cos(this.im);
    dst.im = er * Math.sin(this.im);
    return dst;
  }
  function cfft(amplitudes)
  {
    var N = amplitudes.length;
    if( N <= 1 )
      return amplitudes;

    var hN = N / 2;
    var even = [];
    var odd = [];
    even.length = hN;
    odd.length = hN;
    for(var i = 0; i < hN; ++i)
    {
      even[i] = amplitudes[i*2];
      odd[i] = amplitudes[i*2+1];
    }
    even = cfft(even);
    odd = cfft(odd);

    var a = -2*Math.PI;
    for(var k = 0; k < hN; ++k)
    {
      if(!(even[k] instanceof Complex))
        even[k] = new Complex(even[k], 0);
      if(!(odd[k] instanceof Complex))
        odd[k] = new Complex(odd[k], 0);
      var p = k/N;
      var t = new Complex(0, a * p);
      t.cexp(t).mul(odd[k], t);
      amplitudes[k] = even[k].add(t, odd[k]);
      amplitudes[k + hN] = even[k].sub(t, even[k]);
    }
    return amplitudes;
  }
  
  return cfft(amps).map(function(e){
    return {re:e.re,im:e.im};
  });
}


/// tail:
var tests=[[1,1],
           [1,1,0,1],
          [0,1,0,1],
          [1,2,3,0],
          [0,1,2,0]];

var results=[[{"re":2,"im":0},{"re":0,"im":0}],
            [{"re":3,"im":0},{"re":1,"im":0},{"re":-1,"im":0},{"re":1,"im":0}],
            [{"re":2,"im":0},{"re":0,"im":0},{"re":-2,"im":0},{"re":0,"im":0}],
            [{"re":6,"im":0},{"re":-1.9999999999999998,"im":-2},{"re":2,"im":0},{"re":-2,"im":2}],
            [{"re":3,"im":0},{"re":-2,"im":-1},{"re":1,"im":0},{"re":-2,"im":1}]];

/// tests:
assert(typeof fourier === 'function', 'message: <code>fourier</code> should be a function.');
assert(Array.isArray(fourier(tests[0].slice())),'message: <code>fourier([1,1])</code> should return an array.');
assert.deepEqual(fourier(tests[0].slice()),results[0],'message: <code>fourier('+JSON.stringify(tests[0])+')</code> should return <code>'+JSON.stringify(results[0])+'</code>.');
assert.deepEqual(fourier(tests[1].slice()),results[1],'message: <code>fourier('+JSON.stringify(tests[1])+')</code> should return <code>'+JSON.stringify(results[1])+'</code>.');
assert.deepEqual(fourier(tests[2].slice()),results[2],'message: <code>fourier('+JSON.stringify(tests[2])+')</code> should return <code>'+JSON.stringify(results[2])+'</code>.');
assert.deepEqual(fourier(tests[3].slice()),results[3],'message: <code>fourier('+JSON.stringify(tests[3])+')</code> should return <code>'+JSON.stringify(results[3])+'</code>.');
assert.deepEqual(fourier(tests[4].slice()),results[4],'message: <code>fourier('+JSON.stringify(tests[4])+')</code> should return <code>'+JSON.stringify(results[4])+'</code>.');
/// id: 5a5dad74b46bac1cee19d44b
