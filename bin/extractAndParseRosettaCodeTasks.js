#! /usr/bin/env node

/* A script for extracting and parsing all RosettaCode programming tasks.
 *
 * All Rosetta Code content available under GNU Free Documentation License 1.2.
 * See: rosettacode.org/wiki/Rosetta_Code:Copyrights
 *
 * Entire script takes about 2 minutes from start to finish.
 */


/* eslint no-confusing-arrow: 0 */
/* eslint no-param-reassign: 0 */

const fs = require('fs');
const fetch = require('node-fetch');

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
        const title = pageContents[pageid].title;
        const text = pageContents[pageid].revisions[0]['*'];
        const escapedTitle = title.replace(/\//g, '&');

        const semiprocessedChallenge = processRawRosettaCodeTask(title, text);

        const subFolder = title.charAt(0);
        if (subFolder.match(/[A-Za-z]/)) {
          const destination = `${outputPath}/${subFolder}/`;
          ensureDirectoryExistence(destination);
          fs.writeFileSync(`${outputPath}/${subFolder}/${escapedTitle}.raw`, semiprocessedChallenge);
        }
        else {
          ensureDirectoryExistence(`${outputPath}/0/`);
          fs.writeFileSync(`${outputPath}/0/${escapedTitle}.raw`, semiprocessedChallenge);
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

function processRawRosettaCodeTask (taskName, content) {
  const categories = [];

  // PROCESS description:
  // 0. Initial extraction of description segment:
  const descriptionBlobRegex = /^([\s\S]*?)==\{\{header\|/;
  const rawDescription = content.match(descriptionBlobRegex) && content.match(descriptionBlobRegex)[1];

  // 1. Regexes for transforming RosettaCode specific syntax to in-house/regular.
  const categoriesRegex = /\[\[Category:([^\]]*)\]\]/g;
  const wikipediaTemplateRegex = /\[\[(?:wp:)([^|]*?)\|(.*?)\]\]/g;
  const rosettaTemplateRegex = /\[\[(?!wp:)(?!Category:)(.*?)(?:\|(.*?))?\]\]/g;
  const tripleSingleQuotesRegex = /'''(.*?)'''/g; // convert to bold
  const doubleSingleQuotesRegex = /''(.*?)''/g; // convert to italics
  const doubleCurlyBraceRegex = /{{(.*?)}}/g; // remove all double curly braces
  const colonLineStartRegex = /^:(.*)$/gm; // indent all colon start lines
  const semicolonLineStartRegex = /^;(.*)$/gm; // convert all semicolon start lines to dl/dt
  const asteriskLineStartRegex = /^\*\s?(.*)$/gm; // convert all asterisk start lines to li
  const hashLineStartRegex = /^#\s?(.*)$/gm; // convert all hash start lines to numbered
  const wrapAllListElementsRegex = /((?:<li [^>]*>.*<\/li>\n?)+)/g;
  const mathRegex = /<\/?math>/gi;

  // 2. Regex for adding in-house syntax:
  const addTripleSlashAndSpace = /^(.*)$/gm;

  // 3. Convert description:
  const description = rawDescription
    .replace(categoriesRegex, (category, first) => {
      categories.push(`/// ${first}`);
      return '';
    })
    .replace(wikipediaTemplateRegex,
      '<a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/$1" title="wp: $1">$2</a>')
    .replace(rosettaTemplateRegex, (match, m1, m2) => {
      if (m2) {
        return `<a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/${m1}" title="${m1}">${m2}</a>`;
      }
      return `<a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/${m1}" title="${m1}">${m1}</a>`;
    })
    .replace(tripleSingleQuotesRegex, '<span class="rosetta__text--bold">$1</span>')
    .replace(doubleSingleQuotesRegex, '<span class="rosetta__text--italic">$1</span>')
    .replace(doubleCurlyBraceRegex, '')
    .replace(colonLineStartRegex, '<span class="rosetta__text--indented">$1</span>')
    .replace(semicolonLineStartRegex,
      '<dl class="rosetta__description-list"><dt class="rosetta__description-title">$1</dt></dl>')
    .replace(asteriskLineStartRegex, '<li class="rosetta__list-item--unordered">$1</li>')
    .replace(hashLineStartRegex, '<li class="rosetta__list-item--ordered">$1</li>')
    .replace(wrapAllListElementsRegex, listEls => {
      // strip last newline:
      listEls = listEls.trim();
      if (listEls.match(/<li .*(?=rosetta__list-item--unordered).*>/g)) {
        return `<ul class="rosetta__unordered-list">${listEls}</ul>`;
      }
      return `<ol class="rosetta__ordered-list">${listEls}</ol>`;
    })
    .replace(mathRegex, '$')
    .replace(addTripleSlashAndSpace, match => match === '' ? '/// <br>' : `/// ${match}`);

  // PROCESS solution:
  // 0. Initial extraction of solution segment:
  const jsSolutionsBlobRegex = /(==\{\{header\|JavaScript\}\}==[\s\S]*?)==\{\{header\|/;
  const rawSolutions = content.match(jsSolutionsBlobRegex) && content.match(jsSolutionsBlobRegex)[1];

  // 1. Extract first solution, if available, else return an empty string:
  let solution = '';
  if (rawSolutions) {
    const solutionsRegex = /<lang JavaScript>([\s\S]*?)<\/lang>/i;
    // only processing the first solution by default:
    solution = rawSolutions.match(solutionsRegex) && rawSolutions.match(solutionsRegex)[1];
  }

  // FEED all processed entities into in-house template:
  return toInHouseTemplate(taskName, categories, description, solution, rawSolutions);
}

function toInHouseTemplate (title, categories, description, solution, rawSolutions) {
  if (categories.length > 1) {
    categories = categories.join('\n');
  }

  const templatedContent = `
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: ${title}
/// type: rosetta-code

/// categories:
${categories}

/// difficulty: ?

/// benchmark:
replaceWithActualFunctionHere;

/// description:
${description}

/// challengeSeed:
function replaceMe (foo) {
  // Good luck!
  return true;
}

/// solutions:
${solution}

/// rawSolutions:
${rawSolutions}

/// tail:
const replaceThis = 3;

/// tests:
assert(typeof replaceMe === 'function', 'message: <code>replaceMe</code> is a function.');
`;

  return templatedContent;
}
