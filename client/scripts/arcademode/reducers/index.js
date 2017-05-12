
'use strict';

import { combineReducers } from 'redux';

import arcadeReducer from './ArcadeReducer';
import modal from './Modal';

export default combineReducers({
  arcadeReducer,
  modal
});
