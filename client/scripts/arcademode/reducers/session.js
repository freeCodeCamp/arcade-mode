
'use strict';

import Immutable from 'immutable';

// import Interpreter from 'js-interpreter';

import {
  FINISH_SESSION
} from '../actions/session';

import { CHALLENGE_START, CHALLENGE_NEXT } from '../actions/challenge';

// import UserData from '../model/UserData';

// const initialState = Immutable.Map();

/* TODO: Returns score for completed challenge. */
const getScoreForChallenge = challenge => {
  return 1;
};

const initialState = Immutable.Map({
  userOutput: 'The output of your code will show up here.',
  userData: Immutable.Map(),
  isSessionFinished: false,
  isSessionStarted: false,
  sessionScore: 0
});

export default function session (state = initialState, action) {
  /*
  if (typeof state === 'undefined') {
    return {
      // Challenges.challenges[0].challengeSeed.join('\n'),
      userOutput: 'The output of your code will show up here.',
      userData: new UserData({ username: '' }),

      // Session control variables
      isSessionFinished: false,
      isSessionStarted: false,
      sessionScore: 0
    };
  }

  const nextState = Object.assign({}, state);
  */
  switch (action.type) {
    case CHALLENGE_START:
      /*
      nextState.isSessionFinished = false;
      nextState.isSessionStarted = true;
      break;
      */
      return state
        .set('isSessionFinished', false)
        .set('isSessionStarted', true);
    case CHALLENGE_NEXT:
      /*
      nextState.sessionScore = state.sessionScore + getScoreForChallenge(state.currChallenge);
      nextState.userOutput = 'The output of your code will show up here.';
      break;
      */
      return state
        .update('sessionScore', sessionScore => sessionScore + getScoreForChallenge(state.currChallenge))
        .set('userOutput', 'The output of your code will show up here.');
    case FINISH_SESSION:
      /*
      nextState.isSessionFinished = true;
      nextState.isSessionStarted = false;
      break;
      */
      return state
        .set('isSessionFinished', true)
        .set('isSessionStarted', false);
    default:
      // console.log('ERROR. ArcadeReducer default reached.');
      return state;
  }

  // return nextState;
}
