
'use strict';

/* Action type constants. */
export const MODAL_CLOSE = 'MODAL_CLOSE';
export const RUN_TEST = 'RUN_TEST';
export const CODE_CHANGED = 'CODE_CHANGED';
export const OUTPUT_CHANGED = 'OUTPUT_CHANGED';
export const TESTS_STARTED = 'TESTS_STARTED';
export const TESTS_FINISHED = 'TESTS_FINISHED';
export const START_CHALLENGE = 'START_CHALLENGE';
export const NEXT_CHALLENGE = 'NEXT_CHALLENGE';

export const TIMER_FINISHED = 'TIMER_FINISHED';
export const TIMER_UPDATED = 'TIMER_UPDATED';
export const TIMER_STARTED = 'TIMER_STARTED';
export const STOP_TIMER = 'STOP_TIMER';
export const FINISH_SESSION = 'FINISH_SESSION';

export const TIMER_MAX_VALUE_CHANGED = 'TIMER_MAX_VALUE_CHANGED';

/* Thunk action which runs the test cases against user code. */
export function runTests(userCode, currChallenge) {
  return dispatch => {
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

let timer = null;

/* Thunk action to start the timer. */
export function startTimer() {
  return dispatch => {
    clearInterval(timer);
    dispatch(actionTimerStarted());
    timer = setInterval(() => {
      dispatch(actionTimerUpdated());
    }, 1000 / 60);
  };
}

export function stopTimer() {
  clearInterval(timer);
  return {
    type: STOP_TIMER
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

export function onModalClose() {
  return {
    type: MODAL_CLOSE
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

export function actionTimerStarted() {
  return {
    type: TIMER_STARTED
  };
}

export function actionTimerFinished() {
  return {
    type: TIMER_FINISHED
  };
}

export function actionTimerUpdated() {
  return {
    type: TIMER_UPDATED
  };
}

export function actionTimerMaxValueChanged(timerMaxValue) {
  return {
    type: TIMER_MAX_VALUE_CHANGED,
    timerMaxValue
  };
}

export function onOutputChange(newOutput) {
  return {
    type: OUTPUT_CHANGED,
    userOutput: newOutput
  };
}

export function actionFinishSession() {
  return {
    type: FINISH_SESSION
  };
}
