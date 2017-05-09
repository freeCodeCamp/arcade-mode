
'use strict';

export const RUN_TEST = 'RUN_TEST';

/* Action for when the runTest is clicked. */
export function runTest () {
  return {
    type: RUN_TEST,
    payload: 'test'
  };
}
