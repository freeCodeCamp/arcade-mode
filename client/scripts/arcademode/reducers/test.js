
'use strict';

import Immutable from 'immutable';

import { OUTPUT_CHANGED, TESTS_STARTED, TESTS_FINISHED } from '../actions/test';
import { CHALLENGE_START, CHALLENGE_NEXT } from '../actions/challenge';
import { TIMER_FINISHED } from '../actions/timer';
import { MODAL_OPEN } from '../actions/modal';

const initialState = Immutable.Map({
  userOutput: 'The output of your code will show up here.',
  isRunningTests: false,
  testResults: Immutable.List()
});

export default function test (state = initialState, action) {
  switch (action.type) {
    case CHALLENGE_START:
      return state
        .set('testResults', Immutable.List())
        .set('isRunningTests', false);
    case CHALLENGE_NEXT:
      return state
        .set('userOutput', 'The output of your code will show up here.')
        .set('testResults', Immutable.List());

    // Nothing seems to call TIMER_FINISHED...
    case TIMER_FINISHED:
      return state.set('testResults', Immutable.List(action.testResults));
    case OUTPUT_CHANGED:
      return state.set('userOutput', action.userOutput);
    case TESTS_STARTED:
      return state.set('isRunningTests', true);
    case TESTS_FINISHED:
      return state
        .set('isRunningTests', false)
        .set('testResults', Immutable.List(action.testResults));
    case MODAL_OPEN:
      return initialState;
    default:
      return state;
  }
}
