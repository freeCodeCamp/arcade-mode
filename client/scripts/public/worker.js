// worker.js
// =========

// Using a webworker ensures that this code does not have access to the global context

'use strict';

/* eslint no-unused-vars: 0 */
/* eslint no-eval: 0 */

// used require because import didn't work
const assert = require('chai').assert;
const babel = require('babel-core');

self.onmessage = e => {
  const userCode = e.data[0];
  const currChallenge = e.data[1];

  const tests = currChallenge.tests.map(test => (
  // const tests = currChallenge.getIn(['challenge', 'tests']).map(test => (
    {
      test,
      // testCondition: test.match(/^assert\(([^,]*),/)[1],
      testMessage: test.match(/message: (.*)'\);$/)[1]
    }
  ));

  let tail;
  if (currChallenge.tail) {
    tail = currChallenge.tail.join('');
  }

  // append user code output to final object passed back via postMessage:
  // if user output does not run, then tests should not be executed.
  const userOutput = [];
  const userFnData = { error: null, pass: true, output: '' };

  const esfive = babel.transform(userCode);
  try {
    const val = eval(esfive.code);
      // eval(`${userCode}`);
  }
  catch (err) {
    console.log(`err: ${err}`);
    userFnData.error = err.toString();
    userFnData.pass = false;
    userFnData.output = err.toString();
    userOutput.push(userFnData);

    return postMessage(userOutput);
  }

  if (eval(`${userCode}`) === undefined) {
    userFnData.output = 'User output is undefined';
  }
  else {
    userFnData.output = JSON.stringify(eval(`${userCode}`), null, 2);
  }
  userOutput.push(userFnData);

  const testResults = [];
  tests.forEach(test => {
    const testRunData = { error: null, pass: true };
    let code;
    try {
      const val = eval(
        `
        code=userCode;
        ${esfive.code};// User code: userCode
        ${tail}; // tail function
        ${test.test} // Test case code
        `
      );
    }
    catch (err) {
      console.log(`Test Error: ${err}`);
      testRunData.error = err;
      testRunData.pass = false;
    }
    testResults.push(testRunData);
  });

  const postData = userOutput.concat(testResults);

  console.log('Now sending worker user code output and test results');
  self.postMessage(postData);
  self.close();
};

