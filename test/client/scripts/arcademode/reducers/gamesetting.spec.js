
import chai, { expect } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import reducer from '../../../../../client/scripts/arcademode/reducers/gamesetting';

import {
  onChangeMode,
  onChangeDifficulty,
  onChangeEditor
} from '../../../../../client/scripts/arcademode/actions/gamesetting';

chai.use(chaiImmutable);

describe('Reducer: gamesetting', () => {
  it('should change mode correctly', () => {
    const state = Immutable.Map({
      mode: 'Arcade'
    });
    const ev = { target: { value: 'Practice' } };
    const nextState = reducer(state, onChangeMode(ev));
    expect(nextState.get('mode')).to.equal('Practice');
  });

  it('should change difficulty correctly', () => {
    const state = Immutable.Map({
      difficulty: 'Medium'
    });
    const ev = { target: { value: 'Hard' } };
    const nextState = reducer(state, onChangeDifficulty(ev));
    expect(nextState.get('difficulty')).to.equal('Hard');
  });

  it('should change editor correctly', () => {
    const state = Immutable.Map({
      editor: 'Normal'
    });
    const ev = { target: { value: 'Whiteboard' } };
    const nextState = reducer(state, onChangeEditor(ev));
    expect(nextState.get('editor')).to.equal('Whiteboard');
  });
});
