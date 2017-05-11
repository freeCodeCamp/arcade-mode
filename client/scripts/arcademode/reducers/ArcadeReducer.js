
'use strict';

// import Immutable from 'immutable';

// import Interpreter from 'js-interpreter';

import {
  NEXT_CHALLENGE,
  TESTS_STARTED,
  CODE_CHANGED,
  OUTPUT_CHANGED,
  START_CHALLENGE,
  TESTS_FINISHED
} from '../actions/ArcadeAction';
import UserData from '../model/UserData';
import Challenges from '../../../json/challenges.json';
import TestResults from '../model/TestResults';
import Challenge from '../model/Challenge';

// const initialState = Immutable.Map();
//

export default function arcadeReducer(state, action) {
  if (typeof state === 'undefined') {
    return {
      title: '',
      description: [],
      code: `
        The code to work with will show up here.
        When you are ready, enter a time at the top and press start to begin!
      `,
      // Challenges.challenges[0].challengeSeed.join('\n'),
      userOutput: 'The output of your code will show up here.',
      interpreterError: false,
      isRunningTests: false,
      userData: new UserData({ username: '' }),
      testResults: new TestResults([]),
      challengeNumber: 0,
      currChallenge: new Challenge(Challenges.challenges[0]),
      nextChallenge: ''
    };
  }

  const nextState = Object.assign({}, state);

  switch (action.type) {
    case TESTS_STARTED: {
      nextState.isRunningTests = true;
      break;
    }
    case TESTS_FINISHED: {
      nextState.isRunningTests = false;
      nextState.testResults = new TestResults(action.testResults);
      break;
    }
    case CODE_CHANGED: {
      nextState.code = action.code;
      break;
    }
    case NEXT_CHALLENGE: {
      nextState.currChallenge = state.nextChallenge;
      nextState.title = state.nextChallenge.getTitle();
      nextState.description = state.nextChallenge.getDescription();
      nextState.code = state.nextChallenge.getSeed().join('\n');
      nextState.testResults = new TestResults([]);
      nextState.challengeNumber++;
      nextState.userOutput = '',
      nextState.nextChallenge = new Challenge(Challenges.challenges[state.challengeNumber + 1]);
      break;
    }
    case OUTPUT_CHANGED: {
      nextState.userOutput = action.userOutput;
      break;
    }
    case START_CHALLENGE: {
      nextState.title = state.currChallenge.getTitle();
      nextState.description = state.currChallenge.getDescription();
      nextState.code = state.currChallenge.getSeed().join('\n');
      nextState.challengeNumber++;
      nextState.nextChallenge = new Challenge(Challenges.challenges[state.challengeNumber + 1]);
      break;
    }
    default: console.log('Default reached.');
  }

  return nextState;
}
