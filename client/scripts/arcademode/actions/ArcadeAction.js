
'use strict';

export const RUN_TEST = 'RUN_TEST';
export const CODE_CHANGED = 'CODE_CHANGED';

/* Action for when the runTest is clicked. */
export function runTest() {
  return {
    type: RUN_TEST,
    payload: 'test'
  };
}

export function onCodeChange(newCode) {
  return {
    type: CODE_CHANGED,
    code: newCode
  };
}

