
'use strict';

import Immutable from 'immutable';

import {
  STOP_TIMER,
  TIMER_STARTED,
  TIMER_UPDATED,
  TIMER_FINISHED,
  TIMER_MAX_VALUE_CHANGED
} from '../actions/timer';

const timerDefaultValue = 60 * 1000;

const initialState = Immutable.Map({
  isTimerFinished: false,
  timerMaxValue: timerDefaultValue.toString(),
  timerMaxValueLoaded: timerDefaultValue,
  timeLeft: timerDefaultValue,
  timerStart: 0
});

export default function timer (state = initialState, action) {
  switch (action.type) {
    case STOP_TIMER:
      return state
        .set('isTimerFinished', true)
        .set('timeLeft', 0);
    case TIMER_STARTED:
      return state
        .set('isTimerFinished', false)
        .set('timeLeft', timerDefaultValue)
        .set('timerStart', action.startTime);
    case TIMER_UPDATED:
      return state
        .set('timeLeft', parseInt(state.get('timerMaxValueLoaded'), 10) - (action.timeNow - state.get('timerStart')));
    case TIMER_FINISHED:
      return state.set('isRunningTests', false);
    case TIMER_MAX_VALUE_CHANGED:
      return state.set('timerMaxValue', action.timerMaxValue);
    default:
      return state;
  }
}
