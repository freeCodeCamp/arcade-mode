#!/usr/bin/env perl 
#===============================================================================
#
#         FILE: port_tests.pl
#
#        USAGE: ./port_tests.pl
#
#  DESCRIPTION: Script for creating a test file directory structure from
#  existing source files. Especially good for legacy projects with no existing
#  unit or other test base.
#
#  Currently, finds all source files from specified folders. Creates similar
#  file structure, but addeds .spec to all files.
#
#      OPTIONS: ---
# REQUIREMENTS: ---
#         BUGS: ---
#        NOTES: ---
#       AUTHOR: Tuomas Poikela (tpoikela), tuomas.sakari.poikela@gmail.com
# ORGANIZATION: ---
#      VERSION: 1.0
#      CREATED: 05/12/2017 09:34:42 AM
#     REVISION: ---
#===============================================================================

use strict;
use warnings;
use utf8;

use Getopt::Long;
use File::Basename;

my %opt;
GetOptions(
  "d|debug" => \$opt{debug},
  "t|target=s" => \$opt{target},
  "h|help" => \$opt{help},
);

my $test_dir = $opt{target}  || "test";

my @suffixes = ('.js', '.jsx');

# Folders to be copied
my @folders = qw(client server);

# Use find to grab the filenames
my @files = `find @folders -name "*.js*"`;

# Remove trailing newlines
foreach my $f (@files) {chomp($f);}

# This saves the new files that were created
my @new_files = ();

if (not -d $opt{target}) {
  mkdir($opt{target}) or die $!;
}

# Copy non-existing files to the target folder.
foreach my $f (@files) {
  my ($filename, $dirs, $suffix) = fileparse($f, @suffixes);

  my $new_suffix = ".spec$suffix";
  my $new_filename = "$filename$new_suffix";
  my $target_dir = "$test_dir/$dirs";
  my $new_full_path = $target_dir . "/" . $new_filename;

  if (defined $opt{debug}) {
    print "Source: $f\n";
    print "\tFNAME: $filename\n";
    print "\tSUFFIX: $suffix\n";
    print "\tNew full path: $new_full_path\n";
  }

  if (not -d $target_dir) {
    _exec("mkdir -p $target_dir");
  }

  # Dont' overwrite existing files
  if (not -e $new_full_path) {
    if (not defined $opt{debug}) {
      copy_and_process_file($f, $new_full_path);
    }
    else {
      print "\tcopy_and_process_file($f, $new_full_path)\n";
    }
  }

}

if (int(@new_files) > 0) {
  print "Following new spec-files were created:\n";
  foreach my $f (@new_files) {
    print "\t$f\n";
  }
}
elsif (defined $opt{debug}) {
  print "Script was run in debug mode.\n";
}
else {
  print "There were no new source files to be processed.\n";
}

#---------------------------------------------------------------------------
# HELPER FUNCTIONS
#---------------------------------------------------------------------------

# Executes a command using shell or prints info during debugging
sub _exec {
  my ($cmd) = @_;
  if (not defined $opt{debug}) {
    return system($cmd);
  }
  else {
    print STDERR "[DEBUG]: >> $cmd\n";
  }
}

# Copies the source file and comments out each line
sub copy_and_process_file {
  my ($src_file, $target_file) = @_;
  open(my $IFILE, "<", $src_file) or die $!;

  open(my $OFILE, ">", $target_file) or die $!;

  while (my $line = <$IFILE>) {
    print $OFILE "// $line";
  }

  # Add chai/mocha boilerplate
  add_chai_mocha_test_boilerplate($OFILE, $src_file, $target_file);

  close $OFILE;
  close $IFILE;
  push(@new_files, $target_file);
}

sub add_chai_mocha_test_boilerplate {
  my ($OFILE, $src, $target) = @_;
  my $chai_func = "assert";
  my $BOILERPLATE = << "__BOILERPLATE__";
import { $chai_func } from 'chai';
import codeUnderTest from '~/$src';

describe('$target', () => {

  it('should do x', () => {
    $chai_func(/* code */);
  });

});

__BOILERPLATE__
  print $OFILE $BOILERPLATE;
}

sub usage {
  my ($ret) = @_;
  print "Usage: bin/port_tests.pl [-t target_dir]\n";

}
