
/* eslint no-unused-vars: 0 */
/* eslint no-eval: 0 */
/* eslint no-unneeded-ternary: 0 */
/* eslint no-unsafe-finally: 0 */
/* eslint prefer-const: 0 */

/* Contains code to run the challenges using eval, and also to evaluate the syntax. */

/* Some guidelines for the challenges:
 *    head: must contain only code that is needed to evaluate the user code
 *    tail: must contain only code required for running the tests
 *    tests: must contain only assertions
 */

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const babel = require('babel-core');
const es2015 = require('babel-preset-es2015');
const loopProtect = require('../vendor/loop-protect');

chai.use(chaiAsPromised);
const assert = chai.assert;

export default async function runner (userCode, currChallenge) {
  // run and save test results if no syntax error was observed:
  const results = await detectErrorsTranspileCodeRunTestsProcessResults(userCode, currChallenge);
  return {
    userOutput: results.userOutput,
    benchmarkStockCode: results.benchmarkStockCode,
    benchmarkUserCode: results.benchmarkUserCode,
    benchmarkFnCall: results.benchmarkFnCall,
    errorMsgs: results.errorMsgs,
    testResults: results.testResults
  };
}

function detectErrorsTranspileCodeRunTestsProcessResults (userCode, currChallenge) {
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

  function processAddons (addon) {
    if (currChallenge[addon]) {
      if (Array.isArray(currChallenge[addon])) {
        return currChallenge[addon].join('\n');
      }
      return currChallenge[addon];
    }
  }

  const head = processAddons('head');
  const tail = processAddons('tail');

  // const head = currChallenge.head && currChallenge.head.join('\n');
  // const tail = currChallenge.tail && currChallenge.tail.join('\n');

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
      // do not involve tail as it potentially may output its own values
      const userCodeWithHead = `${head ? head : ''};${userCode};`;
      const esFiveWithHead = babel.transform(userCodeWithHead, { presets: [es2015] }).code;
      const esFiveWithHeadLP = loopProtect(esFiveWithHead);

      const evalRetVal = eval(esFiveWithHeadLP);
      if (typeof evalRetVal !== 'undefined' &&
        evalRetVal !== 'use strict' &&
        typeof evalRetVal !== 'function') { // needed as when native prototype functions are created, eval assigns it as the return value.
        if (typeof evalRetVal !== 'string') {
          userOutput = JSON.stringify(evalRetVal, null, 2);
        }
        else userOutput = evalRetVal;
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

  let benchmarkStockCode = null;
  let benchmarkUserCode = null;
  let benchmarkFnCall = null;

  if (!syntaxErrorFlag && !evalErrorFlag) {
    return Promise.all(tests.map(test => {
      const testRunData = { error: null, pass: true };
      let code;
      let isAsync = false;
      let evalResult;
      try {
        eval(
          `
          code=userCode; // some tail functions use the variable code for userCode
          ${esFiveLoopProtected};
          if (\`${test.test}\`.match(/^assert.becomes.*$/)) { isAsync = true; }
          evalResult = ${test.test}; // Test case code - this assumes that the function exists
          `
        );
      }
      catch (err) {
        testRunData.error = `${err}`;
        testRunData.pass = false;
      }
      finally {
        if (isAsync) {
          return evalResult
            .catch(err => {
              testRunData.error = `${err}`;
              testRunData.pass = false;
            })
            .then(() => testRunData);
        }
        return Promise.resolve(testRunData);
      }
    }))
    .then(testResults => {
      // if all tests pass, benchmark user code if it is benchmarkable:
      // Nested workers do not work in Google Chrome as of 06/04/17, the contents must be passed
      // back to the worker caller to invoke another worker.
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
    })
    .catch(err => {
      console.error(err);
    });
  }

  return {
    userOutput,
    benchmarkStockCode,
    benchmarkUserCode,
    benchmarkFnCall,
    errorMsgs,
    testResults: []
  };
}
