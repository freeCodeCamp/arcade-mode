
'use strict';

/* Unit tests for file client/scripts/arcademode/actions/modal.js. */
import { expect } from 'chai';

import {
  MODAL_CLOSE,
  onModalClose
} from '../../../../..//client/scripts/arcademode/actions/modal';

describe('Actions: modal', () => {
  it('should return MODAL_CLOSE type', () => {
    expect(onModalClose().type).to.equal(MODAL_CLOSE);
  });
});

