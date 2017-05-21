
// NOTE: All args passed in are Immutable types
// Persist converts Immutable -> js before writing into storage
// TODO: Should return

import { fromJS } from 'immutable';

const USER_DATA_KEY = 'userData';

function restoreUserData(storage) {
  const userDataJSON = storage.getItem(USER_DATA_KEY);
  console.log('persist restoreUserData getItem: ' + userDataJSON);
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
    const id = session.get('id');
    if (!id) {
      throw new Error('Persist: No id in session. Cannot delete.');
    }

    const userData = restoreUserData(this.storage);
    const sessions = userData.sessions;

    console.log('Persist.deleteFromStorage data: ' + JSON.stringify(userData));

    const index = sessions.findIndex(item => {
      if (item.id === id) {
        return true;
      }
      return false;
    });

    sessions.splice(index, 1);
    userData.sessions = sessions;
    console.log('Persist.deleteFromStorage before commit: ' + JSON.stringify(userData));
    commitUserData(this.storage, userData);
  }

}
