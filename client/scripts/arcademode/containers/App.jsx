
'use strict';

import { connect } from 'react-redux';

import ArcadeMode from '../components/ArcadeMode';

import {
  actionFinishSession
} from '../actions/session';

import {
  startChallenge,
  nextChallenge,
  actionSolveChallenge,
  onCodeChange
} from '../actions/challenge';

import { onModalClose } from '../actions/modal';

import { runTests } from '../actions/test';

import {
  startTimer,
  stopTimer,
  actionTimerMaxValueChanged
} from '../actions/timer';


const mapStateToProps = state => ({
  modal: state.getIn(['modal', 'modal']),
  challengeNumber: state.getIn(['challenge', 'challengeNumber']),
  userData: state.getIn(['session', 'userData']),
  title: state.getIn(['challenge', 'title']),
  description: state.getIn(['challenge', 'description']),
  code: state.getIn(['challenge', 'code']),
  userOutput: state.getIn(['test', 'userOutput']),
  currChallenge: state.getIn(['challenge', 'currChallenge']),
  nextChallenge: state.getIn(['challenge', 'nextChallenge']),
  testResults: state.getIn(['test', 'testResults']),
  timeLeft: state.getIn(['timer', 'timeLeft']),
  timerMaxValue: state.getIn(['timer', 'timerMaxValue']),
  sessionScore: state.getIn(['session', 'sessionScore']),
  isTimerFinished: state.getIn(['timer', 'isTimerFinished']),
  isSessionFinished: state.getIn(['session', 'isSessionFinished']),
  isSessionStarted: state.getIn(['session', 'isSessionStarted'])
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
