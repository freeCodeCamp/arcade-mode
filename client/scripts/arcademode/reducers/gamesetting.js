
'use strict';

import Immutable from 'immutable';

import {
  GAME_MODE_CHANGE,
  GAME_DIFFICULTY_CHANGE,
  GAME_EDITOR_CHANGE
} from '../actions/gamesetting';

import appConfig from '../../../../public/json/appconfig.json';

const initialState = Immutable.Map({
  mode: appConfig.options.Mode.default,
  difficulty: appConfig.options.Difficulty.default,
  editor: appConfig.options.Editor.default, // normal arcade mode, whiteboard mode
  appConfig: Immutable.Map(Immutable.fromJS(appConfig))
});

export default function gamesetting(state = initialState, action) {
  switch (action.type) {
    case GAME_MODE_CHANGE:
      return state.set('mode', action.mode);
    case GAME_DIFFICULTY_CHANGE:
      return state.set('difficulty', action.difficulty);
    case GAME_EDITOR_CHANGE:
      return state.set('editor', action.editor);
    default:
      return state;
  }
}
