//
// 'use strict';
//
// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Modal, Button } from 'react-bootstrap';
//
// export default class ArcadeModal extends Component {
//   render() {
//     return (
//       <Modal show={this.props.modal} onHide={this.props.onModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>{" Welcome to freeCodeCamp's Arcade Mode!"}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h4>Quick start:</h4>
//           <p>This is an app where you can practice your algorithm and data structure
//             skills by testing them in a timed environment.</p>
//           <p>All you have to do is set the time and press start, and off you go!</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={this.props.onModalClose}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }
// }
//
// ArcadeModal.propTypes = {
//   modal: PropTypes.bool.isRequired,
//   onModalClose: PropTypes.func.isRequired
// };
//

/* Unit tests for file client/scripts/arcademode/components/Modal.jsx. */
import React from 'react';
import { shallow } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import { Modal, Form, FormControl, Button } from 'react-bootstrap';

import ArcadeModal from '../../../../../client/scripts/arcademode/components/Modal';

chai.use(chaiEnzyme());

const props = {
  modal: true,
  onModalClose: () => {},
  mode: 'Arcade',
  onChangeMode: () => {},
  difficulty: 'Medium',
  onChangeDifficulty: () => {},
  editor: 'Normal',
  onChangeEditor: () => {}
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
    expect(footer.find(FormControl)).to.have.length(3);
    expect(footer.find(Button)).to.have.length(1);

    const selectMode = document.createElement('select');
    selectMode.innerHTML = wrapper.find(FormControl).first().html();
    expect(selectMode.value).to.equal('Arcade');

    const selectDifficulty = document.createElement('select');
    selectDifficulty.innerHTML = wrapper.find(FormControl).at(1).html();
    expect(selectDifficulty.value).to.equal('Medium');

    const selectEditor = document.createElement('select');
    selectEditor.innerHTML = wrapper.find(FormControl).last().html();
    expect(selectEditor.value).to.equal('Normal');

    const button = document.createElement('button');
    button.innerHTML = wrapper.find(Button).html();
    expect(button.textContent).to.equal('Submit');
  });
});

