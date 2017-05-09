import { expect } from 'chai';

import arcadeReducer from '../client/scripts/arcademode/reducers/ArcadeReducer';

import { onCodeChange, runTest } from '../client/scripts/arcademode/actions/ArcadeAction';

describe('arcadeReducer', () => {
  it('returns default state when first called', () => {
    const state = arcadeReducer();
    expect(state).not.to.be.empty;
    expect(state).to.have.property('code');
  });

  it('Updates code contents after a code change', () => {
    const newCode = '// TestCode';
    const actionCodeChanged = onCodeChange(newCode);

    const initialState = arcadeReducer();
    const newState = arcadeReducer(initialState, actionCodeChanged);

    expect(newState.code).to.be.equal(newCode);
  });

  it('Updates return value after running the tests', () => {
    const actionRunTests = runTest();

    const initialState = arcadeReducer();
    const newState = arcadeReducer(initialState, actionRunTests);

    expect(newState.interpreterError).to.be.false;
  });
});

