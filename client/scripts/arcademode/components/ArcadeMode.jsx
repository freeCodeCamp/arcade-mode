
'use strict';

import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import CodeMirror from 'react-codemirror';
import { Grid, Row, Col } from 'react-bootstrap';

import Modal from './Modal';
import Navbar from './Navbar';
import Statusbar from './Statusbar';
import Editor from './Editor';

const outputOptions = {
  readOnly: true,
  theme: 'monokai',
  scrollbarStyle: 'null',
  lineWrapping: true,
  mode: '',
  json: true
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
    this.onClickSolve = this.onClickSolve.bind(this);
  }

  onCodeChange(newCode) {
    console.log('Emitting new code from <ArcadeMode>');
    this.props.onCodeChange(newCode);
  }

  onClickNextChallenge() {
    const startTime = new Date().getTime();
    this.props.nextChallenge(startTime);
  }

  onClickRunTests() {
    this.props.runTests(this.props.code, this.props.currChallenge);
  }

  onClickStartChallenge() {
    const startTime = new Date().getTime();
    this.props.startChallenge(startTime);
    this.props.startTimer(this.props.timerMaxValue);
  }

  onClickFinishSession() {
    this.props.finishSession();
  }

  /* Inserts the solution for current challenge into the editor. */
  onClickSolve() {
    this.props.solveChallenge();
  }

  onTimerMaxValueChange(e) {
    const inputValue = e.target.value;
    this.props.onTimerMaxValueChange(inputValue);
  }

  processTestResults() {
    const results = this.props.testResults;
    let testsOk = true;
    if (results.size) {
      results.forEach(result => { testsOk = testsOk && result.pass; });
    }
    else testsOk = false;
    return testsOk;
  }

  /* TODO: Add limit to the number of printed tests. Improve output. */
  renderTestResults() {
    const results = this.props.testResults;
    let testsOk = true;
    let individualTests;
    if (results.size) {
      individualTests = results.map((item, index) => {
        const result = item.pass ? 'Pass' : 'Fail';
        const className = item.pass ? 'text-success' : 'text-danger';
        testsOk = testsOk && item.pass;

        // If test had error, format the error message here
        let msg = null;
        if (item.error !== null) {
          const innerHtml = { __html: `Error: ${item.error.message}` };
          msg = <p dangerouslySetInnerHTML={innerHtml} />;
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

  renderStatusbar() {
    if (this.props.mode !== 'Arcade') {
      return null;
    }
    return (
      <Statusbar
        lives={this.props.lives}
        timeLeft={this.props.timeLeft}
        passOption={this.props.passOption}
        onClickPass={this.props.onClickPass}
        sessionScore={this.props.sessionScore}
      />
    );
  }

  renderEditor() {
    const editorClassName = this.props.mode === 'Arcade' ? 'editor--statusbar' : 'editor';
    if (this.props.isSessionFinished) {
      return (
        <div className='session-finished'>
          <h2 className='text-danger'>Game Over!</h2>
          <p>Your final score: {this.props.sessionScore}</p>
          <p>You completed NN challenges in XX time.</p>
          <p>Click Start to play again.</p>
        </div>
      );
    }
    return (
      <Editor
        classN={editorClassName}
        editor={this.props.editor}
        onCodeChange={this.onCodeChange}
        code={this.props.code}
      />
    );
  }

    /* Returns either button for next challenge or button to finish the
     * challenge.*/
  renderNextChallengeButton(passFailResult) {
    if (!this.props.isSessionFinished) {
      if (this.props.isTimerFinished || this.props.lives < 1) {
        return (
          <button className={'btn btn-danger btn-block'} onClick={this.onClickFinishSession}>Finish Session</button>
        );
      }
      if (passFailResult) {
        return (
          <button className={'btn btn-info btn-block'} onClick={this.onClickNextChallenge}>Continue to next challenge!</button>
        );
      }
    }
    return null;
  }

  render() {
    const statusBar = this.renderStatusbar();
    const editorBody = this.renderEditor();
    const testResults = this.renderTestResults();
    const passFailResult = this.processTestResults();
    const descr = this.props.description.join('\n');
    const nextChallengeButton = this.renderNextChallengeButton(passFailResult);
    function createMarkup() {
      return { __html: descr };
    }

    let finishButton = null;
    if (this.props.isTimerFinished) {
      finishButton = (
        <button className='btn btn-danger' onClick={this.onClickFinishSession}>Finish</button>
      );
    }

    /* eslint react/no-danger: 0 */
    return (
      <div>
        <Modal
          mode={this.props.mode}
          onChangeMode={this.props.onChangeMode}
          difficulty={this.props.difficulty}
          onChangeDifficulty={this.props.onChangeDifficulty}
          editor={this.props.editor}
          onChangeEditor={this.props.onChangeEditor}
          modal={this.props.modal}
          onModalClose={this.props.onModalClose}
        />
        <Navbar />
        {/*
          onTimerMaxValueChange={this.onTimerMaxValueChange}
          sessionScore={this.props.sessionScore}
          timeLeft={this.props.timeLeft}
          timerMaxValue={this.props.timerMaxValue}
        */}
        <Grid fluid>
          <Row className='show-grid'>

            <Col className='arcade-panel-left' xs={12} sm={12} md={4} lg={4}>

              <div className='challenge__buttons'>
                <button className={'btn btn-success'} onClick={this.onClickStartChallenge}>Start</button>
                {this.props.isSessionStarted &&
                  <button className={'btn btn-primary'} onClick={this.onClickRunTests}>Run tests</button>
                }
                {finishButton}
              </div>
              <div className='challenge__buttons'>
                {this.props.isSessionStarted &&
                  <button className={'btn btn-warning'} onClick={this.onClickSolve}>Insert Solution</button>
                }
              </div>

              <div className='challenge__title'>{this.props.title}</div>
              <div className='challenge__description' dangerouslySetInnerHTML={createMarkup()} />

              <div className={'output'}>
                <CodeMirror
                  options={outputOptions}
                  value={this.props.userOutput}
                />
              </div>
              {testResults}
            </Col>

            <Col className='arcade-panel-right' xs={12} sm={12} md={8} lg={8}>
              {statusBar}
              {editorBody}
              {nextChallengeButton}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

ArcadeMode.propTypes = {
  // game settings
  mode: PropTypes.string.isRequired,
  onChangeMode: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  onChangeDifficulty: PropTypes.func.isRequired,
  editor: PropTypes.string.isRequired,
  onChangeEditor: PropTypes.func.isRequired,

  // player status
  lives: PropTypes.number.isRequired,
  passOption: PropTypes.bool.isRequired,
  onClickPass: PropTypes.func.isRequired,

  // modal
  modal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,

  // challenge
  startChallenge: PropTypes.func.isRequired,
  currChallenge: ImmutablePropTypes.map.isRequired,
  title: PropTypes.string.isRequired,
  description: ImmutablePropTypes.list.isRequired,
  nextChallenge: PropTypes.func.isRequired,
  solveChallenge: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  userOutput: PropTypes.string.isRequired,

  // session
  sessionScore: PropTypes.number.isRequired,
  finishSession: PropTypes.func.isRequired,
  isSessionStarted: PropTypes.bool.isRequired,
  isSessionFinished: PropTypes.bool.isRequired,

  // test
  runTests: PropTypes.func.isRequired,
  testResults: ImmutablePropTypes.list.isRequired,

  // timer
  startTimer: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
  onTimerMaxValueChange: PropTypes.func.isRequired,
  timerMaxValue: PropTypes.string.isRequired,
  isTimerFinished: PropTypes.bool.isRequired
};
