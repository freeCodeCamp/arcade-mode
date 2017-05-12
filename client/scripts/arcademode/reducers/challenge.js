
'use strict';

import Immutable from 'immutable';

import {
  CHALLENGE_START,
  CHALLENGE_NEXT,
  CHALLENGE_SOLVE,
  CODE_CHANGED
} from '../actions/challenge';

import Challenges from '../../../json/challenges.json';
// import Challenge from '../model/Challenge';

const initialState = Immutable.Map({
  title: '',
  description: Immutable.List(),
  code: `
    The code to work with will show up here.
    When you are ready, enter a time at the top and press start to begin!
  `,
  challengeNumber: 0,
  currChallenge: Immutable.Map(Challenges.challenges[0]),
  // new Challenge(Challenges.challenges[0]),
  currChallengeStartedAt: 0,
  nextChallenge: ''
});

export default function challenge(state = initialState, action) {
  // const nextState = Object.assign({}, state);

  switch (action.type) {
    case CHALLENGE_START: // lift to session start
      /*
      nextState.title = state.currChallenge.getTitle();
      nextState.description = state.currChallenge.getDescription();
      nextState.code = state.currChallenge.getSeed().join('\n');
      nextState.challengeNumber++;
      nextState.nextChallenge = new Challenge(Challenges.challenges[state.challengeNumber + 1]);
      nextState.currChallengeStartedAt = action.startTime;
      nextState.timerMaxValueLoaded = state.timerMaxValue;
      break;
      */
      return state
        .update('challengeNumber', challengeNumber => challengeNumber + 1)
        .set('title', state.currChallenge.title)
        .set('description', state.currChallenge.description)
        .set('code', state.currChallenge.challengeSeed)
        .set('nextChallenge', Immutable.Map(Challenges.challenges[state.challengeNumber + 1]))
        .set('currChallengeStartedAt', action.startTime)
        .set('timerMaxValueLoaded', state.timerMaxValue);
    case CHALLENGE_NEXT:
      /*
      nextState.currChallenge = state.nextChallenge;
      nextState.currChallengeStartedAt = action.startTime;
      nextState.title = state.nextChallenge.getTitle();
      nextState.description = state.nextChallenge.getDescription();
      nextState.code = state.nextChallenge.getSeed().join('\n');
      nextState.challengeNumber++;
      nextState.userOutput = '';
      nextState.nextChallenge = new Challenge(Challenges.challenges[state.challengeNumber + 1]);
      break;
      */
      return state
        .update('challengeNumber', challengeNumber => challengeNumber + 1)
        .set('currChallenge', state.nextChallenge)
        .set('currChallengeStartedAt', action.startTime)
        .set('title', state.nextChallenge.title)
        .set('description', state.nextChallenge.description)
        .set('code', state.nextChallenge.challengeSeed.join('\n'))
        .set('userOutput', '')
        .set('nextChallenge', Immutable.Map(Challenges.challenges[state.challengeNumber + 1]));
    case CHALLENGE_SOLVE:
      /*
      const solution = state.currChallenge.getSolution();
      if (solution !== null) {
        nextState.code = solution;
      }
      else nextState.code = `// No solutions found\n${state.code}`;
      break;
      */
      let solution;
      if (this.challenge.solutions.length > 0) {
        solution = this.challenge.solutions[0];
      }
      solution = null;
      return state.set('code', solution);
    case CODE_CHANGED:
      /*
      nextState.code = action.code;
      break;
      */
      return state.set('code', action.code);
    default:
      return state;
  }
}
