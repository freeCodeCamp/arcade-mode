
'use strict';

/* Unit tests for file client/scripts/arcademode/reducers/session.js. */
import chai, { expect } from 'chai';
import Immutable from 'immutable';

import chaiImmutable from 'chai-immutable';

import reducer from '../../../../..//client/scripts/arcademode/reducers/session';
import { startChallenge, nextChallenge } from '../../../../../client/scripts/arcademode/actions/challenge';
import { actionFinishSession } from '../../../../../client/scripts/arcademode/actions/session';

chai.use(chaiImmutable);

const dummyAction = { type: 'DUMMY' };

describe('Reducer: session', () => {
  it('should indicate that no session has been started or finished', () => {
    const initialState = reducer(undefined, dummyAction);
    expect(initialState.get('isSessionStarted')).to.be.false;
    expect(initialState.get('isSessionFinished')).to.be.false;
  });

  it('should start the session with an action', () => {
    const initialState = reducer(undefined, dummyAction);
    const nextState = reducer(initialState, startChallenge(0));
    expect(initialState.get('isSessionStarted')).to.be.false;
    expect(nextState.get('isSessionStarted')).to.be.true;
  });

  it('should start session on CHALLENGE_START', () => {
    const state = Immutable.Map({
      isSessionFinished: false,
      isSessionStarted: false,
      isSessionSaved: false
    });
    const nextState = reducer(state, startChallenge(0)); // startTime = 0;
    expect(nextState).to.equal(Immutable.Map({
      isSessionFinished: false,
      isSessionStarted: true,
      isSessionSaved: false
    }));
  });

  it('should increment session score by 100 on CHALLENGE_NEXT', () => {
    const state = Immutable.Map({
      sessionScore: 0,
      streakMultiplier: 1,
      currSession: Immutable.Map({
        challenges: Immutable.List([]),
        score: 0,
        time: 0
      }),
      challengesCompleted: 0
    });
    const challenge = { id: 0 };
    const obj = { startTime: 0, currChallenge: challenge };
    const nextState = reducer(state, nextChallenge(obj)); // startTime = 0;
    expect(nextState).to.equal(Immutable.Map({
      sessionScore: 100,
      streakMultiplier: 1.25,
      currSession: Immutable.Map({
        challenges: Immutable.List([challenge]),
        score: 0,
        time: 0
      }),
      challengesCompleted: 1
    }));
  });

  it('should end session on SESSION_FINISH', () => {
    const state = Immutable.Map({
      isSessionFinished: false,
      isSessionStarted: true,
      sessionScore: 100
    });
    const nextState = reducer(state, actionFinishSession());
    expect(nextState).to.equal(Immutable.Map({
      isSessionFinished: true,
      isSessionStarted: false,
      currSession: Immutable.Map({ score: 100 }),
      sessionScore: 100
    }));
  });
});

