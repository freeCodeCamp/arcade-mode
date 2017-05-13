
'use strict';

/* Unit tests for file client/scripts/arcademode/reducers/test.js. */
import chai, { expect } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import reducer from '../../../../..//client/scripts/arcademode/reducers/test';
import {
  onOutputChange,
  actionTestsStarted,
  actionTestsFinished
} from '../../../../../client/scripts/arcademode/actions/test';
import { nextChallenge } from '../../../../../client/scripts/arcademode/actions/challenge';

chai.use(chaiImmutable);

describe('test reducer', () => {
  it('should clear test results and reset output on CHALLENGE_NEXT', () => {
    const state = Immutable.Map({
      userOutput: 'Sample user output',
      testResults: Immutable.List(Immutable.fromJS([
        { error: null, pass: true, output: '' },
        { error: 'sample error', pass: false, output: 'sample error' }
      ]))
    });
    const startTime = 0;
    const nextState = reducer(state, nextChallenge(startTime));
    expect(nextState).to.equal(Immutable.Map({
      userOutput: 'The output of your code will show up here.',
      testResults: Immutable.List()
    }));
  });

  // it('should -- TIMER_FINISHED?)

  it('should show new user code output on OUTPUT_CHANGED', () => {
    const state = Immutable.Map({
      userOutput: 'Sample user output'
    });
    const newOutput = 'Success!';
    const nextState = reducer(state, onOutputChange(newOutput));
    expect(nextState).to.equal(Immutable.Map({
      userOutput: 'Success!'
    }));
  });

  it('should start tests on TESTS_STARTED', () => {
    const state = Immutable.Map({
      isRunningTests: false
    });
    const nextState = reducer(state, actionTestsStarted());
    expect(nextState).to.equal(Immutable.Map({
      isRunningTests: true
    }));
  });

  it('should finish tests on TESTS_FINISHED', () => {
    const state = Immutable.Map({
      isRunningTests: true,
      testResults: Immutable.List()
    });
    const testResults = Immutable.List(Immutable.fromJS([
      { error: null, pass: true, output: '' },
      { error: 'sample error', pass: false, output: 'sample error' }
    ]));
    const nextState = reducer(state, actionTestsFinished(testResults));
    expect(nextState).to.deep.equal(Immutable.Map({
      isRunningTests: false,
      testResults: Immutable.List(Immutable.fromJS([
        { error: null, pass: true, output: '' },
        { error: 'sample error', pass: false, output: 'sample error' }
      ]))
    }));
  });
});

