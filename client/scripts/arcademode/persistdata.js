
// NOTE: All args passed in are Immutable types
// Persist converts Immutable -> js before writing into storage
// TODO: Should return

import { fromJS } from 'immutable';

const debug = require('debug')('am:persistdata');

// const USER_DATA_KEY = 'userData';
const IDB_VERSION = 1;

function connectToIDB (name, version) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(name, version);
    request.onupgradeneeded = () => {
      request.result.createObjectStore(name, { keyPath: 'id', autoIncrement: true });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => { debug('blocked'); };
  });
}

function operateOnIDB (name, IDB, operation, data) {
  return new Promise((resolve, reject) => {
    const transaction = IDB.transaction(name, 'readwrite');
    const store = transaction.objectStore(name);
    let request;
    switch (operation) {
      case 'GET':
        request = store.getAll();
        request.onsuccess = () => resolve({ sessions: fromJS(request.result) });
        request.onerror = () => reject(request.error);
        break;
      case 'PUT':
        request = store.put(data.toJS());
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        break;
      case 'DELETE':
        request = store.delete(data.toJS().id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
        break;
      default: debug('No operation performed on IDB');
    }
  });
}

async function operateWithIDB (store, operation, data) {
  let IDB;
  try {
    IDB = await connectToIDB(store, IDB_VERSION);
    return await operateOnIDB(store, IDB, operation, data);
  }
  catch (exception) {
    debug(exception);
  }
  finally {
    if (IDB) {
      IDB.close();
    }
  }
}

export default function Persist (storeName) {
  this.fromStorage = () => operateWithIDB(storeName, 'GET', null);
  this.toStorage = data => operateWithIDB(storeName, 'PUT', data);
  this.deleteFromStorage = data => operateWithIDB(storeName, 'DELETE', data);
}
