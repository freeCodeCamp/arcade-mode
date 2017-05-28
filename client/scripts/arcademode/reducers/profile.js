
'use strict';

import Immutable from 'immutable';

import {
  SHOW_PROFILE,
  HIDE_PROFILE,
  LOAD_USER_DATA,
  UPDATE_USER_DATA,
  DELETE_SESSION,
  TOGGLE_SESSION_VIEW,
  TOGGLE_CHALLENGE_VIEW
} from '../actions/profile';

import UserData from '../models/UserData';

const initialState = Immutable.Map({
  isProfileShown: false,
  userData: new UserData(),
  sessionExpandStatus: new Immutable.List([]) // One entry per session
});

/* Constructs the expandStatus object for the user data. */
export function createExpandStatus(userData) {
  const sessions = userData.get('sessions');
  const status = [];

  sessions.forEach((session, index) => {
    status.push({ expanded: false, challenges: [] });
    const challenges = session.get('challenges');
    challenges.forEach(() => {
      status[index].challenges.push(false);
    });
  });

  return Immutable.List(Immutable.fromJS(status));
}

export function updateChallengeExpandStatus(state, sessionId, challengeId) {
  const newValue = !state.get('sessionExpandStatus').get(sessionId).get('challenges').get(challengeId);
  return state.update('sessionExpandStatus', sessionExpandStatus =>
    sessionExpandStatus.update(sessionId, session =>
      session.update('challenges', challenges => challenges.set(challengeId, newValue))
    )
  );
}

export default function profile(state = initialState, action) {
  switch (action.type) {
    case HIDE_PROFILE:
      return state
        .set('isProfileShown', false);
    case SHOW_PROFILE:
      return state
        .set('isProfileShown', true);
    case LOAD_USER_DATA: {
      const newUserData = new UserData(action.userData);
      return state
        .set('userData', newUserData)
        .set('sessionExpandStatus', createExpandStatus(newUserData));
    }
    case UPDATE_USER_DATA: {
      const newUserData = state.get('userData').appendSession(action.session);
      return state
        .set('userData', newUserData)
        .set('sessionExpandStatus', createExpandStatus(newUserData));
    }
    case DELETE_SESSION: {
      const newUserData = state.get('userData').deleteSession(action.sessionId);
      return state
        .set('userData', newUserData)
        .set('sessionExpandStatus', createExpandStatus(newUserData));
    }
    case TOGGLE_SESSION_VIEW: // sId
      return state
        .update('sessionExpandStatus', sessionExpandStatus =>
          sessionExpandStatus.setIn([action.sessionId, 'expanded'],
            !sessionExpandStatus.get(action.sessionId).get('expanded')
          )
        );
    case TOGGLE_CHALLENGE_VIEW: // sId, cId, TODO
      return updateChallengeExpandStatus(state, action.sessionId, action.challengeId);
    default:
      return state;
  }
}
