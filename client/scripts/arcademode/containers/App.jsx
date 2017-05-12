
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

/*
const makeMapStateToProps = () => {
  const getSession = makeGetSession();

  const mapStateToProps = (state, props) => ({
    session: getSession(state
  });
};
*/

const mapStateToProps = state => ({
  modal: state.getIn(['modal', 'modalOpened']),
  challengeNumber: state.get('challengeNumber'),
  userData: state.get('userData'),
  title: state.get('title'),
  description: state.get('description'),
  code: state.get('code'),
  userOutput: state.get('userOutput'),
  currChallenge: state.get('currChallenge'),
  nextChallenge: state.get('nextChallenge'),
  testResults: state.get('testResults'),
  timeLeft: state.get('timeLeft'),
  timerMaxValue: state.get('timerMaxValue'),
  sessionScore: state.get('sessionScore'),
  isTimerFinished: state.get('isTimerFinished'),
  isSessionFinished: state.get('isSessionFinished'),
  isSessionStarted: state.get('isSessionStarted')

  /*
  modal: state.modal.modal,
  challengeNumber: state.challenge.challengeNumber,
  userData: state.session.userData,
  title: state.challenge.title,
  description: state.challenge.description,
  code: state.challenge.code,
  userOutput: state.test.userOutput,
  currChallenge: state.challenge.currChallenge,
  nextChallenge: state.challenge.nextChallenge,
  testResults: state.test.testResults,
  timeLeft: state.timer.timeLeft,
  timerMaxValue: state.timer.timerMaxValue,
  sessionScore: state.session.sessionScore,
  isTimerFinished: state.timer.isTimerFinished,
  isSessionFinished: state.session.isSessionFinished,
  isSessionStarted: state.session.isSessionStarted
  */
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
