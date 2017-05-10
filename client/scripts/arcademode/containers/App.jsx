
'use strict';

import { connect } from 'react-redux';

import ArcadeMode from '../components/ArcadeMode';
import { onCodeChange, runTests, startChallenge, startTimer, stopTimer } from '../actions/ArcadeAction';

const mapStateToProps = state => ({
  userData: state.arcadeReducer.userData,
  code: state.arcadeReducer.code,
  currChallenge: state.arcadeReducer.currChallenge,
  testResults: state.arcadeReducer.testResults,
  timeLeft: state.arcadeReducer.timeLeft
});

const mapDispatchToProps = dispatch => ({
  runTests: (userCode, currChallenge) => dispatch(runTests(userCode, currChallenge)),
  onCodeChange: newCode => dispatch(onCodeChange(newCode)),
  startChallenge: () => dispatch(startChallenge()),
  startTimer: () => dispatch(startTimer()),
  stopTimer: () => dispatch(stopTimer())
});

export default connect(mapStateToProps, mapDispatchToProps)(ArcadeMode);
