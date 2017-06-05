
/* eslint no-unused-vars: 0 */
/* eslint no-eval: 0 */
/* eslint no-unneeded-ternary: 0 */

/* Contains code to run the challenges using eval, and also to evaluate the syntax. */

/* Some guidelines for the challenges:
 *    head: must contain only code that is needed to evaluate the user code
 *    tail: must contain only code required for running the tests
 *    tests: must contain only assertions
 */

const assert = require('chai').assert;
const babel = require('babel-core');
const es2015 = require('babel-preset-es2015');
const loopProtect = require('../vendor/loop-protect');

export default function runner(userCode, currChallenge) {
  const messageRegex = /message: (.*)'\);$/;
  const tests = currChallenge.tests.map(test => {
    if (messageRegex.test(test)) {
      return {
        test,
        testMessage: test.match(messageRegex)[1]
      };
    }
    return {
      test,
      testMessage: ''
    };
  });

  // let headLength = 0;
  const head = currChallenge.head && currChallenge.head.join('\n');
  /*
  if (head) {
    headLength = currChallenge.head.length;
  }
 */

  const tail = currChallenge.tail && currChallenge.tail.join('\n');

  // append user code output to final object passed back via postMessage:
  // if user output does not run, then tests should not be executed.
  let userOutput;
  const errorMsgs = [];
  const errorMsg = { error: null, pass: true };

  let esFive; // babel transpiled user code
  let syntaxErrorFlag = false;

  // check for syntax errors and babelfy user code:
  const userCodeWithSupportCode = `${head ? head : ''}${userCode};${tail ? tail : ''};`;
  try {
    esFive = babel.transform(userCodeWithSupportCode, { presets: [es2015] }).code;
  }
  catch (err) {
    syntaxErrorFlag = true;

    // TODO Can this if-statement be removed?
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
    userOutput = errorMsg.error;
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
    userOutput = errorMsg.error;
  };

  // log userOutput:
  let evalErrorFlag = false;
  if (!syntaxErrorFlag) {
    try {
      userOutput = 'User output is undefined.';
      const evalRetVal = eval(esFiveLoopProtected);
      if (typeof evalRetVal !== 'undefined' && evalRetVal !== 'use strict') {
        userOutput = JSON.stringify(evalRetVal, null, 2);
      }
    }
    catch (err) {
      userOutput = `Error: ${err.message}`;
      evalErrorFlag = true;
      errorMsg.error = `${err.message}`;
      errorMsg.pass = false;
      errorMsgs.push(errorMsg);
    }
  }

  // run and save test results if no syntax error was observed:
  const testResults = [];

  if (!syntaxErrorFlag && !evalErrorFlag) {
    tests.forEach(test => {
      const testRunData = { error: null, pass: true };
      let code;
      try {
        eval(
          `
          code=userCode; // some tail functions use the variable code for userCode
          ${esFiveLoopProtected};
          ${test.test}; // Test case code - this assumes that the function exists
          `
        );
      }
      catch (err) {
        testRunData.error = `${err}`;
        testRunData.pass = false;
      }
      testResults.push(testRunData);
    });
  }

  // if all tests pass, benchmark user code if it is benchmarkable:
  // Nested workers do not work in Google Chrome as of 06/04/17, the contents must be passed
  // back to the worker caller to invoke another worker.
  let benchmarkStockCode = null;
  let benchmarkUserCode = null;
  let benchmarkFnCall = null;
  if (testResults.every(testResult => testResult.pass) && Object.prototype.hasOwnProperty.call(currChallenge, 'benchmark')) {
    const benchmarkCodeWithSupportCode = `${head ? head : ''};${currChallenge.solutions};${tail ? tail : ''};`;
    const esFiveBenchmarkCode = babel.transform(benchmarkCodeWithSupportCode, { presets: [es2015] }).code;

    benchmarkStockCode = esFiveBenchmarkCode;
    benchmarkUserCode = esFive;
    benchmarkFnCall = currChallenge.benchmark;
  }

  return {
    userOutput,
    benchmarkStockCode,
    benchmarkUserCode,
    benchmarkFnCall,
    errorMsgs,
    testResults
  };
}
