
'use strict';

export const SESSION_FINISH = 'SESSION_FINISH'; // session

export function actionFinishSession() {
  return {
    type: SESSION_FINISH
  };
}
