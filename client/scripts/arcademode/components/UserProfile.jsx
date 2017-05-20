

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

import UserData from '../models/UserData';

function renderChallenges(challenges) {
  const challengesJsx = challenges.map(challenge => {
    return (
      <ListGroupItem key={challenge.get('id')}>
        Challenge {challenge.get('id')}
      </ListGroupItem>
    );
  });
  return challengesJsx;
}

export default class UserProfile extends Component {

  renderSessions() {
    const sessions = this.props.userData.sessions.map(session => {
      const challenges = renderChallenges(session.get('challenges'));
      return (
        <ListGroupItem key={session.get('id')} >
          Session: {session.get('id') }
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
  userData: PropTypes.instanceOf(UserData).isRequired
};
