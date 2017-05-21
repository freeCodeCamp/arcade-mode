
// memoized selector -> retrieve cache calls when possible

'use strict';

import { createSelector } from 'reselect';

const getModalState = state => state.getIn(['modal', 'modal']);
const getMode = state => state.getIn(['gamesetting', 'mode']);
const getDifficulty = state => state.getIn(['gamesetting', 'difficulty']);
const getEditor = state => state.getIn(['gamesetting', 'editor']);
const getLives = state => state.getIn(['playerstatus', 'lives']);
const getPassOption = state => state.getIn(['playerstatus', 'passOption']);
const getChallengeNumber = state => state.getIn(['challenge', 'challengeNumber']);
const getCurrSession = state => state.getIn(['session', 'currSession']);
const getTotalAttempts = state => state.getIn(['session', 'totalAttempts']);
const getTitle = state => state.getIn(['challenge', 'title']);
const getDescription = state => state.getIn(['challenge', 'description']);
const getCode = state => state.getIn(['challenge', 'code']);
const getUserOutput = state => state.getIn(['test', 'userOutput']);
const getCurrChallenge = state => state.getIn(['challenge', 'currChallenge']);
const getNextChallenge = state => state.getIn(['challenge', 'nextChallenge']);
const getTestResults = state => state.getIn(['test', 'testResults']);
const getTimeLeft = state => state.getIn(['timer', 'timeLeft']);
const getTimerMaxValue = state => state.getIn(['timer', 'timerMaxValue']);
const getChallengesCompleted = state => state.getIn(['session', 'challengesCompleted']);
const getSessionScore = state => state.getIn(['session', 'sessionScore']);
const getStreakMultiplier = state => state.getIn(['session', 'streakMultiplier']);
const getIsTimerFinished = state => state.getIn(['timer', 'isTimerFinished']);
const getTimeUsed = state => state.getIn(['timer', 'timeUsed']);
const getIsSessionFinished = state => state.getIn(['session', 'isSessionFinished']);
const getIsSessionStarted = state => state.getIn(['session', 'isSessionStarted']);
const getIsSessionSaved = state => state.getIn(['session', 'isSessionSaved']);
const getIsRunningTests = state => state.getIn(['test', 'isRunningTests']);
const getIsProfileShown = state => state.getIn(['profile', 'isProfileShown']);
const getUserData = state => state.getIn(['profile', 'userData']);

export default function makeMapStateToProps () {
  return createSelector(
    getModalState,
    getMode,
    getDifficulty,
    getEditor,
    getLives,
    getPassOption,
    getChallengeNumber,
    getCurrSession,
    getTotalAttempts,
    getTitle,
    getDescription,
    getCode,
    getUserOutput,
    getCurrChallenge,
    getNextChallenge,
    getTestResults,
    getTimeLeft,
    getTimerMaxValue,
    getChallengesCompleted,
    getSessionScore,
    getStreakMultiplier,
    getIsTimerFinished,
    getTimeUsed,
    getIsSessionFinished,
    getIsSessionStarted,
    getIsSessionSaved,
    getIsRunningTests,
    getIsProfileShown,
    getUserData,
    (
      modal,
      mode,
      difficulty,
      editor,
      lives,
      passOption,
      challengeNumber,
      currSession,
      totalAttempts,
      title,
      description,
      code,
      userOutput,
      currChallenge,
      nextChallenge,
      testResults,
      timeLeft,
      timerMaxValue,
      challengesCompleted,
      sessionScore,
      streakMultiplier,
      isTimerFinished,
      timeUsed,
      isSessionFinished,
      isSessionStarted,
      isSessionSaved,
      isRunningTests,
      isProfileShown,
      userData
    ) => ({
      modal,
      mode,
      difficulty,
      editor,
      lives,
      passOption,
      challengeNumber,
      currSession,
      totalAttempts,
      title,
      description,
      code,
      userOutput,
      currChallenge,
      nextChallenge,
      testResults,
      timeLeft,
      timerMaxValue,
      challengesCompleted,
      sessionScore,
      streakMultiplier,
      isTimerFinished,
      timeUsed,
      isSessionFinished,
      isSessionStarted,
      isSessionSaved,
      isRunningTests,
      isProfileShown,
      userData
    })
  );
}

