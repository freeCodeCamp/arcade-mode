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
const path = require('path');
const acorn = require('acorn');
const mongoose = require('mongoose');

// To turn on debug, use DEBUG=amode:js2json js2json...
const debug = require('debug')('amode:js2json');

const optionDefinitions = [
  { name: 'challenge', type: String, descr: 'Convert only challenges matching this.' },
  { name: 'exclude', type: String, descr: 'Excluded files' },
  { name: 'fcc', type: Boolean, descr: 'Produce JSON as freeCodeCamp compatible output.' },
  { name: 'force', type: Boolean, descr: 'Overwrite output files forcefully.' },
  { name: 'help', alias: 'h', type: Boolean, descr: 'Print help message' },
  { name: 'infile', alias: 'f', type: String, multiple: true, descr: 'Input files' },
  { name: 'merge', type: Boolean, descr: 'Merge two (or more) JSON files.' },
  { name: 'name', type: String, descr: 'Name prop inserted into the JSON file' },
  { name: 'nochecks', type: Boolean, descr: 'Do not check file javascript syntax.' },
  { name: 'order', type: String, descr: 'Order prop inserted into the JSON file' },
  { name: 'outfile', alias: 'o', type: String, descr: 'Output JSON file' },
  { name: 'prop', alias: 'p', type: String, multiple: true,
    descr: 'Additional JSON props added to each challenge'},
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

// These tags are removed when --fcc is specified to generate fCC compatible
// markup for the challenge descriptions
const tagsToRemoveRegex = new RegExp(
  '</?' +
  '(img|div|p\b|br|ol|ul|dl|dt|li|span).*?>'
, 'gi');
const classToRemoveRegex = new RegExp(
  ' class=.*?".*?"'
, 'gi');

// Grab the options, check for help request
const opts = commandLineArgs(optionDefinitions);
if (opts.help) {
  usage(0);
}

// Each challenge should have at least these props specified
// using triple comments '/// propName: value'
const expectedProps = {
  title: String,
  type: String,
  description: String,
  challengeSeed: 'Code',
  solutions: 'Code',
  tests: 'Code'
};

// These props can also be present
const optionalProps = {
  difficulty: Number,
  benchmark: 'Code',
  categories: String,
  head: 'Code',
  tail: 'Code',
  images: String,
  naive: 'Code',
  id: String,
  rawSolutions: 'Code'
};

const allProps = Object.assign({}, expectedProps, optionalProps);

if (!opts.infile || opts.infile.length === 0) {
  console.error('Error. No input files were given.');
  usage(1);
}
checkOutputFileLegality(opts);

const excludedFiles = getExcludedFiles();

let result = '';
if (opts.merge) {
  result = mergeJSONFiles();
}
else {
  const propParser = newParser();
  opts.infile.forEach(file => {
    if (!isExcludedFile(file)) {
      processFile(propParser, file, expectedProps);
    }
  });

  result = formatResult(propParser.files);
}

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

function getExcludedFiles() {
  if (opts.exclude) {
    return fs.readFileSync(opts.exclude).toString().split('\n');
  }
  return [];
}

function isExcludedFile(file) {
  if (excludedFiles.length === 0) {
    return false;
  }
  let isExcluded = false;
  excludedFiles.forEach(exFile => {
    if (exFile.length > 0) {
      const excRe = new RegExp(exFile);
      if (excRe.test(file)) {
        console.error(`File ${file} matches |${exFile}|`);
        isExcluded = true;
      }
    }
  });
  return isExcluded;
}

function processFile(parser, file, props) {
  const buffer = fs.readFileSync(file);
  if (!opts.nochecks) {
    checkFileSyntax(file, buffer);
  }

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
function checkFileSyntax(file, buffer) {
  try {
    acorn.parse(buffer);
  }
  catch (err) {
    console.error(`Parsing failed: ${err}, File: ${file}`);
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
    debug(`Prop: ${matches[1]}, isLegal: ${propLegal}`);
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

  if (parser.propValue.length === 1) {
    const propValue = parser.propValue[0];

    const pathObj = path.parse(parser.currFile);
    const propFileName = `${pathObj.dir}/${propValue}`;
    if (isFile(propValue)) {
      newPropVal = getFromFile(propValue);
    }
    else if (isFile(propFileName)) {
      newPropVal = getFromFile(propFileName);
    }
    else if (parser.prop === 'solutions') {
      newPropVal = parser.propValue;
    }
    else {
      newPropVal = parser.propValue[0] || parser.propValue;
    }
  }
  else {
    newPropVal = parser.propValue;
  }

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
    helpRoom: '',
    nChallenges: challenges.length
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

  // Add all props given with -p to each challenge
  if (opts.prop.length > 0) {
    finalFormat.challenges.forEach(chal => {
      opts.prop.forEach(prop => {
        const [key, val] = prop.split(':');
        chal[key] = val;
      });
    });
  }

  return JSON.stringify(finalFormat, null, 2);
}

/* Checks that existing file is not overwritten (unless --force given). */
function checkOutputFileLegality() {
  if (opts.outfile) {
    if (fs.existsSync(opts.outfile) && !opts.force) {
      const msg = `File ${opts.outfile} exists. Use --force to overwrite.`;
      throw new Error(msg);
    }
  }
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
  console.log('1. To create a challenges JSON file, use:');
  console.log('\tbin/js2json_challenges.js -f src/challenges/*.js [-o challenges.json]');
  console.log('2. To merge 2 or more JSON files, use:');
  console.log('\tbin/js2json_challenges.js --merge -f f1.json f2.json [-o merged.json]');
  console.log('3. To add JSON props (prop key/value must be legal JSON), use:');
  console.log('\tbin/js2json_challenges.js -p "isBeta:true" -p "myFlag:xxx" -f src/challenges/*.js');
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

function getFromFile(filename) {
  const buf = fs.readFileSync(filename);
  return buf.toString().split('\n');
}

function isFile(filename) {
  try {
    const stats = fs.lstatSync(filename);
    return stats.isFile();
  }
  catch (e) {
    return false;
  }
}

/* Merges all JSON files given with --infile|-f. Order of the files is
 * important: Challenges in 1st file are not overwritten by 2nd file etc.
 * Useful if 1st file contains completed challenges but the 2nd/3rd files have
 * only stubs/incomplete challenges.
 */
function mergeJSONFiles() {
  const parsedJSON = [];

  // Parse each file into an object
  opts.infile.forEach(file => {
    try {
      const jsonObj = JSON.parse(fs.readFileSync(file).toString());
      parsedJSON.push(jsonObj);
    }
    catch (err) {
      console.error(`JSON parse failed for file ${file}: ${err}`);
    }
  });

  debug(`Parsed ${parsedJSON.length} JSON files.`);

  const resultJSON = parsedJSON[0];

  const mergedChallenges = {};
  let numMerged = 0;

  parsedJSON.forEach((jsonObj, index) => {
    const challenges = jsonObj.challenges;
    const numChallenges = challenges.length;
    debug(`JSON ${index} has ${numChallenges} challenges.`);
    challenges.forEach(chal => {
      if (!mergedChallenges[chal.title]) {
        mergedChallenges[chal.title] = chal;
        if (index > 0) {
          resultJSON.challenges.push(chal);
          ++numMerged;
        }
      }
    });
  });

  debug(`Merged ${numMerged} challenges.`);

  if (parsedJSON.length > 0) {
    return formatResult(mergedChallenges);
    // return JSON.stringify(resultJSON, null, 2);
  }
}

