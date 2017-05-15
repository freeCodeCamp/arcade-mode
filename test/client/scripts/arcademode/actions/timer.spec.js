//
// 'use strict';
//
// export const STOP_TIMER = 'STOP_TIMER';
// export const TIMER_STARTED = 'TIMER_STARTED';
// export const TIMER_UPDATED = 'TIMER_UPDATED';
// export const TIMER_FINISHED = 'TIMER_FINISHED';
// export const TIMER_MAX_VALUE_CHANGED = 'TIMER_MAX_VALUE_CHANGED';
//
//
// let timer = null;
//
// /* Thunk action to start the timer. */
// export function startTimer (timerMaxValue) {
//   return dispatch => {
//     clearInterval(timer);
//
//     const timeStart = new Date().getTime();
//     const timerMaxValueInt = parseInt(timerMaxValue, 10);
//     dispatch(actionTimerStarted(timeStart));
//
//     timer = setInterval(() => {
//       const timeNow = new Date().getTime();
//       dispatch(actionTimerUpdated(timeNow));
//       const timeElapsed = timeNow - timeStart;
//       if (timeElapsed >= timerMaxValueInt) {
//         dispatch(stopTimer());
//       }
//     }, 1000 / 60);
//   };
// }
//
// export function stopTimer () {
//   clearInterval(timer);
//   return {
//     type: STOP_TIMER
//   };
// }
//
// export function actionTimerStarted (startTime) {
//   return {
//     type: TIMER_STARTED,
//     startTime
//   };
// }
//
// export function actionTimerUpdated (timeNow) {
//   return {
//     type: TIMER_UPDATED,
//     timeNow
//   };
// }
//
// export function actionTimerMaxValueChanged (timerMaxValue) {
//   return {
//     type: TIMER_MAX_VALUE_CHANGED,
//     timerMaxValue
//   };
// }

/* Unit tests for file client/scripts/arcademode/actions/timer.js. */
import { expect } from 'chai';

import {
  STOP_TIMER,
  TIMER_STARTED,
  TIMER_UPDATED,
  TIMER_FINISHED,
  TIMER_MAX_VALUE_CHANGED,
  startTimer,
  stopTimer,
  actionTimerStarted,
  actionTimerUpdated,
  actionTimerMaxValueChanged
} from '../../../../..//client/scripts/arcademode/actions/timer';

describe('Actions: timer', () => {
  it('should do return correct type and value for actionTimerMaxValueChanged()', () => {
    const action = actionTimerMaxValueChanged(1000);
    expect(action.type).to.equal(TIMER_MAX_VALUE_CHANGED);
    expect(action.timerMaxValue).to.equal(1000);
  });

  it('should return correct type and value for startTimer', () => {
    const action = startTimer(1000);
    //TODO 
  });
});

