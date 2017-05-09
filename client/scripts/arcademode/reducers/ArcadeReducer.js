
'use strict';

// import Immutable from 'immutable';

import { RUN_TEST } from '../actions/ArcadeAction';
import UserData from '../model/UserData';

// const initialState = Immutable.Map();

export default function arcadeReducer(state, action) {
  if (typeof state === 'undefined') {
    return {
      isRunningTests: false,
      userData: new UserData({ username: '' })
    };
  }

  const nextState = Object.assign({}, state);

  switch (action.type) {
    case RUN_TEST: {
      nextState.isRunningTests = true;
      break;
    }

    default: console.log('Default reached.');
  }

  return nextState;
}
