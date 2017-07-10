

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ImmutablePropTypes from 'react-immutable-proptypes';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import UserData from '../models/UserData';
import { printTime } from '../reducers/timer';

/* Component which shows the user profile consisting of all past sessions and
 * challenges the user has completed. */
export default class UserProfile extends Component {

  constructor(props) {
    super(props);
    this.toggleChallengeView = this.toggleChallengeView.bind(this);
    this.toggleSessionView = this.toggleSessionView.bind(this);
    this.deleteSession = this.deleteSession.bind(this);
  }

  toggleChallengeView(sessionId, challengeId) {
    this.props.toggleChallengeView(sessionId, challengeId);
  }

  toggleSessionView(sessionId) {
    this.props.toggleSessionView(sessionId);
  }

  deleteSession(session) {
    this.props.deleteSession(session);
  }

  // TODO: Refactor into own component <ProfileChallenge> to avoid bind in props
  renderChallenges(sessionId, challenges) {
    const expandStatus = this.props.sessionExpandStatus.getIn([sessionId, 'challenges']);
    const challengesJsx = challenges.map((challenge, index) => {
      const isExpanded = expandStatus.get(index);
      const callback = this.toggleChallengeView.bind(this, sessionId, index);
      const timeShown = printTime(challenge.get('endTime') - challenge.get('startTime'));

      let challengeExpandedBody = null;
      if (isExpanded) {
        challengeExpandedBody = <p>Challenge expanded. Code: {challenge.get('code')}</p>;
      }
      return (
        <ListGroupItem
          key={challenge.get('id')}
          onClick={callback}
        >
          Challenge {challenge.id}: <code>{challenge.get('title')}</code> |
          Attempts: {challenge.get('attempts')} |
          Time: {timeShown}
          {challengeExpandedBody}
        </ListGroupItem>
      );
    });
    return challengesJsx;
  }

  renderSessions() {
    if (!this.props.userData) {
      return (
        <ListGroupItem>You have not completed any sessions yet.</ListGroupItem>
      );
    }
    const sessions = this.props.userData.sessions.map((session, index) => {
      const sessionId = session.get('id');
      const score = session.get('score');

      const startTime = session.get('startTime');
      const endTime = session.get('endTime');
      const sessionDuration = printTime(endTime - startTime);

      let expandButtonText = 'Show';
      let challenges = null;
      let numChallenges = 0;
      const isExpanded = this.props.sessionExpandStatus.get(index).get('expanded');
      if (session.get('challenges')) {
        if (isExpanded) {
          challenges = this.renderChallenges(index, session.get('challenges'));
          expandButtonText = 'Hide';
        }
        numChallenges = session.get('challenges').size;
      }
      // TODO: Refactor into own component <ProfileSession> to avoid bind
      return (
        <ListGroupItem
          key={sessionId}
        >
          Session: {sessionId} Score: {score} Challenges: {numChallenges} Duration: {sessionDuration}
          <div className='profile-buttons'>
            <button className='btn btn-sm' onClick={this.toggleSessionView.bind(this, index)}>
              {expandButtonText}
            </button>
            <button className='btn btn-sm btn-danger' onClick={this.deleteSession.bind(this, session)}>Delete</button>
          </div>
          <ListGroup>
            {challenges}
          </ListGroup>
        </ListGroupItem>
      );
    });
    return sessions;
  }

  render() {
    const sessions = this.renderSessions();
    return (
      <div className='user-profile'>
        <h1>User Profile</h1>
        <button className='btn btn-default btn-big btn-block' onClick={this.props.onClickShowHideProfile}>Hide Profile</button>
        <p>You can view your past sessions here. By clicking on a session, you can expand it
          to view all challenges completed during that session.
        </p>
        <div className='profile-data'>
          <ListGroup>
            {sessions}
          </ListGroup>
        </div>
      </div>
    );
  }

}

UserProfile.propTypes = {
  onClickShowHideProfile: PropTypes.func.isRequired,
  userData: PropTypes.instanceOf(UserData).isRequired,
  deleteSession: PropTypes.func.isRequired,
  toggleSessionView: PropTypes.func.isRequired,
  toggleChallengeView: PropTypes.func.isRequired,
  sessionExpandStatus: ImmutablePropTypes.list.isRequired
};
