
'use strict';

// import Immutable from 'immutable';

// import Interpreter from 'js-interpreter';

import {
  TESTS_STARTED,
  OUTPUT_CHANGED,
  TESTS_FINISHED,
  TIMER_STARTED,
  TIMER_UPDATED,
  STOP_TIMER,
  FINISH_SESSION,
  TIMER_MAX_VALUE_CHANGED
} from '../actions/ArcadeAction';

import { CHALLENGE_START, CHALLENGE_NEXT } from '../actions/challenge';

import UserData from '../model/UserData';
import TestResults from '../model/TestResults';

// const initialState = Immutable.Map();

/* TODO: Returns score for completed challenge. */
const getScoreForChallenge = challenge => {
  return 1;
};

const timerDefaultValue = 60 * 1000;

export default function arcadeReducer(state, action) {
  if (typeof state === 'undefined') {
    return {
      code: `
        The code to work with will show up here.
        When you are ready, enter a time at the top and press start to begin!
      `,
      // Challenges.challenges[0].challengeSeed.join('\n'),
      userOutput: 'The output of your code will show up here.',
      isRunningTests: false,
      userData: new UserData({ username: '' }),
      testResults: new TestResults([]),

      // Timer handling
      isTimerFinished: false,
      timerMaxValue: timerDefaultValue,
      timerMaxValueLoaded: timerDefaultValue,
      timeLeft: timerDefaultValue,
      timerStart: 0,

      // Session control variables
      isSessionFinished: false,
      isSessionStarted: false,
      sessionScore: 0
    };
  }

  const nextState = Object.assign({}, state);

  switch (action.type) {
    case CHALLENGE_START:
      nextState.isSessionFinished = false;
      nextState.isSessionStarted = true;
      break;
    case CHALLENGE_NEXT:
      nextState.sessionScore = state.sessionScore + getScoreForChallenge(state.currChallenge);
      nextState.testResults = new TestResults([]);
      nextState.userOutput = 'The output of your code will show up here.';
      break;
    case TESTS_STARTED: {
      nextState.isRunningTests = true;
      break;
    }
    case TESTS_FINISHED: {
      nextState.isRunningTests = false;
      nextState.testResults = new TestResults(action.testResults);
      break;
    }
    case OUTPUT_CHANGED: {
      nextState.userOutput = action.userOutput;
      break;
    }
    case TIMER_MAX_VALUE_CHANGED: {
      nextState.timerMaxValue = action.timerMaxValue;
      break;
    }
    case TIMER_STARTED: {
      nextState.isTimerFinished = false;
      nextState.timeLeft = timerDefaultValue;
      nextState.timerStart = action.startTime;
      break;
    }
    case TIMER_UPDATED: {
      const timeNow = action.timeNow;
      nextState.timeLeft = parseInt(state.timerMaxValueLoaded, 10) - (timeNow - state.timerStart);
      break;
    }
    case STOP_TIMER: {
      nextState.isTimerFinished = true;
      nextState.timeLeft = 0;
      break;
    }
    case FINISH_SESSION: {
      nextState.isSessionFinished = true;
      nextState.isSessionStarted = false;
      break;
    }
    default:
      // console.log('ERROR. ArcadeReducer default reached.');
      return state;
  }

  return nextState;
}
