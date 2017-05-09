
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
