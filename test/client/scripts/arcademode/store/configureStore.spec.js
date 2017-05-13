
'use strict';

/* Unit tests for file client/scripts/arcademode/store/configureStore.js. */
import { expect } from 'chai';
import configureStore from '../../../../../client/scripts/arcademode/store/configureStore';

describe('configureStore()', () => {
  it('should do return an object', () => {
    const store = configureStore();
    expect(typeof store).to.equal('object');
    const state = store.getState();
    expect(state).not.to.empty;
  });

  it('should do accept dispatched actions', () => {
    const store = configureStore();
    store.dispatch({ type: 'DUMMY' });
  });
});

