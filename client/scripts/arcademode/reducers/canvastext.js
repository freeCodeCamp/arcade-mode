
'use strict';

import Immutable from 'immutable';

import {
  CANVAS_UPDATE
} from '../actions/canvastext';

// nextState = reducer(state, action);

const initialState = Immutable.Map({
  hue: 0
});

export default function canvastext (state = initialState, action) {
  switch (action.type) {
    case CANVAS_UPDATE:
      return state.update('hue', hue => (action.hue > 360) ? 0 : action.hue + 1);
    default:
      return state;
  }
}
