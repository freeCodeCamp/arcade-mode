
'use strict';

import { dispatch } from 'redux';
import { actionTimerFinished, actionTimerUpdated } from '../actions/ArcadeAction';

/* Timer for keeping track of the remaining challenge time. */
export default class Timer {

  constructor(timeMs) {
    this.timeLeft = timeMs;
    this.resolution = 1000 / 60;
    this.isRunning = false;
    this.intervalId = null;
  }

  /* Starts the timer. */
  start() {
    this.isRunning = true;
    this.startTime = new Date().getTime();
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        const currTime = new Date().getTime();
        this.timeLeft = currTime - this.startTime;
        this.prevTime = currTime;
        dispatch(actionTimerUpdated());
      }
      else {
        dispatch(actionTimerFinished());
      }
    }, this.resolution);
  }

  stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  getTimeLeft() {
    return this.timeLeft;
  }

  isFinished() {
    return this.timeLeft <= 0;
  }

}
