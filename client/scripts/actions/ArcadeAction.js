
'use strict';

const RUN_TEST = 'RUN_TEST';

/* Action for when the runTest is clicked. */
const runTest = () => ({
  testVar: 'test',
  type: 'RUN_TEST'
});

export { RUN_TEST, runTest };
