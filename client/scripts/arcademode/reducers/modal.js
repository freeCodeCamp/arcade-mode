
'use strict';

import Immutable from 'immutable';

import { MODAL_CLOSE } from '../actions/modal';

const initialState = {
  modalOpened: true // display initially
};

export default function modal(state = initialState, action) {
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    case MODAL_CLOSE:
      /*
      nextState.modal = false;
      break;
      */
      // return state.set('modal', false);
      return { modalOpened: false };
    default:
      return state;
  }

  // return nextState;
}
