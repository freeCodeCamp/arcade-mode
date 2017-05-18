
'use strict';

export const PLAYER_PASSED = 'PLAYER_PASSED';

export function onClickPass () {
  return {
    type: PLAYER_PASSED
  };
}
