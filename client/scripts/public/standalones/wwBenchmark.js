// wwBenchmark.js
// ==============

/* eslint no-eval: 0 */

'use strict';

self.onmessage = e => {
  const code = e.data[0];
  const benchmarkFnCall = e.data[1];
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

  self.postMessage(timeUsed);
};
