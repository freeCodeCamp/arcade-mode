
import { expect } from 'chai';

import runner from '../../../../client/scripts/arcademode/runner';

import EulerChallenges from '../../../../public/json/challenges-euler.json';

const challenges = EulerChallenges.challenges;

const userOutputUndef = 'User output is undefined.';

describe('Euler challenges', () => {
  it('fails to pass at least one test without solution', () => {
    const challenge = challenges.find(item => item.title.match(/Problem 1/));
    const userCode = challenge.challengeSeed.join('\n');
    const result = runner(userCode, challenge);

    return result.then(res => {
      expect(res.errorMsgs).to.have.length(0);
      expect(res.testResults).to.have.length(challenge.tests.length);

      let atLeastOneTestFailed = false;
      res.testResults.forEach(tr => {
        atLeastOneTestFailed = atLeastOneTestFailed || tr.pass === false;
      });
      expect(atLeastOneTestFailed).to.equal(true);
    });
  });
});

challenges.forEach(challenge => {
  describe(`EulerChallenge ${challenge.title}`, () => {
    it(`runner can execute ${challenge.title} challenge properly`, () => {
      const userCode = challenge.solutions.join('');
      expect(challenge.tests, 'Tests must be in an array').to.have.property('length');
      const result = runner(userCode, challenge);

      return result.then(res => {
        expect(res.userOutput, `User output must match ${userOutputUndef}`).to.equal(userOutputUndef);
        expectNoErrorsAndAllTestsRun(res, challenge);
      });
    });
  });
});

// HELPER FUNCTIONS
function expectNoErrorsAndAllTestsRun(res, challenge) {
  expect(res.errorMsgs, 'There should be no error messages').to.have.length(0);
  expect(res.testResults, 'All tests need to have result'
    ).to.have.length(challenge.tests.length);
  res.testResults.forEach((result, index) => {
    expect(result.pass, `Test ${index} should return result.pass: true`).to.be.true;
  });
}
