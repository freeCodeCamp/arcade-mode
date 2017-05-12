
'use strict';

import { combineReducers } from 'redux-immutable';

import session from './session';
import challenge from './challenge';
import modal from './modal';
import test from './test';
import timer from './timer';

export default combineReducers({
  session,
  challenge,
  modal,
  test,
  timer
});
