
/* Unit tests for file client/scripts/arcademode/reducers/challenge.js. */
import chai, { expect } from 'chai';
import { List, Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import UserData from '../../../../../client/scripts/arcademode/models/UserData';
import profile, {
  createExpandStatus
} from '../../../../../client/scripts/arcademode/reducers/profile';

import {
  actionHideProfile, actionShowProfile
} from '../../../../../client/scripts/arcademode/actions/profile';

chai.use(chaiImmutable);

describe('Reducer: profile', () => {
  describe('createExpandStatus', () => {
    it('should convert user data into expandStatus structure', () => {
      let userData = new UserData();
      userData = userData.appendSession(Map({ challenges: List([]) }));
      userData = userData.appendSession(Map({ challenges: List([]) }));
      userData = userData.appendSession(Map({ challenges: List([]) }));
      const expandStatus = createExpandStatus(userData);
      expect(expandStatus.size).to.have.equal(3);
    });
  });

  describe('profile()', () => {
    it('should return well-defined initial state', () => {
      const initialState = profile(undefined, { type: 'DUMMY' });
      expect(initialState.get('isProfileShown')).to.equal(false);
    });

    it('should show/hide profile on action', () => {
      const initialState = profile(undefined, { type: 'DUMMY' });
      const showState = profile(initialState, actionShowProfile());
      expect(showState.get('isProfileShown')).to.equal(true);
      const hideState = profile(initialState, actionHideProfile());
      expect(hideState.get('isProfileShown')).to.equal(false);
    });
  });
});
