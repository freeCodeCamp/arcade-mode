
'use strict';

export const GAME_MODE_CHANGE = 'GAME_MODE_CHANGE'; // gamesetting
export const GAME_DIFFICULTY_CHANGE = 'GAME_DIFFICULTY_CHANGE'; // gamesetting, playerstatus, timer
export const GAME_EDITOR_CHANGE = 'GAME_EDITOR_CHANGE'; // gamesetting

export function onChangeMode (event) {
  return {
    type: GAME_MODE_CHANGE,
    mode: event.target.value
  };
}

export function onChangeDifficulty (event) {
  return {
    type: GAME_DIFFICULTY_CHANGE,
    difficulty: event.target.value
  };
}

export function onChangeEditor (event) {
  return {
    type: GAME_EDITOR_CHANGE,
    editor: event.target.value
  };
}
