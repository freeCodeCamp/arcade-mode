
'use strict';

export const STOP_TIMER = 'STOP_TIMER'; // timer
export const TIMER_STARTED = 'TIMER_STARTED'; // timer
export const TIMER_UPDATED = 'TIMER_UPDATED'; // timer
export const TIMER_FINISHED = 'TIMER_FINISHED'; // test, timer
export const TIMER_MAX_VALUE_CHANGED = 'TIMER_MAX_VALUE_CHANGED'; // timer


let timer = null;
let timeoutId = null;

/* Thunk action to start the timer. */
export function startTimer (timerMaxValue) {
  return dispatch => {
    cancelAnimationFrame(timer);

    const timeStart = new Date().getTime();
    const timerMaxValueInt = parseInt(timerMaxValue, 10);
    dispatch(actionTimerStarted(timeStart));

    timer = () => {
      timeoutId = setTimeout(() => {
        const timeNow = new Date().getTime();
        const timeElapsed = timeNow - timeStart;

        if (timeElapsed >= timerMaxValueInt) {
          cancelAnimationFrame(timer);
          return dispatch(actionTimerFinished());
        }

        dispatch(actionTimerUpdated(timeNow));
        requestAnimationFrame(timer);
      }, 1000);
    };
    requestAnimationFrame(timer);
  };
}

export function stopTimer (finishTime) {
  clearTimeout(timeoutId);
  return {
    type: STOP_TIMER,
    finishTime
  };
}

export function actionTimerStarted (startTime) {
  return {
    type: TIMER_STARTED,
    startTime
  };
}

export function actionTimerUpdated (timeNow) {
  return {
    type: TIMER_UPDATED,
    timeNow
  };
}

export function actionTimerMaxValueChanged (timerMaxValue) {
  return {
    type: TIMER_MAX_VALUE_CHANGED,
    timerMaxValue
  };
}

export function actionTimerFinished () {
  return {
    type: TIMER_FINISHED
  };
}
