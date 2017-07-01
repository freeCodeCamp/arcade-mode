
import { expect } from 'chai';

import runner from '../../../../client/scripts/arcademode/runner';

import RosettaChallenges from '../../../../public/json/challenges-rosetta.json';

const challenges = RosettaChallenges.challenges;

const userOutputUndef = 'User output is undefined.';

describe('Rosetta challenges', () => {
  it('fails to pass at least one test without solution', () => {
    const challenge = challenges.find(item => item.title.match(/Zig/));
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
  describe(`RosettaChallenge ${challenge.title}`, () => {
    it(`runner can execute ${challenge.title} challenge properly`, () => {
      const userCode = challenge.solutions.join('');
      expect(challenge.tests).to.have.property('length');
      const result = runner(userCode, challenge);

      return result.then(res => {
        expect(res.userOutput).to.equal(userOutputUndef);
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
  res.testResults.forEach(result => {
    expect(result.pass, 'Test should return result.pass: true').to.be.true;
  });
}
