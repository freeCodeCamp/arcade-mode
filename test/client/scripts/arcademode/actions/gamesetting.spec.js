
import { expect } from 'chai';

import {
  GAME_MODE_CHANGE,
  GAME_DIFFICULTY_CHANGE,
  GAME_EDITOR_CHANGE,
  onChangeMode,
  onChangeDifficulty,
  onChangeEditor
} from '../../../../../client/scripts/arcademode/actions/gamesetting';

describe('Actions: gamesetting', () => {
  const ev = { target: { value: null } };
  it('should return correct game mode type', () => {
    expect(onChangeMode(ev).type).to.equal(GAME_MODE_CHANGE);
  });

  it('should return correct game difficulty type', () => {
    expect(onChangeDifficulty(ev).type).to.equal(GAME_DIFFICULTY_CHANGE);
  });

  it('should return correct game editor type', () => {
    expect(onChangeEditor(ev).type).to.equal(GAME_EDITOR_CHANGE);
  });
});
