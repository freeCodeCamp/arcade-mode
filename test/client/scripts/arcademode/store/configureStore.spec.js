
'use strict';

/* Unit tests for file client/scripts/arcademode/store/configureStore.js. */
import { expect } from 'chai';
import configureStore from '../../../../../client/scripts/arcademode/store/configureStore';

describe('Store: configureStore()', () => {
  it('should return an object representing the store', () => {
    const store = configureStore();
    expect(typeof store).to.equal('object');
    const state = store.getState();
    expect(state).not.to.be.empty;
  });

  it('should accept dispatched actions and update its state', () => {
    const store = configureStore();
    store.dispatch({ type: 'MODAL_CLOSE' });
    expect(store.getState().getIn(['modal', 'modal'])).to.be.false;
  });
});

