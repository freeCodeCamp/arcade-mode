
'use strict';

import Immutable from 'immutable';

import {
  GAME_MODE_CHANGE,
  GAME_DIFFICULTY_CHANGE,
  GAME_EDITOR_CHANGE
} from '../actions/gamesetting';

import appConfig from '../../../jsons/appconfig.json';

const initialState = Immutable.Map({
  mode: appConfig.options.Mode.default,
  difficulty: appConfig.options.Difficulty.default,
  editor: appConfig.options.Editor.default // normal arcade mode, whiteboard mode
  // challengeType: 'Algorithms'
});

export default function gamesetting(state = initialState, action) {
  switch (action.type) {
    case GAME_MODE_CHANGE:
      return state.set('mode', action.mode);
    case GAME_DIFFICULTY_CHANGE:
      return state.set('difficulty', action.difficulty);
    case GAME_EDITOR_CHANGE:
      return state.set('editor', action.editor);
      /*
    case GAME_CHALLENGE_TYPE_CHANGE:
      return state.set('challengeType', action.challengeType);
      */
    default:
      return state;
  }
}
