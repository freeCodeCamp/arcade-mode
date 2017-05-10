
'use strict';

// import Immutable from 'immutable';

// import Interpreter from 'js-interpreter';

import { TESTS_STARTED, CODE_CHANGED, START_CHALLENGE, TESTS_FINISHED } from '../actions/ArcadeAction';
import UserData from '../model/UserData';
import Challenges from '../../../json/challenges.json';
import TestResults from '../model/TestResults';
import Challenge from '../model/Challenge';

// const initialState = Immutable.Map();
//

export default function arcadeReducer(state, action) {
  if (typeof state === 'undefined') {
    return {
      code: Challenges.challenges[0].challengeSeed.join('\n'),
      interpreterError: false,
      isRunningTests: false,
      userData: new UserData({ username: '' }),
      testResults: new TestResults([]),
      currChallenge: new Challenge(Challenges.challenges[0])
    };
  }

  let nextState = Object.assign({}, state);

  switch (action.type) {
    case TESTS_STARTED: {
      nextState.isRunningTests = true;
      break;
    }
    case TESTS_FINISHED: {
      nextState.isRunningTests = false;
      nextState.testResults = new TestResults(action.testResults);
      break;
    }
    case CODE_CHANGED: {
      nextState.code = action.code;
      break;
    }
    case START_CHALLENGE: {
      nextState.code = state.currChallenge.getSeed();
      break;
    }
    default: console.log('Default reached.');
  }

  return nextState;
}
