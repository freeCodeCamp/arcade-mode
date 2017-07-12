
// memoized selector -> retrieve cache calls when possible

'use strict';

import { createSelector } from 'reselect';

const getModalState = state => state.getIn(['modal', 'modal']);
const getMode = state => state.getIn(['gamesetting', 'mode']);
const getDifficulty = state => state.getIn(['gamesetting', 'difficulty']);
const getEditor = state => state.getIn(['gamesetting', 'editor']);
const getAppConfig = state => state.getIn(['gamesetting', 'appConfig']);
const getLives = state => state.getIn(['playerstatus', 'lives']);
const getSkipOption = state => state.getIn(['playerstatus', 'skipOption']);
const getChallengeNumber = state => state.getIn(['challenge', 'challengeNumber']);
const getCurrSession = state => state.getIn(['session', 'currSession']);
const getTotalAttempts = state => state.getIn(['session', 'totalAttempts']);
const getTitle = state => state.getIn(['challenge', 'title']);
const getDescription = state => state.getIn(['challenge', 'description']);
const getBenchmark = state => state.getIn(['challenge', 'benchmark']);
const getCode = state => state.getIn(['challenge', 'code']);
const getUserOutput = state => state.getIn(['test', 'userOutput']);
const getCurrChallenge = state => state.getIn(['challenge', 'currChallenge']);
const getNextChallenge = state => state.getIn(['challenge', 'nextChallenge']);
const getChallengeType = state => state.getIn(['challenge', 'challengeType']);
const getBenchmarkResults = state => state.getIn(['test', 'benchmarkResults']);
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
const getIsRunningBenchmark = state => state.getIn(['test', 'isRunningBenchmark']);
const getIsRunningTests = state => state.getIn(['test', 'isRunningTests']);
const getIsProfileShown = state => state.getIn(['profile', 'isProfileShown']);
const getUserData = state => state.getIn(['profile', 'userData']);
const getSessionExpandStatus = state => state.getIn(['profile', 'sessionExpandStatus']);
const getSelectedChallenge = state => state.getIn(['challenge', 'selectedChallenge']);
const getChosenChallenges = state => state.getIn(['challenge', 'chosenChallenges']);

export default function makeMapStateToProps () {
  return createSelector(
    getModalState,
    getMode,
    getDifficulty,
    getEditor,
    getAppConfig,
    getLives,
    getSkipOption,
    getChallengeNumber,
    getCurrSession,
    getTotalAttempts,
    getTitle,
    getDescription,
    getBenchmark,
    getCode,
    getUserOutput,
    getCurrChallenge,
    getNextChallenge,
    getChallengeType,
    getBenchmarkResults,
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
    getIsRunningBenchmark,
    getIsRunningTests,
    getIsProfileShown,
    getUserData,
    getSessionExpandStatus,
    getSelectedChallenge,
    getChosenChallenges,
    (
      modal,
      mode,
      difficulty,
      editor,
      appConfig,
      lives,
      skipOption,
      challengeNumber,
      currSession,
      totalAttempts,
      title,
      description,
      benchmark,
      code,
      userOutput,
      currChallenge,
      nextChallenge,
      challengeType,
      benchmarkResults,
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
      isRunningBenchmark,
      isRunningTests,
      isProfileShown,
      userData,
      sessionExpandStatus,
      selectedChallenge,
      chosenChallenges
    ) => ({
      modal,
      mode,
      difficulty,
      editor,
      appConfig,
      lives,
      skipOption,
      challengeNumber,
      currSession,
      totalAttempts,
      title,
      description,
      benchmark,
      code,
      userOutput,
      currChallenge,
      nextChallenge,
      challengeType,
      benchmarkResults,
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
      isRunningBenchmark,
      isRunningTests,
      isProfileShown,
      userData,
      sessionExpandStatus,
      selectedChallenge,
      chosenChallenges
    })
  );
}

