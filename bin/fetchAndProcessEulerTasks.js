#! /usr/bin/env node

/* A script for extracting and parsing the top 600 project Euler programming tasks.
 *
 * All Project Euler content available under CC Share-Alike 2.0 England and Wales
 * See: https://projecteuler.net/copyright
 *
 */

/* eslint no-underscore-dangle: 0 */

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const url = 'https://raw.githubusercontent.com/freeCodeCamp/freeCodeCamp/staging/seed/challenges/08-coding-interview-questions-and-take-home-assignments/project-euler-problems.json';

const outputPath = 'client/scripts/challenges/projecteuler/preformatted:';

const pathNames = ['001_to_100', '101_to_200', '201_to_300', '301_to_400', '401_to_500', '501_to_600'];

pathNames.forEach(pathName => ensureDirectoryExistence(`${outputPath}/${pathName}/`));

fetch(url)
  .then(res => res.json())
  .then(content => content.challenges)
  .then(challenges => {
    challenges.forEach(challenge => {
      const id = challenge._id;
      const title = challenge.title;
      let escapedTitle = title.replace(/\//g, '&');
      const description = challenge.description.map(line => `<p class="euler__paragraph">${line}</p>`).join('\n').replace(/^([\s\S]*)$/, '<div class="euler">$1</div>').replace(/^(.*)$/gm, '/// $1');
      const challengeSeed = challenge.challengeSeed.join('\n');
      const tests = challenge.tests[0];
      const problemNumberRegex = /^Problem (\d+):/;
      const problemNumber = +title.match(problemNumberRegex)[1];
      let subPath = '';

      if (problemNumber <= 100) {
        subPath = pathNames[0]; // 1_to_100
        escapedTitle = escapedTitle.replace(/^Problem (\d+):/, (match, m1) => {
          let paddedNumber = m1;
          if (m1.length === 1) {
            paddedNumber = `00${m1}`;
          }
          else if (m1.length === 2) {
            paddedNumber = `0${m1}`;
          }
          return `Problem ${paddedNumber}:`;
        });
      } else if (problemNumber <= 200) {
        subPath = pathNames[1];
      } else if (problemNumber <= 300) {
        subPath = pathNames[2];
      } else if (problemNumber <= 400) {
        subPath = pathNames[3];
      } else if (problemNumber <= 500) {
        subPath = pathNames[4];
      } else {
        subPath = pathNames[5];
      }

      const templatedChallenge = toInHouseTemplate(title, description, challengeSeed, problemNumber, tests, id);

      fs.writeFileSync(`${outputPath}/${subPath}/${escapedTitle}.raw`, templatedChallenge);
    });
  })
  .catch(err => console.error(err));

// Helpers
// =======

function ensureDirectoryExistence(filePath) {
  if (fs.existsSync(filePath)) {
    return true;
  }
  ensureDirectoryExistence(path.dirname(filePath));
  fs.mkdirSync(filePath);
}

function toInHouseTemplate (title, description, challengeSeed, problemNumber, tests, id) {
  const templatedContent = `
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: ${title}
/// type: project-euler

/// categories:
/// math

/// difficulty: ?

/// benchmark:
//replaceWithActualFunctionHere;

/// description:
${description}

/// challengeSeed:
${challengeSeed}

/// solutions:

/// tail:
const replaceThis = 3;

/// tests:
assert(typeof euler${problemNumber} === 'function', 'message: <code>euler${problemNumber}()</code> is a function.');
${tests}
/// id: ${id}
`;
  return templatedContent;
}
