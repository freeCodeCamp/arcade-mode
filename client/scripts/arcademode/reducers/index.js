
'use strict';

import { combineReducers } from 'redux-immutable';

import challenge from './challenge';
import gamesetting from './gamesetting';
import modal from './modal';
import playerstatus from './playerstatus';
import profile from './profile';
import session from './session';
import test from './test';
import timer from './timer';

export default combineReducers({
  challenge,
  gamesetting,
  modal,
  playerstatus,
  profile,
  session,
  test,
  timer
});
