//
// 'use strict';
//
// export const CHALLENGE_START = 'CHALLENGE_START';
// export const CHALLENGE_NEXT = 'CHALLENGE_NEXT';
// export const CHALLENGE_SOLVE = 'CHALLENGE_SOLVE';
// export const CODE_CHANGED = 'CODE_CHANGED';
//
// export function startChallenge (startTime) {
//   return {
//     type: CHALLENGE_START,
//     startTime
//   };
// }
//
// export function nextChallenge (startTime) {
//   return {
//     type: CHALLENGE_NEXT,
//     startTime
//   };
// }
//
// export function actionSolveChallenge () {
//   return {
//     type: CHALLENGE_SOLVE
//   };
// }
//
// export function onCodeChange (newCode) {
//   return {
//     type: CODE_CHANGED,
//     code: newCode
//   };
// }

/* Unit tests for file client/scripts/arcademode/actions/challenge.js. */
import { expect } from 'chai';

import {
  CHALLENGE_START,
  CHALLENGE_NEXT,
  CHALLENGE_SOLVE,
  CODE_CHANGED,
  startChallenge,
  nextChallenge,
  actionSolveChallenge,
  onCodeChange
} from '../../../../..//client/scripts/arcademode/actions/challenge';

describe('Actions: challenge', () => {
  it('should return correct challenge start type', () => {
    expect(startChallenge(0).type).to.equal(CHALLENGE_START);
  });

  it('should return correct next challenge type', () => {
    expect(nextChallenge(0).type).to.equal(CHALLENGE_NEXT);
  });

  it('should return correct solve challenge type', () => {
    const action = actionSolveChallenge();
    expect(action.type).to.equal(CHALLENGE_SOLVE);
  });

  it('should return correct type on code change', () => {
    const expectedCode = '123456';
    const action = onCodeChange(expectedCode);
    expect(action.type).to.equal(CODE_CHANGED);
    expect(action.code).to.equal(expectedCode);
  });
});

