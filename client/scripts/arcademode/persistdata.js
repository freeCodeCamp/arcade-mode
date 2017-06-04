
// NOTE: All args passed in are Immutable types
// Persist converts Immutable -> js before writing into storage
// TODO: Should return

import { fromJS } from 'immutable';

const debug = require('debug')('am:persistdata');

const USER_DATA_KEY = 'userData';

/* Class for persisting and loading persisted user data. */
export default class Persist {

  /* Takes the storage used as argument. Throws with storage. */
  constructor(storage) {
    if (storage) {
      this.storage = storage;
    }
    else {
      throw new Error('A storage object must be passed to new Persist()');
    }
  }

  // needed to ensure that indexedDB is initialized before other methods can access it.
  init () {
    // initialize indexedDB:
    const DBOpenRequest = this.storage.open(USER_DATA_KEY, 1);

    DBOpenRequest.onupgradeneeded = () => {
      const db = DBOpenRequest.result;
      db.createObjectStore('userData', { keyPath: 'id', autoIncrement: true });
    };

    return new Promise((resolve, reject) => {
      DBOpenRequest.onerror = event => {
        reject(event);
      };

      DBOpenRequest.onsuccess = event => {
        debug(`IndexedDB successfully opened: ${event.target.result}`);
        resolve(event.result);
        this.db = DBOpenRequest.result;
      };
    });
  }

  /* Gets all user data from storage. */
  fromStorage() {
    return this.init().then(() => {
      const db = this.db;
      const tx = db.transaction('userData');
      const store = tx.objectStore('userData');
      const userData = store.getAll();

      return new Promise((resolve, reject) => {
        userData.onsuccess = () => {
          debug(`Data in storage found!: ${userData.result}`);
          // return proper form:
          // const obj = {};
          // obj.sessions = fromJS(userData.result);
          resolve({ sessions: fromJS(userData.result) });
        };

        userData.onerror = () => {
          debug('Data storage retrieval error.');
          reject(userData.error);
        };
      });
    });
  }

  /* Saves the given session data into storage. */
  toStorage(session) {
    if (!this.db) {
      return this.init().then(() => {
        const db = this.db;
        const tx = db.transaction('userData', 'readwrite');
        const store = tx.objectStore('userData');
        const putUserData = store.put(session.toJS());

        return new Promise((resolve, reject) => {
          putUserData.onsuccess = () => {
            resolve(putUserData.result);
          };

          putUserData.onerror = () => {
            reject(putUserData.error);
          };
        });
      });
    }

    const db = this.db;
    const tx = db.transaction('userData', 'readwrite');
    const store = tx.objectStore('userData');
    const putUserData = store.put(session.toJS());

    return new Promise((resolve, reject) => {
      putUserData.onsuccess = () => {
        resolve(putUserData.result);
      };

      putUserData.onerror = () => {
        reject(putUserData.error);
      };
    });
  }

  deleteFromStorage(session) {
    if (!this.db) {
      return this.init().then(() => {
        const db = this.db;
        const tx = db.transaction('userData', 'readwrite');
        const store = tx.objectStore('userData');
        const removeUserData = store.delete(session.toJS().id);

        return new Promise((resolve, reject) => {
          removeUserData.onsuccess = () => {
            resolve(removeUserData.result);
          };

          removeUserData.onerror = () => {
            reject(removeUserData.error);
          };
        });
      });
    }

    const db = this.db;
    const tx = db.transaction('userData', 'readwrite');
    const store = tx.objectStore('userData');
    const removeUserData = store.delete(session.toJS().id);

    return new Promise((resolve, reject) => {
      removeUserData.onsuccess = () => {
        resolve(removeUserData.result);
      };

      removeUserData.onerror = () => {
        reject(removeUserData.error);
      };
    });
  }
}
