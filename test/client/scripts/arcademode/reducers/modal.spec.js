
'use strict';

/* Unit tests for file client/scripts/arcademode/reducers/modal.js. */
import { assert } from 'chai';
import reducer from '../../../../../client/scripts/arcademode/reducers/modal';

import { onModalClose } from '../../../../../client/scripts/arcademode/actions/modal';

const dummyAction = { type: 'DUMMY' };

describe('modal reducer', () => {
  it('should do close modal upon MODAL_CLOSE', () => {
    const state = reducer(undefined, dummyAction);
    assert(state.modal === true, 'Modal is open OK');
    const nextState = reducer(state, onModalClose());
    assert(nextState.modal === false, 'Modal is closed OK');
  });
});

