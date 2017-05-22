// worker.js
// =========

// Using a webworker ensures that this code does not have access to the global context

'use strict';

/* eslint no-unused-vars: 0 */
/* eslint no-eval: 0 */

// used require because import didn't work
const assert = require('chai').assert;
const babel = require('babel-core');
const loopProtect = require('../vendor/loop-protect');

self.onmessage = e => {
  const userCode = e.data[0];
  const currChallenge = e.data[1];

  const tests = currChallenge.tests.map(test => ({
    test,
    testMessage: test.match(/message: (.*)'\);$/)[1]
  }));

  const tail = currChallenge.tail && currChallenge.tail.join('');

  // append user code output to final object passed back via postMessage:
  // if user output does not run, then tests should not be executed.
  let userOutput;
  const errorMsgs = [];
  const errorMsg = { error: null, pass: true };

  let esFive; // babel transpiled user code
  let syntaxErrorFlag = false;

  // check for syntax errors and babelfy user code:
  try {
    esFive = babel.transform(userCode).code;
  }
  catch (err) {
    syntaxErrorFlag = true;
    if (errorMsgs
          .map(uo => uo.error)
          .includes(`There are syntax errors in your code:
            ${err}`)) {
      return;
    }

    errorMsg.error = `There are syntax errors in your code:
      ${err}`;
    errorMsg.pass = false;
    errorMsgs.push(errorMsg);
  }

  // if no syntax errors, add loopProtect:
  let esFiveLoopProtected;
  if (esFive) {
    esFiveLoopProtected = loopProtect(esFive);
  }

  // whenever loopProtect finds a potentially infinite loop, it calls this method:
  loopProtect.hit = line => {
    if (errorMsgs
          .map(uo => uo.error)
          .includes(`Potential infinite loop found on line ${line}`)) {
      return;
    }
    errorMsg.error = `Potential infinite loop found on line ${line}`;
    errorMsg.pass = false;
    errorMsgs.push(errorMsg);
  };

  // log userOutput:
  if (eval(esFiveLoopProtected) === undefined) {
    userOutput = 'User output is undefined';
  }
  else {
    userOutput = JSON.stringify(eval(esFiveLoopProtected), null, 2);
  }

  // run and save test results if no syntax error was observed:
  const testResults = [];

  if (!syntaxErrorFlag) {
    tests.forEach(test => {
      const testRunData = { error: null, pass: true };
      let code;
      try {
        eval(
          `
          code=userCode;
          ${esFiveLoopProtected}; // User code: userCode // esfive.code
          ${tail}; // tail function
          ${test.test}; // Test case code - this assumes that the function exists
          `
        );
      }
      catch (err) {
        console.log(`Test Error: ${err.message}`);
        testRunData.error = `${err}`;
        testRunData.pass = false;
      }
      testResults.push(testRunData);
    });
  }

  const postData = [userOutput, ...errorMsgs, ...testResults];

  // post message back to main thread:
  console.log('Now sending worker user code output and test results');
  self.postMessage(postData);
  // self.close();
};

