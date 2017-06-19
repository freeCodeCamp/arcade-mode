#! /usr/bin/env node

/* A script for extracting and parsing all RosettaCode programming tasks.
 *
 * All Rosetta Code content available under GNU Free Documentation License 1.2.
 * See: rosettacode.org/wiki/Rosetta_Code:Copyrights
 *
 */

/* Entire script takes about 2 minutes from start to finish */

const fs = require('fs');
const fetch = require('node-fetch');
// const commandLineArgs = require('command-line-args');

const batchSize = 50; // this is the limit for queries

const queryURL = `http://rosettacode.org/mw/api.php?action=query&generator=categorymembers&gcmtitle=Category:Programming_Tasks&format=json&gcmlimit=${batchSize}&continue=`;

const contentURL = 'http://rosettacode.org/mw/api.php?action=query&prop=revisions&rvprop=content&format=json&pageids=';

const outputPath = 'client/scripts/challenges/rosettacode/raw';

function getNextBatch (url) {
  if (!url) {
    return;
  }
  let nextURL = '';
  return fetch(url)
    .then(res => res.json())
    // Assign new url for fetching next batch:
    .then(checkContinue => {
      console.log(checkContinue);
      if (checkContinue.continue) {
        console.log('checkContinue.continue');
        console.log(checkContinue.continue);
        const continueTrue = checkContinue.continue.continue;
        const continueFetch = checkContinue.continue.gcmcontinue;
        nextURL = `${queryURL}${continueTrue}&gcmcontinue=${continueFetch}`;
      }
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

        // parse promptText into arcade-mode format:
        // 1. Create regexes for conversion:
        const wikipediaTemplateRegex = /\[\[(?:wp:)([^|]*)\|(.*)\]\]/g;
        const rosettaTemplateRegex = /\[\[(?!wp:)([^|]*)\|(.*?)\]\]/g;
        const tripleSingleQuotesRegex = /'''(.*?)'''/g; // convert to bold
        const doubleSingleQuotesRegex = /''(.*?)''/g; // convert to italics
        const mathRegex = /<\/?math>/gi;

        // 2. Convert one at a time.
        const parsedPromptText = promptText
          .replace(wikipediaTemplateRegex,
            '<a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/$1" title="wp: $1">$2</a>')
          .replace(rosettaTemplateRegex,
            '<a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/$1" title="$1">$2</a>')
          .replace(tripleSingleQuotesRegex,
            '<span class="rosetta__text--bold">$1</span>')
          .replace(doubleSingleQuotesRegex,
            '<span class="rosetta__text--italic">$1</span>')
          .replace(mathRegex, '$');

        const solutions = text.match(JSRegex) && text.match(JSRegex)[1];
        const fileContents = [`${title}\n`, parsedPromptText, solutions].join('\n');

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
    .then(() => getNextBatch(nextURL))
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
