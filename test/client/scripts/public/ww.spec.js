/* Unit tests for file client/scripts/public/worker.js. */
import { expect } from 'chai';

import Challenges from '../../../../public/json/challenges-algorithms.json';

const Worker = require('tiny-worker');

describe('Web Worker', () => {
  it('should return correctly', () => {
    const promise = new Promise(res => {
      // const dummyWorker = new Worker('./client/scripts/public/worker.js');
      // both versions work now.
      const dummyWorker = new Worker('./public/js/ww.bundle.js');

      dummyWorker.onmessage = e => {
        res(e.data);
      };

      dummyWorker.postMessage(['var re = /^([+]?1[\\s]?)?((?:[(](?:[2-9]1[02-9]|[2-9][02-8][0-9])[)][\\s]?)|(?:(?:[2-9]1[02-9]|[2-9][02-8][0-9])[\\s.-]?)){1}([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2}[\\s.-]?){1}([0-9]{4}){1}$/; function telephoneCheck(str) { return re.test(str); } telephoneCheck("555-555-5555");', Challenges.challenges[0]]);
    });
    return promise
    .then(workerData => {
      expect(workerData[0]).to.equal('true');
      expect(workerData.slice(1)).to.have.length(30);
      // no need to catch errors as the errors propogate to mocha to display
    });
  });
});
