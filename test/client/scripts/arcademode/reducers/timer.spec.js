// 
// 'use strict';
// 
// import {
//   STOP_TIMER,
//   TIMER_STARTED,
//   TIMER_UPDATED,
//   TIMER_FINISHED,
//   TIMER_MAX_VALUE_CHANGED
// } from '../actions/timer';
// 
// const timerDefaultValue = 60 * 1000;
// 
// const initialState = {
//   isTimerFinished: false,
//   timerMaxValue: timerDefaultValue,
//   timerMaxValueLoaded: timerDefaultValue,
//   timeLeft: timerDefaultValue,
//   timerStart: 0
// };
// 
// export default function timer (state = initialState, action) {
//   const nextState = Object.assign({}, state);
// 
//   switch (action.type) {
//     case STOP_TIMER:
//       nextState.isTimerFinished = true;
//       nextState.timeLeft = 0;
//       break;
//     case TIMER_STARTED:
//       nextState.isTimerFinished = false;
//       nextState.timeLeft = timerDefaultValue;
//       nextState.timerStart = action.startTime;
//       break;
//     case TIMER_UPDATED:
//       const timeNow = action.timeNow;
//       nextState.timeLeft = parseInt(state.timerMaxValueLoaded, 10) - (timeNow - state.timerStart);
//       break;
//     case TIMER_FINISHED:
//       nextState.isRunningTests = false;
//       break;
//     case TIMER_MAX_VALUE_CHANGED:
//       nextState.timerMaxValue = action.timerMaxValue;
//       break;
//     default:
//       return state;
//   }
// 
//   return nextState;
// }

/* Unit tests for file client/scripts/arcademode/reducers/timer.js. */
import chai, { expect } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import reducer from '../../../../..//client/scripts/arcademode/reducers/timer';
import {
  stopTimer,
  actionTimerStarted,
  actionTimerUpdated,
  actionTimerMaxValueChanged,
  startTimer
} from '../../../../../client/scripts/arcademode/actions/timer';
// import { actionFinishSession } from '../../../../../client/scripts/arcademode/actions/session';

chai.use(chaiImmutable);

const timerDefaultValue = 60 * 1000;

describe('timer reducer', () => {
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

