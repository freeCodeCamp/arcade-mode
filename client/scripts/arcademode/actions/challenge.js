
'use strict';

export const CHALLENGE_START = 'CHALLENGE_START'; // challenge, session, test, timer
export const CHALLENGE_NEXT = 'CHALLENGE_NEXT'; // challenge, session, test
export const CHALLENGE_SOLVE = 'CHALLENGE_SOLVE'; // challenge
export const CODE_CHANGED = 'CODE_CHANGED'; // challenge

export function startChallenge (startTime) {
  return {
    type: CHALLENGE_START,
    startTime
  };
}

export function nextChallenge (startTime) {
  return {
    type: CHALLENGE_NEXT,
    startTime
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
