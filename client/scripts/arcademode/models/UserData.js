
'use strict';

import { List, Map, Record } from 'immutable';

const recordDefs = {
  // sessions: List([])
  sessions: List([
    Map({
      id: 0,
      mode: 'Practice',
      challenges: List([{ id: 0 }, { id: 1 }])

    }),
    Map({
      id: 1,
      mode: 'Arcade',
      challenges: List([{ id: 0 }, { id: 1 }])
    })
  ])
};

/* A class for storing user information regarding the arcade sessions played. */
export default class UserData extends Record(recordDefs) {

  appendSession(session) {
    const newSession = session.set('id', this.get('sessions').size);
    return this.set('sessions', this.get('sessions').push(newSession));
  }

  getSession(n) {
    if (n < this.sessions.size) {
      return this.sessions.get(n);
    }
    return null;
  }

  /* Returns challenges for given session. */
  getChallengesForSession(n) {
    if (n < this.sessions.size) {
      return this.sessions.get(n).get('challenges');
    }
    return null;
  }

  /* Serializes UserData to JSON. */
  /* toJSON() {
    return JSON.stringify({
      sessions: JSON.stringify(this.sessions)
    });
  }*/

  /* Reconstructs the object from JSON. */
  fromJSON(inputJSON) {
    let obj = inputJSON;
    if (typeof obj === 'string') {
      obj = JSON.parse(obj);
    }
    this.sessions = obj.sessions;
  }

}

