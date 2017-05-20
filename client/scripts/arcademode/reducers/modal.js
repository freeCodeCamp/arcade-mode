
'use strict';

import Immutable from 'immutable';

import { MODAL_CLOSE, MODAL_OPEN } from '../actions/modal';

const initialState = Immutable.Map({
  modal: true // display initially
});

export default function modal(state = initialState, action) {
  switch (action.type) {
    case MODAL_CLOSE:
      return state.set('modal', false);
    case MODAL_OPEN:
      return state.set('modal', true);
    default:
      return state;
  }
}
