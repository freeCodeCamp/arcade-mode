
'use strict';

export const GAME_MODE_CHANGE = 'GAME_MODE_CHANGE';
export const GAME_DIFFICULTY_CHANGE = 'GAME_DIFFICULTY_CHANGE';
export const GAME_EDITOR_CHANGE = 'GAME_EDITOR_CHANGE';

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
    difficulty: event.target.value
  };
}
