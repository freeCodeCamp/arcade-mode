
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

import { GAME_DIFFICULTY_CHANGE } from '../actions/gamesettings';

const timerDefaultValue = 60 * 1000;

const initialState = Immutable.Map({
  isTimerFinished: false,
  timerMaxValue: `${timerDefaultValue}`,
  timerMaxValueLoaded: timerDefaultValue,
  timeLeft: timerDefaultValue,
  timerStart: 0
});

const difficultySettings = {
  Easy: { time: 15 * 60 * 1000 },
  Medium: { time: 10 * 60 * 1000 },
  Hard: { time: 5 * 60 * 1000 }
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
