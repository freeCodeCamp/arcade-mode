
export const SHOW_PROFILE = 'SHOW_PROFILE';
export const HIDE_PROFILE = 'HIDE_PROFILE';
export const LOAD_USER_DATA = 'LOAD_USER_DATA';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';

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
