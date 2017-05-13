
/* Unit tests for file client/scripts/arcademode/reducers/challenge.js. */
import chai, { expect, assert } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import Challenge from '../../../../../client/scripts/arcademode/model/Challenge';
import reducer from '../../../../../client/scripts/arcademode/reducers/challenge';

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
    assert(state.get('challengeNumber') === 0, 'Challenge number 0 OK');
  });

  it('should set correct challenge start time', () => {
    const action = startChallenge(1000);
    const initialState = reducer(undefined, dummyAction);
    const nextState = reducer(initialState, action);
    assert(nextState.get('currChallengeStartedAt') === 1000, 'Challenge started at 1000');
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
    assert.notEqual(initialState.get('code'), nextState.get('code'));
  });

  it('yields no solution if challenge does not have it', () => {
    const state = Immutable.Map({
      currChallenge: new Challenge({ solutions: [] }),
      code: ''
    });
    const nextState = reducer(state, actionSolveChallenge());
    assert.Equal(state.get('code'), nextState.get('code'));
  });

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
    const nextChallengeStartTime = 200;
    const nextState = reducer(state, startChallenge(nextChallengeStartTime));
    expect(nextState).to.equal(Immutable.Map({
      challengeNumber: 1,
      title: Challenges.challenges[0].title,
      description: Immutable.List(Immutable.fromJS(Challenges.challenges[0].description)),
      code: Challenges.challenges[0].challengeSeed,
      nextChallenge: Immutable.Map(Immutable.fromJS(Challenges.challenges[1])),
      currChallengeStartedAt: nextChallengeStartTime
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

