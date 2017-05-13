// worker.js
// =========

// Using a webworker ensures that this code does not have access to the global context

'use strict';

// used require because import didn't work
/* eslint no-unused-vars: 0 */
const assert = require('chai').assert;

// import Immutable from 'immutable';

onmessage = e => {
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

  // append user code output to final object passed back via postMessage:
  // if user output does not run, then tests should not be executed.
  const userOutput = [];
  const userFnData = { error: null, pass: true, output: '' };
  try {
    const val = eval(`${userCode}`);
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
    try {
      const val = eval(
        `${userCode} // User code
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
  postMessage(postData);

  /*
  // Solution #1: Append 'return' and construct a new Function, then call that function.
  const reFn = e.data.replace(Challenges.challenges[0].challengeSeed[0],
    `return ${Challenges.challenges[0].challengeSeed[0]}`);

  const userFn = (new Function(reFn))();
  console.log(userFn('test string')); // passing an argument to the user function

  // single test case:
  const testCase = `${assert};${e.data};return ${tests[0].test}`;
  const tc = (new Function(testCase))();
  console.log(`assert single test case: ${tc}`);

  // multiple test cases in one:
  const reTestCases = tests.map(test =>
    `${assert};
    ${e.data};
   // console.log(${test.testCondition} ${test.testMessage});
    return ${test.test}`);

  const assertFns = reTestCases.map(reTestCase => (new Function(reTestCase))());
  // console.log('assert: ' + assertFns);
  assertFns.map(assertFn => console.log(`assert all: ${assertFn}`));

  // Solution: #2: Append the test case to the end the code below:

  // console.log('eval: ' + eval(testCase));

  // const testACase = eval((function () { return testCase; })());

  // console.log('test: ' + testACase);
  */
};

// postMessage(runTestsAgainstUserCode());
// onmessage = e => { console.log(e); };

/*
function assert (condition, message) {
  if (!condition) {
    //message = message || 'Assertion failed';
    //if (typeof Error !== 'undefined') {
      //throw new Error(message);
    //}
    //throw message;
    //
    return false;
  }
  return true;
}
*/

