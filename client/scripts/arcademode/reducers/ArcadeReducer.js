
'use strict';

// import Immutable from 'immutable';

// import Interpreter from 'js-interpreter';

import { TESTS_STARTED, CODE_CHANGED, START_CHALLENGE, TESTS_FINISHED, TIMER_STARTED, TIMER_UPDATED, STOP_TIMER } from '../actions/ArcadeAction';
import UserData from '../model/UserData';
import Challenges from '../../../json/challenges.json';
import TestResults from '../model/TestResults';
import Challenge from '../model/Challenge';

// const initialState = Immutable.Map();
//

const timerDefaultValue = 5 * 1000; // 15 minutes

export default function arcadeReducer(state, action) {
  if (typeof state === 'undefined') {
    return {
      code: Challenges.challenges[0].challengeSeed.join('\n'),
      interpreterError: false,
      isRunningTests: false,
      userData: new UserData({ username: '' }),
      testResults: new TestResults([]),
      currChallenge: new Challenge(Challenges.challenges[0]),

      // Timer handling
      isTimerFinished: false,
      timerMaxValue: timerDefaultValue,
      timeLeft: timerDefaultValue,
      timerStart: 0
    };
  }

  const nextState = Object.assign({}, state);

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
      nextState.code = state.currChallenge.getSeed().join('\n');
      nextState.isTimerFinished = false;
      break;
    }
    case TIMER_STARTED: {
      nextState.isTimerFinished = false;
      nextState.timeLeft = timerDefaultValue;
      nextState.timerStart = new Date().getTime();
      break;
    }
    case TIMER_UPDATED: {
      const timeNow = new Date().getTime();
      nextState.timeLeft = state.timerMaxValue - (timeNow - state.timerStart);
      break;
    }
    case STOP_TIMER: {
      nextState.isTimerFinished = true;
      nextState.timeLeft = 0;
      break;
    }
    default: console.log('ERROR. ArcadeReducer default reached.');
  }

  return nextState;
}
