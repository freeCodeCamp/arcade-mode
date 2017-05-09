
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import { Grid, Row, Col } from 'react-bootstrap';

import UserData from '../model/UserData';
import CodeRetVal from '../model/CodeRetVal';
import Navbar from './Navbar';

const editorOptions = {
  theme: 'monokai',
  scrollbarStyle: 'null',
  lineWrapping: true,
  mode: 'javascript',
  matchBrackets: true,
  autoCloseBrackets: true,
  /*
  lineNumbers: true, // seems to break the css/dimensions
  lint: { esversion: 6 },
  runnable: true,
  gutters: ['CodeMirror-lint-markers']
  inputStyle: 'contenteditable'
  */
};

/**
 * Top-level component for the app. This is rendered in App.jsx.
 */
export default class ArcadeMode extends Component {

  constructor(props) {
    super(props);
    this.onClickCallback = this.onClickCallback.bind(this);

    this.onCodeChange = this.onCodeChange.bind(this);
  }

  onCodeChange(newCode) {
    console.log('Emitting new code from <ArcadeMode>');
    this.props.onCodeChange(newCode);
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
              <p>This is the info panel.</p>
              <button className={'btn btn-primary'} onClick={this.onClickCallback}>Run tests</button>
              <p>Your code returned: {this.props.codeRetVal.toString()}</p>
              <p>Userdata given: {this.props.userData.username} </p>
            </Col>

            <Col className='editor' xs={12} sm={12} md={8} lg={8}>
              This is where the editor should go.
              <div className={'editor'}>
                <CodeMirror
                  onChange={this.onCodeChange}
                  options={editorOptions}
                  value={this.props.code}
                />
              </div>
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }

}

ArcadeMode.propTypes = {
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  codeRetVal: PropTypes.instanceOf(CodeRetVal).isRequired,
  runTest: PropTypes.func.isRequired,
  userData: PropTypes.instanceOf(UserData).isRequired
};
