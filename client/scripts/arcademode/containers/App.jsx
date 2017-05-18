
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
} from '../actions/gamesettings';

import {
  onModalClose
} from '../actions/modal';

import {
  onClickPass
} from '../actions/playerstatus';

import {
  actionFinishSession
} from '../actions/session';

import { runTests } from '../actions/test';

import {
  startTimer,
  stopTimer,
  actionTimerMaxValueChanged
} from '../actions/timer';

import makeMapStateToProps from '../selectors';

const mapDispatchToProps = dispatch => ({
  onChangeMode: mode => dispatch(onChangeMode(mode)),
  onChangeDifficulty: difficulty => dispatch(onChangeDifficulty(difficulty)),
  onChangeEditor: editor => dispatch(onChangeEditor(editor)),
  onClickPass: () => dispatch(onClickPass()),
  onModalClose: () => dispatch(onModalClose()),
  finishSession: () => dispatch(actionFinishSession()),
  runTests: (userCode, currChallenge) => dispatch(runTests(userCode, currChallenge)),
  nextChallenge: () => dispatch(nextChallenge()),
  onCodeChange: newCode => dispatch(onCodeChange(newCode)),
  startChallenge: () => dispatch(startChallenge()),
  startTimer: timerMaxValue => dispatch(startTimer(timerMaxValue)),
  stopTimer: () => dispatch(stopTimer()),
  onTimerMaxValueChange: timerMaxValue => dispatch(actionTimerMaxValueChanged(timerMaxValue)),
  solveChallenge: () => dispatch(actionSolveChallenge())
});

export default connect(makeMapStateToProps, mapDispatchToProps)(ArcadeMode);
