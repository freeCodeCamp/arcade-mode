
'use strict';

import { MODAL_CLOSE } from '../actions/Modal';

// import Immutable from 'immutable';

const initialState = {
  modal: true // display initially
};

export default function modal(state = initialState, action) {
  const nextState = Object.assign({}, state);

  switch (action.type) {
    case MODAL_CLOSE:
      nextState.modal = false;
      break;
    default:
      return state;
  }

  return nextState;
}
