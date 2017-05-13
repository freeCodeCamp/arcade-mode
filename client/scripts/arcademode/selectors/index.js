
// memoized selector -> retrieve cache calls when possible

'use strict';

import { createSelector } from 'reselect';

const getModal = state => state.getIn(['modal', 'modal']);
const getChallengeNumber = state => state.getIn(['challenge', 'challengeNumber']);
const getUserData = state => state.getIn(['session', 'userData']);
const getTitle = state => state.getIn(['challenge', 'title']);
const getDescription = state => state.getIn(['challenge', 'description']);
const getCode = state => state.getIn(['challenge', 'code']);
const getUserOutput = state => state.getIn(['test', 'userOutput']);
const getCurrChallenge = state => state.getIn(['challenge', 'currChallenge']);
const getNextChallenge = state => state.getIn(['challenge', 'nextChallenge']);
const getTestResults = state => state.getIn(['test', 'testResults']);
const getTimeLeft = state => state.getIn(['timer', 'timeLeft']);
const getTimerMaxValue = state => state.getIn(['timer', 'timerMaxValue']);
const getSessionScore = state => state.getIn(['session', 'sessionScore']);
const getIsTimerFinished = state => state.getIn(['timer', 'isTimerFinished']);
const getIsSessionFinished = state => state.getIn(['session', 'isSessionFinished']);
const getIsSessionStarted = state => state.getIn(['session', 'isSessionStarted']);

export default function makeMapStateToProps () {
  return createSelector(
    getModal,
    getChallengeNumber,
    getUserData,
    getTitle,
    getDescription,
    getCode,
    getUserOutput,
    getCurrChallenge,
    getNextChallenge,
    getTestResults,
    getTimeLeft,
    getTimerMaxValue,
    getSessionScore,
    getIsTimerFinished,
    getIsSessionFinished,
    getIsSessionStarted,
    (
      modal,
      challengeNumber,
      userData,
      title,
      description,
      code,
      userOutput,
      currChallenge,
      nextChallenge,
      testResults,
      timeLeft,
      timerMaxValue,
      sessionScore,
      isTimerFinished,
      isSessionFinished,
      isSessionStarted
    ) => ({
      modal,
      challengeNumber,
      userData,
      title,
      description,
      code,
      userOutput,
      currChallenge,
      nextChallenge,
      testResults,
      timeLeft,
      timerMaxValue,
      sessionScore,
      isTimerFinished,
      isSessionFinished,
      isSessionStarted

    })
  );
}

