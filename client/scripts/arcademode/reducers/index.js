
'use strict';

import { combineReducers } from 'redux';

import arcadeReducer from './ArcadeReducer';
import challenge from './challenge';
import modal from './modal';
import test from './test';
import timer from './timer';

export default combineReducers({
  arcadeReducer,
  challenge,
  modal,
  test,
  timer
});
