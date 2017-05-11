
'use strict';

import { connect } from 'react-redux';

import ArcadeMode from '../components/ArcadeMode';
import {
  onModalClose,
  nextChallenge,
  onCodeChange,
  runTests,
  startChallenge,
  startTimer,
  stopTimer,
  actionFinishSession,
  actionTimerMaxValueChanged
} from '../actions/ArcadeAction';

const mapStateToProps = state => ({
  modal: state.arcadeReducer.modal,
  challengeNumber: state.arcadeReducer.challengeNumber,
  userData: state.arcadeReducer.userData,
  title: state.arcadeReducer.title,
  description: state.arcadeReducer.description,
  code: state.arcadeReducer.code,
  userOutput: state.arcadeReducer.userOutput,
  currChallenge: state.arcadeReducer.currChallenge,
  nextChallenge: state.arcadeReducer.nextChallenge,
  testResults: state.arcadeReducer.testResults,
  timeLeft: state.arcadeReducer.timeLeft,
  timerMaxValue: state.arcadeReducer.timerMaxValue
});

const mapDispatchToProps = dispatch => ({
  onModalClose: () => dispatch(onModalClose()),
  finishSession: () => dispatch(actionFinishSession()),
  runTests: (userCode, currChallenge) => dispatch(runTests(userCode, currChallenge)),
  nextChallenge: () => dispatch(nextChallenge()),
  onCodeChange: newCode => dispatch(onCodeChange(newCode)),
  startChallenge: () => dispatch(startChallenge()),
  startTimer: () => dispatch(startTimer()),
  stopTimer: () => dispatch(stopTimer()),
  onTimerMaxValueChange: timerMaxValue => dispatch(actionTimerMaxValueChanged(timerMaxValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArcadeMode);
