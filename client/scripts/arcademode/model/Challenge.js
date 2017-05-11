
/* Data model for a code challenge. */
export default class Challenge {

  constructor(challenge) {
    this.challenge = challenge;
  }

  getTitle() {
    return this.challenge.title;
  }

  getDescription() {
    return this.challenge.description;
  }

  /* Returns the code seed for this challenge. */
  getSeed() {
    return this.challenge.challengeSeed;
  }

  /* Returns the tests for the challenge. */
  getTests() {
    return this.challenge.tests;
  }

}
