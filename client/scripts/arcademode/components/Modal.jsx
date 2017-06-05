
'use strict';

import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Modal, Button, Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

const ArcadeModal = props => {
  const options = props.appConfig.get('options').toJS();

  const callbacks = {
    Mode: props.onChangeMode,
    Difficulty: props.onChangeDifficulty,
    Challenge: props.onChangeChallengeType,
    Editor: props.onChangeEditor
  };
  const defaults = {
    Mode: props.mode,
    Difficulty: props.difficulty,
    Challenge: props.challengeType,
    Editor: props.editor
  };

  const optionDescrJsx = getOptionsDescription(options);
  const dropdownMenus = getDropdownMenus(props, options, callbacks, defaults);
  return (
    <Modal show={props.modal} onHide={props.onModalClose} animation={false} backdrop='static'>
      <Modal.Header>
        <Modal.Title className='am__modal__title'>
          Arcade Mode
        </Modal.Title>
        <p className='am__modal__description'>
          Level up your algorithms and data structures ability.
        </p>
      </Modal.Header>
      <Modal.Body>
        {optionDescrJsx}
      </Modal.Body>
      <Modal.Footer>
        <Form horizontal>
          {dropdownMenus}
          <br />
          <FormGroup className='am__modal__submit'>
            <Button type='button' onClick={props.onModalClose}>Submit</Button>
          </FormGroup>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};


function getOptionsDescription(opts) {
  const optNames = Object.keys(opts);
  let key = 0;
  const result = optNames.map(optName => {
    if (opts[optName].showDescription) {
      const descriptions = getSubOptionDescription(opts[optName]);
      return (
        <div key={key++}>
          <p className='am__modal__setting'>{optName}</p>
          <Grid fluid>
            {descriptions}
          </Grid>
        </div>
      );
    }
    return null;
  });
  return result;
}

function getSubOptionDescription(opt) {
  const subOpts = Object.keys(opt.options);
  let key = 0;
  const result = subOpts.map(name => {
    const subOpt = opt.options[name];
    let description = null;
    if (subOpt.description) {
      description = subOpt.description;
    }
    return (
      <Row key={key++}>
        <Col className='am__modal__option' sm={3}>
          {name}
        </Col>
        <Col sm={9}>
          {description}
        </Col>
      </Row>
    );
  });
  return result;
}

/* Generates the dropdown menus based on the app configuration. */
function getDropdownMenus(props, opts, callbacks, defaults) {
  // Map callbacks to specific option names
  const optNames = Object.keys(opts);
  let formGroupKey = 0;
  const result = optNames.map(name => {
    const subOpts = Object.keys(opts[name].options);

    if (!opts[name].showDropdownMenu) {
      return null;
    }

    let key = 0;
    const optionElems = subOpts.map(subOptName =>
      <option key={key++} value={subOptName}>{subOptName}</option>
    );

    return (
      <FormGroup key={formGroupKey++}>
        <Col smOffset={2} sm={2}>
          <ControlLabel>{name}:</ControlLabel>
        </Col>
        <Col smOffset={2} sm={4}>
          <FormControl
            componentClass='select' defaultValue={defaults[name]} onChange={callbacks[name]}
          >
            {optionElems}
          </FormControl>
        </Col>
      </FormGroup>
    );
  });
  return result;
}

ArcadeModal.propTypes = {
  mode: PropTypes.string.isRequired,
  onChangeMode: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  onChangeDifficulty: PropTypes.func.isRequired,
  editor: PropTypes.string.isRequired,
  onChangeEditor: PropTypes.func.isRequired,
  modal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  challengeType: PropTypes.string.isRequired,
  onChangeChallengeType: PropTypes.func.isRequired,
  appConfig: ImmutablePropTypes.map.isRequired
};

export default ArcadeModal;
