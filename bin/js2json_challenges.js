#! /usr/bin/env node

/* A script for converting javascript challenge code into JSON.
  * Each challenge should have sections marked with comments '/// keyword:',
  * For example:
  *   /// solution:
  *   function MySolution()...
  *
  *   /// tests:
  *   assert(MySolution(2) === 3)...
  *
  * */

// TODO: fix script to remove empty string at end of the last property (i.e., test),
// otherwise an empty test case is added which is problematic.

const commandLineArgs = require('command-line-args');
const fs = require('fs');
const acorn = require('acorn');
const mongoose = require('mongoose');

// To turn on debug, use DEBUG=amode:js2json js2json...
const debug = require('debug')('amode:js2json');

const optionDefinitions = [
  { name: 'challenge', type: String, descr: 'Convert only challenges matching this.' },
  { name: 'fcc', type: Boolean, descr: 'Produce JSON as freeCodeCamp compatible output.' },
  { name: 'force', type: Boolean, descr: 'Overwrite output files forcefully.' },
  { name: 'help', alias: 'h', type: Boolean, descr: 'Print help message' },
  { name: 'infile', alias: 'f', type: String, multiple: true, descr: 'Input files' },
  { name: 'order', type: String, descr: 'Order prop inserted into the JSON file' },
  { name: 'outfile', alias: 'o', type: String, descr: 'Output JSON file' },
  { name: 'name', type: String, descr: 'Name prop inserted into the JSON file' },
  { name: 'verbose', alias: 'v', type: Boolean, descr: 'Run in verbose mode' }
];

// Regexp definitions for the script
const re = {
  lineComment: /^\/\/\//,
  lineCommentStartsWithProp: /^\/\/\/\s+(\w+):/,
  lineCommentWithProp: /^\/\/\/\s+(\w+):\s*$/,
  lineCommentWithPropAndText: /^\/\/\/\s+(\w+):\s*(\S.*)$/,
  lineCommentWithText: /^\/\/\/\s(.*)$/,
  endComment: /^\/\/\/\s+end\s+$/,
  workInProgress: /^\/\/\/\s+WIP/i
};

// These tags are removed when --fcc is specified
const tagsToRemoveRegex = new RegExp(
  '</?' +
  '(img|div|p\b|br|ol|ul|dl|dt|li|span).*?>'
, 'gi');
const classToRemoveRegex = new RegExp(
  ' class=.*?".*?"'
, 'gi');

const opts = commandLineArgs(optionDefinitions);

if (opts.help) {
  usage(0);
}

const expectedProps = {
  title: String,
  type: String,
  description: String,
  challengeSeed: 'Code',
  solutions: 'Code',
  tests: 'Code'
};

const optionalProps = {
  difficulty: Number,
  benchmark: 'Code',
  categories: String,
  head: 'Code',
  tail: 'Code',
  images: String,
  naive: 'Code',
  id: String
};

const allProps = Object.assign({}, expectedProps, optionalProps);

if (!opts.infile || opts.infile.length === 0) {
  console.error('Error. No input files were given.');
  usage(1);
}

const propParser = newParser();

opts.infile.forEach(file => {
  processFile(propParser, file, expectedProps);
});

const result = formatResult(propParser.files);

printToOutput(result);

//---------------------------------------------------------------------------
// HELPER FUNCTIONS
//---------------------------------------------------------------------------

function newParser() {
  return {
    currFile: null,
    prop: null,
    propValue: [],
    files: {},
    continuedComments: false,
    idMap: {}
  };
}

function processFile(parser, file, props) {
  const buffer = fs.readFileSync(file);
  checkFileSyntax(buffer);

  const lines = buffer.toString().split('\n');
  parser.currFile = file;
  if (!workInProgress(lines)) {
    parser.files[file] = {};
    lines.forEach(line => {
      processLine(parser, line);
    });

    if (parser.propValue.length > 0) {
      finishCurrProp(parser);
    }

    verifyExpectedProps(parser, file, props);

    if (opts.fcc) {
      addFCCProps(parser, file);
    }
  }
  else {
    console.log(`/// WIP found. Skipping file ${file}`);
  }
}

/* Checks the code syntax in given buffer using acorn. */
function checkFileSyntax(buffer) {
  try {
    acorn.parse(buffer);
  }
  catch (err) {
    console.error(`Parsing failed: ${err}`);
    process.exit(1);
  }
}

/* Processes one line with regex and extracts prop values. */
function processLine(parser, line) {
  if (parser.continuedComments && !re.lineComment.test(line)) {
    finishCurrProp(parser);
    return;
  }
  parser.continuedComments = false;

  let propLegal = false;
  if (re.lineCommentStartsWithProp.test(line)) {
    const matches = line.match(re.lineCommentStartsWithProp);
    propLegal = isPropLegal(matches[1]);
  }

  if (propLegal && re.lineCommentWithProp.test(line)) {
    const matches = line.match(re.lineCommentWithProp);
    if (parser.prop !== null) {
      finishCurrProp(parser);
    }
    parser.prop = matches[1];
  }
  else if (propLegal && re.lineCommentWithPropAndText.test(line)) {
    const matches = line.match(re.lineCommentWithPropAndText);
    if (parser.prop !== null) {
      finishCurrProp(parser);
    }
    parser.prop = matches[1];
    parser.propValue.push(matches[2]);
    finishCurrProp(parser);
  }
  else if (re.lineCommentWithText.test(line)) {
    const matches = line.match(re.lineCommentWithText);
    parser.propValue.push(matches[1]);
    parser.continuedComments = true;
  }
  else if (re.endComment.test(line)) {
    finishCurrProp(parser);
  }
  else if (parser.prop !== null) {
    parser.propValue.push(line);
    // if prop is solutions, combine strings into one string with newline
    if (parser.prop === 'solutions' || parser.prop === 'naive') {
      if (parser.propValue.length > 1) {
        parser.propValue = [parser.propValue.join('\n')];
      }
    }
  }
}

/* Adds current property value into the parser for the current file being processed. Resets
 * the prop value after this. */
function finishCurrProp(parser) {
  // shave off ending empty string from arrays:
  if (parser.propValue.slice(-1).toString() === '') {
    parser.propValue.splice(-1);
  }

  let newPropVal;

  // keep solutions string in an array
  if (parser.prop === 'solutions') {
    newPropVal = parser.propValue;
  }
  else if (parser.propValue.length === 1) {
    newPropVal = parser.propValue[0] || parser.propValue;
  }
  else newPropVal = parser.propValue;

  if (typeof parser.files[parser.currFile][parser.prop] === 'undefined') {
    parser.files[parser.currFile][parser.prop] = newPropVal;
    parser.files[parser.currFile][parser.prop].num = 1;
  }
  else if (typeof parser.files[parser.currFile][parser.prop] === 'string') {
    const oldValue = parser.files[parser.currFile][parser.prop];
    parser.files[parser.currFile][parser.prop] = [oldValue, newPropVal];
    parser.files[parser.currFile][parser.prop].num = 2;
  }
  else if (typeof parser.files[parser.currFile][parser.prop] === 'object') {
    if (parser.files[parser.currFile][parser.prop].num === 1) {
      // Need to wrap the value in an array first.
      parser.files[parser.currFile][parser.prop] = [
        parser.files[parser.currFile][parser.prop],
        newPropVal
      ];
      parser.files[parser.currFile][parser.prop].num = 2;
    }
    else {
      parser.files[parser.currFile][parser.prop].push(newPropVal);
      parser.files[parser.currFile][parser.prop].num += 1;
    }
  }

  parser.propValue = [];
  parser.prop = null;
}

/* Verifies that the parsed file contains expected props like 'solution' etc.*/
function verifyExpectedProps(parser, file, props) {
  Object.keys(props).forEach(prop => {
    if (typeof parser.files[file][prop] === 'undefined') {
      console.warn(`Prop |${prop}:| missing from file ${file}`);
    }
  });

  // Add unique IDs to files, unless they already exist
  const idOld = parser.files[file].id;
  if (!idOld) {
    const id = mongoose.Types.ObjectId();
    parser.files[file].id = id;
    fs.appendFileSync(file, `/// id: ${id}\n`);
  }
  else if (parser.idMap[idOld]) {
    const file1 = parser.idMap[idOld];
    throw new Error(`Non-unique ID ${idOld} in files ${file} & ${file1}`);
  }
  else {
    parser.idMap[idOld] = file;
  }
}

/* Formats the result as JSON. */
function formatResult(parsedFiles) {
  const challenges = Object.keys(parsedFiles).map(filename =>
    parsedFiles[filename]
  );

  const finalFormat = {
    name: opts.name || 'ArcadeMode Interview Questions',
    order: opts.order || '',
    time: '',
    helpRoom: ''
  };

  // Filters the challenges if a name is given with --challenge
  if (opts.challenge) {
    const matchingChallenges = [];
    challenges.forEach(challenge => {
      if (challenge.title === opts.challenge) {
        matchingChallenges.push(challenge);
      }
    });
    finalFormat.challenges = matchingChallenges;
  }
  else {
    finalFormat.challenges = challenges;
  }

  return JSON.stringify(finalFormat, null, 2);
}

/* Prints the results to given output file, or stdout. */
function printToOutput (res) {
  if (opts.outfile) {
    if (!fs.existsSync(opts.outfile) || opts.force) {
      fs.writeFileSync(opts.outfile, res);
    }
  }
  else {
    console.log(res);
  }
}

/* Prints the usage of the script and exits. */
function usage(exitCode = 0) {
  console.log('Usage: bin/js2json_challenges.js [opts] -f <files>+\n');
  optionDefinitions.forEach(opt => {
    if (opt.alias) {
      console.log(`\t--${opt.name},-${opt.alias}\t- ${opt.descr}`);
    }
    else {
      console.log(`\t--${opt.name}\t\t- ${opt.descr}`);
    }
  });
  process.exit(exitCode);
}

function isPropLegal(propName) {
  /* eslint-disable */
  return allProps.hasOwnProperty(propName);
  /* eslint-enable */
}

function workInProgress(lines) {
  let wip = false;
  lines.forEach(line => {
    if (line.match(re.workInProgress)) {
      wip = true;
    }
  });
  return wip;
}

/* If the script is run with --fcc, modifies the JSON format to adhere to the
 * original freeCodeCamp JSON format as close as possible. */
function addFCCProps(parser, file) {
  const type = 'Waypoint';
  const challengeType = 5;
  const date = new Date();
  const releasedOn = `August ${date.getDate()}, ${date.getFullYear()}`;
  const title = parser.files[file].title;

  parser.files[file].type = type;
  parser.files[file].challengeType = challengeType;
  parser.files[file].releasedOn = releasedOn;

  delete parser.files[file].naive;
  delete parser.files[file].benchmark;
  delete parser.files[file].difficulty;
  delete parser.files[file].categories;

  if (typeof parser.files[file].tail === 'string') {
    parser.files[file].tail = [parser.files[file].tail];
  }

  const description = parser.files[file].description;
  const descrSanitized = [];

  description.forEach(line => {
    const newLine = removeHTMLTags(line);
    if (newLine.length > 0) {
      descrSanitized.push(newLine);
    }
  });

  if (!parser.files[file].id) {
    throw new Error(`No ID for ${file}`);
  }

  debug(`${title} Non-sanitized: ${JSON.stringify(description)}`);
  debug(`${title} Sanitized: ${JSON.stringify(descrSanitized)}`);

  parser.files[file].description = descrSanitized;
}


function removeHTMLTags(str) {
  debug(`\tremoveHTMLTags BEFORE: ${str}`);
  const replStr = str
    .replace(tagsToRemoveRegex, '')
    .replace(classToRemoveRegex, '');
  debug(`\tremoveHTMLTags AFTER: ${replStr}`);
  return replStr;
}

