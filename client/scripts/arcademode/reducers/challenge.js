
'use strict';

import Immutable from 'immutable';

import {
  CHALLENGE_START,
  CHALLENGE_NEXT,
  CHALLENGE_SOLVE,
  CODE_CHANGED
} from '../actions/challenge';

import Challenges from '../../../json/challenges.json';

const initialState = Immutable.Map({
  title: '',
  description: Immutable.List(),
  code: `
    The code to work with will show up here.
    When you are ready, enter a time at the top and press start to begin!
  `,
  challengeNumber: 0,
  currChallenge: Immutable.Map(Immutable.fromJS(Challenges.challenges[0])),
  currChallengeStartedAt: 0,
  nextChallenge: Immutable.Map()
});

export default function challenge(state = initialState, action) {
  switch (action.type) {
    case CHALLENGE_START: // lift to session start
      return state
        .update('challengeNumber', challengeNumber => challengeNumber + 1)
        .set('title', state.getIn(['currChallenge', 'title']))
        .set('description', state.getIn(['currChallenge', 'description']))
        .set('code', state.getIn(['currChallenge', 'challengeSeed']).join('\n'))
        .set('nextChallenge', Immutable.Map(Immutable.fromJS(Challenges.challenges[state.get('challengeNumber') + 1])))
        .set('currChallengeStartedAt', action.startTime)
        .set('timerMaxValueLoaded', state.timerMaxValue);
    case CHALLENGE_NEXT:
      return state
        .update('challengeNumber', challengeNumber => challengeNumber + 1)
        .set('currChallenge', state.get('nextChallenge'))
        .set('currChallengeStartedAt', action.startTime)
        .set('title', state.getIn(['nextChallenge', 'title']))
        .set('description', state.getIn(['nextChallenge', 'description']))
        .set('code', state.getIn(['nextChallenge', 'challengeSeed']).join('\n'))
        .set('nextChallenge', Immutable.Map(Immutable.fromJS(Challenges.challenges[state.get('challengeNumber') + 1])));
    case CHALLENGE_SOLVE:
      const solutions = state.getIn(['currChallenge', 'solutions']);
      if (solutions.size > 0) {
        const solution = solutions.get(0);
        return state.set('code', solution);
      }
      return state;
    case CODE_CHANGED:
      return state.set('code', action.code);
    default:
      return state;
  }
}
