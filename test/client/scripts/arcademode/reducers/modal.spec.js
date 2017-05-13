
'use strict';

/* Unit tests for file client/scripts/arcademode/reducers/modal.js. */
import chai, { expect } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import reducer from '../../../../../client/scripts/arcademode/reducers/modal';

import { onModalClose } from '../../../../../client/scripts/arcademode/actions/modal';

chai.use(chaiImmutable);

describe('modal reducer', () => {
  it('should close modal upon MODAL_CLOSE', () => {
    const state = Immutable.Map({
      modal: true
    });
    const nextState = reducer(state, onModalClose());
    expect(nextState).to.equal(Immutable.Map({
      modal: false
    }));
  });
});

