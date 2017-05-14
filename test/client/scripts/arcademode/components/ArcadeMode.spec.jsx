
/* Unit tests for file client/scripts/arcademode/components/ArcadeMode.jsx. */
import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
// import sinon from 'sinon';

import Immutable from 'immutable';

import ArcadeMode from '../../../../../client/scripts/arcademode/components/ArcadeMode';
// import TestResults from '../../../../../client/scripts/arcademode/model/TestResults';

import Challenges from '../../../../../client/json/challenges.json';

chai.use(chaiEnzyme());

describe('<ArcadeMode>', () => {
  let props = null;
  const timerDefaultValue = 60 * 1000;

  beforeEach(() => {
    props = {
      modal: true,
      onModalClose: () => {},
      currChallenge: Immutable.Map(Immutable.fromJS(Challenges.challenges[0])),
      title: '',
      description: Immutable.List(['A', 'B', 'C']),
      userOutput: 'The output of your code will show up here',
      code: 'The code to work with will show up here',
      nextChallenge: () => {},
      finishSession: () => {},
      onCodeChange: () => {},
      runTests: () => {},
      startChallenge: () => {},
      startTimer: () => {},
      testResults: Immutable.List(),
      timeLeft: timerDefaultValue,
      onTimerMaxValueChange: () => {},
      timerMaxValue: timerDefaultValue.toString(),
      sessionScore: 0,
      isTimerFinished: false,
      solveChallenge: () => {},
      isSessionFinished: false,
      isSessionStarted: false
    };
  });

  afterEach(() => {
    props = null;
  });

  it('should render', () => {
    const wrapper = shallow(<ArcadeMode {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should initially show one Start button', () => {
    const wrapper = shallow(<ArcadeMode {...props} />);
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('button')).to.contain.text('Start');
  });

  it('should show code editor after running the tests', () => {
    // const spy = sinon.spy(ArcadeMode.prototype, 'onClickStartChallenge');
    const wrapper = shallow(<ArcadeMode {...props} />);
    wrapper.find('button').first().simulate('click');

    console.log('Buttons after click: ' + wrapper.find('button').length);

    const runTestsButton = wrapper.find('button')[1];
    runTestsButton.simulate('click');
    // expect(spy.calledOnce).to.be.true;
    expect(wrapper.find('.editor')).to.have.length(1);
  });
});

