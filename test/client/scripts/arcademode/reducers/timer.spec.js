
'use strict';

/* Unit tests for file client/scripts/arcademode/reducers/timer.js. */
import chai, { expect } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import reducer, { printTime } from '../../../../..//client/scripts/arcademode/reducers/timer';
import {
  stopTimer,
  actionTimerStarted,
  actionTimerUpdated,
  actionTimerMaxValueChanged,
  actionTimerFinished
//  startTimer
} from '../../../../../client/scripts/arcademode/actions/timer';

import { startChallenge } from '../../../../../client/scripts/arcademode/actions/challenge';

chai.use(chaiImmutable);

const timerDefaultValue = 60 * 1000;

describe('Reducer: timer', () => {
  it('should load max timer on CHALLENGE_START', () => {
    const state = Immutable.Map({
      timerMaxValue: 3000,
      timerMaxValueLoaded: timerDefaultValue
    });
    const nextState = reducer(state, startChallenge(new Date().getTime()));
    expect(nextState).to.equal(Immutable.Map({
      timerMaxValue: 3000,
      timerMaxValueLoaded: 3000
    }));
  });

  it('should stop timer on STOP_TIMER', () => {
    const state = Immutable.Map({
      isTimerFinished: false,
      timeLeft: timerDefaultValue
    });
    const nextState = reducer(state, stopTimer());
    expect(nextState).to.equal(Immutable.Map({
      isTimerFinished: true,
      timeLeft: '00:00'
    }));
  });

  it('should start timer on TIMER_STARTED', () => {
    const state = Immutable.Map({
      isTimerFinished: true,
      // timeLeft: 0,
      timerStart: 123
    });
    const startTime = 0;
    const nextState = reducer(state, actionTimerStarted(startTime));
    expect(nextState).to.equal(Immutable.Map({
      isTimerFinished: false,
      // timeLeft: timerDefaultValue,
      timerStart: startTime
    }));
  });

  it('should update timer on TIMER_UPDATED', () => {
    const state = Immutable.Map({
      timerStart: 0,
      timerMaxValue: timerDefaultValue,
      timeLeft: '01:00',
      timeUsed: '00:00'
    });
    const timeNow = 40 * 1000;
    const nextState = reducer(state, actionTimerUpdated(timeNow));
    expect(nextState).to.equal(Immutable.Map({
      timerStart: 0,
      timerMaxValue: timerDefaultValue,
      timeLeft: printTime(state.get('timerMaxValue') - (timeNow - state.get('timerStart'))),
      timeUsed: printTime(timeNow - state.get('timerStart'))
    }));
  });

  // no TIMER_FINISHED action; see STOP_TIMER? 5/14/17 add a contrived action for test
  it('should finish timer on TIMER_FINISHED?', () => {
    const state = Immutable.Map({
      isTimerFinished: false,
      timeLeft: '01:00'
    });
    const nextState = reducer(state, actionTimerFinished());
    expect(nextState).to.equal(Immutable.Map({
      isTimerFinished: true,
      timeLeft: '00:00'
    }));
  });

  it('should change max value when TIMER_MAX_VALUE_CHANGED', () => {
    const state = Immutable.Map({
      timerMaxValue: timerDefaultValue
    });
    const userEnteredMaxValue = 30 * 1000;
    const nextState = reducer(state, actionTimerMaxValueChanged(userEnteredMaxValue));
    expect(nextState).to.equal(Immutable.Map({
      timerMaxValue: 30000
    }));
  });
});

