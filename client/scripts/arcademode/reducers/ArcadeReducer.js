
'use strict';

// import Immutable from 'immutable';

// import Interpreter from 'js-interpreter';

import {
  TESTS_STARTED,
  OUTPUT_CHANGED,
  TESTS_FINISHED,
  FINISH_SESSION,
} from '../actions/ArcadeAction';

import { CHALLENGE_START, CHALLENGE_NEXT } from '../actions/challenge';

import { TIMER_FINISHED } from '../actions/timer';

import UserData from '../model/UserData';
import TestResults from '../model/TestResults';

// const initialState = Immutable.Map();

/* TODO: Returns score for completed challenge. */
const getScoreForChallenge = challenge => {
  return 1;
};

export default function arcadeReducer(state, action) {
  if (typeof state === 'undefined') {
    return {
      // Challenges.challenges[0].challengeSeed.join('\n'),
      userOutput: 'The output of your code will show up here.',
      isRunningTests: false,
      userData: new UserData({ username: '' }),
      testResults: new TestResults([]),

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
    case TIMER_FINISHED:
      nextState.testResults = new TestResults(action.testResults);
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
