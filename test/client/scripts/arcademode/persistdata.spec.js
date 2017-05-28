
'use strict';

import { expect } from 'chai';

import { Map } from 'immutable';

import indexedDB from 'fake-indexeddb';

import Persist from '../../../../client/scripts/arcademode/persistdata';
// import MockStorage from '../../../helpers/mockstorage';

describe('Persist', () => {
  let persist = null;

  beforeEach(() => {
    persist = new Persist(indexedDB);
  });

  afterEach(() => {
    persist = null;
  });

  it('fromStorage should return an object with sessions', () =>
    new Promise(resolve => resolve(persist.fromStorage()))
    .then(userData => {
      expect(userData.sessions.size).to.equal(0);
    })
  );

  it('toStorage should store a session', () => {
    const session = Map({});
    const promise1 = persist.toStorage(session)
      .then(() => persist.fromStorage())
      .then(userData => {
        expect(userData.sessions.getIn(['0', 'id'])).to.equal(1); // indexedDB first value is 1
      });

    const promise2 = persist.toStorage(session)
      .then(() => persist.fromStorage())
      .then(secondSession => {
        expect(secondSession.sessions.getIn(['1', 'id'])).to.equal(2);
      });

    return Promise.all([promise1, promise2]);
  });

  it('deleteStorage should delete a session', () =>
    persist.toStorage(Map({ id: 0 }))
      .then(() => persist.toStorage(Map({ id: 1 })))
      .then(() => persist.toStorage(Map({ id: 2 })))
      .then(() => persist.deleteFromStorage(Map({ id: 1 })))
      .then(() => persist.fromStorage())
      .then(userData => {
        const sessions = userData.sessions;
        expect(sessions.size).to.equal(2);
      })
  );
});
