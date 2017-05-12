
'use strict';

import React, { Component } from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

export default class ArcadeModal extends Component {
  render() {
    return (
      <Modal show={this.props.modal} onHide={this.props.onModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{" Welcome to freeCodeCamp's Arcade Mode!"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Quick start:</h4>
          <p>This is an app where you can practice your algorithm and data structure
            skills by testing them in a timed environment.</p>
          <p>All you have to do is set the time and press start, and off you go!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ArcadeModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

