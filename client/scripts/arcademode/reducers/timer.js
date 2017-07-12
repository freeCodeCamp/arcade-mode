
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
import { MODAL_RESTART } from '../actions/modal';

import appConfig from '../../../../public/json/appconfig.json';

const timerDefaultValue = toMs(appConfig.timer.default);

const initialState = Immutable.Map({
  isTimerFinished: true,
  timerMaxValue: timerDefaultValue,
  timerMaxValueLoaded: timerDefaultValue,
  timeLeft: '10:00',
  timerStart: 0,
  timeUsed: '00:00'
});

export function printTime (timeInMilliseconds) {
  const timeInSeconds = Math.ceil(timeInMilliseconds / 1000);
  const seconds = timeInSeconds % 60;
  const minutes = Math.floor(timeInSeconds / 60);

  const mm = (minutes >= 10) ? `${minutes}` : `0${minutes}`;
  const ss = (seconds >= 10) ? `${seconds}` : `0${seconds}`;

  return `${mm}:${ss}`;
}

export function toMs(mmss) {
  if (/\d{2}:\d{2}/.test(mmss)) {
    const minSec = mmss.split(':');
    const mins = parseInt(minSec[0], 10);
    const sec = parseInt(minSec[1], 10);
    return ((mins * 60) + sec) * 1000;
  }
  throw new Error(`Incorrect time format: ${mmss}, use mm:ss`);
}

const difficultyOptions = appConfig.options.Difficulty.options;
const difficultySettings = {
  Easy: {
    displayTime: difficultyOptions.Easy.time,
    time: toMs(difficultyOptions.Easy.time)
  },
  Medium: {
    displayTime: difficultyOptions.Medium.time,
    time: toMs(difficultyOptions.Medium.time)
  },
  Hard: {
    displayTime: difficultyOptions.Hard.time,
    time: toMs(difficultyOptions.Hard.time)
  }
  // Random - for random, can randomly generate lives and time and hide until game start
};

let lastDifficultyTime = '10:00';

export default function timer (state = initialState, action) {
  switch (action.type) {
    case CHALLENGE_START:
      return state.set('timerMaxValueLoaded', state.get('timerMaxValue'));
    case GAME_DIFFICULTY_CHANGE:
      lastDifficultyTime = difficultySettings[action.difficulty].displayTime;
      return state
        .set('timeLeft', difficultySettings[action.difficulty].displayTime) // display
        .set('timerMaxValue', difficultySettings[action.difficulty].time); // actual number
    case STOP_TIMER: // essentially session finish
      return state
        .set('timeUsed', printTime(action.finishTime - state.get('timerStart')))
        .set('isTimerFinished', true)
        .set('timeLeft', '00:00');
    case TIMER_STARTED:
      return state
        .set('isTimerFinished', false)
        // .set('timeLeft', printTime(state.get('timerMaxValue'))) // timerDefaultValue
        .set('timerStart', action.startTime);
    case TIMER_UPDATED:
      return state
        .set('timeUsed', printTime(action.timeNow - state.get('timerStart')))
        .set('timeLeft', printTime(state.get('timerMaxValue') - (action.timeNow - state.get('timerStart'))));
    case TIMER_FINISHED:
      return state
        .set('isTimerFinished', true)
        .set('timeLeft', '00:00');
    case TIMER_MAX_VALUE_CHANGED:
      return state.set('timerMaxValue', action.timerMaxValue);
    case MODAL_RESTART:
      return initialState
        .set('timeLeft', lastDifficultyTime)
        .set('timerMaxValue', state.get('timerMaxValue'));
    default:
      return state;
  }
}
