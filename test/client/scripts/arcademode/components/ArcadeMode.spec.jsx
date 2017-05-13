
/* Unit tests for file client/scripts/arcademode/components/ArcadeMode.jsx. */
import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';

import ArcadeMode from '../../../../../client/scripts/arcademode/components/ArcadeMode';
import TestResults from '../../../../../client/scripts/arcademode/model/TestResults';

chai.use(chaiEnzyme());

describe('<ArcadeMode>', () => {
  let props = null;

  beforeEach(() => {
    props = {
      description: ['A', 'B', 'C'],
      testResults: new TestResults([]),
      startChallenge: () => {},
      startTimer: () => {}
    };
  });

  afterEach(() => {
    props = null;
  });

  it('should initially show one Start button', () => {
    const wrapper = shallow(<ArcadeMode {...props} />);
    expect(wrapper.find('button')).to.have.length(1);
    expect(wrapper.find('button')).to.contain.text('Start');
  });

  it('should show code editor after running the tests', () => {
    const wrapper = shallow(<ArcadeMode {...props} />);
    wrapper.find('button').first().simulate('click', 1);

    console.log('Buttons after click: ' + wrapper.find('button').length);

    const runTestsButton = wrapper.find('button')[1];
    runTestsButton.simulate('click', 1);
    expect(wrapper.find('.editor')).to.have.length(1);
  });
});

