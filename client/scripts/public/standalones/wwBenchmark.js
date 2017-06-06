// wwBenchmark.js
// ==============

/* eslint no-eval: 0 */

'use strict';

const benchmark = require('benchmark');

function startBenchmark (baselineCode, testCode, fnc) {
  // TODO:
  // firm time cutoff regardless of whether test finishes.

  // default options:
  benchmark.options.maxTime = 0.05; // seems to be the minimum for test cycles - 5.

  self.baselineCode = baselineCode.replace(/use strict/g, '');
  self.testCode = testCode.replace(/use strict/g, '');
  self.fnc = fnc;

  const stockTest = {
    name: 'stock test',
    setup () { try { eval(self.baselineCode); } catch (err) { console.error(err); } },
    fn () { eval(fnc); }
  };
  const userTest = {
    name: 'user test',
    setup () { try { eval(testCode); } catch (err) { console.error(err); } },
    fn () { eval(fnc); }
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
