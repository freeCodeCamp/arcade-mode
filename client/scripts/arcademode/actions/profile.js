
'use strict';

import Persist from '../persistdata';

export const SHOW_PROFILE = 'SHOW_PROFILE';
export const HIDE_PROFILE = 'HIDE_PROFILE';
export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const DELETE_SESSION = 'DELETE_SESSION';

const persist = new Persist(window.localStorage);

export function saveUserData(session) {
  return dispatch => {
    // Persist data changes
    persist.toStorage(session);
    dispatch(actionUpdateUserData(session)); // Update reducer data
  };
}

export function loadUserData() {
  return dispatch => {
    const userData = persist.fromStorage();
    dispatch(actionLoadUserData(userData)); // Update reducer data
  };
}

export function deleteSession(session) {
  return dispatch => {
    persist.deleteFromStorage(session);
    dispatch(actionDeleteSession(session.get('id')));
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
