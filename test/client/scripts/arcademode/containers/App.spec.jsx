//
// 'use strict';
//
// import { connect } from 'react-redux';
//
// import ArcadeMode from '../components/ArcadeMode';
//
// import {
//   actionFinishSession
// } from '../actions/session';
//
// import {
//   startChallenge,
//   nextChallenge,
//   actionSolveChallenge,
//   onCodeChange
// } from '../actions/challenge';
//
// import { onModalClose } from '../actions/modal';
//
// import { runTests } from '../actions/test';
//
// import {
//   startTimer,
//   stopTimer,
//   actionTimerMaxValueChanged
// } from '../actions/timer';
//
// const mapStateToProps = state => ({
//   modal: state.modal.modal,
//   challengeNumber: state.challenge.challengeNumber,
//   userData: state.session.userData,
//   title: state.challenge.title,
//   description: state.challenge.description,
//   code: state.challenge.code,
//   userOutput: state.test.userOutput,
//   currChallenge: state.challenge.currChallenge,
//   nextChallenge: state.challenge.nextChallenge,
//   testResults: state.test.testResults,
//   timeLeft: state.timer.timeLeft,
//   timerMaxValue: state.timer.timerMaxValue,
//   sessionScore: state.session.sessionScore,
//   isTimerFinished: state.timer.isTimerFinished,
//   isSessionFinished: state.session.isSessionFinished,
//   isSessionStarted: state.session.isSessionStarted
// });
//
// const mapDispatchToProps = dispatch => ({
//   onModalClose: () => dispatch(onModalClose()),
//   finishSession: () => dispatch(actionFinishSession()),
//   runTests: (userCode, currChallenge) => dispatch(runTests(userCode, currChallenge)),
//   nextChallenge: () => dispatch(nextChallenge()),
//   onCodeChange: newCode => dispatch(onCodeChange(newCode)),
//   startChallenge: () => dispatch(startChallenge()),
//   startTimer: timerMaxValue => dispatch(startTimer(timerMaxValue)),
//   stopTimer: () => dispatch(stopTimer()),
//   onTimerMaxValueChange: timerMaxValue => dispatch(actionTimerMaxValueChanged(timerMaxValue)),
//   solveChallenge: () => dispatch(actionSolveChallenge())
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(ArcadeMode);

/* Unit tests for file client/scripts/arcademode/containers/App.jsx. */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';


import { Provider } from 'react-redux';
import App from '../../../../../client/scripts/arcademode/containers/App';
import configureStore from '../../../../../client/scripts/arcademode/store/configureStore';

const store = configureStore();

describe('Container: <App>', () => {
  it('should render', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper).to.have.length(1);
    expect(wrapper.find(App)).to.have.length(1);
  });

  it('should render correctly with the store', () => {
    // const wrapper = shallow(<Provider store={store}><App /></Provider>);
    // expect(wrapper).to.not.be.empty;
    expect(store.getState().getIn(['session', 'isSessionStarted'])).to.equal(false);
  });
});

