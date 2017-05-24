
/* Unit tests for file client/scripts/arcademode/reducers/challenge.js. */
import chai, { expect } from 'chai';
import { List, Map } from 'immutable';
import chaiImmutable from 'chai-immutable';

import UserData from '../../../../../client/scripts/arcademode/models/UserData';
import profile, {
  createExpandStatus
} from '../../../../../client/scripts/arcademode/reducers/profile';

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
  });
});
