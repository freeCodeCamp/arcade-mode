
'use strict';

import React from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Modal, Button, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const ArcadeModal = props => (
  <Modal show={props.modal} onHide={props.onModalClose} animation={false} backdrop='static'>
    <Modal.Header>
      <Modal.Title className='am__modal__title'>{'freeCodeCamp\'s Arcade Mode'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>Welcome to freeCodeCamp's Arcade Mode. This is a place where you can practice your algorithm and data structure skills.</p>
      <br />
      <Form horizontal>
        <FormGroup>
          <Col sm={3}>
            <ControlLabel>Mode:</ControlLabel>
          </Col>
          <Col smOffset={3} sm={6}>
            <FormControl componentClass='select' defaultValue={props.mode} onChange={props.onChangeMode}>
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
            <FormControl componentClass='select' defaultValue={props.difficulty} onChange={props.onChangeDifficulty}>
              <option value='Easy'>Easy</option>
              <option value='Medium'>Medium</option>
              <option value='Hard'>Hard</option>
              <option value='Random'>Random</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={3}>
            <ControlLabel>Editor:</ControlLabel>
          </Col>
          <Col smOffset={3} sm={6}>
            <FormControl componentClass='select' defaultValue={props.editor} onChange={props.onChangeEditor}>
              <option value='Normal'>Normal</option>
              <option value='Whiteboard'>Whiteboard</option>
            </FormControl>
          </Col>
        </FormGroup>
        <br />
        <FormGroup className='am__modal__submit'>
          <Button type='button' onClick={props.onModalClose}>Submit</Button>
        </FormGroup>
      </Form>
    </Modal.Body>
  </Modal>
);

ArcadeModal.propTypes = {
  mode: PropTypes.string.isRequired,
  onChangeMode: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  onChangeDifficulty: PropTypes.func.isRequired,
  editor: PropTypes.string.isRequired,
  onChangeEditor: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired
};

export default ArcadeModal;
