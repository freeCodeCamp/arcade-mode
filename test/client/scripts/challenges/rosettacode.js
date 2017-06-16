
import { expect } from 'chai';

import runner from '../../../../client/scripts/arcademode/runner';

import RosettaChallenges from '../../../../public/json/challenges-rosetta.json';

const challenges = RosettaChallenges.challenges;

const userOutputUndef = 'User output is undefined.';

challenges.forEach(challenge => {
  describe(`RosettaChallenge ${challenge.title}`, () => {
    it(`runner can execute ${challenge.title} challenge properly`, () => {
      const userCode = challenge.solutions.join('');
      const result = runner(userCode, challenge);
      expect(challenge.tests).to.have.property('length');

      return result.then(res => {
        expect(res.userOutput).to.equal(userOutputUndef);
        expectNoErrorsAndAllTestsRun(res, challenge);
      })
      .catch(err => {
        throw new Error(err);
      });
    });
  });
});

// HELPER FUNCTIONS
function expectNoErrorsAndAllTestsRun(res, challenge) {
  expect(res.errorMsgs).to.have.length(0);
  expect(res.testResults).to.have.length(challenge.tests.length);
}
