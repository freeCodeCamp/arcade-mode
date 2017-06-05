'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';


const Statusbar = props => (
  <Grid fluid className='am__statusbar'>
    <Row>
      {props.useLives &&
      <Col xs={6} sm={3}>
        <img className='am__statusbar__lives-logo' src='public/img/FCCfire.svg' alt='Lives' /> x {props.lives}
      </Col>
      }
      <Col xs={6} sm={3}>
        <span className='am__statusbar__text'>Time left:</span> {props.timeLeft}
      </Col>
      <Col xs={6} sm={3}>
        {
          (props.passOption && props.isSessionStarted) ?
            <Button bsSize='xsmall' onClick={props.onClickPass}>Pass</Button> :
            <Button bsSize='xsmall' disabled>Pass</Button>
        }
      </Col>
      <Col xs={6} sm={3}>
        <span className='am__statusbar__text'>Bonus:</span> x{props.streakMultiplier}
      </Col>
      <Col xs={6} sm={3}>
        <span className='am__statusbar__text'>Score:</span> {props.sessionScore}
      </Col>
    </Row>
  </Grid>
);

Statusbar.propTypes = {
  lives: PropTypes.number.isRequired,
  timeLeft: PropTypes.string.isRequired,
  passOption: PropTypes.bool.isRequired,
  onClickPass: PropTypes.func.isRequired,
  sessionScore: PropTypes.number.isRequired,
  isSessionStarted: PropTypes.bool.isRequired,
  streakMultiplier: PropTypes.number.isRequired,
  useLives: PropTypes.bool.isRequired
};

export default Statusbar;
