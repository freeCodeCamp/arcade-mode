
import { expect } from 'chai';

import {
  PLAYER_SKIPPED,
  onClickSkip
} from '../../../../../client/scripts/arcademode/actions/playerstatus';

describe('Actions: playerstatus', () => {
  it('should return correct player pass type', () => {
    expect(onClickSkip().type).to.equal(PLAYER_SKIPPED);
  });
});
