
'use strict';

export const CHALLENGE_START = 'CHALLENGE_START';
export const CHALLENGE_NEXT = 'CHALLENGE_NEXT';
export const CHALLENGE_SOLVE = 'CHALLENGE_SOLVE';
export const CODE_CHANGED = 'CODE_CHANGED';

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
