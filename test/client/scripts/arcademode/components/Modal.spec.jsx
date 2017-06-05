/* Unit tests for file client/scripts/arcademode/components/Modal.jsx. */
import React from 'react';
import { shallow } from 'enzyme';
import Immutable from 'immutable';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { Modal, Form, FormControl, Button } from 'react-bootstrap';

import ArcadeModal from '../../../../../client/scripts/arcademode/components/Modal';
import appConfig from '../../../../../client/jsons/appconfig.json';

chai.use(chaiEnzyme());

const props = {
  modal: true,
  onModalClose: () => {},
  mode: 'Arcade',
  onChangeMode: () => {},
  difficulty: 'Medium',
  onChangeDifficulty: () => {},
  editor: 'Normal',
  onChangeEditor: () => {},
  appConfig: Immutable.Map(Immutable.fromJS(appConfig))
};

describe('Component: <ArcadeModal>', () => {
  it('should render', () => {
    const wrapper = shallow(<ArcadeModal {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it('should render all sub components', () => {
    const wrapper = shallow(<ArcadeModal {...props} />);

    expect(wrapper.find(Modal)).to.have.length(1);

    expect(wrapper.find(Modal.Header)).to.have.length(1);

    // can't use .text() on components; .to.have.string can work
    expect(wrapper.find(Modal.Title)).to.have.length(1);
    const title = document.createElement('span');
    title.innerHTML = wrapper.find(Modal.Title).html();
    expect(title.textContent).to.equal('Arcade Mode');

    const body = wrapper.find(Modal.Body);
    expect(body).to.have.length(1);

    const footer = wrapper.find(Modal.Footer);
    expect(footer).to.have.length(1);
    expect(footer.find(Form)).to.have.length(1);
    expect(footer.find(FormControl)).to.have.length(4);
    expect(footer.find(Button)).to.have.length(1);

    const selectMode = document.createElement('select');
    selectMode.innerHTML = wrapper.find(FormControl).first().html();
    expect(selectMode.value).to.equal('Arcade');

    const selectDifficulty = document.createElement('select');
    selectDifficulty.innerHTML = wrapper.find(FormControl).at(1).html();
    expect(selectDifficulty.value).to.equal('Medium');

    const selectEditor = document.createElement('select');
    selectEditor.innerHTML = wrapper.find(FormControl).at(2).html();
    expect(selectEditor.value).to.equal('Normal');

    const selectChallengeType = document.createElement('select');
    // selectChallengeType.innerHTML = wrapper.find(FormControl).last().html();
    selectChallengeType.innerHTML = wrapper.find(FormControl).at(3).html();
    expect(selectChallengeType.value).to.equal('Arcade');

    const button = document.createElement('button');
    button.innerHTML = wrapper.find(Button).html();
    expect(button.textContent).to.equal('Submit');
  });
});

