
'use strict';

import { expect } from 'chai';

import { Map } from 'immutable';

import Persist from '../../../../client/scripts/arcademode/persistdata';
import MockStorage from '../../../helpers/mockstorage';

describe('Persist', () => {
  let persist = null;

  beforeEach(() => {
    persist = new Persist(new MockStorage());
  });

  afterEach(() => {
    persist = null;
  });

  it('fromStorage should return an object with sessions', () => {
    const userData = persist.fromStorage();
    expect(userData.get('sessions').size).to.equal(0);
  });

  it('toStorage should store a session', () => {
    const session = Map({});
    persist.toStorage(session);

    const userData = persist.fromStorage();
    const newSession = userData.get('sessions').get(0);
    expect(newSession.get('id')).to.equal(0);

    persist.toStorage(session);
    const newUserData = persist.fromStorage();
    const secondSession = newUserData.get('sessions').get(1);
    expect(secondSession.get('id')).to.equal(1);
  });

  it('deleteStorage should delete a session', () => {
    persist.toStorage(Map({ id: 0 }));
    persist.toStorage(Map({ id: 1 }));
    persist.toStorage(Map({ id: 2 }));
    persist.deleteFromStorage(Map({ id: 1 }));

    const userData = persist.fromStorage();
    const sessions = userData.get('sessions');
    expect(sessions.size).to.equal(2);
  });
});
