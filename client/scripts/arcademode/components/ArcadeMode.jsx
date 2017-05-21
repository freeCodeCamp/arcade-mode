
'use strict';

import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import Modal from './Modal';
import Navbar from './Navbar';
import Statusbar from './Statusbar';
import Editor from './Editor';
import ChallengePanel from './ChallengePanel';
import UserProfile from './UserProfile';

import UserData from '../models/UserData';

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
    this.onClickShowHideProfile = this.onClickShowHideProfile.bind(this);
    this.onClickSaveSession = this.onClickSaveSession.bind(this);
  }

  /* Loads stored user data */
  componentDidMount() {
    this.props.loadUserData();
  }

  onClickNextChallenge() {
    const startTime = new Date().getTime();
    const obj = {
      startTime,
      currChallenge: this.props.currChallenge
    };
    this.props.nextChallenge(obj);
  }

  onClickRunTests() {
    if (!this.props.isRunningTests) {
      this.props.runTests(this.props.code, this.props.currChallenge);
    }
  }

  onClickStartChallenge() {
    const startTime = new Date().getTime();
    this.props.startChallenge(startTime);
    if (this.props.mode === 'Arcade') {
      this.props.startTimer(this.props.timerMaxValue);
    }
  }

  onClickFinishSession() {
    if (!this.props.isTimerFinished) {
      this.props.stopTimer();
    }
    this.props.finishSession();
  }

  // TODO: Does too many things. Persisting data could go to redux middleware
  onClickSaveSession() {
    if (this.props.isSessionFinished) {
      this.props.saveSession();
      this.props.saveUserData(this.props.currSession);
    }
  }

  /* Inserts the solution for current challenge into the editor. */
  onClickSolve() {
    this.props.solveChallenge();
  }

  onClickShowHideProfile() {
    if (this.props.isProfileShown) {
      this.props.hideProfile();
    }
    else {
      this.props.showProfile();
    }
  }


  onCodeChange(newCode) {
    console.log('Emitting new code from <ArcadeMode>');
    this.props.onCodeChange(newCode);
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
          <p>Your number of attempts across all challenges: {this.props.totalAttempts}</p>
          <p>
              You completed {this.props.challengeNumber} challenges in {this.props.timeUsed} time.
          </p>
          <p>You can save your session by clicking Save. Saved sessions can be viewed from the
            profile. Click Start to play again.</p>
          { !this.props.isSessionSaved &&
          <button className='btn btn-success' onClick={this.onClickSaveSession}>Save</button>
          }
          { this.props.isSessionSaved &&
            <p className='text-success'>Your session has been saved.</p>
          }
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
    const passFailResult = this.processTestResults();
    const nextChallengeButton = this.renderNextChallengeButton(passFailResult);

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

        <button
          className='btn btn-default'
          onClick={this.onClickShowHideProfile}
        >
          Show/Hide Profile
        </button>

        <Grid fluid>
          { this.props.isProfileShown &&
            <Row className='show-grid'>
              <UserProfile
                userData={this.props.userData}
                deleteSession={this.props.deleteSession}
              />
            </Row>
          }
          { !this.props.isProfileShown &&
          <Row className='show-grid'>

            <Col className='arcade-panel-left' xs={12} sm={12} md={4} lg={4}>

              <ChallengePanel
                onClickStartChallenge={this.onClickStartChallenge}
                onClickRunTests={this.onClickRunTests}
                onClickSolve={this.onClickSolve}
                onClickFinishSession={this.onClickFinishSession}
                isSessionStarted={this.props.isSessionStarted}
                isTimerFinished={this.props.isTimerFinished}
                title={this.props.title}
                userOutput={this.props.userOutput}
                description={this.props.description}
                testResults={this.props.testResults}
                editor={this.props.editor}
              />

            </Col>

            <Col className='arcade-panel-right' xs={12} sm={12} md={8} lg={8}>
              {statusBar}
              {editorBody}
              {nextChallengeButton}
            </Col>
          </Row>
          }
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
  challengeNumber: PropTypes.number.isRequired,
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
  currSession: ImmutablePropTypes.map.isRequired,
  totalAttempts: PropTypes.number.isRequired,
  sessionScore: PropTypes.number.isRequired,
  saveSession: PropTypes.func.isRequired,
  finishSession: PropTypes.func.isRequired,
  isSessionStarted: PropTypes.bool.isRequired,
  isSessionFinished: PropTypes.bool.isRequired,
  isSessionSaved: PropTypes.bool.isRequired,

  // test
  runTests: PropTypes.func.isRequired,
  testResults: ImmutablePropTypes.list.isRequired,
  isRunningTests: PropTypes.bool.isRequired,

  // timer
  startTimer: PropTypes.func.isRequired,
  timeLeft: PropTypes.string.isRequired,
  onTimerMaxValueChange: PropTypes.func.isRequired,
  timerMaxValue: PropTypes.number.isRequired,
  isTimerFinished: PropTypes.bool.isRequired,
  timeUsed: PropTypes.string.isRequired,
  stopTimer: PropTypes.func.isRequired,

  // profile
  isProfileShown: PropTypes.bool.isRequired,
  hideProfile: PropTypes.func.isRequired,
  showProfile: PropTypes.func.isRequired,
  userData: PropTypes.instanceOf(UserData).isRequired,
  loadUserData: PropTypes.func.isRequired,
  saveUserData: PropTypes.func.isRequired,
  deleteSession: PropTypes.func.isRequired

};
