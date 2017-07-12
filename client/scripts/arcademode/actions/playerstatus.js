
'use strict';

export const PLAYER_PASSED = 'PLAYER_PASSED'; // challenge, playerstatus

export function onClickSkip () {
  return {
    type: PLAYER_PASSED
  };
}
