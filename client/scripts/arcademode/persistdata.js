
// NOTE: All args passed in are Immutable types
// Persist converts Immutable -> js before writing into storage
// TODO: Should return

import { fromJS } from 'immutable';

const USER_DATA_KEY = 'userData';

function restoreUserData(storage) {
  const userDataJSON = storage.getItem(USER_DATA_KEY);
  if (userDataJSON) {
    return JSON.parse(userDataJSON);
  }
  return { sessions: [] };
}

function commitUserData(storage, userData) {
  storage.setItem(USER_DATA_KEY, JSON.stringify(userData));
}

export default class Persist {

  constructor(storage) {
    if (storage) {
      this.storage = storage;
    }
    else {
      throw new Error('A storage object must be passed to new Persist()');
    }
  }

  /* Gets all user data from storage. */
  fromStorage() {
    return fromJS(restoreUserData(this.storage));
  }

  /* Saves the given session data into storage. */
  toStorage(session) {
    const userData = restoreUserData(this.storage);
    const sessionJs = session.toJS();
    sessionJs.id = userData.sessions.length;
    userData.sessions.push(sessionJs);
    commitUserData(this.storage, userData);
  }

  deleteFromStorage(session) {
    if (!session.has('id')) {
      throw new Error('Persist: No id in session. Cannot delete.');
    }

    const id = session.get('id');
    const userData = restoreUserData(this.storage);
    const sessions = userData.sessions;

    const index = sessions.findIndex(item => {
      if (item.id === id) {
        return true;
      }
      return false;
    });

    sessions.splice(index, 1);
    userData.sessions = sessions;
    commitUserData(this.storage, userData);
  }

}
