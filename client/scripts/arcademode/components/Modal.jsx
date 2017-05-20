
'use strict';

import React from 'react';
// import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Modal, Button, Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const ArcadeModal = props => (
  <Modal show={props.modal} onHide={props.onModalClose} animation={false} backdrop='static'>
    <Modal.Header>
      <Modal.Title className='am__modal__title'>{'freeCodeCamp\'s Arcade Mode'}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className='am__modal__description'>This is a place where you can practice your algorithm and data structure skills.</p>
      <br />
      <p><b>Mode</b></p>
      <Grid fluid>
        <Row>
          <Col sm={3}>
            Arcade
          </Col>
          <Col sm={9}>
            Try your skills in a time and attempt-limited environment.
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            Practice
          </Col>
          <Col sm={9}>
            No constraints free form practice.
          </Col>
        </Row>
      </Grid>
      <br />
      <p><b>Difficulty</b></p>
      <Grid fluid>
        <Row>
          <Col sm={3}>
            Easy
          </Col>
          <Col sm={9}>
            Most lives, most time.
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            Medium
          </Col>
          <Col sm={9}>
            Average number of lives, average amount of time.
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            Hard
          </Col>
          <Col sm={9}>
            Few lives, short in time. Life is short.
          </Col>
        </Row>
      </Grid>
      <br />
      <p><b>Editor</b></p>
      <Grid fluid>
        <Row>
          <Col sm={3}>
            Normal
          </Col>
          <Col sm={9}>
            Syntax highlighting, line numbers, and specific error reporting.
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            Whiteboard
          </Col>
          <Col sm={9}>
            Black marker.
          </Col>
        </Row>
      </Grid>
      <br />
      <Form horizontal>
        <FormGroup>
          <Col smOffset={3} sm={2}>
            <ControlLabel>Mode:</ControlLabel>
          </Col>
          <Col smOffset={1} sm={3}>
            <FormControl componentClass='select' defaultValue={props.mode} onChange={props.onChangeMode}>
              <option value='Arcade'>Arcade</option>
              <option value='Practice'>Practice</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={3} sm={2}>
            <ControlLabel>Difficulty:</ControlLabel>
          </Col>
          <Col smOffset={1} sm={3}>
            <FormControl componentClass='select' defaultValue={props.difficulty} onChange={props.onChangeDifficulty}>
              <option value='Easy'>Easy</option>
              <option value='Medium'>Medium</option>
              <option value='Hard'>Hard</option>
              <option value='Random'>Random</option>
            </FormControl>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col smOffset={3} sm={2}>
            <ControlLabel>Editor:</ControlLabel>
          </Col>
          <Col smOffset={1} sm={3}>
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
