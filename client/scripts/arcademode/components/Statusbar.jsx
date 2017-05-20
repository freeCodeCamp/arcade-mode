'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';


const Statusbar = props => (
  <Grid fluid className='am__statusbar'>
    <Row>
      <Col sm={3}>
        Lives: x {props.lives}
      </Col>
      <Col sm={3}>
        Time left: {props.timeLeft}
      </Col>
      <Col sm={3}>
        { props.passOption ?
          <Button bsSize='xsmall' onClick={props.onClickPass}>Pass</Button> :
          <Button bsSize='xsmall' disabled>Pass</Button>
        }
      </Col>
      <Col sm={3}>
        Score: {props.sessionScore}
      </Col>
    </Row>
  </Grid>
);

Statusbar.propTypes = {
  lives: PropTypes.number.isRequired,
  timeLeft: PropTypes.string.isRequired,
  passOption: PropTypes.bool.isRequired,
  onClickPass: PropTypes.func.isRequired,
  sessionScore: PropTypes.number.isRequired
};

export default Statusbar;
