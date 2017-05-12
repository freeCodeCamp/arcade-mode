
'use strict';

import {
  STOP_TIMER,
  TIMER_STARTED,
  TIMER_UPDATED,
  TIMER_FINISHED,
  TIMER_MAX_VALUE_CHANGED
} from '../actions/timer';

const timerDefaultValue = 60 * 1000;

const initialState = {
  isTimerFinished: false,
  timerMaxValue: timerDefaultValue,
  timerMaxValueLoaded: timerDefaultValue,
  timeLeft: timerDefaultValue,
  timerStart: 0
};

export default function timer (state = initialState, action) {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case STOP_TIMER:
      nextState.isTimerFinished = true;
      nextState.timeLeft = 0;
      break;
    case TIMER_STARTED:
      nextState.isTimerFinished = false;
      nextState.timeLeft = timerDefaultValue;
      nextState.timerStart = action.startTime;
      break;
    case TIMER_UPDATED:
      const timeNow = action.timeNow;
      nextState.timeLeft = parseInt(state.timerMaxValueLoaded, 10) - (timeNow - state.timerStart);
      break;
    case TIMER_FINISHED:
      nextState.isRunningTests = false;
      break;
    case TIMER_MAX_VALUE_CHANGED:
      nextState.timerMaxValue = action.timerMaxValue;
      break;
    default:
      return state;
  }

  return nextState;
}
