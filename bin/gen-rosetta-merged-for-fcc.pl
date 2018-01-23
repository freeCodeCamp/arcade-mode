#!/usr/bin/env perl 
#===============================================================================
#
#         FILE: gen-rosetta-merged-for-fcc.pl
#
#        USAGE: ./gen-rosetta-merged-for-fcc.pl
#
#  DESCRIPTION: Generates a merged JSON file for Rosetta code challenges.
#
#      OPTIONS: ---
# REQUIREMENTS: ---
#         BUGS: ---
#        NOTES: ---
#       AUTHOR: Tuomas Poikela (tpoikela), tuomas.sakari.poikela@gmail.com
# ORGANIZATION: ---
#      VERSION: 1.0
#      CREATED: 12/03/2017 12:10:38 PM
#     REVISION: ---
#===============================================================================

use strict;
use warnings;
use utf8;

my $js2json = "bin/js2json_challenges.js";
my $csv_script = "bin/get-excluded-from-csv.js";

my $rosetta_formatted = "client/scripts/challenges/rosettacode/formatted/**/*.js";
my $rosetta_raw = "client/scripts/challenges/rosettacode/preformatted/**/*.raw";

my @csv_files = glob("*.csv");

_cmd("$csv_script '" . join("' '", @csv_files) . "' > excluded.txt");

my $fcc_args = "--fcc --order --name 'Rosetta code problems'";
my $raw_args = "--rename solutions:betaSolutions --rename tests:betaTests -p isBeta:true";
_cmd("$js2json $fcc_args --nochecks --exclude excluded.txt -f $rosetta_raw $raw_args > rosetta_raw.json");

_cmd("$js2json $fcc_args -f $rosetta_formatted > rosetta_formatted.json");

_cmd("$js2json $fcc_args --merge -f rosetta_formatted.json rosetta_raw.json > rosetta_merged.json");

# Clean up
#_cmd("rm excluded.txt rosetta_formatted.json rosetta_raw.json");

print "Merged challenges are in rosetta_merged.json\n";

sub _cmd {
    my ($cmd) = @_;
    print STDERR "$cmd\n";
    my $err = system($cmd);
    if ($err != 0) {
        die("Stopping pipeline. Command |$cmd| failed with $err");
    }
}
