
'use strict';

// import Immutable from 'immutable';

// import Interpreter from 'js-interpreter';

import {
  NEXT_CHALLENGE,
  TESTS_STARTED,
  CODE_CHANGED,
  OUTPUT_CHANGED,
  START_CHALLENGE,
  TESTS_FINISHED,
  TIMER_STARTED,
  TIMER_UPDATED,
  STOP_TIMER,
  FINISH_SESSION,
  TIMER_MAX_VALUE_CHANGED,
  SOLVE_CHALLENGE
} from '../actions/ArcadeAction';

import UserData from '../model/UserData';
import Challenges from '../../../json/challenges.json';
import TestResults from '../model/TestResults';
import Challenge from '../model/Challenge';

// const initialState = Immutable.Map();
//

const timerDefaultValue = 60 * 1000;

/* TODO: Returns score for completed challenge. */
const getScoreForChallenge = challenge => {
  return 1;
};

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
      isRunningTests: false,
      userData: new UserData({ username: '' }),
      testResults: new TestResults([]),
      challengeNumber: 0,
      currChallenge: new Challenge(Challenges.challenges[0]),
      currChallengeStartedAt: 0,
      nextChallenge: '',

      // Timer handling
      isTimerFinished: false,
      timerMaxValue: timerDefaultValue,
      timerMaxValueLoaded: timerDefaultValue,
      timeLeft: timerDefaultValue,
      timerStart: 0,

      // Session control variables
      isSessionFinished: false,
      isSessionStarted: false,
      sessionScore: 0
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
      nextState.sessionScore = state.sessionScore + getScoreForChallenge(state.currChallenge);
      nextState.currChallenge = state.nextChallenge;
      nextState.currChallengeStartedAt = action.startTime;
      nextState.title = state.nextChallenge.getTitle();
      nextState.description = state.nextChallenge.getDescription();
      nextState.code = state.nextChallenge.getSeed().join('\n');
      nextState.testResults = new TestResults([]);
      nextState.challengeNumber++;
      nextState.userOutput = '';
      nextState.nextChallenge = new Challenge(Challenges.challenges[state.challengeNumber + 1]);
      break;
    }
    case OUTPUT_CHANGED: {
      nextState.userOutput = action.userOutput;
      break;
    }
    case TIMER_MAX_VALUE_CHANGED: {
      nextState.timerMaxValue = action.timerMaxValue;
      break;
    }
    case TIMER_STARTED: {
      nextState.isTimerFinished = false;
      nextState.timeLeft = timerDefaultValue;
      nextState.timerStart = action.startTime;
      break;
    }
    case START_CHALLENGE: {
      nextState.title = state.currChallenge.getTitle();
      nextState.description = state.currChallenge.getDescription();
      nextState.code = state.currChallenge.getSeed().join('\n');
      nextState.challengeNumber++;
      nextState.nextChallenge = new Challenge(Challenges.challenges[state.challengeNumber + 1]);
      nextState.isSessionFinished = false;
      nextState.isSessionStarted = true;
      nextState.currChallengeStartedAt = action.startTime;
      nextState.timerMaxValueLoaded = state.timerMaxValue;
      break;
    }
    case TIMER_UPDATED: {
      const timeNow = action.timeNow;
      nextState.timeLeft = parseInt(state.timerMaxValueLoaded, 10) - (timeNow - state.timerStart);
      break;
    }
    case STOP_TIMER: {
      nextState.isTimerFinished = true;
      nextState.timeLeft = 0;
      break;
    }
    case FINISH_SESSION: {
      nextState.isSessionFinished = true;
      nextState.isSessionStarted = false;
      break;
    }
    case SOLVE_CHALLENGE: {
      const solution = state.currChallenge.getSolution();
      if (solution !== null) {
        nextState.code = solution;
      }
      else {
        nextState.code = `// No solutions found\n${state.code}`;
      }
      break;
    }
    default: 
      // console.log('ERROR. ArcadeReducer default reached.');
      return state;
  }

  return nextState;
}
