
'use strict';

export const CHALLENGE_START = 'CHALLENGE_START'; // challenge, playerstatus, session, test, timer
export const CHALLENGE_NEXT = 'CHALLENGE_NEXT'; // challenge, playerstatus, session, test
export const CHALLENGE_SOLVE = 'CHALLENGE_SOLVE'; // challenge
export const CODE_CHANGED = 'CODE_CHANGED'; // challenge

export function startChallenge (startTime) {
  return {
    type: CHALLENGE_START,
    startTime
  };
}

export function nextChallenge (obj) {
  return {
    type: CHALLENGE_NEXT,
    startTime: obj.startTime,
    currChallenge: obj.currChallenge
  };
}

export function actionSolveChallenge () {
  return {
    type: CHALLENGE_SOLVE
  };
}

export function onCodeChange (newCode) {
  return {
    type: CODE_CHANGED,
    code: newCode
  };
}
