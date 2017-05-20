
'use strict';

import { List, Map } from 'immutable';

/* A class for storing user information regarding the arcade sessions played. */
export default class UserData {

  constructor(inputJSON = undefined) {
    if (inputJSON) {
      this.fromJSON(inputJSON);
    }

    this.sessions = List([
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
    ]);
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
  toJSON() {
    return JSON.stringify({
      sessions: JSON.stringify(this.sessions)
    });
  }

  /* Reconstructs the object from JSON. */
  fromJSON(inputJSON) {
    let obj = inputJSON;
    if (typeof obj === 'string') {
      obj = JSON.parse(obj);
    }
    this.sessions = obj.sessions;
  }

}

