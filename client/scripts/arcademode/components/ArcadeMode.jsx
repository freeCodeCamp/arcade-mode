
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
    this.onClickNextChallenge = this.onClickNextChallenge.bind(this);
    this.onClickStartChallenge = this.onClickStartChallenge.bind(this);
    this.onClickFinishSession = this.onClickFinishSession.bind(this);
    this.onCodeChange = this.onCodeChange.bind(this);
    this.onTimerMaxValueChange = this.onTimerMaxValueChange.bind(this);
  }

  onCodeChange(newCode) {
    console.log('Emitting new code from <ArcadeMode>');
    this.props.onCodeChange(newCode);
  }

  onClickNextChallenge() {
    this.props.nextChallenge();
  }

  onClickRunTests() {
    this.props.runTests(this.props.code, this.props.currChallenge);
  }

  onClickStartChallenge() {
    this.props.startChallenge();
    this.props.startTimer();
  }

  onClickFinishSession() {
    this.props.finishSession();
  }

  onTimerMaxValueChange(e) {
    const inputValue = e.target.value;
    if (inputValue.length > 0) {
      const maxValue = parseInt(e.target.value, 10);
      this.props.onTimerMaxValueChange(maxValue);
    }
  }

  processTestResults() {
    const results = this.props.testResults.testResults;
    let testsOk = true;
    if (results.length) {
      results.forEach(result => { testsOk = testsOk && result.pass; });
    }
    else testsOk = false;
    return testsOk;
  }


  /* TODO: Add limit to the number of printed tests. Improve output. */
  renderTestResults() {
    const results = this.props.testResults.testResults;
    let testsOk = true;
    let individualTests;
    if (results.length) {
      individualTests = results.map((item, index) => {
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
    }
    else {
      testsOk = false;
    }

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
    const passFailResult = this.processTestResults();
    const descr = this.props.description.join('\n');
    function createMarkup() {
      return { __html: descr };
    }

    let finishButton = null;
    // Should move out of render
    if (this.props.timeLeft <= 0) {
      this.props.stopTimer();
      finishButton = (
        <button className='btn btn-danger' onClick={this.onClickFinishSession}>Finish</button>
      );
    }

    return (
      <div>
        <Navbar
          timeLeft={this.props.timeLeft}
          onTimerMaxValueChange={this.onTimerMaxValueChange}
          timerMaxValue={this.props.timerMaxValue}
        />
        <Grid fluid>
          <Row className='show-grid'>

            <Col className='arcade-panel' xs={12} sm={12} md={4} lg={4}>
              <p>This is the info panel.</p>
              <div className='challenge__title'>{this.props.title}</div>
              <div className='challenge__description' dangerouslySetInnerHTML={createMarkup()} />
              <div className='challenge__buttons'>
                <button className={'btn btn-success'} onClick={this.onClickStartChallenge}>Start</button>
                <button className={'btn btn-primary'} onClick={this.onClickRunTests}>Run tests</button>
                {finishButton}
              </div>
              <p>Userdata given: {this.props.userData.username} </p>
              <div className={'output'}>
                <CodeMirror
                  options={outputOptions}
                  value={this.props.userOutput}
                />
              </div>
              {testResults}
            </Col>

            <Col className='arcade-editor' xs={12} sm={12} md={8} lg={8}>
              This is where the editor should go.
              <div className={'editor'}>
                <CodeMirror
                  onChange={this.onCodeChange}
                  options={editorOptions}
                  value={this.props.code}
                />
              </div>
              {passFailResult &&
                <button className={'btn btn-info btn-block'} onClick={this.onClickNextChallenge}>Continue to next challenge!</button>
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }


}

ArcadeMode.propTypes = {
  currChallenge: PropTypes.instanceOf(Challenge).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.array.isRequired,
  userOutput: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  nextChallenge: PropTypes.func.isRequired,
  finishSession: PropTypes.func.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  runTests: PropTypes.func.isRequired,
  userData: PropTypes.instanceOf(UserData).isRequired,
  startChallenge: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  testResults: PropTypes.instanceOf(TestResults).isRequired,
  timeLeft: PropTypes.number.isRequired,
  onTimerMaxValueChange: PropTypes.func.isRequired,
  timerMaxValue: PropTypes.number.isRequired
};
