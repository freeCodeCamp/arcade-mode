
/* Contains factory methods for unit tests. */

import { List, Map } from 'immutable';

import UserData from '../../client/scripts/arcademode/models/UserData';

export function createChallenge() {
  return {
    title: '',
    solution: '',
    description: ''
  };
}

export function createSessionWithNChallenges(n = 0) {
  let session = Map({ challenges: List([]) });
  for (let i = 0; i < n; i++) {
    const challenge = createChallenge();
    const challenges = session.get('challenges').push(challenge);
    session = session.set('challenges', challenges);
  }
  return session;
}

export function createUserDataWithNSessions(n = 0) {
  let userData = new UserData();
  for (let i = 0; i < n; i++) {
    const session = createSessionWithNChallenges();
    userData = userData.appendSession(session);
  }
  return userData;
}
