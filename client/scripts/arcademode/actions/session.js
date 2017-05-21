
'use strict';

export const SESSION_FINISH = 'SESSION_FINISH'; // session
export const SESSION_SAVE = 'SESSION_SAVE'; // session

export function actionSaveSession() {
  return {
    type: SESSION_SAVE
  };
}

export function actionFinishSession() {
  return {
    type: SESSION_FINISH
  };
}
