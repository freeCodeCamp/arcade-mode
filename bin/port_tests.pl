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
  "all-in-test" => \$opt{all_in_test},
  "d|debug"     => \$opt{debug},
  "f|file=s"    => \$opt{file},
  "t|target=s"  => \$opt{target},
  "h|help"      => \$opt{help},
  "with-source" => \$opt{with_source},
);

my $export_default_re = qr/^\s*export\s*default\s+(class|function|const|let|var)\s+(\w+)/;
my $module_exports_re = qr/^\s*module\.exports\*=\s*(\w+)/;
my $exports_re = qr/^\s*export\s+(class|function|const|let|var)\s+(\w+)/;

my $test_dir = $opt{target}  || "test";

my @skipped = ();
my @suffixes = ('.js', '.jsx');

# Folders to be copied
my @folders = qw(client server);

# Use find to grab the filenames
my @files = `find @folders -name "*.js*"`;
if (defined $opt{file}) {
    die("File $opt{file} specified with -f|-file doesn't exist.")
        unless -e $opt{file};
    @files = ($opt{file});
}

# Remove trailing newlines
foreach my $f (@files) {chomp($f);}

# This saves the new files that were created
my @new_files = ();

if (not -d $test_dir) {
  if (not defined $opt{debug}) { 
    mkdir($test_dir) or die $!;
  }
}

# Copy non-existing files to the target folder.
foreach my $f (@files) {
  my ($src_filename, $src_dir, $suffix) = fileparse($f, @suffixes);

  if (length($suffix) == 0) {
    push(@skipped, $f);
    next;
  }

  my $target_suffix = ".spec$suffix";
  my $target_filename = "$src_filename$target_suffix";
  my $target_dir = "$test_dir/$src_dir";

  if ($opt{with_source}) {
    $target_dir = $src_dir. "/" . $test_dir;
  }

  my $target_file = $target_dir . "/" . $target_filename;

  if (defined $opt{debug}) {
    print "Source: $f\n";
    print "\tSRC FILE $src_filename\n";
    print "\tSRC DIR: $src_dir\n";
    print "\tTEST FILE: $target_file\n";
    print "\tTEST DIR: $src_dir/test\n";
    print "\tSUFFIX: $suffix\n";
  }

  if (not -d $target_dir) {
    _exec("mkdir -p $target_dir");
  }

  my $filedata = {
    src_full_path    => $f,
    src_filename     => $src_filename,
    src_dir          => $src_dir,
    src_suffix       => $suffix,
    target_full_path => $target_file,
    target_filename  => $target_filename,
    target_dir       => $target_dir,
    target_suffix    => $target_suffix,
  };

  # Dont' overwrite existing files
  if (not -e $target_file) {
    if (not defined $opt{debug}) {
      copy_and_process_file($filedata);
    }
    else {
      print "\tcopy_and_process_file($f, $target_file)\n";
    }
  }

}

# Print out the summary of script
if (int(@new_files) > 0) {
  print "Following new spec-files were created:\n";
  foreach my $f (@new_files) {
    print "\t$f\n";
  }
  if (int(@skipped) > 0) {
    print "Following files skipped due to file-suffix:\n";
    foreach my $f (@skipped) {
      print "\tSKIPPED: $f\n";
    }
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
  my ($fdata) = @_;

  my $src_file = $fdata->{src_full_path};
  my $target_file = $fdata->{target_full_path};

  open(my $IFILE, "<", $src_file) or die $!;
  open(my $OFILE, ">", $target_file) or die $!;

  my $default_export = '';

  my $exports = '';

  while (my $line = <$IFILE>) {
    print $OFILE "// $line";
    if ($line =~ $export_default_re) {
      $default_export = $2;
    }
    elsif ($line =~ $module_exports_re) {
      $default_export = $1;
    }

    if ($line =~ $exports_re) {
      $exports .= "$2, ";
    }
  }
  $exports =~ s/,\s+$//g;

  # Add chai/mocha boilerplate
  add_chai_mocha_test_boilerplate($OFILE, $fdata, $default_export, $exports);

  close $OFILE;
  close $IFILE;
  push(@new_files, $target_file);
}

# Creates the mocha/chai test boilerplace code
sub add_chai_mocha_test_boilerplate {
  my ($OFILE, $fdata, $export, $exports) = @_;

  my $src = $fdata->{src_full_path};
  my $target = $fdata->{target_full_path};

  my $import_path_to_src = get_import_path($fdata->{src_dir});

  my $chai_func = "assert";

  my $import_default = '';
  if (length($export) > 0) {
    $import_default = "import $export from '$import_path_to_src/$src'";
  }

  my $imports = '';
  if (length($exports) > 0) {
    $imports = "import {$exports} from '$import_path_to_src/$src'";
  }

  my $BOILERPLATE = << "__BOILERPLATE__";

/* Unit tests for file $src. */
import { $chai_func } from 'chai';
$import_default
$imports

describe('$export', () => {

  it('should do x', () => {
    $chai_func(/* code */);
  });

});

__BOILERPLATE__
  print $OFILE $BOILERPLATE;
}

sub get_import_path {
  my ($src_dir) = @_;
  my $new_src_dir = $src_dir;
  print "Before: src_dir is $new_src_dir\n";
  $new_src_dir =~ s{\w+/}{../}gxs;
  print "After: src_dir is $new_src_dir\n";
  return "../" . $new_src_dir;
}

sub usage {
  my ($ret) = @_;
  my $USAGE = << "__USAGE__";
  "Usage: bin/port_tests.pl [-t target_dir]\n";

  Options:
    -all-in-test    All files in test/ (-t|target) folder.
    -d|debug        Run in debug mode (no output files created)
    -f|file         Input source file.
    -t|target       Target folder for test files. (default: test)
    -with-source    Embed test files in source folders.

__USAGE__
  print $USAGE;
}
