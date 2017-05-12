
'use strict';

import Immutable from 'immutable';

import { OUTPUT_CHANGED, TESTS_STARTED, TESTS_FINISHED } from '../actions/test';
import { CHALLENGE_NEXT } from '../actions/challenge';
import { TIMER_FINISHED } from '../actions/timer';
// import TestResults from '../model/TestResults';

const initialState = Immutable.Map({
  userOutput: 'The output of your code will show up here.',
  isRunningTests: false,
  testResults: Immutable.List()
});

export default function test (state = initialState, action) {
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    case CHALLENGE_NEXT:
      // nextState.userOutput = 'The output of your code will show up here.';
      // nextState.testResults = new TestResults([]);
      return state
        .set('userOutput', 'The output of your code will show up here.')
        .set('testResults', Immutable.List());
    case TIMER_FINISHED:
      // nextState.testResults = new TestResults(action.testResults);
      return state.set('testResults', action.testResults);
    case OUTPUT_CHANGED:
      // nextState.userOutput = action.userOutput;
      return state.set('userOutput', action.userOutput);
    case TESTS_STARTED:
      // nextState.isRunningTests = true;
      return state.set('isRunningTests', true);
    case TESTS_FINISHED:
      // nextState.isRunningTests = false;
      // nextState.testResults = new TestResults(action.testResults);
      return state
        .set('isRunningTests', false)
        .set('testResults', action.testResults);
    default:
      return state;
  }
}
