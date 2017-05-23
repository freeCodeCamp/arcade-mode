
/* Unit tests for file client/scripts/arcademode/reducers/challenge.js. */
import chai, { expect, assert } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import reducer from '../../../../../client/scripts/arcademode/reducers/challenge';

import {
  startChallenge,
  nextChallenge,
  actionSolveChallenge,
  onCodeChange
} from '../../../../../client/scripts/arcademode/actions/challenge';

import Challenges from '../../../../../client/json/challenges.json';

const firstChallenge = Challenges.challenges[0];
const secondChallenge = Challenges.challenges[1];
const thirdChallenge = Challenges.challenges[2];

chai.use(chaiImmutable);

const dummyAction = { type: 'DUMMY' };

describe('Reducer: challenge', () => {
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
      currChallenge: Immutable.fromJS({ solutions: [] }),
      code: ''
    });
    const nextState = reducer(state, actionSolveChallenge());
    assert(state.get('code') === nextState.get('code'), 'Code did not change');
  });

  it('should start first challenge on CHALLENGE_START', () => {
    const state = Immutable.Map({
      challengeNumber: 0,
      title: '',
      description: Immutable.List(),
      code: 'The code to work with will show up here.',
      nextChallenge: Immutable.Map(),
      currChallenge: Immutable.Map(Immutable.fromJS(firstChallenge)),
      currChallengeStartedAt: 0,
      chosenChallenges: Challenges.challenges
      // timerMaxValueLoaded
    });
    const nextChallengeStartTime = 200;
    const nextState = reducer(state, startChallenge(nextChallengeStartTime));
    const expectedDescription = Immutable.List(Immutable.fromJS(firstChallenge.description));

    expect(nextState.get('challengeNumber')).to.equal(1);
    expect(nextState.get('title')).to.equal(Challenges.challenges[0].title);
    expect(nextState.get('description')).to.equal(expectedDescription);
    expect(nextState.get('code')).to.equal(firstChallenge.challengeSeed.join('\n'));
    expect(nextState.get('nextChallenge')).to.equal(Immutable.Map(Immutable.fromJS(secondChallenge)));
    expect(nextState.get('currChallengeStartedAt')).to.equal(nextChallengeStartTime);
  });

  it('should go to next challenge on CHALLENGE_NEXT', () => {
    const nextChallengeStartTime = 500;
    const expectedDescription = Immutable.List(Immutable.fromJS(secondChallenge.description));

    const state = Immutable.Map({
      challengeNumber: 1,
      currChallenge: Immutable.Map(Immutable.fromJS(firstChallenge)),
      currChallengeStartedAt: 200,
      title: firstChallenge.title,
      description: Immutable.List(Immutable.fromJS(firstChallenge.description)),
      code: 'let y = 5;',
      nextChallenge: Immutable.Map(Immutable.fromJS(secondChallenge)),
      chosenChallenges: Challenges.challenges
    });

    // Next challenge needs obj, not startTime only
    const obj = {
      startTime: nextChallengeStartTime,
      currChallenge: Immutable.Map(Immutable.fromJS(firstChallenge))
    };
    const nextState = reducer(state, nextChallenge(obj));
    expect(nextState.get('challengeNumber')).to.equal(2);
    // expect(nextState.get('currChallenge')).to.equal((Immutable.Map(Immutable.fromJS(secondChallenge))));
    expect(nextState.get('currChallengeStartedAt')).to.equal(nextChallengeStartTime);
    expect(nextState.get('title')).to.equal(Challenges.challenges[1].title);
    expect(nextState.get('description')).to.equal(expectedDescription);
    expect(nextState.get('code')).to.equal(secondChallenge.challengeSeed.join('\n'));
    // expect(nextState.get('nextChallenge')).to.equal(Immutable.Map(Immutable.fromJS(thirdChallenge)));
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

