
'use strict';

import { connect } from 'react-redux';

import ArcadeMode from '../components/ArcadeMode';

import {
  startChallenge,
  nextChallenge,
  actionSolveChallenge,
  onCodeChange
} from '../actions/challenge';

import {
  onChangeMode,
  onChangeDifficulty,
  onChangeEditor
} from '../actions/gamesetting';

import {
  onModalClose
} from '../actions/modal';

import {
  onClickPass
} from '../actions/playerstatus';

import {
  actionSaveSession,
  actionFinishSession
} from '../actions/session';

import { runTests } from '../actions/test';

import {
  startTimer,
  stopTimer,
  actionTimerMaxValueChanged
} from '../actions/timer';

import {
  actionShowProfile,
  actionHideProfile,
  saveUserData,
  loadUserData,
  deleteSession
} from '../actions/profile';

import makeMapStateToProps from '../selectors';

const mapDispatchToProps = dispatch => ({
  onChangeMode: mode => dispatch(onChangeMode(mode)),
  onChangeDifficulty: difficulty => dispatch(onChangeDifficulty(difficulty)),
  onChangeEditor: editor => dispatch(onChangeEditor(editor)),
  onClickPass: () => dispatch(onClickPass()),
  onModalClose: () => dispatch(onModalClose()),
  saveSession: () => dispatch(actionSaveSession()),
  finishSession: () => dispatch(actionFinishSession()),
  runTests: (userCode, currChallenge) => dispatch(runTests(userCode, currChallenge)),
  nextChallenge: obj => dispatch(nextChallenge(obj)),
  onCodeChange: newCode => dispatch(onCodeChange(newCode)),
  startChallenge: () => dispatch(startChallenge()),
  startTimer: timerMaxValue => dispatch(startTimer(timerMaxValue)),
  stopTimer: () => dispatch(stopTimer()),
  onTimerMaxValueChange: timerMaxValue => dispatch(actionTimerMaxValueChanged(timerMaxValue)),
  solveChallenge: () => dispatch(actionSolveChallenge()),
  showProfile: () => dispatch(actionShowProfile()),
  hideProfile: () => dispatch(actionHideProfile()),
  loadUserData: () => dispatch(loadUserData()),
  saveUserData: session => dispatch(saveUserData(session)),
  deleteSession: session => dispatch(deleteSession(session))
});

export default connect(makeMapStateToProps, mapDispatchToProps)(ArcadeMode);
