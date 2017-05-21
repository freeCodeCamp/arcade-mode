
'use strict';

import Immutable, { Map, List } from 'immutable';

import {
  PLAYER_PASSED
} from '../actions/playerstatus';

import { MODAL_OPEN } from '../actions/modal';

import {
  CHALLENGE_START,
  CHALLENGE_NEXT,
  CHALLENGE_SOLVE,
  CODE_CHANGED,
  CHALLENGE_TYPE
} from '../actions/challenge';

import AlgoChallenges from '../../../json/challenges.json';
import DataStructures from '../../../json/challenges-data-structures.json';

const allChallenges = {
  'Data structures': DataStructures.challenges,
  Algorithms: AlgoChallenges.challenges
};

const initialState = Map({
  title: '',
  description: List(),
  code: `
    The code will appear here.
    Start to begin!
  `,
  challengeNumber: 0,
  currChallenge: Map(Immutable.fromJS(AlgoChallenges.challenges[0])),
  currChallengeStartedAt: 0,
  nextChallenge: Map(),
  challengeType: 'Algorithms',
  chosenChallenges: AlgoChallenges.challenges
});

function getNextChallenge(state) {
  return Map(Immutable.fromJS(
    state.get('chosenChallenges')[state.get('challengeNumber') + 1])
  );
}

export default function challenge(state = initialState, action) {
  switch (action.type) {
    case CHALLENGE_TYPE:
      return state
        .set('challengeType', action.challengeType)
        .set('chosenChallenges', allChallenges[action.challengeType])
        .set('currChallenge', Map(Immutable.fromJS(allChallenges[action.challengeType][0])));
    case CHALLENGE_START: // lift to session start
      return state
        .update('challengeNumber', challengeNumber => challengeNumber + 1)
        .set('title', state.getIn(['currChallenge', 'title']))
        .set('description', state.getIn(['currChallenge', 'description']))
        .set('code', state.getIn(['currChallenge', 'challengeSeed']).join('\n'))
        .set('nextChallenge', getNextChallenge(state))
        .set('currChallengeStartedAt', action.startTime);
    case PLAYER_PASSED:
    case CHALLENGE_NEXT:
      return state
        .update('challengeNumber', challengeNumber => challengeNumber + 1)
        .set('currChallenge', state.get('nextChallenge'))
        .set('currChallengeStartedAt', action.startTime)
        .set('title', state.getIn(['nextChallenge', 'title']))
        .set('description', state.getIn(['nextChallenge', 'description']))
        .set('code', state.getIn(['nextChallenge', 'challengeSeed']).join('\n'))
        .set('nextChallenge', getNextChallenge(state));
    case CHALLENGE_SOLVE: {
      const solutions = state.getIn(['currChallenge', 'solutions']);
      if (solutions.size > 0) {
        const solution = solutions.get(0);
        return state.set('code', solution);
      }
      return state;
    }
    case CODE_CHANGED:
      return state.set('code', action.code);
    case MODAL_OPEN:
      return initialState;
    default:
      return state;
  }
}
