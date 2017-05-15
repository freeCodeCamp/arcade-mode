
'use strict';

/* Unit tests for file client/scripts/arcademode/reducers/timer.js. */
import chai, { expect } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import reducer from '../../../../..//client/scripts/arcademode/reducers/timer';
import {
  stopTimer,
  actionTimerStarted,
  actionTimerUpdated,
  actionTimerMaxValueChanged
//  startTimer
} from '../../../../../client/scripts/arcademode/actions/timer';

// import { startChallenge } from '../../../../../client/scripts/arcademode/actions/challenge';

chai.use(chaiImmutable);

const timerDefaultValue = 60 * 1000;

describe('Reducer: timer', () => {
  /*
  it('should load max timer on CHALLENGE_START', () => {
    const startTime = 200;
    const state = Immutable.Map({
      timerMaxValueLoaded: timerDefaultValue
    });
    const nextState = reducer(state, startChallenge(startTime));
    expect(nextState).to.equal(Immutable.Map({
      timerMaxValueLoaded: startTime
    }));
  });
  */

  it('should stop timer on STOP_TIMER', () => {
    const state = Immutable.Map({
      isTimerFinished: false,
      timeLeft: timerDefaultValue
    });
    const nextState = reducer(state, stopTimer());
    expect(nextState).to.equal(Immutable.Map({
      isTimerFinished: true,
      timeLeft: 0
    }));
  });

  it('should start timer on TIMER_STARTED', () => {
    const state = Immutable.Map({
      isTimerFinished: true,
      timeLeft: 0,
      timerStart: 123
    });
    const startTime = 0;
    const nextState = reducer(state, actionTimerStarted(startTime));
    expect(nextState).to.equal(Immutable.Map({
      isTimerFinished: false,
      timeLeft: timerDefaultValue,
      timerStart: startTime
    }));
  });

  it('should update timer on TIMER_UPDATED', () => {
    const state = Immutable.Map({
      timerStart: 0,
      timerMaxValueLoaded: timerDefaultValue,
      timeLeft: timerDefaultValue
    });
    const timeNow = 40 * 1000;
    const nextState = reducer(state, actionTimerUpdated(timeNow));
    expect(nextState).to.equal(Immutable.Map({
      timerStart: 0,
      timerMaxValueLoaded: timerDefaultValue,
      timeLeft: parseInt(state.get('timerMaxValueLoaded'), 10) - (timeNow - state.get('timerStart'))
    }));
  });

  /*
  // currently no TIMER_FINISHED action; see STOP_TIMER?
  it('should finish timer on TIMER_FINISHED', () => {
    const state = Immutable.Map({
      isRunningTests: true
    });
    const nextState = reducer(state,
  });
  */

  it('should change max value when TIMER_MAX_VALUE_CHANGED', () => {
    const state = Immutable.Map({
      timerMaxValue: timerDefaultValue.toString()
    });
    const userEnteredMaxValue = 30 * 1000;
    const nextState = reducer(state, actionTimerMaxValueChanged(userEnteredMaxValue));
    expect(nextState).to.equal(Immutable.Map({
      timerMaxValue: 30000
    }));
  });
});

