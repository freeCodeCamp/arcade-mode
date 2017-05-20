
'use strict';

import Immutable from 'immutable';

// import Interpreter from 'js-interpreter';

import { SESSION_FINISH } from '../actions/session';

import { CHALLENGE_START, CHALLENGE_NEXT } from '../actions/challenge';

import { TESTS_STARTED } from '../actions/test';

/* TODO: Returns score for completed challenge. */
const getScoreForChallenge = challenge => {
  return 100;
};

const initialState = Immutable.Map({
  // userData: Immutable.Map(),
  isSessionFinished: false,
  isSessionStarted: false,
  sessionScore: 0,
  totalAttempts: 0
});

export default function session (state = initialState, action) {
  switch (action.type) {
    case CHALLENGE_START:
      return state
        .set('isSessionFinished', false)
        .set('isSessionStarted', true);
    case CHALLENGE_NEXT:
      return state
        .update('sessionScore', sessionScore => sessionScore + getScoreForChallenge(state.currChallenge));
    case SESSION_FINISH:
      return state
        .set('isSessionFinished', true)
        .set('isSessionStarted', false);
    case TESTS_STARTED:
      return state.update('totalAttempts', totalAttempts => totalAttempts + 1);
    default:
      return state;
  }
}
