
import { expect } from 'chai';
import { Map } from 'immutable';

import UserData from '../../../../../client/scripts/arcademode/models/UserData';

describe('Model: UserData', () => {
  it('contains user sessions', () => {
    const userData = new UserData();
    expect(userData).to.have.property('sessions');
  });

  it('can have sessions added', () => {
    let userData = new UserData();
    const newSession = Map({ id: 3 });
    userData = userData.appendSession(newSession);
    expect(userData.get('sessions').size).to.equal(1);
  });

  it('has internal Id management', () => {
    let userData = new UserData();
    const newSession = Map({ id: 3 });
    userData = userData.appendSession(newSession);
    const addedSession = userData.get('sessions').first();
    expect(addedSession.get('id')).to.equal(0);
  });

  it('can have sessions removed', () => {
    let userData = new UserData();
    const newSession = Map({ id: 3 });
    userData = userData.appendSession(newSession);
    userData = userData.appendSession(newSession.set('id', 8));
    expect(userData.get('sessions').size).to.equal(2);
    userData = userData.deleteSession(0);
    expect(userData.get('sessions').size).to.equal(1);
  });

  it('is not affected by out-of-index deletes', () => {
    const userData = new UserData();
    const modifiedData = userData.deleteSession(10);
    expect(modifiedData).to.equal(userData);
  });
});
