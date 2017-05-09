
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import Hello from './Hello';
import UserData from '../model/UserData';
import Navbar from './Navbar';

/**
 * Top-level component for the app. This is rendered in App.jsx.
 */
export default class ArcadeMode extends Component {

  constructor(props) {
    super(props);
    this.onClickCallback = this.onClickCallback.bind(this);
  }

  onClickCallback(e) {
    const target = e.target;
    this.props.runTest(target);
  }

  render() {
    return (
      <div>
        <Navbar />
        <Grid fluid>
          <Row className='show-grid'>
            <Col className='arcade-panel' xs={12} sm={12} md={4} lg={4}>
              This is the info panel.
            </Col>
            <Col className='editor' xs={12} sm={12} md={8} lg={8}>
              This is where the editor should go.
            </Col>
          </Row>
        </Grid>
        <h1>ArcadeMode</h1>
        <Hello />
        <button onClick={this.onClickCallback}>Run</button>
        <p>Userdata given: {this.props.userData.username} </p>
      </div>
    );
  }

}

ArcadeMode.propTypes = {
  runTest: PropTypes.func.isRequired,
  userData: PropTypes.instanceOf(UserData).isRequired
};
