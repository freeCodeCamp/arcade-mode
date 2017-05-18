
'use strict';

import Immutable from 'immutable';

import {
  TESTS_STARTED
} from '../actions/test';

import {
  PLAYER_PASSED
} from '../actions/playerstatus';

const initialState = Immutable.Map({
  lives: 5,
  passOption: true
});

export default function playerstatus (state = initialState, action) {
  switch (action.type) {
    case TESTS_STARTED:
      return state.update('lives', lives => lives - 1);
    case PLAYER_PASSED:
      return state.set('passOption', false);
    default:
      return state;
  }
}
