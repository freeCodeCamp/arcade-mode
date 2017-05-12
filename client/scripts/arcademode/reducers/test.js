
'use strict';

import { OUTPUT_CHANGED, TESTS_STARTED, TESTS_FINISHED } from '../actions/test';
import { CHALLENGE_NEXT } from '../actions/challenge';
import { TIMER_FINISHED } from '../actions/timer';
import TestResults from '../model/TestResults';

const initialState = {
  userOutput: 'The output of your code will show up here.',
  isRunningTests: false,
  testResults: new TestResults([])
};

export default function test (state = initialState, action) {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case CHALLENGE_NEXT:
      nextState.userOutput = 'The output of your code will show up here.';
      nextState.testResults = new TestResults([]);
      break;
    case TIMER_FINISHED:
      nextState.testResults = new TestResults(action.testResults);
      break;
    case OUTPUT_CHANGED:
      nextState.userOutput = action.userOutput;
      break;
    case TESTS_STARTED:
      nextState.isRunningTests = true;
      break;
    case TESTS_FINISHED:
      nextState.isRunningTests = false;
      nextState.testResults = new TestResults(action.testResults);
      break;
    default:
      return state;
  }

  return nextState;
}
