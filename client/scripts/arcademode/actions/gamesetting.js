
'use strict';

export const GAME_MODE_CHANGE = 'GAME_MODE_CHANGE'; // gamesetting
export const GAME_DIFFICULTY_CHANGE = 'GAME_DIFFICULTY_CHANGE'; // gamesetting, playerstatus, timer
export const GAME_EDITOR_CHANGE = 'GAME_EDITOR_CHANGE'; // gamesetting
export const GAME_CHALLENGE_TYPE_CHANGE = 'GAME_CHALLENGE_TYPE_CHANGE'; // challenge

export function onChangeMode (event) {
  if (!event.target.value) {
    console.error('onChangeMode: No value in event.target!');
  }
  return {
    type: GAME_MODE_CHANGE,
    mode: event.target.value
  };
}

export function onChangeDifficulty (event) {
  if (!event.target.value) {
    console.error('onChangeDifficulty: No value in event.target!');
  }
  return {
    type: GAME_DIFFICULTY_CHANGE,
    difficulty: event.target.value
  };
}

export function onChangeEditor (event) {
  if (!event.target.value) {
    console.error('onChangeEditor: No value in event.target!');
  }
  return {
    type: GAME_EDITOR_CHANGE,
    editor: event.target.value
  };
}

export function onChangeChallengeType (event) {
  if (!event.target.value) {
    console.error('onChallengeType: No value in event.target!');
  }
  return {
    type: GAME_CHALLENGE_TYPE_CHANGE,
    challengeType: event.target.value
  };
}
