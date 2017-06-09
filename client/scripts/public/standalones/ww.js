// ww.js
// =========

// Using a webworker ensures that evaluated user code does not have access to the
// global context

'use strict';

import 'babel-polyfill';

import runner from '../../arcademode/runner';

self.onmessage = e => {
  const userCode = e.data[0];
  const currChallenge = e.data[1];
  const rawData = runner(userCode, currChallenge);

  let postData;

  rawData.then(data => {
    postData = [
      data.userOutput,
      data.benchmarkStockCode,
      data.benchmarkUserCode,
      data.benchmarkFnCall,
      ...data.errorMsgs,
      ...data.testResults
    ];
    // post message back to main thread:
    self.postMessage(postData);
  });
/*
  const postData = [
    data.userOutput,
    data.benchmarkStockCode,
    data.benchmarkUserCode,
    data.benchmarkFnCall,
    ...data.errorMsgs,
    ...data.testResults
  ];
*/
};

