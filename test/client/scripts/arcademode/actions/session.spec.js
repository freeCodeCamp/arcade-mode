
'use strict';

/* Unit tests for file client/scripts/arcademode/actions/session.js. */
import { expect } from 'chai';

import {
  SESSION_FINISH,
  actionFinishSession
} from '../../../../../client/scripts/arcademode/actions/session';

describe('session actions', () => {
  it('should do x', () => {
    expect(actionFinishSession().type).to.equal(SESSION_FINISH);
  });
});

