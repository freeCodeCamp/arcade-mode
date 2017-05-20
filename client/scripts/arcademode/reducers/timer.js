
'use strict';

import Immutable from 'immutable';

import {
  STOP_TIMER,
  TIMER_STARTED,
  TIMER_UPDATED,
  TIMER_FINISHED,
  TIMER_MAX_VALUE_CHANGED
} from '../actions/timer';

import { CHALLENGE_START } from '../actions/challenge';

import { GAME_DIFFICULTY_CHANGE } from '../actions/gamesetting';

const timerDefaultValue = 60 * 1000;

const initialState = Immutable.Map({
  isTimerFinished: false,
  timerMaxValue: `${timerDefaultValue}`,
  timerMaxValueLoaded: timerDefaultValue,
  timeLeft: '01:00', // timerDefaultValue
  timerStart: 0
});

const printTime = timeInMilliseconds => {
  const seconds = Math.floor(timeInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  if (minutes >= 10) {
    return `${minutes}:${seconds}`;
  }
  return `0${minutes}:${seconds}`;
};

const difficultySettings = {
  Easy: { time: '15:00' }, // 15 * 60 * 1000
  Medium: { time: '10:00' }, // 10 * 60 * 1000
  Hard: { time: '5:00' } // 5 * 60 * 1000
  // Random - for random, can randomly generate lives and time and hide until game start
};

export default function timer (state = initialState, action) {
  switch (action.type) {
    case CHALLENGE_START:
      return state.set('timerMaxValueLoaded', state.get('timerMaxValue'));
    case GAME_DIFFICULTY_CHANGE:
      return state
        .set('timeLeft', difficultySettings[action.difficulty].time) // display
        .set('timerMaxValue', difficultySettings[action.difficulty].time); // actual number
    case STOP_TIMER:
      return state
        .set('isTimerFinished', true)
        .set('timeLeft', '00:00');
    case TIMER_STARTED:
      return state
        .set('isTimerFinished', false)
        .set('timeLeft', '01:00') // timerDefaultValue
        .set('timerStart', action.startTime);
    case TIMER_UPDATED:
      return state
        .set('timeLeft', printTime(parseInt(state.get('timerMaxValueLoaded'), 10) - (action.timeNow - state.get('timerStart'))));
    case TIMER_FINISHED:
      return state.set('isRunningTests', false);
    case TIMER_MAX_VALUE_CHANGED:
      return state.set('timerMaxValue', action.timerMaxValue);
    default:
      return state;
  }
}
