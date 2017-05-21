
'use strict';

import { expect } from 'chai';
import * as Profile from '../../../../../client/scripts/arcademode/actions/profile';

describe('Actions: profile', () => {
  it('has action for showing profile', () => {
    expect(Profile.actionShowProfile().type).to.equal(Profile.SHOW_PROFILE);
  });

  it('has action for hiding profile', () => {
    expect(Profile.actionHideProfile().type).to.equal(Profile.HIDE_PROFILE);
  });

  it('has action for loading user data', () => {
    const userData = { user: 'xxx' };
    expect(Profile.actionLoadUserData(userData).type).to.equal(Profile.LOAD_USER_DATA);
    expect(Profile.actionLoadUserData(userData).userData).to.equal(userData);
  });

  it('has action for adding session to user data', () => {
    const session = { id: 1, challenges: [] };
    expect(Profile.actionUpdateUserData(session).type).to.equal(Profile.UPDATE_USER_DATA);
    expect(Profile.actionLoadUserData(session).userData).to.equal(session);
  });
});

