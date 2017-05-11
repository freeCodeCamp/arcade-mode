
'use strict';

/* Action type constants. */
export const RUN_TEST = 'RUN_TEST';
export const CODE_CHANGED = 'CODE_CHANGED';
export const OUTPUT_CHANGED = 'OUTPUT_CHANGED';
export const TESTS_STARTED = 'TESTS_STARTED';
export const TESTS_FINISHED = 'TESTS_FINISHED';
export const START_CHALLENGE = 'START_CHALLENGE';
export const NEXT_CHALLENGE = 'NEXT_CHALLENGE';


/* Thunk action which runs the test cases against user code. */
export function runTests(userCode, currChallenge) {
  return function(dispatch) {
    dispatch(actionTestsStarted());

    // Eval user code inside worker
    // http://stackoverflow.com/questions/9020116/is-it-possible-to-restrict-the-scope-of-a-javascript-function/36255766#36255766
    function createWorker () {
      return new Promise((resolve, reject) => {
        const wk = new Worker('../../public/js/worker.bundle.js');
        wk.postMessage([userCode, currChallenge]);
        wk.onmessage = e => {
          console.log(`worker onmessage result: ${e.data}`);
          resolve(e.data);
        };
      });
    }

    createWorker()
      .then(workerData => {
        dispatch(onOutputChange(workerData[0].output));
        if (workerData.length > 1) {
          dispatch(actionTestsFinished(workerData.slice(1)));
        }
      });
  };
}

/* Dispatched when a user starts running the tests.*/
export function actionTestsStarted() {
  return {
    type: TESTS_STARTED
  };
}

/* Dispatched when the tests finish. */
export function actionTestsFinished(testResults) {
  return {
    type: TESTS_FINISHED,
    testResults
  };
}

export function startChallenge() {
  return {
    type: START_CHALLENGE
  };
}

export function nextChallenge() {
  return {
    type: NEXT_CHALLENGE
  };
}

export function onCodeChange(newCode) {
  return {
    type: CODE_CHANGED,
    code: newCode
  };
}

export function onOutputChange(newOutput) {
  return {
    type: OUTPUT_CHANGED,
    userOutput: newOutput
  };
}
