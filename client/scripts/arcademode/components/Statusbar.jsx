'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Button } from 'react-bootstrap';


const Statusbar = props => (
  <Grid>
    <Row>
      <Col sm={4}>
        Lives: x {props.lives}
      </Col>
      <Col sm={4}>
        Time left: {props.timeLeft}
      </Col>
      <Col sm={4}>
        { props.passOption ?
          <Button onClick={props.onClickPass}>Pass</Button> :
          <Button disabled>Pass</Button>
        }
      </Col>
      <Col sm={4}>
        Score: {props.sessionScore}
      </Col>
    </Row>
  </Grid>
);

Statusbar.propTypes = {
  lives: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired,
  passOption: PropTypes.bool.isRequired,
  onClickPass: PropTypes.func.isRequired,
  sessionScore: PropTypes.number.isRequired
};

export default Statusbar;
