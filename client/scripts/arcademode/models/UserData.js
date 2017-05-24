
'use strict';

import { List, Record } from 'immutable';

const recordDefs = {
  sessions: List([])
};

/* A class for storing user information regarding the arcade sessions played. Note that due to
* Immutable each setter-method must return a value. */
export default class UserData extends Record(recordDefs) {

  appendSession(session) {
    let newId = 0;
    if (this.get('sessions').size > 0) {
      newId = this.get('sessions').last().get('id') + 1;
    }
    const newSession = session.set('id', newId);
    return this.set('sessions', this.get('sessions').push(newSession));
  }

  deleteSession(sessionId) {
    const sessions = this.get('sessions');
    const index = sessions.findIndex(item => item.get('id') === sessionId);

    if (index >= 0) {
      return this.set('sessions', sessions.delete(index));
    }
    return this;
  }

  getSession(n) {
    if (n < this.get('sessions').size) {
      return this.get('sessions').get(n);
    }
    return null;
  }

  /* Returns challenges for given session. */
  getChallengesForSession(n) {
    if (n < this.get('sessions').size) {
      return this.get('sessions').get(n).get('challenges');
    }
    return null;
  }

}

