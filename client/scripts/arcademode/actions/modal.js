
'use strict';

export const MODAL_RESTART = 'MODAL_RESTART';
export const MODAL_CLOSE = 'MODAL_CLOSE'; // modal
export const MODAL_OPEN = 'MODAL_OPEN'; // this resets everything, so every reducer.

// this resets all
export function onModalRestart () {
  return {
    type: MODAL_RESTART
  };
}

export function onModalClose () {
  return {
    type: MODAL_CLOSE
  };
}

export function onModalOpen () {
  return {
    type: MODAL_OPEN
  };
}
