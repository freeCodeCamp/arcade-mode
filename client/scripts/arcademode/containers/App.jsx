
'use strict';

import { connect } from 'react-redux';

import ArcadeMode from '../components/ArcadeMode';

import {
  startChallenge,
  nextChallenge,
  actionSolveChallenge,
  onCodeChange,
  onCodeReset,
  onChallengeSelect
} from '../actions/challenge';

import {
  onChangeMode,
  onChangeDifficulty,
  onChangeEditor,
  onChangeChallengeType
} from '../actions/gamesetting';

import {
  onModalClose,
  onModalOpen
} from '../actions/modal';

import {
  onClickPass
} from '../actions/playerstatus';

import {
  actionSaveSession,
  actionFinishSession
} from '../actions/session';

import {
  runTests,
  runBenchmark
} from '../actions/test';

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
  deleteSession,
  toggleSessionView,
  toggleChallengeView
} from '../actions/profile';

import makeMapStateToProps from '../selectors';

const mapDispatchToProps = dispatch => ({
  onChangeMode: event => dispatch(onChangeMode(event)),
  onChangeDifficulty: event => dispatch(onChangeDifficulty(event)),
  onChangeEditor: event => dispatch(onChangeEditor(event)),
  onChangeChallengeType: event => dispatch(onChangeChallengeType(event)),
  onClickPass: () => dispatch(onClickPass()),
  onModalClose: () => dispatch(onModalClose()),
  onModalOpen: () => dispatch(onModalOpen()),
  saveSession: () => dispatch(actionSaveSession()),
  finishSession: endTime => dispatch(actionFinishSession(endTime)),
  runTests: (userCode, currChallenge) => dispatch(runTests(userCode, currChallenge)),
  runBenchmark: (userCode, currChallenge) => dispatch(runBenchmark(userCode, currChallenge)),
  nextChallenge: obj => dispatch(nextChallenge(obj)),
  onCodeChange: newCode => dispatch(onCodeChange(newCode)),
  onCodeReset: () => dispatch(onCodeReset()),
  startChallenge: startTime => dispatch(startChallenge(startTime)),
  startTimer: timerMaxValue => dispatch(startTimer(timerMaxValue)),
  stopTimer: finishTime => dispatch(stopTimer(finishTime)),
  onTimerMaxValueChange: timerMaxValue => dispatch(actionTimerMaxValueChanged(timerMaxValue)),
  solveChallenge: () => dispatch(actionSolveChallenge()),
  showProfile: () => dispatch(actionShowProfile()),
  hideProfile: () => dispatch(actionHideProfile()),
  loadUserData: () => dispatch(loadUserData()),
  saveUserData: session => dispatch(saveUserData(session)),
  deleteSession: session => dispatch(deleteSession(session)),
  toggleSessionView: sessionId => dispatch(toggleSessionView(sessionId)),
  toggleChallengeView: (sessionId, challengeId) =>
    dispatch(toggleChallengeView(sessionId, challengeId)),
  onChallengeSelect: challengeName => dispatch(onChallengeSelect(challengeName))
});

export default connect(makeMapStateToProps, mapDispatchToProps)(ArcadeMode);
