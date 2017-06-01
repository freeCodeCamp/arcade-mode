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

const commandLineArgs = require('command-line-args');
const fs = require('fs');
const acorn = require('acorn');

const optionDefinitions = [
  { name: 'force', type: Boolean, descr: 'Overwrite output files forcefully.' },
  { name: 'help', alias: 'h', type: Boolean, descr: 'Print help message' },
  { name: 'infile', alias: 'f', type: String, multiple: true, descr: 'Input files' },
  { name: 'outfile', alias: 'o', type: String, descr: 'Output JSON file' },
  { name: 'verbose', alias: 'v', type: Boolean, descr: 'Run in verbose mode' }
];

// Regexp definitions for the script
const re = {
  lineComment: /^\/\/\/\s+(\w+):/
//  endComment: /^\/\/\/\s+end\s+$/
};

const opts = commandLineArgs(optionDefinitions);

if (opts.help) {
  usage(0);
}

const expectedProps = {
  description: String,
  challengeSeed: 'Code',
  solution: 'Code',
  tests: 'Code'
};

// const files = process.argv.splice(2);
/*
if (opts.infile) {
  files.concat(opts.infile);
}
*/

if (opts.infile.length === 0) {
  console.error('Error. No input files were given.');
  usage(1);
}

const propParser = {
  state: 'IDLE',
  currFile: null,
  prop: null,
  propValue: [],
  files: {}
};

opts.infile.forEach(file => {
  processFile(propParser, file, expectedProps);
});

const result = formatResult(propParser.files);

printToOutput(result);

//---------------------------------------------------------------------------
// HELPER FUNCTIONS
//---------------------------------------------------------------------------

function processFile(parser, file, props) {
  const buffer = fs.readFileSync(file);
  parser.currFile = file;
  parser.files[file] = {};
  checkFileSyntax(buffer);

  const lines = buffer.toString().split('\n');
  lines.forEach(line => {
    processLine(parser, line);
  });

  if (parser.propValue.length > 0) {
    finishCurrProp(parser);
  }

  verifyExpectedProps(parser, file, props);
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
  if (re.lineComment.test(line)) {
    const matches = line.match(re.lineComment);
    if (parser.prop !== null) {
      finishCurrProp(parser);
    }
    parser.prop = matches[1];
  }
  /*
  else if (re.endComment.test(line)) {
    console.log('endcmment');
    finishCurrProp(parser);
  }
  */
  else if (parser.prop !== null) {
    parser.propValue.push(line);
  }
}

/* Adds current property value into the parser for the current file being processed. Resets
 * the prop value after this. */
function finishCurrProp(parser) {
  parser.files[parser.currFile][parser.prop] = parser.propValue;
  parser.propValue = [];
  parser.prop = null;
}

/* Verifies that the parsed file contains expected props like 'solution' etc.*/
function verifyExpectedProps(parser, file, props) {
  Object.keys(props).forEach(prop => {
    if (parser.files[file][prop] === undefined) {
      console.warn(`Prop ${prop} missing from file ${file}`);
    }
  });
}

/* Formats the result as JSON. */
function formatResult(parsedFiles) {
  return Object.keys(parsedFiles).map(
    filename => JSON.stringify(parsedFiles[filename], null, 2)
  ).join(',\n');
}

/* Prints the results to given output file. */
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
  console.log('Usage: bin/js2json_challenges.js [opts] <files>+\n');
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
