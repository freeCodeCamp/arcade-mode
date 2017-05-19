
/* Unit tests for file client/scripts/arcademode/components/ArcadeMode.jsx. */
import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
// import sinon from 'sinon';

import Immutable from 'immutable';

import { Grid, Row, Col } from 'react-bootstrap';

import ArcadeMode from '../../../../../client/scripts/arcademode/components/ArcadeMode';
import Modal from '../../../../../client/scripts/arcademode/components/Modal';
import Navbar from '../../../../../client/scripts/arcademode/components/Navbar';
import Editor from '../../../../../client/scripts/arcademode/components/Editor';

// import reducers from '../../../../../client/scripts/arcademode/reducers';
// import challengeActions from '../../../../../client/scripts/arcademode/actions/challenge';

import Challenges from '../../../../../client/json/challenges.json';

chai.use(chaiEnzyme());

describe('Component: <ArcadeMode>', () => {
  let props = null;
  const timerDefaultValue = 60 * 1000;

  beforeEach(() => {
    props = {
      modal: true,
      onModalClose: () => {},
      mode: 'Arcade',
      onChangeMode: () => {},
      difficulty: 'Medium',
      onChangeDifficulty: () => {},
      editor: 'Normal',
      onChangeEditor: () => {},
      lives: 5,
      passOption: true,
      onClickPass: () => {},
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

  it('should render all subcomponents', () => {
    const wrapper = shallow(<ArcadeMode {...props} />);

    expect(wrapper.find(Modal)).to.have.length(1);
    expect(wrapper.find(Navbar)).to.have.length(1);
    expect(wrapper.find(Grid)).to.have.length(1);
    expect(wrapper.find(Row)).to.have.length(1);
    expect(wrapper.find(Col)).to.have.length(2);
    expect(wrapper.find(Editor)).to.have.length(1);

    const colOne = wrapper.find(Col).first();
    expect(colOne.props().className).to.equal('arcade-panel-left');

    const colTwo = wrapper.find(Col).last();
    expect(colTwo.props().className).to.equal('arcade-panel-right');
  });

  describe('renderNextChallengeButton()', () => {
    it('should render next challenge button when all tests pass', () => {
      const newProps = Object.assign({}, props);
      newProps.modal = false;
      newProps.testResults = newProps.testResults.push({ pass: true, error: null });

      const wrapper = shallow(<ArcadeMode {...newProps} />);
      const editorDiv = wrapper.find('.arcade-panel-right');
      const finishButton = editorDiv.find('button');
      expect(finishButton.text()).to.include('Continue');
    });

    it('should render Finish buttons after timer runs out', () => {
      const newProps = Object.assign({}, props);
      newProps.isTimerFinished = true;
      newProps.modal = false;
      const wrapper = shallow(<ArcadeMode {...newProps} />);

      const editorDiv = wrapper.find('.arcade-panel-right');
      expect(editorDiv).to.have.length(1);
      const finishButton = editorDiv.find('button');
      expect(finishButton.text()).to.include('Finish');
    });
  });

  /* This seems more of an integration test, walking through events */
  /*
  it('should show code editor after running the tests', () => {
    // const spy = sinon.spy(ArcadeMode.prototype, 'onClickStartChallenge');
    const wrapper = shallow(<ArcadeMode {...props} />);
    // console.log(wrapper.find('button').first());
    const button = wrapper.find('button').first();
    button.simulate('click');
    // wrapper.find('button').first().simulate('click');

    console.log(wrapper.find('button').props());

    console.log(`Buttons after click: ${wrapper.find('button').length}`);

    // const runTestsButton = wrapper.find('button')[1];
    // runTestsButton.simulate('click');
    // expect(spy.calledOnce).to.be.true;
    expect(wrapper.find('.editor')).to.have.length(1);
  });
  */
});

