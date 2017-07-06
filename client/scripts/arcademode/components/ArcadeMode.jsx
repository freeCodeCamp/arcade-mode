
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
import SocialMediaLinks from './SocialMediaLinks';

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
    this.onClickBenchmark = this.onClickBenchmark.bind(this);
    this.onClickShowHideProfile = this.onClickShowHideProfile.bind(this);
    this.onClickSaveSession = this.onClickSaveSession.bind(this);
  }

  componentDidMount() {
    // TODO:
    // this.props.loadContent();
    // check if IDB @ generalStorage exists, if not download everything into IDB
      // option A: retrieve each individual item from IDB; disk read
      // option B: load everything into RAM?
    // if error in downloading everything, set flag to have everything fetched from network
    // if not found in IDB or network flag set, fetch from network

    // Load stored user data
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

    window.onbeforeunload = null; // no confirm to leave since starting new
  }

  onClickFinishSession() {
    const timeNow = new Date().getTime();
    this.props.stopTimer(timeNow);
    this.props.finishSession(timeNow);
  }

  // TODO: Does too many things. Persisting data could go to redux middleware
  onClickSaveSession() {
    if (this.props.isSessionFinished) {
      this.props.saveSession();
      this.props.saveUserData(this.props.currSession);
    }

    window.onbeforeunload = null; // on save, remove confirmation requirement to leave.
  }

  /* Inserts the solution for current challenge into the editor. */
  onClickSolve() {
    this.props.solveChallenge();
  }

  onClickBenchmark() {
    this.props.runBenchmark(this.props.code, this.props.currChallenge);
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

    console.log(this.props.challengesCompleted);

    // if no changes made in editor and no challenges completed, leave page without prompt
    if (this.props.code === this.props.currChallenge.toJS().challengeSeed.join('\n')
       && this.props.challengesCompleted === 0) {
      window.onbeforeunload = null;
    }
    else {
      window.onbeforeunload = function () { return true; };
    }
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

  /* Checks if player is out of lives. Move to reducer? */
  isOutOfLives() {
    if (this.props.appConfig.lives) {
      return (this.props.lives < 1 && this.props.mode === 'Arcade');
    }
    return false;
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
        isSessionStarted={this.props.isSessionStarted}
        streakMultiplier={this.props.streakMultiplier}
        useLives={this.props.appConfig.get('lives')}
      />
    );
  }

  renderEditor() {
    const useSocialMediaLinks = true;
    const editorClassName = this.props.mode === 'Arcade' ? 'editor--statusbar' : 'editor';
    if (this.props.isSessionFinished) {
      return (
        <div className='session-finished'>
          <h2 className='text-danger'>Game Over!</h2>
          <p>Your final score: {this.props.sessionScore}</p>
          <p>Your number of attempts across all challenges: {this.props.totalAttempts}</p>
          {this.props.challengesCompleted === 1 &&
            <p>You completed {this.props.challengesCompleted} challenge in {this.props.timeUsed}.</p>
          }
          {(this.props.challengesCompleted === 0 || this.props.challengesCompleted > 1) &&
            <p>You completed {this.props.challengesCompleted} challenges in {this.props.timeUsed}.</p>
          }
          <p>Click Start to play again or Menu to return to the main menu</p>


          { this.props.isSessionSaved &&
            <p className='text-success'>Your session has been saved.</p>
          }
          { !this.props.isSessionSaved &&
            <button className='btn btn-success' onClick={this.onClickSaveSession}>Save</button>
          }

          {useSocialMediaLinks &&
            <SocialMediaLinks
              appConfig={this.props.appConfig}
              score={this.props.sessionScore}
            />
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
      if (this.props.isTimerFinished || this.isOutOfLives()) {
        return (
          <button className={'btn btn-danger btn-block'} onClick={this.onClickFinishSession}>Finish Session</button>
        );
      }
      if (passFailResult) {
        window.onbeforeunload = function () { return true; }; // if passed, seek confirm
        return (
          <button className={'btn btn-info btn-block'} onClick={this.onClickNextChallenge}>Continue to next challenge!</button>
        );
      }
    }
    return null;
  }

  render() {
    if (this.props.modal) {
      window.onbeforeunload = null; // remove confirmation to leave on return to menu
    }

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
          challengeType={this.props.challengeType}
          onChangeChallengeType={this.props.onChangeChallengeType}
          appConfig={this.props.appConfig}
          selectedChallenge={this.props.selectedChallenge}
          onChallengeSelect={this.props.onChallengeSelect}
          chosenChallenges={this.props.chosenChallenges}
        />
        <Navbar appConfig={this.props.appConfig} />


        <Grid fluid>
          { this.props.isProfileShown &&
            <Row className='show-grid'>
              <UserProfile
                onClickShowHideProfile={this.onClickShowHideProfile}
                userData={this.props.userData}
                deleteSession={this.props.deleteSession}
                toggleSessionView={this.props.toggleSessionView}
                toggleChallengeView={this.props.toggleChallengeView}
                sessionExpandStatus={this.props.sessionExpandStatus}
              />
            </Row>
          }
          { !this.props.isProfileShown &&
          <Row className='show-grid'>
            <Col className='arcade-panel-left' xs={12} sm={12} md={4} lg={4}>
              <ChallengePanel
                onClickStartChallenge={this.onClickStartChallenge}
                onClickRunTests={this.onClickRunTests}
                onClickShowHideProfile={this.onClickShowHideProfile}
                isProfileShown={this.props.isProfileShown}
                onChangeEditor={this.props.onChangeEditor}
                onClickSolve={this.onClickSolve}
                onClickBenchmark={this.onClickBenchmark}
                onClickFinishSession={this.onClickFinishSession}
                isSessionStarted={this.props.isSessionStarted}
                isSessionFinished={this.props.isSessionFinished}
                isTimerFinished={this.props.isTimerFinished}
                benchmark={this.props.benchmark}
                title={this.props.title}
                userOutput={this.props.userOutput}
                description={this.props.description}
                benchmarkResults={this.props.benchmarkResults}
                testResults={this.props.testResults}
                editor={this.props.editor}
                onModalOpen={this.props.onModalOpen}
                mode={this.props.mode}
                isRunningBenchmark={this.props.isRunningBenchmark}
                isRunningTests={this.props.isRunningTests}
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

ArcadeMode.defaultProps = {
  benchmark: ''
};

ArcadeMode.propTypes = {
  // game settings
  mode: PropTypes.string.isRequired,
  onChangeMode: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  onChangeDifficulty: PropTypes.func.isRequired,
  editor: PropTypes.string.isRequired,
  appConfig: ImmutablePropTypes.map.isRequired,
  onChangeEditor: PropTypes.func.isRequired,

  // player status
  lives: PropTypes.number.isRequired,
  passOption: PropTypes.bool.isRequired,
  onClickPass: PropTypes.func.isRequired,

  // modal
  modal: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  onModalOpen: PropTypes.func.isRequired,

  // challenge
  // challengeNumber: PropTypes.number.isRequired,
  startChallenge: PropTypes.func.isRequired,
  currChallenge: ImmutablePropTypes.map.isRequired,
  title: PropTypes.string.isRequired,
  description: ImmutablePropTypes.list.isRequired,
  benchmark: PropTypes.string,
  nextChallenge: PropTypes.func.isRequired,
  solveChallenge: PropTypes.func.isRequired,
  runBenchmark: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func.isRequired,
  userOutput: PropTypes.string.isRequired,
  challengesCompleted: PropTypes.number.isRequired,
  challengeType: PropTypes.string.isRequired,
  onChangeChallengeType: PropTypes.func.isRequired,
  onChallengeSelect: PropTypes.func.isRequired,
  selectedChallenge: PropTypes.string.isRequired,
  chosenChallenges: PropTypes.array.isRequired,

  // session
  currSession: ImmutablePropTypes.map.isRequired,
  totalAttempts: PropTypes.number.isRequired,
  sessionScore: PropTypes.number.isRequired,
  saveSession: PropTypes.func.isRequired,
  finishSession: PropTypes.func.isRequired,
  isSessionStarted: PropTypes.bool.isRequired,
  isSessionFinished: PropTypes.bool.isRequired,
  isSessionSaved: PropTypes.bool.isRequired,
  streakMultiplier: PropTypes.number.isRequired,

  // test
  runTests: PropTypes.func.isRequired,
  benchmarkResults: ImmutablePropTypes.map.isRequired,
  testResults: ImmutablePropTypes.list.isRequired,
  isRunningBenchmark: PropTypes.bool.isRequired,
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
  deleteSession: PropTypes.func.isRequired,
  toggleSessionView: PropTypes.func.isRequired,
  toggleChallengeView: PropTypes.func.isRequired,
  sessionExpandStatus: ImmutablePropTypes.list.isRequired
};
