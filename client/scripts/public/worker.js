
'use strict';

import Challenges from '../../json/challenges.json';

console.log(Challenges);

onmessage = e => {
  console.log(e.data);
  const userCode = eval(`(${e.data})`);
  console.log(userCode(2));
};

// postMessage(runTestsAgainstUserCode());
// onmessage = e => { console.log(e); };

