
'use strict';

import { connect } from 'react-redux';

import ArcadeMode from '../components/ArcadeMode';
import { onCodeChange, runTests, startChallenge } from '../actions/ArcadeAction';

const mapStateToProps = state => ({
  userData: state.arcadeReducer.userData,
  code: state.arcadeReducer.code,
  userOutput: state.arcadeReducer.userOutput,
  currChallenge: state.arcadeReducer.currChallenge,
  testResults: state.arcadeReducer.testResults
});

const mapDispatchToProps = dispatch => ({
  runTests: (userCode, currChallenge) => dispatch(runTests(userCode, currChallenge)),
  onCodeChange: newCode => dispatch(onCodeChange(newCode)),
  startChallenge: () => dispatch(startChallenge())
});

export default connect(mapStateToProps, mapDispatchToProps)(ArcadeMode);
