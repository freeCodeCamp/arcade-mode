
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: FASTA format
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// description:
/// <div class="rosetta"><br/><p class="rosetta__paragraph">In <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/bioinformatics" title="wp: bioinformatics">bioinformatics</a>, long character strings are often encoded in a format called <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/FASTA format" title="wp: FASTA format">FASTA</a>.</p><br/><p class="rosetta__paragraph">A FASTA file can contain several strings, each identified by a name marked by a <big><big><code>&gt;</code></big></big> (greater than) character at the beginning of the line.</p><p class="rosetta__paragraph">Write a function that takes a FASTA file (as a string parameter) such as:</p>
/// <pre class="rosetta__pre">
/// >Rosetta_Example_1
/// THERECANBENOSPACE
/// >Rosetta_Example_2
/// THERECANBESEVERAL
/// LINESBUTTHEYALLMUST
/// BECONCATENATED
/// </pre><br/><p>The result for the above input should be : <pre class="rosetta__pre">
/// Rosetta_Example_1: THERECANBENOSPACE
/// Rosetta_Example_2: THERECANBESEVERALLINESBUTTHEYALLMUSTBECONCATENATED
/// </pre><p><b>Note :</b> The input string will contain '|' as line separators. The output should contain '|' as line separators.</b></p>
/// </div>

/// challengeSeed:
function fasta(str) {
  // Good luck!
}

/// solutions:
function fasta(str){
	str=str.split("|");
	let format="";
	
	str.forEach(function (a){
    if(a.startsWith(">")){
      format+="|"+a.substring(1)+":";
    }else{
      format+=a;
    }
	});
	
	return format.substring(1);
}

/// tail:
const tests=[
  ">FASTA1|THERECANBENOSPACE|>FASTA2|THERECANBESEVERAL|LINESBUTTHEYALLMUST|BECONCATENATED",
  ">ANOTHERFASTA|LINEO|LINET|>WOAH|WOAHH|WOAHH",
  ">HELLO|WORLD|>HELLOAGAIN|WORLD|WORLDMORE|>HELLOYETAGAIN|WORLDAGAIN|WORLDLINE",
  ">FIVELINES|ONE|TWO|THREE|FOUR|FIVE|>THREELINES|ONE|TWO|THREE",
  ">LASTEXAMPLE|LAST|EXAMPLE|>LASTEXAMPLELINE|LAST|EXAMPLE|LINE"];

const results=[
    "FASTA1:THERECANBENOSPACE|FASTA2:THERECANBESEVERALLINESBUTTHEYALLMUSTBECONCATENATED",
    "ANOTHERFASTA:LINEOLINET|WOAH:WOAHHWOAHH",
    "HELLO:WORLD|HELLOAGAIN:WORLDWORLDMORE|HELLOYETAGAIN:WORLDAGAINWORLDLINE",
    "FIVELINES:ONETWOTHREEFOURFIVE|THREELINES:ONETWOTHREE",
    "LASTEXAMPLE:LASTEXAMPLE|LASTEXAMPLELINE:LASTEXAMPLELINE"
  ];

/// tests:
assert(typeof fasta=='function','message:<code>fasta</code> should be a function.')
assert(typeof fasta(tests[0])=='string','message:<code>fasta('+tests[0]+')</code> should return a String.')
assert.equal(fasta(tests[0]),results[0],'message:<code>fasta("'+tests[0]+'")</code> should return <code>"'+results[0]+'"</code>')
assert.equal(fasta(tests[1]),results[1],'message:<code>fasta("'+tests[1]+'")</code> should return <code>"'+results[1]+'"</code>')
assert.equal(fasta(tests[2]),results[2],'message:<code>fasta("'+tests[2]+'")</code> should return <code>"'+results[2]+'"</code>')
assert.equal(fasta(tests[3]),results[3],'message:<code>fasta("'+tests[3]+'")</code> should return <code>"'+results[3]+'"</code>')
assert.equal(fasta(tests[4]),results[4],'message:<code>fasta("'+tests[4]+'")</code> should return <code>"'+results[4]+'"</code>')
/// id: 59c3ecf2fff8b4181fa3719f
