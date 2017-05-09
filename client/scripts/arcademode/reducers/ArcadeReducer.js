
'use strict';

// import Immutable from 'immutable';

import Interpreter from 'js-interpreter';

import { RUN_TEST, CODE_CHANGED } from '../actions/ArcadeAction';
import UserData from '../model/UserData';
import CodeRetVal from '../model/CodeRetVal';

// const initialState = Immutable.Map();
//

function handleRunTests(state, nextState) {
  nextState.isRunningTests = true;

  // Execute inside try-catch, otherwise errors are printed directly into
  // browser's console
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

  return nextState;
}

export default function arcadeReducer(state, action) {
  if (typeof state === 'undefined') {
    return {
      code: '// Insert code here',
      interpreterError: false,
      isRunningTests: false,
      userData: new UserData({ username: '' }),
      codeRetVal: new CodeRetVal()
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
