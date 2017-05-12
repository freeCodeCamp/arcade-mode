
'use strict';

import { combineReducers } from 'redux';

import arcadeReducer from './ArcadeReducer';
import modal from './modal';
import challenge from './challenge';

export default combineReducers({
  arcadeReducer,
  modal,
  challenge
});
