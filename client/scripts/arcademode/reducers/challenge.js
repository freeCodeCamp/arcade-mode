
'use strict';

import Immutable, { Map, List } from 'immutable';

import { PLAYER_PASSED } from '../actions/playerstatus';

import { MODAL_OPEN, MODAL_CLOSE } from '../actions/modal';

import {
  CHALLENGE_START,
  CHALLENGE_NEXT,
  CHALLENGE_SOLVE,
  CODE_CHANGED
} from '../actions/challenge';

import { GAME_CHALLENGE_TYPE_CHANGE } from '../actions/gamesetting';

import { TESTS_FINISHED } from '../actions/test';

import FCCInterviewAlgorithms from '../../../../public/json/challenges-algorithms.json';
import FCCInterviewDataStructures from '../../../../public/json/challenges-data-structures.json';

import Challenges from '../../../../public/json/challenges-combined.json';

const combinedChallenges = Object.keys(Challenges)
  .reduce((arr, key) => arr.concat(Challenges[key].challenges), []);

const challengeTypes = {
  'Data structures': shuffle(FCCInterviewDataStructures.challenges),
  Algorithms: shuffle(FCCInterviewAlgorithms.challenges),
  Mixed: shuffle(combinedChallenges)
};

const initialState = Map({
  title: '',
  description: List(),
  code: `
    The code will appear here.
    Start to begin!
  `,
  challengeNumber: 0,
  currChallenge: Map(Immutable.fromJS(challengeTypes.Algorithms[0])),
  currChallengeStartedAt: 0,
  nextChallenge: Map(),
  challengeType: 'Algorithms',
  chosenChallenges: challengeTypes.Algorithms
});

function shuffle (array) {
  // Fisher-Yates shuffle
  let i = array.length;
  let r;
  const newArray = array.slice();

  while (i) {
    r = Math.floor(Math.random() * i);
    i -= 1;
    [newArray[i], newArray[r]] = [newArray[r], newArray[i]];
  }

  return newArray;
}

function getNextChallenge(state) {
  return Map(Immutable.fromJS(
    state.get('chosenChallenges')[state.get('challengeNumber') + 1])
  );
}

export default function challenge(state = initialState, action) {
  switch (action.type) {
    case MODAL_CLOSE:
      // shuffle on modal close to prevent gaming the system
      return state
        .set('chosenChallenges', shuffle(challengeTypes[state.get('challengeType')]))
        .set('currChallenge', Map(Immutable.fromJS(challengeTypes[state.get('challengeType')][0])));
    case GAME_CHALLENGE_TYPE_CHANGE:
      return state
        .set('challengeType', action.challengeType);
    case CHALLENGE_START: // lift to session start
      return state
        .update('challengeNumber', challengeNumber => challengeNumber + 1)
        .set('title', state.getIn(['currChallenge', 'title']))
        .set('description', state.getIn(['currChallenge', 'description']))
        .set('code', state.getIn(['currChallenge', 'challengeSeed']).join('\n'))
        .set('nextChallenge', getNextChallenge(state))
        .set('currChallengeStartedAt', action.startTime)
        .setIn(['currChallenge', 'startTime'], action.startTime)
        .setIn(['currChallenge', 'attempts'], 0);
    case PLAYER_PASSED:
    case CHALLENGE_NEXT:
      return state
        .update('challengeNumber', challengeNumber => challengeNumber + 1)
        .set('currChallenge',
          state.get('nextChallenge')
            .set('startTime', action.startTime)
            .set('attempts', 0)
        )
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
    case TESTS_FINISHED:
      return state
        .update('currChallenge', currChallenge =>
          currChallenge.set('attempts', currChallenge.get('attempts') + 1)
        );
    case CODE_CHANGED:
      return state.set('code', action.code);
    case MODAL_OPEN:
      return initialState
        .set('challengeType', state.get('challengeType'));
    default:
      return state;
  }
}
