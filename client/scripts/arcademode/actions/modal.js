
'use strict';

export const MODAL_CLOSE = 'MODAL_CLOSE'; // modal
export const MODAL_OPEN = 'MODAL_OPEN';

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
