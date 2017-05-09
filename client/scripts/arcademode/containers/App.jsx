
'use strict';

import { connect } from 'react-redux';

import ArcadeMode from '../components/ArcadeMode';
import { onCodeChange, runTest } from '../actions/ArcadeAction';

const mapStateToProps = state => ({
  userData: state.arcadeReducer.userData,
  code: state.arcadeReducer.code,
  codeRetVal: state.arcadeReducer.codeRetVal
});

const mapDispatchToProps = dispatch => ({
  runTest: () => dispatch(runTest()),
  onCodeChange: newCode => dispatch(onCodeChange(newCode))
});

export default connect(mapStateToProps, mapDispatchToProps)(ArcadeMode);
