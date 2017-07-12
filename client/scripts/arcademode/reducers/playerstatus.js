
'use strict';

import Immutable from 'immutable';

import {
  CHALLENGE_START,
  CHALLENGE_NEXT
} from '../actions/challenge';

import {
  TESTS_FAILED
} from '../actions/test';

import {
  GAME_DIFFICULTY_CHANGE
} from '../actions/gamesetting';

import {
  MODAL_RESTART
} from '../actions/modal';

import appConfig from '../../../../public/json/appconfig.json';

const difficultyOptions = appConfig.options.Difficulty.options;

const initialState = Immutable.Map({
  lives: difficultyOptions.Easy.lives,
  skipOption: appConfig.skip
});


// currently difficulty settings pertain to lives and timeleft only,
// as challenges still need to be sorted by difficulty.
const difficultySettings = {
  Easy: { lives: difficultyOptions.Easy.lives },
  Medium: { lives: difficultyOptions.Medium.lives },
  Hard: { lives: difficultyOptions.Hard.lives }
  // Random - for random, can randomly generate lives and time and hide until game start
};

export default function playerstatus (state = initialState, action) {
  switch (action.type) {
    case CHALLENGE_START:
      return state
        .set('lives', initialState.get('lives'))
        .set('skipOption', appConfig.skip);
    case CHALLENGE_NEXT:
      return state
        .set('skipOption', appConfig.skip); // refresh skipOption on each challenge solve
    case TESTS_FAILED: {
      if (appConfig.lives) {
        return state.update('lives', lives => lives - 1);
      }
      return state;
    }
    case GAME_DIFFICULTY_CHANGE:
      return state.set('lives', difficultySettings[action.difficulty].lives);
    // case PLAYER_PASSED:
    // return state.set('skipOption', false);
    case MODAL_RESTART:
      return initialState;
    default:
      return state;
  }
}
