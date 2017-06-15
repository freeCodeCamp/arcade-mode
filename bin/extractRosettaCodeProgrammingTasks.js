#! /usr/bin/env node

/* A script for extracting all RosettaCode programming tasks.
 *
 * All Rosetta Code content available under GNU Free Documentation License 1.2.
 * See: rosettacode.org/wiki/Rosetta_Code:Copyrights
 *
 */

const fs = require('fs');
const fetch = require('node-fetch');
const commandLineArgs = require('command-line-args');

// does not extract all with numericals titles with this batch size; set to 1 and let it run to get all
const batchSize = 1;

let queryURL = `http://rosettacode.org/mw/api.php?action=query&generator=categorymembers&gcmtitle=Category:Programming_Tasks&format=json&gcmlimit=${batchSize}&continue=`;

const contentURL = 'http://rosettacode.org/mw/api.php?action=query&prop=revisions&rvprop=content&format=json&pageids=';

const outputPath = 'client/scripts/challenges/rosettacode/raw';

function getNextBatch (continuationURL) {
  if (!continuationURL) {
    return;
  }
  return fetch(continuationURL)
    .then(res => res.json())
    // Assign new url for fetching next batch:
    .then(checkContinue => {
      console.log(checkContinue);
      if (checkContinue.continue) {
        const continueTrue = checkContinue.continue.continue;
        const continueFetch = checkContinue.continue.gcmcontinue;
        continuationURL = `${queryURL}${continueTrue}&gcmcontinue=${continueFetch}`;
      }
      else continuationURL = '';
      return checkContinue;
    })
    .then(body => Object.keys(body.query.pages).join('|'))
    .then(pageids => fetch(`${contentURL}${pageids}`))
    .then(rawcontent => rawcontent.json())
    .then(content => content.query.pages)
    .then(pageContents => {
      Object.keys(pageContents).forEach(pageid => {
        const text = pageContents[pageid].revisions[0]['*'];
        // unfortunately, the page seems to use a custom template language.
        const promptRegex = /^([\s\S]*?)==\{\{header\|/;
        const JSRegex = /(==\{\{header\|JavaScript\}\}==[\s\S]*?)==\{\{header\|/;
        // combine the following:
        const title = pageContents[pageid].title;
        const escapedTitle = title.replace(/\//g, '&');
        const promptText = text.match(promptRegex) && text.match(promptRegex)[1];
        const solutions = text.match(JSRegex) && text.match(JSRegex)[1];
        const fileContents = [`${title}\n`, promptText, solutions].join('\n');
        
        const subFolder = title.charAt(0);
        if (subFolder.match(/[A-Za-z]/)) {
          const destination = `${outputPath}/${subFolder}/`;
          ensureDirectoryExistence(destination);
          fs.writeFileSync(`${outputPath}/${subFolder}/${escapedTitle}.raw`, fileContents);
        }
        else {
          ensureDirectoryExistence(`${outputPath}/0/`);
          fs.writeFileSync(`${outputPath}/0/${escapedTitle}.raw`, fileContents);
        }
      });
    })
    .then(() => getNextBatch(continuationURL))
    .catch(err => console.error(err));
}

getNextBatch(queryURL);

// Helpers
function ensureDirectoryExistence(filePath) {
  if (fs.existsSync(filePath)) {
    return true;
  }
  fs.mkdirSync(filePath);
}
