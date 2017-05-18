
'use strict';

import Immutable from 'immutable';

import {
  TESTS_STARTED
} from '../actions/test';

import {
  GAME_DIFFICULTY_CHANGE
} from '../actions/gamesettings';

import {
  PLAYER_PASSED
} from '../actions/playerstatus';

const initialState = Immutable.Map({
  lives: 5,
  passOption: true
});

// currently difficulty settings pertain to lives and timeleft only,
// as challenges still need to be sorted by difficulty.
const difficultySettings = {
  Easy: { lives: 10 },
  Medium: { lives: 5 },
  Hard: { lives: 3 }
  // Random - for random, can randomly generate lives and time and hide until game start
};

export default function playerstatus (state = initialState, action) {
  switch (action.type) {
    case TESTS_STARTED:
      return state.update('lives', lives => lives - 1);
    case GAME_DIFFICULTY_CHANGE:
      return state.set('lives', difficultySettings[action.difficulty].lives);
    case PLAYER_PASSED:
      return state.set('passOption', false);
    default:
      return state;
  }
}
