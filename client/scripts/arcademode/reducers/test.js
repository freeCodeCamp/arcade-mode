
'use strict';

import Immutable from 'immutable';

import {
  OUTPUT_CHANGED,
  TESTS_STARTED,
  TESTS_FINISHED,
  BENCHMARK_STARTED,
  BENCHMARK_FINISHED
} from '../actions/test';
import { CHALLENGE_START, CHALLENGE_NEXT } from '../actions/challenge';
import { PLAYER_SKIPPED } from '../actions/playerstatus';
import { TIMER_FINISHED } from '../actions/timer';
import { MODAL_RESTART } from '../actions/modal';

const initialState = Immutable.Map({
  userOutput: 'The output of your code will show up here.',
  isRunningTests: false,
  isRunningBenchmark: false,
  testResults: Immutable.List(),
  benchmarkResults: Immutable.Map()
});

export default function test (state = initialState, action) {
  switch (action.type) {
    case PLAYER_SKIPPED:
      return state
        .set('testResults', Immutable.List())
        .set('benchmarkResults', Immutable.Map());
    case CHALLENGE_START:
      return state
        .set('testResults', Immutable.List())
        .set('benchmarkResults', Immutable.Map())
        .set('isRunningTests', false)
        .set('isRunningBenchmark', false);
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
    case BENCHMARK_STARTED:
      return state.set('isRunningBenchmark', true);
    case BENCHMARK_FINISHED:
      return state
        .set('isRunningBenchmark', false)
        .set('benchmarkResults', Immutable.Map(action.benchmarkResults));
    case MODAL_RESTART:
      return initialState;
    default:
      return state;
  }
}
