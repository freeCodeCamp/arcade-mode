
'use strict';

import Immutable, { Map, List } from 'immutable';

import { SESSION_FINISH, SESSION_SAVE } from '../actions/session';

import { CHALLENGE_START, CHALLENGE_NEXT } from '../actions/challenge';

import { TESTS_STARTED } from '../actions/test';

import { PLAYER_SKIPPED } from '../actions/playerstatus';

import { MODAL_RESTART } from '../actions/modal';

import appConfig from '../../../../public/json/appconfig.json';

const getScoreForChallenge = currChallenge => {
  if (currChallenge.get('difficulty')) {
    return 100 * currChallenge.get('difficulty');
  }
  return 100;
};
const MULTIPLIER = appConfig.multiplier;

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
        .update('streakMultiplier', streakMultiplier => MULTIPLIER * streakMultiplier)
        .update('sessionScore', sessionScore =>
          Math.floor(sessionScore + (
            state.get('streakMultiplier') * getScoreForChallenge(action.currChallenge)))
        )
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
    case PLAYER_SKIPPED:
      return state.set('streakMultiplier', 1);
    case MODAL_RESTART:
      return initialState;
    default:
      return state;
  }
}
