
import { expect } from 'chai';

import * as ArcadeAction from '../client/scripts/actions/ArcadeAction';

describe('ArcadeActions', () => {
  describe('runTest()', () => {
    it('has action type RUN_TEST', () => {
      const action = ArcadeAction.runTest();
      expect(action.type).to.equal(ArcadeAction.RUN_TEST);
    });
  });
});

