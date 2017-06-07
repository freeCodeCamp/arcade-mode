
/* Unit tests for file client/scripts/arcademode/components/ArcadeMode.jsx. */
import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';

import Immutable from 'immutable';
import CodeMirror from 'react-codemirror';
import ChallengePanel from '../../../../../client/scripts/arcademode/components/ChallengePanel';

chai.use(chaiEnzyme());

const props = {
  onModalOpen: () => {},
  title: '',
  isSessionStarted: false,
  isSessionFinished: false,
  isTimerFinished: false,
  onClickFinishSession: () => {},
  onClickBenchmark: () => {},
  onClickRunTests: () => {},
  onClickSolve: () => {},
  onClickStartChallenge: () => {},
  userOutput: 'The output of your code will show up here.',
  benchmarkResults: Immutable.Map(),
  testResults: Immutable.List(),
  description: Immutable.List(['a', 'b', 'c']),
  editor: 'editor',
  mode: 'Arcade',
  isRunningTests: false
};

describe('<ChallengePanel> component', () => {
  it('should render', () => {
    const wrapper = shallow(<ChallengePanel {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should have one <CodeMirror>', () => {
    const wrapper = shallow(<ChallengePanel {...props} />);
    expect(wrapper.find(CodeMirror)).to.have.length(1);
  });

  it('should have start <button>', () => {
    const wrapper = shallow(<ChallengePanel {...props} />);
    const btnDiv = wrapper.find('.challenge__buttons');
    expect(btnDiv.find('button').first()).to.include.text('Start');
  });
});
