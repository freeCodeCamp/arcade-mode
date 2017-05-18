
'use strict';

import React from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Modal, Button, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const ArcadeModal = props => (
  <Modal show={props.modal} onHide={props.onModalClose} animation={false} backdrop={'static'}>
    <Modal.Header closeButton>
      <Modal.Title bsClass='am__modal__title'>{'freeCodeCamp\'s Arcade Mode'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
  { /* <h4>Quick start:</h4> */ }
      <p>Welcome to freeCodeCamp's Arcade Mode.
        This is a place where you can practice your algorithm and data structure skills.</p>
      <br />
      <Form horizontal>
        <FormGroup>
          <Col sm={3}>
            <ControlLabel>Mode:</ControlLabel>
          </Col>
          <Col smOffset={3} sm={6}>
            <FormControl componentClass='select' placeholder='Mode'>
              <option value='Arcade'>Arcade</option>
              <option value='Practice'>Practice</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={3}>
            <ControlLabel>Difficulty:</ControlLabel>
          </Col>
          <Col smOffset={3} sm={6}>
            <FormControl componentClass='select' placeholder='Difficulty'>
              <option value='Easy'>Easy</option>
              <option value='Medium' selected>Medium</option>
              <option value='Hard'>Hard</option>
              <option value='Random'>Random</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={3}>
            <ControlLabel>Editor Setting:</ControlLabel>
          </Col>
          <Col smOffset={3} sm={6}>
            <FormControl componentClass='select' placeholder='Editor Setting'>
              <option value='Normal'>Normal</option>
              <option value='Whiteboard'>Whiteboard</option>
            </FormControl>
          </Col>
        </FormGroup>
        <br />
        <FormGroup bsClass='am__modal__submit'>
          <Button type='submit' onClick={props.onModalClose}>Start</Button>
        </FormGroup>
      </Form>
    </Modal.Body>
    {/*
    <Modal.Footer>
      <Button type='submit' onClick={props.onModalClose}>Start</Button>
    </Modal.Footer>
    */}
  </Modal>
);

ArcadeModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default ArcadeModal;
