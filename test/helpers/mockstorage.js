/* Mock storage for unit testing. Implements the API of localStorage. */

import { Map } from 'immutable';

// From: http://stackoverflow.com/questions/11485420/how-to-mock-localstorage-in-javascript-unit-tests/20153543#20153543
export default class MockStorage {
  constructor () {
    this.storage = new Map();
  }

  setItem (key, value) {
    if (typeof value === 'string') {
      this.storage = this.storage.set(key, value);
    }
    else {
      throw new Error('MockStorage Data must in string (JSON) format');
    }
  }

  getItem (key) {
    const obj = this.storage.get(key);
    if (obj) {
      return obj;
    }
    return null;
  }

  removeItem (key) {
    this.storage = this.storage.delete(key);
  }

  clear () {
    this.constructor();
  }
}
