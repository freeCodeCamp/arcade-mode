

export default class TestResults {

  constructor(testResults) {
    if (typeof testResults === 'object') {
      this.testResults = testResults;
      this.numTests = testResults.length;
    }
    else {
      throw new Error('Constructor must be given an array.');
    }
  }

}
