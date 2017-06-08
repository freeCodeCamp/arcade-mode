// wwBenchmark.js
// ==============

/* eslint no-eval: 0 */
/* eslint arrow-body-style: 0 */

'use strict';

const benchmark = require('benchmark');


function getResultMessage (data) {
  const re = /^.*x (\d.*) ops\/sec ±(.*)% \(.*$/;
  let statisticalConfidence = true;
  let resultMessage;

  if (data.testData[0].match(re) && data.testData[1].match(re)) {
    const stats = data.testData.map(datum => {
      return {
        mean: parseInt((datum.match(re)[1]).replace(',', ''), 10),
        pMarginOfError: Number(datum.match(re)[2]) / 100
      };
    }).map(stat => {
      return {
        mean: stat.mean,
        pMarginOfError: stat.pMarginOfError,
        aMarginOfError: stat.mean * stat.pMarginOfError
      };
    });

    const stockRange = [
      stats[0].mean - stats[0].aMarginOfError, stats[0].mean + stats[0].aMarginOfError
    ];

    const userRange = [
      stats[1].mean - stats[1].aMarginOfError, stats[1].mean + stats[1].aMarginOfError
    ];

    if (stockRange[0] <= userRange[1] && stockRange[1] >= userRange[0]) {
      statisticalConfidence = false;
    }

    // there are instances when benchmark.js returns a victor
    // despite unfounded confidence.
    if (statisticalConfidence) {
      if (data.fastest[0] === 'stock test') {
        // stock code faster than user code:
        // console.log('Your code can be made more efficient.');
        // return 'stock';
        resultMessage = 'Your code can be made more efficient.';
      }
      // user code faster than stock code:
      // console.log('Your code is extremely fast!');
      // return 'user';
      resultMessage = 'Your code performed better than the stock solution. It\'s blazing fast!';
    }
    // tied between user and stock code:
    // console.log('Your code is as fast as the stock code.');
    // return 'tie';
    resultMessage = 'Tie. Your code is fast!';

    return resultMessage;
  }
}


function startBenchmark (baselineCode, testCode, fnc) {
  // TODO:
  // firm time cutoff regardless of whether test finishes.

  // default options:
  benchmark.options.maxTime = 0.05; // seems to be the minimum for test cycles - 5.
  // benchmark.options.maxTime = Number.NEGATIVE_INFINITY;
  benchmark.options.minSamples = 4;
  // benchmark.options.initCount = 10;

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

  // let results = null;
  const results = {
    fastest: null,
    testData: []
  };

  return new Promise(resolve => {
    suite
    .add(stockTest)
    .add(userTest)
    .on('cycle', e => results.testData.push(String(e.target)))
    .on('complete', function () { results.fastest = this.filter('fastest').map('name');
      resolve({
        resultMessage: getResultMessage(results),
        stockPerf: results.testData[0],
        userPerf: results.testData[1]
      });
      // console.log(`Fastest is ${results}`);
    })
    .run({ async: true });
  });
}

self.onmessage = e => {
  const stockCode = e.data[0][0];
  const userCode = e.data[0][1];
  const benchmarkFnCall = e.data[1];

  startBenchmark(stockCode, userCode, benchmarkFnCall)
    .then(result => {
      self.postMessage(result);
    });
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
