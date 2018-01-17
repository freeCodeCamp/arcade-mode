
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: Find common directory path
/// type: rosetta-code

/// categories:


/// difficulty: 2

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">Create a function that, given a set of strings representing directory paths and a '/' character as directory separator, will return a string representing that part of the directory tree that is common to all the directories.</p><br/>
/// </div>

/// challengeSeed:
function commonDir (paths) {
  // Good luck!
}

/// solutions:
function commonDir(paths){
	let commonpath="",a,b;

	paths=paths.map(function(e){
		return e.split("/");
	});

	let first=paths[0];

	for(var i=0;i<first.length;i++){
		a=first[i];

		for (var j=0;j<paths.length;j++){
			b=paths[j];
			if(a!=b[i]){
				a=null;
				break;
			}
		}
		if(a!=null){
			commonpath+=a+"/";
		}else{
			break;
		}
	}
	return commonpath;
}

/// tail:
let paths=[['/home/user1/tmp/coverage/test' ,'/home/user1/tmp/covert/operator' ,'/home/user1/tmp/coven/members'],
          ['/dir1/dir2/subdir','/dir1/subdir2','/dir1/dir2/dir3','/dir1/dir2/subsurf/dir3'],
          ['/dir/hello_dir','/dir2/subdir1'],
          ['/path/var/tmp/dev','/path/var/spool'],
          ['/bin/include/headers','/bin/include/links','/bin/addons/include/headers','/bin/brick/var/tmp']];

let outputs=["/home/user1/tmp/",
            "/dir1/",
            "/",
            "/path/var/",
            "/bin/"]

/// tests:
assert(typeof commonDir=='function','message: <code>commonDir</code> should be a function.');
assert(typeof commonDir(paths[0])=='string','message: <code>commonDir('+JSON.stringify(paths[0])+')</code> should return a string.');
assert.equal(commonDir(paths[0]),outputs[0],'message: <code>commonDir('+JSON.stringify(paths[0])+')</code> should return <code>"'+outputs[0]+'"</code>.');
assert.equal(commonDir(paths[1]),outputs[1],'message: <code>commonDir('+JSON.stringify(paths[1])+')</code> should return <code>"'+outputs[1]+'"</code>.');
assert.equal(commonDir(paths[2]),outputs[2],'message: <code>commonDir('+JSON.stringify(paths[2])+')</code> should return <code>"'+outputs[2]+'"</code>.');
assert.equal(commonDir(paths[3]),outputs[3],'message: <code>commonDir('+JSON.stringify(paths[3])+')</code> should return <code>"'+outputs[3]+'"</code>.');
assert.equal(commonDir(paths[4]),outputs[4],'message: <code>commonDir('+JSON.stringify(paths[4])+')</code> should return <code>"'+outputs[4]+'"</code>.');
/// id: 5a5f60c86c6a5b182fbb2044
