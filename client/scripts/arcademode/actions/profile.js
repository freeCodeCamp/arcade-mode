
'use strict';

import Persist from '../persistdata';

export const SHOW_PROFILE = 'SHOW_PROFILE';
export const HIDE_PROFILE = 'HIDE_PROFILE';
export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const DELETE_SESSION = 'DELETE_SESSION';
export const TOGGLE_CHALLENGE_VIEW = 'TOGGLE_CHALLENGE_VIEW';
export const TOGGLE_SESSION_VIEW = 'TOGGLE_SESSION_VIEW';

const persist = new Persist(window.indexedDB);

export function saveUserData(session) {
  return dispatch => {
    // Persist data changes
    persist.toStorage(session).then(() => {
      dispatch(actionUpdateUserData(session)); // Update reducer data
    });
  };
}

export function loadUserData() {
  return dispatch => {
    persist.fromStorage().then(userData => {
      console.log(`The userData: ${Object.keys(userData)}`);
      dispatch(actionLoadUserData(userData));
    });
    /*
    const userData = persist.fromStorage();
    dispatch(actionLoadUserData(userData)); // Update reducer data
    */
  };
}

export function deleteSession(session) {
  return dispatch => {
    persist.deleteFromStorage(session).then(() => {
      dispatch(actionDeleteSession(session.get('id')));
    });
  };
}

export function actionShowProfile() {
  return {
    type: SHOW_PROFILE
  };
}

export function actionHideProfile() {
  return {
    type: HIDE_PROFILE
  };
}

export function actionLoadUserData(userData) {
  return {
    type: LOAD_USER_DATA,
    userData
  };
}

export function actionUpdateUserData(session) {
  return {
    type: UPDATE_USER_DATA,
    session
  };
}

export function actionDeleteSession(sessionId) {
  return {
    type: DELETE_SESSION,
    sessionId
  };
}

export function toggleSessionView(sessionId) {
  return {
    type: TOGGLE_SESSION_VIEW,
    sessionId
  };
}

export function toggleChallengeView(sessionId, challengeId) {
  return {
    type: TOGGLE_CHALLENGE_VIEW,
    sessionId,
    challengeId
  };
}
