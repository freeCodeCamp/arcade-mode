//
// 'use strict';
//
// export const OUTPUT_CHANGED = 'OUTPUT_CHANGED';
// export const TESTS_STARTED = 'TESTS_STARTED';
// export const TESTS_FINISHED = 'TESTS_FINISHED';
//
//
// export function onOutputChange(newOutput) {
//   return {
//     type: OUTPUT_CHANGED,
//     userOutput: newOutput
//   };
// }
//
// /* Thunk action which runs the test cases against user code. */
// export function runTests(userCode, currChallenge) {
//   return dispatch => {
//     dispatch(actionTestsStarted());
//
//     // Eval user code inside worker
//     // http://stackoverflow.com/questions/9020116/is-it-possible-to-restrict-the-scope-of-a-javascript-function/36255766#36255766
//     function createWorker () {
//       return new Promise((resolve, reject) => {
//         const wk = new Worker('../../public/js/worker.bundle.js');
//         wk.postMessage([userCode, currChallenge]);
//         wk.onmessage = e => {
//           console.log(`worker onmessage result: ${e.data}`);
//           resolve(e.data);
//         };
//       });
//     }
//
//     createWorker()
//       .then(workerData => {
//         dispatch(onOutputChange(workerData[0].output));
//         if (workerData.length > 1) {
//           dispatch(actionTestsFinished(workerData.slice(1)));
//         }
//       });
//   };
// }
//
// /* Dispatched when a user starts running the tests.*/
// export function actionTestsStarted () {
//   return {
//     type: TESTS_STARTED
//   };
// }
//
// /* Dispatched when the tests finish. */
// export function actionTestsFinished (testResults) {
//   return {
//     type: TESTS_FINISHED,
//     testResults
//   };
// }

/* Unit tests for file client/scripts/arcademode/actions/test.js. */
import { expect } from 'chai';
import sinon from 'sinon';

import {
  OUTPUT_CHANGED,
  TESTS_STARTED,
  TESTS_FINISHED,
  onOutputChange,
  runTests,
  actionTestsStarted,
  actionTestsFinished
} from '../../../../..//client/scripts/arcademode/actions/test';


describe('test actions', () => {
  it('should dispatch an action on runTests', () => {
    const dispatch = sinon.spy();
    const action = runTests();

    action(dispatch).then(() => {
      expect(dispatch.called).to.be.true;
    });
  });

  it('should return correct type for actionTestsStarted', () => {
    expect(actionTestsStarted().type).to.equal(TESTS_STARTED);
  });

  it('should return correct type for actionTestsFinished()', () => {
    expect(actionTestsFinished().type).to.equal(TESTS_FINISHED);
  });

  it('should return correct type for onOutputChange()', () => {
    expect(onOutputChange().type).to.equal(OUTPUT_CHANGED);
  });
});

