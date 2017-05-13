
/* Unit tests for file client/scripts/arcademode/reducers/challenge.js. */
import chai, { expect, assert } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import reducer from '../../../../..//client/scripts/arcademode/reducers/challenge';
import {
  startChallenge,
  nextChallenge,
  actionSolveChallenge,
  onCodeChange
} from '../../../../../client/scripts/arcademode/actions/challenge';

import Challenges from '../../../../../client/json/challenges.json';

chai.use(chaiImmutable);

const dummyAction = { type: 'DUMMY' };

describe('challenge reducer', () => {
  it('should have clean initial state', () => {
    const state = reducer(undefined, dummyAction);
    assert.isOk(state, 'Initial state OK');
    assert(state.challengeNumber === 0, 'Challenge number 0 OK');
  });

  it('should set correct challenge start time', () => {
    const action = startChallenge(1000);
    const initialState = reducer(undefined, dummyAction);
    const nextState = reducer(initialState, action);
    assert(nextState.currChallengeStartedAt === 1000, 'Challenge started at 1000');
  });

  it('should move to next challenge with an action', () => {
    const initialState = reducer(undefined, dummyAction);
    const nextState = reducer(initialState, startChallenge(1200));
    const nextState2 = reducer(nextState, nextChallenge(1600));
    assert.deepEqual(nextState2.currChallenge, nextState.nextChallenge, 'Next challenge chosen correctly.');
  });

  it('should insert a solution when requested', () => {
    const initialState = reducer(undefined, dummyAction);
    const nextState = reducer(initialState, actionSolveChallenge());
    assert.notEqual(initialState.code, nextState.code);
  });

  it('yields no solution if challenge does not have it', () => {
    // let challenge = { solutions: [] };
    const initialState = reducer(undefined, dummyAction);
    const nextState = reducer(initialState, actionSolveChallenge());
      // TODO
    assert.Equal(initialState.code, nextState.code);
  });
  // nextChallenge()
  // actionSolveChallenge()
  it('should start first challenge on CHALLENGE_START', () => {
    const state = Immutable.Map({
      challengeNumber: 0,
      title: '',
      description: Immutable.List(),
      code: 'The code to work with will show up here.',
      nextChallenge: Immutable.Map(),
      currChallenge: Immutable.Map(Immutable.fromJS(Challenges.challenges[0])),
      currChallengeStartedAt: 0
      // timerMaxValueLoaded
    });
    const nextState = reducer(state, startChallenge());
    expect(nextState).to.equal(Immutable.Map({
      challengeNumber: 1,
      title: Challenges.challenges[0].title,
      description: Immutable.List(Immutable.fromJS(Challenges.challenges[0].description)),
      code: Challenges.challenges[0].challengeSeed,
      nextChallenge: Immutable.Map(Immutable.fromJS(Challenges.challenges[1])),
      currChallengeStartedAt: 0
    }));
  });

  it('should change code on CODE_CHANGED', () => {
    const state = Immutable.Map({
      code: 'The code to work with will show up here.'
    });
    const newCode = 'let x = 3;';
    const nextState = reducer(state, onCodeChange(newCode));
    expect(nextState).to.equal(Immutable.Map({
      code: 'let x = 3;'
    }));
  });
});

