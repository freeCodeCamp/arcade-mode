
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
  sessionScore: 0
};

describe('Component: <Statusbar>', () => {
  it('should render', () => {
    const wrapper = shallow(<Statusbar {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should render all subcomponents', () => {
    const wrapper = shallow(<Statusbar {...props} />);
    expect(wrapper.find(Col)).to.have.length(4);

    const livesText = document.createElement('div');
    livesText.innerHTML = wrapper.find(Col).first().html();
    expect(livesText.textContent).to.equal('Lives: x 5');

    const timeLeftText = document.createElement('div');
    timeLeftText.innerHTML = wrapper.find(Col).at(1).html();
    expect(timeLeftText.textContent).to.equal('Time left: 01:00');

    const passBtnText = document.createElement('button');
    passBtnText.innerHTML = wrapper.find(Col).at(2).html();
    expect(passBtnText.textContent).to.equal('Pass');

    const scoreText = document.createElement('div');
    scoreText.innerHTML = wrapper.find(Col).last().html();
    expect(scoreText.textContent).to.equal('Score: 0');
  });
});
