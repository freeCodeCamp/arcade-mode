
'use strict';

import { connect } from 'react-redux';

import ArcadeMode from '../components/ArcadeMode';
import {
  runTests,
  startTimer,
  stopTimer,
  actionFinishSession,
  actionTimerMaxValueChanged
} from '../actions/ArcadeAction';

import { onModalClose } from '../actions/modal';

import {
  startChallenge,
  nextChallenge,
  actionSolveChallenge,
  onCodeChange
} from '../actions/challenge';

const mapStateToProps = state => ({
  modal: state.modal.modal,
  challengeNumber: state.challenge.challengeNumber,
  userData: state.arcadeReducer.userData,
  title: state.challenge.title,
  description: state.challenge.description,
  code: state.challenge.code,
  userOutput: state.arcadeReducer.userOutput,
  currChallenge: state.challenge.currChallenge,
  nextChallenge: state.challenge.nextChallenge,
  testResults: state.arcadeReducer.testResults,
  timeLeft: state.arcadeReducer.timeLeft,
  timerMaxValue: state.arcadeReducer.timerMaxValue,
  sessionScore: state.arcadeReducer.sessionScore,
  isTimerFinished: state.arcadeReducer.isTimerFinished,
  isSessionFinished: state.arcadeReducer.isSessionFinished,
  isSessionStarted: state.arcadeReducer.isSessionStarted
});

const mapDispatchToProps = dispatch => ({
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

export default connect(mapStateToProps, mapDispatchToProps)(ArcadeMode);
