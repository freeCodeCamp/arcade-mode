
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import { Grid, Row, Col } from 'react-bootstrap';

import UserData from '../model/UserData';
import TestResults from '../model/TestResults';
import Challenge from '../model/Challenge';
import Navbar from './Navbar';

const outputOptions = {
  readOnly: true,
  theme: 'monokai',
  scrollbarStyle: 'null',
  lineWrapping: true,
  mode: 'javascript',
  json: true
};

// TODO create <CodeEditor> and move options there
const editorOptions = {
  theme: 'monokai',
  scrollbarStyle: 'null',
  lineWrapping: true,
  mode: 'javascript',
  matchBrackets: true,
  autoCloseBrackets: true
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
    this.onClickRunTests = this.onClickRunTests.bind(this);
    this.onClickStartChallenge = this.onClickStartChallenge.bind(this);

    this.onCodeChange = this.onCodeChange.bind(this);
  }

  onCodeChange(newCode) {
    console.log('Emitting new code from <ArcadeMode>');
    this.props.onCodeChange(newCode);
  }

  onClickRunTests(e) {
    const target = e.target;
    this.props.runTests(this.props.code, this.props.currChallenge);
  }

  onClickStartChallenge() {
    this.props.startChallenge();
  }

  /* TODO: Add limit to the number of printed tests. Improve output. */
  renderTestResults() {
    const results = this.props.testResults.testResults;
    let testsOk = true;

    const individualTests = results.map((item, index) => {
      const result = item.pass ? 'Pass' : 'Fail';
      const className = item.pass ? 'text-success' : 'text-danger';
      testsOk = testsOk && item.pass;
      console.log(JSON.stringify(item));

      // If test had error, format the error message here
      let msg = null;
      if (item.error !== null) {
        msg = <p>Error: {item.error.message}</p>;
      }

      return <p className={className} key={index}>Status: {result} {msg}</p>;
    });

    const finalResult = testsOk ? 'All tests passed' : 'There were failing tests';

    return (
      <div>
        {individualTests}
        <p>{finalResult}</p>
      </div>
    );
  }

  render() {
    const testResults = this.renderTestResults();
    return (
      <div>
        <Navbar />
        <Grid fluid>
          <Row className='show-grid'>

            <Col className='arcade-panel' xs={12} sm={12} md={4} lg={4}>
              <p>This is the info panel.</p>
              <button className={'btn btn-success'} onClick={this.onClickStartChallenge}>Start</button>
              <button className={'btn btn-primary'} onClick={this.onClickRunTests}>Run tests</button>
              {/* <p>Your code returned: {this.props.codeRetVal.toString()}</p> */}
              <p>Userdata given: {this.props.userData.username} </p>
              <CodeMirror className='output'
                options={outputOptions}
                value={this.props.userOutput}
              />
              {testResults}
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
  currChallenge: PropTypes.instanceOf(Challenge).isRequired,
  userOutput: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  runTests: PropTypes.func.isRequired,
  userData: PropTypes.instanceOf(UserData).isRequired,
  startChallenge: PropTypes.func.isRequired,
  testResults: PropTypes.instanceOf(TestResults).isRequired
};
