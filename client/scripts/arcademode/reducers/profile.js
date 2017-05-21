
'use strict';

import Immutable from 'immutable';

import {
  SHOW_PROFILE,
  HIDE_PROFILE,
  LOAD_USER_DATA,
  UPDATE_USER_DATA,
  DELETE_SESSION
} from '../actions/profile';

import UserData from '../models/UserData';

const initialState = Immutable.Map({
  isProfileShown: false,
  userData: new UserData()
});

export default function profile(state = initialState, action) {
  switch (action.type) {
    case HIDE_PROFILE:
      return state
        .set('isProfileShown', false);
    case SHOW_PROFILE:
      return state
        .set('isProfileShown', true);
    case LOAD_USER_DATA:
      return state
        .set('userData', new UserData(action.userData));
    case UPDATE_USER_DATA:
      return state
        .update('userData', userData =>
          userData.appendSession(action.session)
        );
    case DELETE_SESSION:
      return state
        .update('userData', userData =>
          userData.deleteSession(action.sessionId)
        );
    default:
      return state;
  }
}
