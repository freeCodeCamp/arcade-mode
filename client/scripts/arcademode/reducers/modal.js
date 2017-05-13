
'use strict';

import Immutable from 'immutable';

import { MODAL_CLOSE } from '../actions/modal';

const initialState = Immutable.Map({
  modal: true // display initially
});

export default function modal(state = initialState, action) {
  switch (action.type) {
    case MODAL_CLOSE:
      return state.set('modal', false);
    default:
      return state;
  }
}
