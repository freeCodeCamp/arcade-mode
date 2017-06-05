// wwBenchmark.js
// ==============

/* eslint no-eval: 0 */

'use strict';

const benchmark = require('benchmark');

function startBenchmark (baselineCode, testCode, fn) {
  // default options:
  benchmark.options.maxTime = 1;

  // console.log(benchmark.prototype.stats);

  console.log(testCode);
  console.log('hi');
  console.log(fn);

  const stockTest = {
    name: 'stock test',
    // setup () { () => eval(baselineCode); },
    setup () { eval('var a = 5;'); },
    fn () { console.log(eval('a * 2')); }
    // fn () { eval('a * 2;'); }
    // fn: () => { /o/.test('Hello World!'); }
    // fn () { eval(baselineCode); eval(fn); }
    // fn () { eval(fn); }
  };
  const userTest = {
    name: 'user test',
    setup () { eval(testCode); },
    // fn: () => {  'Hello World!'.indexOf('o') > -1; }
    // fn () { eval(testCode); eval(fn); }
    fn () { eval(fn); }
  };

  const suite = benchmark.Suite();

  let results = null;

  return new Promise(resolve => {
    suite
    .add(stockTest)
    .add(userTest)
    .on('cycle', e => console.log(String(e.target)))
    .on('complete', function () { results = this.filter('fastest').map('name');
      console.log(`Fastest is ${results}`);
    })
    .run({ async: true });
    resolve(results);
  });
}

self.onmessage = e => {
  const stockCode = e.data[0][0];
  const userCode = e.data[0][1];
  const benchmarkFnCall = e.data[1];

  const result = startBenchmark(stockCode, userCode, benchmarkFnCall);
  /*
  let timeUsed = Number.POSITIVE_INFINITY;
  try {
    eval(code);
    const start = performance.now();
    eval(benchmarkFnCall);
    const finish = performance.now();
    timeUsed = finish - start;
  }
  catch (err) {
    console.error(err);
  }
 */

  // self.postMessage(result);
};
