
'use strict';

import Immutable, { Map, List } from 'immutable';

// import Interpreter from 'js-interpreter';

import { SESSION_FINISH, SESSION_SAVE } from '../actions/session';

import { CHALLENGE_START, CHALLENGE_NEXT } from '../actions/challenge';

import { TESTS_STARTED } from '../actions/test';

import { PLAYER_PASSED } from '../actions/playerstatus';

import { MODAL_OPEN } from '../actions/modal';

/* TODO: Returns score for completed challenge. */
const getScoreForChallenge = () => 100;

const initialState = Immutable.Map({
  isSessionFinished: false,
  isSessionStarted: false,
  isSessionSaved: false,
  sessionScore: 0,
  challengesCompleted: 0,
  totalAttempts: 0,
  streakMultiplier: 1,
  currSession: Map({
    challenges: List(),
    score: 0,
    time: 0,
    startTime: 0,
    endTime: 0
  })
});

export default function session (state = initialState, action) {
  switch (action.type) {
    case CHALLENGE_START:
      return state
        .set('isSessionFinished', false)
        .set('isSessionStarted', true)
        .set('isSessionSaved', false)
        .setIn(['currSession', 'startTime'], action.startTime);
    case CHALLENGE_NEXT:
      return state
        .update('challengesCompleted', challengesCompleted => challengesCompleted + 1)
        .update('streakMultiplier', streakMultiplier => 1.25 * streakMultiplier)
        .update('sessionScore', sessionScore => Math.floor(sessionScore + state.get('streakMultiplier') * getScoreForChallenge()))
        .update('currSession', currSession =>
          currSession.set('challenges',
            currSession.get('challenges').push(action.currChallenge.set('endTime', action.startTime))
          )
        );
    case SESSION_SAVE:
      return state
        .set('isSessionSaved', true);
    case SESSION_FINISH:
      return state
        .set('isSessionFinished', true)
        .set('isSessionStarted', false)
        .setIn(['currSession', 'score'], state.get('sessionScore'))
        .setIn(['currSession', 'endTime'], action.endTime);
    case TESTS_STARTED:
      return state.update('totalAttempts', totalAttempts => totalAttempts + 1);
    case PLAYER_PASSED:
      return state.set('streakMultiplier', 1);
    case MODAL_OPEN:
      return initialState;
    default:
      return state;
  }
}
