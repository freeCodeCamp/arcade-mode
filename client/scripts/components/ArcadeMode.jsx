
'use strict';

import React, { Component } from 'react';
import Hello from './Hello';

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
    this.props.runTests(target);
  }

  render() {
    return (
      <div>
        <h1>ArcadeMode</h1>
        <Hello />
        <button onClick={this.onClickCallback}>Run</button>
      </div>
    );
  }

}

ArcadeMode.propTypes = {
  runTests: React.PropTypes.func,
  userData: React.PropTypes.object
};
