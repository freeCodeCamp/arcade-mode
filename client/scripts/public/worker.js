
'use strict';


// import { assert } from 'chai';
import * as Challenges from '../../json/challenges.json';

// console.log(Challenges);

onmessage = e => {
  console.log(Challenges.challenges.map(challenge => challenge.challengeSeed));
  console.log(e.data);
  const userCode = eval((function () { return e.data; })());
  console.log(userCode); // this is the return for the user console box.
};

// postMessage(runTestsAgainstUserCode());
// onmessage = e => { console.log(e); };

