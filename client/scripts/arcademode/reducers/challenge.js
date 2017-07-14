
'use strict';

import Immutable, { Map, List } from 'immutable';

import { PLAYER_SKIPPED } from '../actions/playerstatus';

import {
  MODAL_RESTART
//  MODAL_CLOSE
} from '../actions/modal';

import {
  CHALLENGE_START,
  CHALLENGE_NEXT,
  CHALLENGE_SOLVE,
  CODE_CHANGED,
  CODE_RESET,
  CHALLENGE_SELECTED
} from '../actions/challenge';

import { GAME_CHALLENGE_TYPE_CHANGE } from '../actions/gamesetting';

import { TESTS_FINISHED } from '../actions/test';

import FCCInterviewAlgorithms from '../../../../public/json/challenges-algorithms.json';
import FCCInterviewDataStructures from '../../../../public/json/challenges-data-structures.json';

import Challenges from '../../../../public/json/challenges-combined.json';
import ChallengesArcade from '../../../../public/json/challenges-arcade.json';
import ChallengesRosetta from '../../../../public/json/challenges-rosetta.json';
import ChallengesEuler from '../../../../public/json/challenges-euler.json';

import appConfig from '../../../../public/json/appconfig.json';

const combinedChallenges = Object.keys(Challenges)
  .reduce((arr, key) => arr.concat(Challenges[key].challenges), []);

const challengeTypes = {
  'Data structures': shuffle(FCCInterviewDataStructures.challenges),
  Algorithms: shuffle(FCCInterviewAlgorithms.challenges),
  Mixed: shuffle(combinedChallenges),
  Arcade: shuffle(ChallengesArcade.challenges),
  Rosetta: shuffle(ChallengesRosetta.challenges),
  Euler: shuffle(ChallengesEuler.challenges)
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
  challengeType: appConfig.options.Challenge.default,
  chosenChallenges: challengeTypes[appConfig.options.Challenge.default],
  selectedChallenge: '',
  passedChallenges: List(),
  benchmark: '',
  difficulty: 10 // Hard-coded for now
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

/* Returns the next challenge. If challenges have difficulty, uses it to
 * determine if the next challenge is easy enough. */
function getNextChallenge(state) {
  let newIndex = state.get('challengeNumber') + 1;
  const lastIndex = state.get('chosenChallenges').size - 1;

  while (
    state.get('chosenChallenges')[newIndex]
    && state.get('chosenChallenges')[newIndex].difficulty
    && state.get('chosenChallenges')[newIndex].difficulty > state.get('difficulty')
    && newIndex <= lastIndex
  ) {
    ++newIndex;
  }

  return Map(Immutable.fromJS(
    state.get('chosenChallenges')[newIndex])
  );
}

function findFromChosenChallenges(state, challengeName) {
  const foundChallenge = state.get('chosenChallenges').find(item => (
        item.title === challengeName
  ));
  if (foundChallenge) {
    return Map(Immutable.fromJS(foundChallenge));
  }
  throw new Error(`No challenge ${challengeName} found.`);
}

export default function challenge(state = initialState, action) {
  switch (action.type) {
    /*
    case MODAL_CLOSE: {
      // shuffle on modal close to prevent gaming the system
      const shuffledChallenges = shuffle(challengeTypes[state.get('challengeType')]);
      if (state.get('selectedChallenge') === '') {
        return state
          .set('chosenChallenges', shuffledChallenges)
          .set('currChallenge', Map(Immutable.fromJS(shuffledChallenges[0])));
      }
      return state.set('chosenChallenges', shuffledChallenges);
    }
   */
    case GAME_CHALLENGE_TYPE_CHANGE:
      return state
        .set('challengeType', action.challengeType)
        .set('chosenChallenges', challengeTypes[action.challengeType]);
    case CHALLENGE_START: // lift to session start
      console.log('benchmark:');
      console.log(state.getIn(['currChallenge', 'benchmark']));
      console.log('Challenges:');
      console.log(state.get('chosenChallenges'));
      console.log(state.getIn(['currChallenge', 'title']));
      return state
        .update('challengeNumber', challengeNumber => challengeNumber + 1)
        .set('title', state.getIn(['currChallenge', 'title']))
        .set('description', state.getIn(['currChallenge', 'description']))
        .set('code', state.getIn(['currChallenge', 'challengeSeed']).join('\n'))
        .set('benchmark', state.getIn(['currChallenge', 'benchmark']))
        .set('nextChallenge', getNextChallenge(state))
        .set('currChallengeStartedAt', action.startTime)
        .setIn(['currChallenge', 'startTime'], action.startTime)
        .setIn(['currChallenge', 'attempts'], 0);
    case PLAYER_SKIPPED:
          // Fallthrough to CHALLENGE_NEXT
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
        .set('benchmark', state.getIn(['nextChallenge', 'benchmark']))
        .set('code', state.getIn(['nextChallenge', 'challengeSeed']).join('\n'))
        .set('nextChallenge', getNextChallenge(state));
    case CHALLENGE_SOLVE: {
      const solutions = state.getIn(['currChallenge', 'solutions']);
      if (solutions.size > 0) {
        const solution = solutions.get(0);
        return state
          .set('code', solution)
          .setIn(['currChallenge', 'code'], solution);
      }
      return state;
    }
    case TESTS_FINISHED:
      return state
        .update('currChallenge', currChallenge =>
          currChallenge.set('attempts', currChallenge.get('attempts') + 1)
        );
    case CODE_CHANGED:
      return state
        .set('code', action.code)
        .setIn(['currChallenge', 'code'], action.code);
    case CODE_RESET:
      return state
        .set('code', state.getIn(['currChallenge', 'challengeSeed']).join('\n'));
    case MODAL_RESTART: {
      // shuffle on modal close to prevent gaming the system
      const shuffledChallenges = shuffle(challengeTypes[state.get('challengeType')]);
      if (state.get('selectedChallenge') === '') {
        return initialState
          .set('challengeType', state.get('challengeType'))
          .set('chosenChallenges', shuffledChallenges)
          .set('currChallenge', Map(Immutable.fromJS(shuffledChallenges[0])));
      }
      return initialState
        .set('challengeType', state.get('challengeType'))
        .set('chosenChallenges', shuffledChallenges)
        .set('currChallenge', state.get('currChallenge'));
    }
    case CHALLENGE_SELECTED:
      return state
        .set('currChallenge', findFromChosenChallenges(state, action.selectedChallenge))
        .set('selectedChallenge', action.selectedChallenge);
    default:
      return state;
  }
}
