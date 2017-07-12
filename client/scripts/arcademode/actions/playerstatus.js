
'use strict';

export const PLAYER_SKIPPED = 'PLAYER_SKIPPED'; // challenge, playerstatus

export function onClickSkip () {
  return {
    type: PLAYER_SKIPPED
  };
}
