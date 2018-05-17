
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('assert');

/// title: IBAN
/// type: rosetta-code

/// categories:


/// difficulty: 4

/// description:
/// <div class="rosetta">
/// <p class="rosetta__paragraph">The  <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/International_Bank_Account_Number" title="wp: International_Bank_Account_Number">International Bank Account Number (IBAN)</a>  is an internationally agreed means of identifying bank accounts across national borders with a reduced risk of propagating <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Transcription_error" title="wp: Transcription_error">transcription errors</a>.</p><p class="rosetta__paragraph">The IBAN consists of up to <span class="rosetta__text--bold">34</span> alphanumeric characters:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">:*  first the two-letter ISO 3166-1 alpha-2 country code, </span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">:*  then two check digits, and </span></p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented">:*  finally a country-specific Basic Bank Account Number (BBAN). </span></p>
/// <br/><p class="rosetta__paragraph">The check digits enable a sanity check of the bank account number to confirm its integrity even before submitting a transaction.</p>
/// <p class="rosetta__paragraph">Write a function that takes IBAN string as parameter. If it is valid return true otherwise false.</p></div>

/// challengeSeed:
function isValid (iban) {
  // Good luck!
}

/// solutions:
function isValid(iban) {
  var ibanLen = {
  	NO:15, BE:16, DK:18, FI:18, FO:18, GL:18, NL:18, MK:19,
  	SI:19, AT:20, BA:20, EE:20, KZ:20, LT:20, LU:20, CR:21,
  	CH:21, HR:21, LI:21, LV:21, BG:22, BH:22, DE:22, GB:22,
  	GE:22, IE:22, ME:22, RS:22, AE:23, GI:23, IL:23, AD:24,
  	CZ:24, ES:24, MD:24, PK:24, RO:24, SA:24, SE:24, SK:24,
  	VG:24, TN:24, PT:25, IS:26, TR:26, FR:27, GR:27, IT:27,
  	MC:27, MR:27, SM:27, AL:28, AZ:28, CY:28, DO:28, GT:28,
  	HU:28, LB:28, PL:28, BR:29, PS:29, KW:30, MU:30, MT:31
  }
	iban = iban.replace(/\s/g, '')
	if (!iban.match(/^[\dA-Z]+$/)) return false
	var len = iban.length
	if (len != ibanLen[iban.substr(0,2)]) return false
	iban = iban.substr(4) + iban.substr(0,4)
	for (var s='', i=0; i<len; i+=1) s+=parseInt(iban.charAt(i),36)
	for (var m=s.substr(0,15)%97, s=s.substr(15); s; s=s.substr(13)) m=(m+s.substr(0,13))%97
	return m == 1
}

/// tail:
let tests=[
  'GB82 WEST 1234 5698 7654 32',
  'GB82 WEST 1.34 5698 7654 32',
  'GB82 WEST 1234 5698 7654 325',
  'GB82 TEST 1234 5698 7654 32',
  'SA03 8000 0000 6080 1016 7519'
]

/// tests:
assert(typeof isValid=='function','message: <code>isValid</code> should be a function.');
assert(typeof isValid(tests[0])=='boolean','message: <code>isValid("'+tests[0]+'")</code> should return a boolean.');
assert.equal(isValid(tests[0]),true,'message: <code>isValid("'+tests[0]+'")</code> should return <code>true</code>.');
assert.equal(isValid(tests[1]),false,'message: <code>isValid("'+tests[1]+'")</code> should return <code>false</code>.');
assert.equal(isValid(tests[2]),false,'message: <code>isValid("'+tests[2]+'")</code> should return <code>false</code>.');
assert.equal(isValid(tests[3]),false,'message: <code>isValid("'+tests[3]+'")</code> should return <code>false</code>.');
assert.equal(isValid(tests[4]),true,'message: <code>isValid("'+tests[4]+'")</code> should return <code>true</code>.');
/// id: 5a23c84252665b21eecc7eaf
