'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';


const Statusbar = props => (
  <Grid fluid className='am__statusbar'>
    <Row>
      {props.useLives &&
      <Col xs={6} sm={3}>
        <img className='am__statusbar__lives-logo' src='public/img/FCCfire.svg' alt='Lives' /> x {props.lives}
      </Col>
      }
      <Col xs={4} sm={4}>
        <span className='am__statusbar__text'>Time left:</span> {props.timeLeft}
      </Col>
      {/*
      <Col xs={6} sm={3}>
        {
          (props.skipOption && props.isSessionStarted) ?
            <Button bsSize='xsmall' onClick={props.onClickSkip}>
              <span className='am__statusbar__btn'>Skip</span>
            </Button> :
            <Button bsSize='xsmall' disabled>
              <span className='am__statusbar__btn'>Skip</span>
            </Button>
        }
      </Col>
     */}
      <Col xs={4} sm={4}>
        <span className='am__statusbar__text'>Bonus:</span> x{props.streakMultiplier}
      </Col>
      <Col xs={4} sm={4}>
        <span className='am__statusbar__text'>Points:</span> {props.sessionScore}
      </Col>
    </Row>
  </Grid>
);

Statusbar.propTypes = {
  lives: PropTypes.number.isRequired,
  timeLeft: PropTypes.string.isRequired,
//  skipOption: PropTypes.bool.isRequired,
//  onClickSkip: PropTypes.func.isRequired,
  sessionScore: PropTypes.number.isRequired,
//  isSessionStarted: PropTypes.bool.isRequired,
//  streakMultiplier: PropTypes.number.isRequired,
  useLives: PropTypes.bool.isRequired
};

export default Statusbar;
