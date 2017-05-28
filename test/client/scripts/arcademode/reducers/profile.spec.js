
/* Unit tests for file client/scripts/arcademode/reducers/challenge.js. */
import chai, { expect } from 'chai';
import chaiImmutable from 'chai-immutable';

import UserData from '../../../../../client/scripts/arcademode/models/UserData';
import profile, {
  createExpandStatus
} from '../../../../../client/scripts/arcademode/reducers/profile';

import {
  actionHideProfile,
  actionShowProfile,
  actionLoadUserData,
  actionUpdateUserData
} from '../../../../../client/scripts/arcademode/actions/profile';

import {
  createSessionWithNChallenges,
  createUserDataWithNSessions
} from '../../../../helpers/factory';

chai.use(chaiImmutable);

describe('Reducer: profile', () => {
  describe('createExpandStatus', () => {
    it('should convert user data into expandStatus structure', () => {
      const userData = createUserDataWithNSessions(3);
      const expandStatus = createExpandStatus(userData);
      expect(expandStatus.size).to.have.equal(3);
    });

    it('should add one bool per challenge in each session', () => {
      let userData = new UserData();
      const session = createSessionWithNChallenges(2);
      userData = userData.appendSession(session);
      const expandStatus = createExpandStatus(userData);

      expect(expandStatus.get(0).get('challenges').size).to.equal(2);
      expect(expandStatus.get(0).get('challenges').get(0)).to.be.false;
      expect(expandStatus.get(0).get('challenges').get(1)).to.be.false;
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

    it('should load new userData on LOAD_USER_DATA', () => {
      const userData = new UserData();
      const loadAction = actionLoadUserData(userData);
      const initialState = profile(undefined, { type: 'DUMMY' });
      const loadedState = profile(initialState, loadAction);
      expect(loadedState.get('userData')).to.equal(userData);
    });

    it('should update userData on UPDATE_USER_DATA', () => {
      const initialState = profile(undefined, { type: 'DUMMY' });
      let userData = new UserData();
      const loadAction = actionLoadUserData(userData);
      const loadedState = profile(initialState, loadAction);

      const newSession = createSessionWithNChallenges(0);
      userData = userData.appendSession(newSession);
      const updateAction = actionUpdateUserData(newSession);
      const updatedState = profile(loadedState, updateAction);
      expect(updatedState.get('userData')).to.equal(userData);
    });
  });
});
