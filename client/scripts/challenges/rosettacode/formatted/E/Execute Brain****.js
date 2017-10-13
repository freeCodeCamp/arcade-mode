
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Execute Brain****
/// type: rosetta-code

/// categories:
/// Compilers and Interpreters

/// difficulty: 4

/// description:
/// <div class="rosetta"><br/>
/// <p class="rosetta_paragraph">Write a function to implement a Brain**** interpreter. The function will take a string as a parameter and should return a string as the output. More details are given below : </p>
/// <p class="rosetta__paragraph">RCBF is a set of <a class="rosetta__link--rosetta" href="http://rosettacode.org/wiki/Brainf***" title="Brainf***">Brainf***</a> compilers and interpreters written for Rosetta Code in a variety of languages.</p><br/><p class="rosetta__paragraph">Below are links to each of the versions of RCBF.</p><br/><p class="rosetta__paragraph">An implementation need only properly implement the following instructions:</p>
/// <p class="rosetta__paragraph">{| class="wikitable"</p>
/// <p class="rosetta__paragraph">!Command</p>
/// <p class="rosetta__paragraph">!Description</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="text-align:center"| <code>&gt;</code> || Move the pointer to the right</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="text-align:center"| <code>&lt;</code> || Move the pointer to the left</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="text-align:center"| <code>+</code> || Increment the memory cell under the pointer</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="text-align:center"| <code>-</code> || Decrement the memory cell under the pointer</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="text-align:center"| <code>.</code> || Output the character signified by the cell at the pointer</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="text-align:center"| <code>,</code> || Input a character and store it in the cell at the pointer</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="text-align:center"| <code>[</code> || Jump past the matching <code>]</code> if the cell under the pointer is 0</p>
/// <p class="rosetta__paragraph">|-</p>
/// <p class="rosetta__paragraph">| style="text-align:center"| <code>]</code> || Jump back to the matching <code>[</code> if the cell under the pointer is nonzero</p>
/// <p class="rosetta__paragraph">|}</p>
/// <p class="rosetta__paragraph">Any cell size is allowed,  EOF   (<u>E</u>nd-<u>O</u>-<u>F</u>ile)  support is optional, as is whether you have bounded or unbounded memory.</p>
/// <br><br> <br/></div>

/// challengeSeed:
function brain (prog) {
  // Good luck!
}

/// solutions:
function brain(prog){
  var output="";
	var code; // formatted code
  var ip = 0; // current instruction within code
  var nest = 0; // current bracket nesting (for Out button)
  var ahead = []; // locations of matching brackets

  var data = [0]; // data array (mod by +, -)
  var dp = 0; // index into data (mod by <, >)

  var inp = 0; // current input character (fetch with ,)
  var quit = 0;
	var commands = {
	'>':function() { if (++dp >= data.length) data[dp]=0 },
	'<':function() { if (--dp < 0) quit++ },
	'+':function() { ++data[dp] },
	'-':function() { --data[dp] },
	'[':function() { if (!data[dp]) ip = ahead[ip]; else ++nest },
	']':function() { if ( data[dp]) ip = ahead[ip]; else --nest },
	',':function() {
		var c = document.getElementById("input").value.charCodeAt(inp++);
		data[dp] = isNaN(c) ? 0 : c; // EOF: other options are -1 or no change
	},
	'.':function() {
    		output+=String.fromCharCode(data[dp]);
    		/*var s = document.getElementById("output").innerHTML)
    		 + String.fromCharCode(data[dp]);
    		s = s.replace(/\n/g,"<br>").replace(/ /g,"&amp;nbsp;");
    		document.getElementById("output").innerHTML = s;*/
    	},
    };

	let ar=prog.split('');
	var st = [], back, error = -1;
	for (ip=0; ip<ar.length; ip++) {
		switch(ar[ip]) {
		case '[':
			st.push(ip);
			break;
		case ']':
			if (st.length == 0) error = ip;
			back = st.pop();
			ahead[ip] = back;
			ahead[back] = ip;
			break;
		}
	}

	for(ip=0;ip<ar.length;ip++){
    if(commands.hasOwnProperty(ar[ip]))
		  commands[ar[ip]]();
	}

	return output;
}

// tail:
let bye="++++++++++[>+>+++>++++>+++++++>++++++++>+++++++++>++++++++++>+++++++++++>++++++++++++<<<<<<<<<-]>>>>+.>>>>+..<.<++++++++.>>>+.<<+.<<<<++++.<++.>>>+++++++.>>>.+++.<+++++++.--------.<<<<<+.<+++.---.";
let hello="++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.";
let fib=`+

++

+++

++++

+>+>>

>>++++

+++++++

++++++++

+++++++++

++++++++++

++++++>++++

++++++++++++

+++++++++++++

+++<<<<<<[>[>>

>>>>+>+<<<<<<<-

]>>>>>>>[<<<<<<<

+>>>>>>>-]<[>++++

++++++[-<-[>>+>+<<

<-]>>>[<<<+>>>-]+<[

>[-]<[-]]>[<<[>>>+<<

<-]>>[-]]<<]>>>[>>+>+

<<<-]>>>[<<<+>>>-]+<[>

[-]<[-]]>[<<+>>[-]]<<<<

<<<]>>>>>[++++++++++++++

+++++++++++++++++++++++++

+++++++++.[-]]++++++++++<[

->-<]>+++++++++++++++++++++

+++++++++++++++++++++++++++.

[-]<<<<<<<<<<<<[>>>+>+<<<<-]>

>>>[<<<<+>>>>-]<-[>>.>.<<<[-]]

<<[>>+>+<<<-]>>>[<<<+>>>-]<<[<+

>-]>[<+>-]<<<-]`;

/// tests:
assert(typeof brain(bye)=='string','');
assert(typeof brain(hello)=='string','');
assert.equal(brain("++++++[>++++++++++<-]>+++++."),"A",'');
assert.equal(brain(bye),"Goodbye, World!\r\n",'');
assert.equal(brain(hello),"Hello World!\n",'');
assert.equal(brain(fib),"1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89",'');
/// id: 59e0a8df964e4540d5abe599
