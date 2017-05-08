
'use strict';

import React, { Component } from 'react';
import Hello from './Hello';
import UserData from '../model/UserData';

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
        <h1>ArcadeMode</h1>
        <Hello />
        <button onClick={this.onClickCallback}>Run</button>
        <p>Userdata given: {this.props.userData.username} </p>
      </div>
    );
  }

}

ArcadeMode.propTypes = {
  runTest: React.PropTypes.func.isRequired,
  userData: React.PropTypes.objectOf(UserData).isRequired
};
