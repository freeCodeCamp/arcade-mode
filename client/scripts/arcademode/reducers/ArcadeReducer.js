
'use strict';

// import Immutable from 'immutable';

// import Interpreter from 'js-interpreter';

import { RUN_TEST, CODE_CHANGED } from '../actions/ArcadeAction';
import UserData from '../model/UserData';
// import Challenges from '../../../json/challenges.json';
// import CodeRetVal from '../model/CodeRetVal';

// const initialState = Immutable.Map();
//

function handleRunTests(state, nextState) {
  nextState.isRunningTests = true;

  // Execute inside try-catch, otherwise errors are printed directly into
  // browser's console
  /*
  try {
    const interpreter = new Interpreter(state.code);
    interpreter.run();
    nextState.codeRetVal = new CodeRetVal(interpreter.value);
    nextState.interpreterError = false;
  }
  catch (e) {
    nextState.codeRetVal = new CodeRetVal({ error: `${e.name} : ${e.message}` });
    nextState.interpreterError = true;
  }
  */

  // http://stackoverflow.com/questions/9020116/is-it-possible-to-restrict-the-scope-of-a-javascript-function/36255766#36255766
  function createWorker () {
    /*
    const userDefinedCode = state.code;
    const workerTemplate = `
      import Challenges from '../public/json/challenges.json';
      console.log(Challenges);
      function runTestsAgainstUserCode () {
        const arg = 5;
        return (${userDefinedCode})(arg)
      }
      postMessage(runTestsAgainstUserCode());
      onMessage = function (e) { console.log(e) }`;

    const blob = new Blob([workerTemplate], { type: 'text/javascript' });
    const wk = new Worker(window.URL.createObjectURL(blob));
    */
    const wk = new Worker('../../public/js/worker.bundle.js');
    wk.postMessage(state.code);
    wk.onmessage = e => { console.log(`Function result: ${e.data}`); };
  }

  createWorker();

  return nextState;
}

export default function arcadeReducer(state, action) {
  if (typeof state === 'undefined') {
    return {
      code: '// Insert code here',
      interpreterError: false,
      isRunningTests: false,
      userData: new UserData({ username: '' })
   //   codeRetVal: new CodeRetVal()
    };
  }

  let nextState = Object.assign({}, state);

  switch (action.type) {
    case RUN_TEST: {
      nextState = handleRunTests(state, nextState);
      break;
    }
    case CODE_CHANGED: {
      nextState.code = action.code;
      break;
    }
    default: console.log('Default reached.');
  }

  return nextState;
}
