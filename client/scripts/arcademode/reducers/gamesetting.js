
'use strict';

import Immutable from 'immutable';

import {
  GAME_MODE_CHANGE,
  GAME_DIFFICULTY_CHANGE,
  GAME_EDITOR_CHANGE
} from '../actions/gamesetting';

const initialState = Immutable.Map({
  mode: 'Arcade',
  difficulty: 'Medium',
  editor: 'Normal' // normal arcade mode, whiteboard mode
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
