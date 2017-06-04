
/* eslint no-unused-vars: 0 */
/* eslint no-eval: 0 */

/* Contains code to run the challenges using eval, and also to evaluate the syntax. */

/* Some guidelines for the challenges:
 *    head: must contain only code that is needed to evaluate the user code
 *    tail: must contain only code required for running the tests
 *    tests: must contain only assertions
 */

const assert = require('chai').assert;
const babel = require('babel-core');
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
  const head = currChallenge.head && currChallenge.head.join('');
  /*
  if (head) {
    headLength = currChallenge.head.length;
  }
 */

  const tail = currChallenge.tail && currChallenge.tail.join('');

  // append user code output to final object passed back via postMessage:
  // if user output does not run, then tests should not be executed.
  let userOutput;
  const errorMsgs = [];
  const errorMsg = { error: null, pass: true };

  let esFive; // babel transpiled user code
  let syntaxErrorFlag = false;

  // check for syntax errors and babelfy user code:
  // const userCodeWithHead = head ? `${head};${userCode}` : userCode;
  const userCodeWithSupportCode = `${head};${userCode};${tail}`;
  try {
    esFive = babel.transform(userCodeWithSupportCode).code;
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
      userOutput = 'User output is undefined';
      const evalRetVal = eval(esFiveLoopProtected);
      if (typeof evalRetVal !== 'undefined') {
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
          code=userCode;
          ${esFiveLoopProtected}; // User code: userCode // esfive.code
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

  return {
    userOutput,
    errorMsgs,
    testResults
  };
}
