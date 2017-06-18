/* eslint no-extend-native: 0 */

import { expect } from 'chai';

import runner from '../../../../client/scripts/arcademode/runner';

// Get some real challenges in
import ArcadeChallenges from '../../../../public/json/challenges-arcade.json';

const challenges = ArcadeChallenges.challenges;
const stackChallenge = challenges.find(item => item.title.match(/Queue using/));
const bookshopChallenge = challenges.find(item => item.title.match(/Bookshop/));
const gittacaChallenge = challenges.find(item => item.title.match(/Gittaca/));
const conventuristChallenge = challenges.find(item => item.title.match(/Conventurist/));
const lruCacheChallenge = challenges.find(item => item.title.match(/LRU Cache/));
const petchChallenge = challenges.find(item => item.title.match(/Petch/));
const rotateArrayChallenge = challenges.find(item => item.title.match(/Rotate array/));
const linkedHashmapChallenge = challenges.find(item => item.title.match(/Linked Hash Map/));

const userOutputUndef = 'User output is undefined.';

// CHALLENGES for the test cases

const emptyChallenge = {
  tests: ['// No tests, message: No tests really']
};

const challengeWithTest = {
  tests: ['assert(true === true, "message: This is correct.");']
};

const challengeWithHead = {
  head: ['function seenByUser() {return 1 + 1;}'],
  tests: []
};

const challengeWithTail = {
  tail: ['function tailFunction() {return "tail function";}'],
  tests: ['assert(tailFunction() !== "right", "message: all fine");']
};

// TESTS

describe('runner()', () => {
  it('executes js using eval and returns results', () => {
    const userCode = '// no code';
    const result = runner(userCode, emptyChallenge);
    return result.then(res => {
      expect(res).to.have.property('userOutput');
      expect(res).to.have.property('errorMsgs');
      expect(res).to.have.property('testResults');
      expect(res.errorMsgs).to.have.length(0);
    });
  });

  it('catches invalid syntax correctly', () => {
    const userCode = 'syntaxError [][ = ;];';
    const result = runner(userCode, emptyChallenge);
    return result.then(res => {
      expect(res.errorMsgs).to.have.length(1);
      expect(res.userOutput).to.have.length.above(0);
      expect(res.userOutput).to.match(/SyntaxError/);
      expect(res.testResults).to.have.length(0);
    });
  });

  it('catches invalid execution, non-exec code', () => {
    const userCode = 'let myVar = NonExistingClass()';
    const result = runner(userCode, emptyChallenge);
    return result.then(res => {
      expect(res.errorMsgs).to.have.length(1);
      expect(res.userOutput).to.have.length.above(0);
      expect(res.userOutput).to.match(/Error:/);
      expect(res.testResults).to.have.length(0);
    });
  });

  it('Runs tests for correct code', () => {
    const userCode = '// Error-free code\ntrue;';
    const result = runner(userCode, challengeWithTest);
    return result.then(res => {
      expect(res.testResults).to.have.length(1);
      expect(res.errorMsgs).to.have.length(0);
      expect(res.userOutput).to.equal('true');
    });
  });

  it('adds head before executing the code', () => {
    const userCode = 'seenByUser();';
    const result = runner(userCode, challengeWithHead);
    return result.then(res => {
      expect(res.userOutput).to.equal('2');
    });
  });

  it('adds tail before running the tests', () => {
    const userCode = '// No user code really';
    const result = runner(userCode, challengeWithTail);
    return result.then(res => {
      expect(res.userOutput).to.equal(userOutputUndef);
    });
  });

  it('catches infinite loops in user code', () => {
    const userCode = 'while (true);';
    const result = runner(userCode, challengeWithHead);
    return result.then(res => {
      expect(res.errorMsgs).to.have.length(1);
      expect(res.userOutput).to.match(/infinite loop/);
    });
  });

  it('can execute queue-2-stack challenge', () => {
    const userCode = stackChallenge.solutions.join('');
    const result = runner(userCode, stackChallenge);
    return result.then(res => {
      expect(res.userOutput).to.equal(userOutputUndef);
      expectNoErrorsAndAllTestsRun(res, stackChallenge);
    });
  });

  it('can execute the book shop challenge', () => {
    const sort = Array.prototype.sort;
    const userCode = bookshopChallenge.solutions.join('');
    const result = runner(userCode, bookshopChallenge);
    Array.prototype.sort = sort;
    return result.then(res => {
      expect(res.userOutput).to.equal(userOutputUndef);
      expectNoErrorsAndAllTestsRun(res, bookshopChallenge);
    });
  });

  it('can execute the gittaca challenge', () => {
    const userCode = gittacaChallenge.solutions.join('');
    const result = runner(userCode, gittacaChallenge);
    return result.then(res => {
      expect(res.userOutput).to.equal(userOutputUndef);
      expectNoErrorsAndAllTestsRun(res, gittacaChallenge);
    });
  });

  it('can execute the conventurist challenge', () => {
    const userCode = conventuristChallenge.solutions.join('');
    const result = runner(userCode, conventuristChallenge);
    return result.then(res => {
      expect(res.userOutput).to.equal(userOutputUndef);
      expectNoErrorsAndAllTestsRun(res, conventuristChallenge);
    });
  });

  it('can execute the LRU cache challenge', () => {
    const userCode = lruCacheChallenge.solutions.join('');
    const result = runner(userCode, lruCacheChallenge);
    return result.then(res => {
      expect(res.userOutput).to.equal(userOutputUndef);
      expectNoErrorsAndAllTestsRun(res, lruCacheChallenge);
    });
  });

  it('can execute the Petch challenge', () => {
    const userCode = petchChallenge.solutions.join('');
    const result = runner(userCode, petchChallenge);
    return result.then(res => {
      expect(res.userOutput).to.equal(userOutputUndef);
      expectNoErrorsAndAllTestsRun(res, petchChallenge);
    });
  });

  it('can execute the Rotate array challenge', () => {
    const userCode = rotateArrayChallenge.solutions.join('');
    const result = runner(userCode, rotateArrayChallenge);
    return result.then(res => {
      expect(res.userOutput).to.equal(userOutputUndef);
      expectNoErrorsAndAllTestsRun(res, rotateArrayChallenge);
    });
  });

  it('can execute the Linked hash map challenge', () => {
    const userCode = linkedHashmapChallenge.solutions.join('');
    const result = runner(userCode, linkedHashmapChallenge);
    return result.then(res => {
      expect(res.userOutput).to.equal(userOutputUndef);
      expectNoErrorsAndAllTestsRun(res, linkedHashmapChallenge);
    });
  });
});


// HELPER FUNCTIONS
function expectNoErrorsAndAllTestsRun(res, challenge) {
  expect(res.errorMsgs).to.have.length(0);
  expect(res.testResults).to.have.length(challenge.tests.length);
}
