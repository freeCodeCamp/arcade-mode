
'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import { expect } from 'chai';

import { Col } from 'react-bootstrap';

import Statusbar from '../../../../../client/scripts/arcademode/components/Statusbar';

const props = {
  lives: 5,
  timeLeft: '01:00',
  passOption: true,
  onClickPass: () => {},
  sessionScore: 0,
  isSessionStarted: false
};

describe('Component: <Statusbar>', () => {
  it('should render', () => {
    const wrapper = shallow(<Statusbar {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should render all subcomponents', () => {
    const wrapper = shallow(<Statusbar {...props} />);
    expect(wrapper.find(Col)).to.have.length(4);

    const lives = document.createElement('div');
    lives.innerHTML = wrapper.find(Col).first().html();
    expect(lives.textContent).to.include('x 5');

    const timeLeftText = document.createElement('div');
    timeLeftText.innerHTML = wrapper.find(Col).at(1).html();
    expect(timeLeftText.textContent).to.equal('Time left: 01:00');

    const passBtn = document.createElement('button');
    passBtn.innerHTML = wrapper.find(Col).at(2).html();
    expect(passBtn.textContent).to.equal('Pass');
    expect(wrapper.find(Col).at(2).props().children.props.disabled).to.be.true;

    const score = document.createElement('div');
    score.innerHTML = wrapper.find(Col).last().html();
    expect(score.textContent).to.equal('Score: 0');
  });
});
