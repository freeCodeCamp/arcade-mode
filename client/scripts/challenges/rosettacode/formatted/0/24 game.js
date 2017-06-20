
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-undef: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// WIP

/// title: 24 game
/// type: rosetta-code

/// categories:


/// difficulty: 8

/// benchmark:

/// description:
/// <dl class="rosetta__description-list"><dt class="rosetta__description-title">task:</dt></dl>
/// Write a program that takes a string of four digits as its argument, with each digit from 1 ──► 9 (inclusive) with repetitions allowed, and returns an arithmetic expression that evaluates to the number 24. If no such solution exists, return "no solution exists.".
/// <br>
/// Rules:
/// <ul class="rosetta__unordered-list">
/// <li class="rosetta__list-item--unordered"> Only the following operators/functions are allowed: multiplication, division, addition, subtraction</li>
/// <li class="rosetta__list-item--unordered"> Division should use floating point or rational arithmetic, etc, to preserve remainders.</li>
/// <li class="rosetta__list-item--unordered"> Forming multiple digit numbers from the supplied digits is <span class="rosetta__text--italic">disallowed</span>. (So an answer of 12+12 when given 1, 2, 2, and 1 is wrong).</li>
/// <li class="rosetta__list-item--unordered"> The order of the digits when given does not have to be preserved.</li>
/// </ul>
/// <br>
/// Example inputs:
/// solve24("4878");
/// solve24("1234");
/// solve24("6789");
/// solve24("1127");

/// Example output:
/// "(7-8/8)*4 = 24"
/// "3*1*4*2"
/// "(6*8)/(9-7)"
/// "(1+7)*(2+1)"

/// challengeSeed:
function solve24 (numStr) {
  // Good luck!
  return true;
}

/// solutions:
var ar=[],order=[0,1,2],op=[],val=[];
var NOVAL=9999,oper="+-*/",out;

function rnd(n){return Math.floor(Math.random()*n)}

function say(s){
 try{document.write(s+"<br>")}
 catch(e){WScript.Echo(s)}
}

function getvalue(x,dir){
 var r=NOVAL;
 if(dir>0)++x;
 while(1){
  if(val[x]!=NOVAL){
   r=val[x];
   val[x]=NOVAL;
   break;
  }
  x+=dir;
 }
 return r*1;
}

function calc(){
 var c=0,l,r,x;
 val=ar.join('/').split('/');
 while(c<3){
  x=order[c];
  l=getvalue(x,-1);
  r=getvalue(x,1);
  switch(op[x]){
   case 0:val[x]=l+r;break;
   case 1:val[x]=l-r;break;
   case 2:val[x]=l*r;break;
   case 3:
   if(!r||l%r)return 0;
   val[x]=l/r;
  }
  ++c;
 }
 return getvalue(-1,1);
}

function shuffle(s,n){
 var x=n,p=eval(s),r,t;
 while(x--){
  r=rnd(n);
  t=p[x];
  p[x]=p[r];
  p[r]=t;
 }
}

function parenth(n){
 while(n>0)--n,out+='(';
 while(n<0)++n,out+=')';
}

function getpriority(x){
 for(var z=3;z--;)if(order[z]==x)return 3-z;
 return 0;
}

function showsolution(){
 var x=0,p=0,lp=0,v=0;
 while(x<4){
  if(x<3){
   lp=p;
   p=getpriority(x);
   v=p-lp;
   if(v>0)parenth(v);
  }
  out+=ar[x];
  if(x<3){
   if(v<0)parenth(v);
   out+=oper.charAt(op[x]);
  }
  ++x;
 }
 parenth(-p);
 say(out);
}

function solve24(s){
 var z=4,r;
 while(z--)ar[z]=s.charCodeAt(z)-48;
 out="";
 for(z=100000;z--;){
  r=rnd(256);
  op[0]=r&3;
  op[1]=(r>>2)&3;
  op[2]=(r>>4)&3;
  shuffle("ar",4);
  shuffle("order",3);
  if(calc()!=24)continue;
  showsolution();
  break;
 }
}

/// tail:
const replaceThis = 3;

/// tests:
assert(typeof replaceMe === 'function', 'message: <code>replaceMe</code> is a function.');
