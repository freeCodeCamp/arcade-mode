
'use strict';

export const OUTPUT_CHANGED = 'OUTPUT_CHANGED'; // test
export const TESTS_STARTED = 'TESTS_STARTED'; // playerstatus, test
export const TESTS_FINISHED = 'TESTS_FINISHED'; // test
export const TESTS_FAILED = 'TESTS_FAILED'; // playerstatus
export const TESTS_PASSED = 'TESTS_PASSED'; // ?
export const BENCHMARK_STARTED = 'BENCHMARK_STARTED'; // test
export const BENCHMARK_FINISHED = 'BENCHMARK_FINISHED'; // test

/* Given a list of test results, returns pass/fail status.*/

const getTestStatus = testResults => testResults.every(testResult => testResult.pass);

export function onOutputChange(newOutput) {
  return {
    type: OUTPUT_CHANGED,
    userOutput: newOutput
  };
}

/* Thunk action which runs the test cases against user code. */
export function runTests(userCode, currChallenge) {
  return dispatch => {
    dispatch(actionTestsStarted());

    // Eval user code inside worker
    // http://stackoverflow.com/questions/9020116/is-it-possible-to-restrict-the-scope-of-a-javascript-function/36255766#36255766
    const perfBefore = performance.now();
    createTestWorker(userCode, currChallenge, dispatch)
      .then(() => console.log(`Total time to evaluate test cases: ${performance.now() - perfBefore}`))
      .catch(err => console.error(err));
  };
}

export function runBenchmark(userCode, currChallenge) {
  return dispatch => {
    dispatch(actionTestsStarted());

    const perfBefore = performance.now();
    createTestWorker(userCode, currChallenge, dispatch, true)
      .then(() => console.log(`Total time to evaluate test cases: ${performance.now() - perfBefore}`))
      .catch(err => console.error(err));
  };
}

export function actionBenchmarkStarted () {
  return {
    type: BENCHMARK_STARTED
  };
}

export function actionBenchmarkFinished (benchmarkResults) {
  return {
    type: BENCHMARK_FINISHED,
    benchmarkResults
  };
}

/* Dispatched when a user starts running the tests.*/
export function actionTestsStarted () {
  return {
    type: TESTS_STARTED
  };
}

/* Dispatched when tests pass.*/
export function actionTestsPassed () {
  return {
    type: TESTS_PASSED
  };
}

/* Dispatched when tests fail.*/
export function actionTestsFailed () {
  return {
    type: TESTS_FAILED
  };
}

/* Dispatched when the tests finish. */
export function actionTestsFinished (testResults) {
  return {
    type: TESTS_FINISHED,
    testResults
  };
}


function verifyFastest (data) {
  const re = /^.*x (\d.*) ops\/sec ±(.*)% \(.*$/;
  let statisticalConfidence = true;

  if (data.testData[0].match(re) && data.testData[1].match(re)) {
    const stats = data.testData.map(datum => {
      return {
        mean: parseInt((datum.match(re)[1]).replace(',', ''), 10),
        pMarginOfError: Number(datum.match(re)[2]) / 100
      };
    }).map(stat => {
      return {
        mean: stat.mean,
        pMarginOfError: stat.pMarginOfError,
        aMarginOfError: stat.mean * stat.pMarginOfError
      };
    });

    const stockRange = [
      stats[0].mean - stats[0].aMarginOfError, stats[0].mean + stats[0].aMarginOfError
    ];

    const userRange = [
      stats[1].mean - stats[1].aMarginOfError, stats[1].mean + stats[1].aMarginOfError
    ];

    if (stockRange[0] <= userRange[1] && stockRange[1] >= userRange[0]) {
      statisticalConfidence = false;
    }

    if (statisticalConfidence) {
      if (data.fastest === 'user test') {
        // user code faster than stock code:
        console.log('Your code is extremely fast!');
        return 'user';
      }
      // stock code faster than user code:
      console.log('Your code can be made more efficient.');
      return 'stock';
    }
    // tied between user and stock code:
    console.log('Optimal code!');
    return 'tie';
  }
}

// TODO:
// possibly reduce the number of workers because spawning and setting up a worker takes time
const createTestWorker = (userCode, currChallenge, dispatch, isBenchmark = false) =>
  new Promise(resolve => {
    const wk = new Worker('public/js/ww.bundle.js');
    wk.postMessage([userCode, currChallenge.toJS()]); // postMessage mangles the Immutable object, so it needs to be transformed into regular JS before sending over to worker.
    wk.onmessage = e => {
      resolve(e.data);
    };
  })
  .then(workerData => {
    dispatch(onOutputChange(workerData[0]));
    if (workerData.length > 4) {
      const testResults = workerData.slice(4); // to take into account the benchmark items
      const allTestsPassed = getTestStatus(testResults);

      if (allTestsPassed) {
        dispatch(actionTestsPassed());
        if (isBenchmark) {
          // call benchmark webworkers here:
          const perfBefore = performance.now();
          const benchmarkFnCall = workerData[3];
          if (benchmarkFnCall) {
            const benchmarkCode = workerData.slice(1, 3);
            dispatch(actionBenchmarkStarted());
            createBenchmarkWorker(benchmarkCode, benchmarkFnCall)
              .then(data => {
                console.log(data.fastest);
                const fastestResult = verifyFastest(data);
                /*
                const benchmarkResults = [
                  fastestResult,
                  data.testData[0], // stock performance
                  data.testData[1]  // user performance
                ];
               */
                const benchmarkResults = {
                  fastest: fastestResult,
                  stockPerf: data.testData[0],
                  userPerf: data.testData[1]
                };
                console.log(data.testData[0]);
                console.log(data.testData[1]);
                console.log(`Total time to benchmark: ${performance.now() - perfBefore}`);
                dispatch(actionBenchmarkFinished(benchmarkResults));
              })
              .catch(err => console.error(err));
          }
        }
      }
      else {
        dispatch(actionTestsFailed());
      }
      // Would it make sense to include this with passed/failed actions?
      dispatch(actionTestsFinished(testResults));
    }
  })
  .catch(err => { console.log(`Promise rejected: ${err}.`); });

const createBenchmarkWorker = (code, benchmarkFnCall) =>
  new Promise(resolve => {
    const wk = new Worker('public/js/wwBenchmark.bundle.js');
    wk.postMessage([code, benchmarkFnCall]);
    wk.onmessage = e => {
      resolve(e.data);
    };
  })
  .catch(err => console.error(err));
