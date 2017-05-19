
'use strict';

import { combineReducers } from 'redux-immutable';

import challenge from './challenge';
import gamesetting from './gamesetting';
import modal from './modal';
import playerstatus from './playerstatus';
import session from './session';
import test from './test';
import timer from './timer';

export default combineReducers({
  challenge,
  gamesetting,
  modal,
  playerstatus,
  session,
  test,
  timer
});
