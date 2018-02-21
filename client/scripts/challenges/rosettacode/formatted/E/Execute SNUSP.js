
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Execute SNUSP
/// type: rosetta-code

/// categories:
/// Compilers and Interpreters

/// difficulty: 4

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">SNUSP (SNUSP's Not Unix, but a Structured Path) is a language with a two-dimensional code space, inspired by PATH. SNUSP is more orthogonal, specifies semantics more concretely, and optionally allows more advanced features.</p>
/// <p>Write a function that takes a string as input. This string will be SNUSP code and the function should return the output of the SNUSP code as another string. You can read about SNUSP <a href="https://esolangs.org/wiki/SNUSP">here</a>.</p>
/// <p>Note : <ol><li>You need not implement the ',' command.<li>For the last test case, the input has newline characters at appropriate places. Also the output "Hello world" also have a newline character at the end.</ol></p></div>


/// challengeSeed:
function snuspfcc (codestr) {
  // Good luck!
}

/// solutions:
function snusp(codestr){
  codestr.replace("\\","\\\\");
  var code = "#";     // formatted code
  var width;          // length of each line in code
  var ip = 0;         // current instruction within code (mod by $, ?, !, #)
  var dir = 1;        // current direction (mod by /, \, #)

  var data = [0];     // data array (mod by +, -)
  var dp = 0;         // index into data (mod by <, >)

  var inp = 0;        // current input character (fetch with ,)
  var quit = 0;       // termination flag

  var stack = [];     // call stack (mod by @, #)
  var snout="";
  var commands = {
    '>':function() { if (++dp >= data.length) data[dp]=0 },
    '<':function() { if (--dp < 0) quit++ },
    '+':function() { ++data[dp] },
    '-':function() { --data[dp] },
    '/':function() { dir = -width / dir },
    '\\':function() { dir = width / dir },
    '!':function() { ip += dir },
    '?':function() { if (!data[dp]) ip += dir },
    ',':function() {
      if (isNaN(data[dp])) {   // EOF
        --inp;
        data[dp] = 0;
      }
    },
    '.':function() {
      snout += String.fromCharCode(data[dp]);
    },
    '@':function() { stack.push(ip+dir, dir) },
    '#':function() { if (stack.length) { dir=stack.pop(); ip=stack.pop(); } else quit++; },
    '\n':function() { quit++ }
  };

  var spaces = "  ";
  function format(codet) {
    var value = codet;
    var lines = value.split('\n');
    width = 0;
    for (var i in lines)
      width = Math.max(width, lines[i].length);
    while (spaces.length < width)
      spaces += spaces;
    for (var i in lines)
      lines[i] += spaces.substring(0, width - lines[i].length);
    code = lines.join('\n');
    width++;

    init();
    dump();
  }
  function init() {
    inp = 0; quit = 0; dp = 0; dir = 1;
    data = [0];
    stack = [];
    ip = code.indexOf('$');  if (ip<0) ip=0;
  }
  function encode(s) {
    var e = s.replace(/&/g, "&amp;");
        e = e.replace(/</g, "&lt;");
      e = e.replace(/>/g, "&gt;");
      e = e.replace(/ /g, "&nbsp;");
    return  e.replace(/\n/g, "<br>");
  }
  function dump() {
    return data.join();
  }
  function body() {
    var fn = commands[code.charAt(ip)];
    if (fn) fn();
    ip += dir;
  }
  function done() {
    return quit || ip<0 || ip>=code.length;
  }
  function out() {
    var d = stack.length;
    while (stack.length>=d && !done())
      body();
    dump();
  }
  format(codestr);
  out();
  return snout;
}

/// tail:
var test1=`+++++++++++++++++++++++++++++++++++.`;
var test2=`++++++++++++++++++++++++++++++++++++.`;
var test3=`+++++++++++++++++++++++++++++++++++.>++++++++++++++++++++++++++++++++++++.<.>.`;
var test4=`+++++++++++++++++++++++++++++++++++++++.>++++++++++++++++++++++++++++++++++++.<.>.<.>.`;
var test5=`/++++!/===========?\\>++.>+.+++++++..+++\\
\\+++\\ | /+>+++++++>/ /++++++++++<<.++>./
$+++/ | \\+++++++++>\\ \\+++++.>.+++.-----\\
      \\==-<<<<+>+++/ /=.>.+>.--------.-/`;

/// tests:
assert.equal(snusp(test1),"#",'message : <code>snusp("+++++++++++++++++++++++++++++++++++.")</code> should return <code>#</code>');
assert.equal(snusp(test2),"$",'message : <code>snusp("++++++++++++++++++++++++++++++++++++.")</code> should return <code>$</code>');
assert.equal(snusp(test3),"#$#$",'message : <code>snusp("+++++++++++++++++++++++++++++++++++.>++++++++++++++++++++++++++++++++++++.<.>.")</code> should return <code>#$#$</code>');
assert.equal(snusp(test4),"'$'$'$","message : <code>snusp('+++++++++++++++++++++++++++++++++++++++.>++++++++++++++++++++++++++++++++++++.<.>.<.>.')</code> should return <code>'$'$'$</code>");
assert.equal(snusp(test5),"Hello World!\n",'message : <code>snusp("'+test5+'")</code> should return <code>Hello World!\n</code>');
/// id: 59e0ad64214afc42b6a8547b
