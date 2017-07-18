# Contributor's Guide

Welcome to the Arcade Mode Contributors Guide!

Arcade Mode is an interview preparation app featuring algorithm and data structure questions in a timed environment. The end goal will be its incorporation into freeCodeCamp proper as part of the coding interview preparation section.

We welcome pull requests from freeCodeCamp campers (our students) and seasoned JavaScript developers alike! Follow these steps to contribute:

1. Follow the [Contribution Guidelines](#contribution-guidelines) to initially set up the project.

2. Find an issue that needs assistance by going to the [Help Wanted section](#help-wanted) or by searching for the [Help Wanted tag](https://github.com/freeCodeCamp/arcade-mode/labels/help%20wanted). Specific instructions are provided in each help wanted item.

Feel free to ask for help in our [Gitter room](https://gitter.im/FreeCodeCamp/arcade-mode).

Working on your first Pull Request? You can learn how from this *free* series [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

###### If you've found a bug that is not on the board, [follow these steps](README.md#found-a-bug).

--------------------------------------------------------------------------------

## Contribution Guidelines

- [Prerequisites](#prerequisites)
- [Forking The Project](#forking-the-project)
- [Create A Branch](#create-a-branch)
- [Setup Linting](#setup-linting)
- [Setup arcade-mode](#setup-arcade-mode)
- [Make Changes](#make-changes)
- [Run The Test Suite](#run-the-test-suite)
- [Squash Your Commits](#squash-your-commits)
- [Creating A Pull Request](#creating-a-pull-request)
- [Common Steps](#common-steps)
- [How We Review and Merge Pull Requests](#how-we-review-and-merge-pull-requests)
- [How We Close Stale Issues](#how-we-close-stale-issues)
- [Next Steps](#next-steps)
- [Other resources](#other-resources)

## Help Wanted

- [Rosetta](#rosetta)
- [Euler](#euler)

### Prerequisites

| Prerequisite                                | Version |
| ------------------------------------------- | ------- |
| [Node.js](http://nodejs.org)                | `~ ^8`  |
| npm (comes with Node)                       | `~ ^5`  |

> _Updating to the latest releases is recommended_.

If Node is already installed in your machine, run the following commands to validate the versions:

```shell
node -v
```

If your version is lower than the prerequisite version, you should update.

### Forking The Project

#### Setting Up Your System

1. Install [Git](https://git-scm.com/) or your favorite Git client.
2. (Optional) [Setup an SSH Key](https://help.github.com/articles/generating-an-ssh-key/) for GitHub.
3. Create a parent projects directory on your system. For this guide, it will be assumed that it is `/mean/`

#### Forking /arcade-mode

1. Go to the top level /arcade-mode repository: <https://github.com/freeCodeCamp/arcade-mode>
2. Click the "Fork" Button in the upper right hand corner of the interface ([More Details Here](https://help.github.com/articles/fork-a-repo/))
3. After the repository has been forked, you will be taken to your copy of the arcade-mode repo at `yourUsername/arcade-mode`

#### Cloning Your Fork

1. Open a Terminal / Command Line / Bash Shell in your projects directory (_i.e.: `/yourprojectdirectory/`_)
2. Clone your fork of arcade-mode

```shell
$ git clone https://github.com/yourUsername/arcade-mode.git
```

##### (make sure to replace `yourUsername` with your GitHub Username)

This will download the entire arcade-mode repo to your projects directory.

#### Setup Your Upstream

1. Change directory to the new arcade-mode directory (`cd arcade-mode`)
2. Add a remote to the official arcade-mode repo:

```shell
$ git remote add upstream https://github.com/freeCodeCamp/arcade-mode.git
```

Congratulations, you now have a local copy of the arcade-mode repo!

#### Maintaining Your Fork

Now that you have a copy of your fork, there is work you will need to do to keep it current.

##### **Rebasing from Upstream**

Do this prior to every time you create a branch for a PR:

1. Make sure you are on the `master` branch

  > ```shell
  > $ git status
  > On branch master
  > Your branch is up-to-date with 'origin/master'.
  > ```

  > If your aren't on `master`, resolve outstanding files / commits and checkout the `master` branch

  > ```shell
  > $ git checkout master
  > ```

2. Do a pull with rebase against `upstream`

  > ```shell
  > $ git pull --rebase upstream master
  > ```

  > This will pull down all of the changes to the official master branch, without making an additional commit in your local repo.

3. (_Optional_) Force push your updated master branch to your GitHub fork

  > ```shell
  > $ git push origin master --force
  > ```

  > This will overwrite the master branch of your fork.

### Create A Branch

Before you start working, you will need to create a separate branch specific to the issue / feature you're working on. You will push your work to this branch.

#### Naming Your Branch

Name the branch something like `fix/xxx` or `feature/xxx` where `xxx` is a short description of the changes or feature you are attempting to add. For example `fix/email-login` would be a branch where you fix something specific to email login.

#### Adding Your Branch

To create a branch on your local machine (and switch to this branch):

```shell
$ git checkout -b [name_of_your_new_branch]
```

and to push to GitHub:

```shell
$ git push origin [name_of_your_new_branch]
```

##### If you need more help with branching, take a look at _[this](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches)_.

### Setup Linting

You should have [ESLint running in your editor](http://eslint.org/docs/user-guide/integrations.html), and it will highlight anything doesn't conform to [freeCodeCamp's JavaScript Style Guide](http://forum.freecodecamp.com/t/free-code-camp-javascript-style-guide/19121) (you can find a summary of those rules [here](https://github.com/freeCodeCamp/freeCodeCamp/blob/staging/.eslintrc)).

> Please do not ignore any linting errors, as they are meant to **help** you and to ensure a clean and simple code base.


### Setup arcade-mode
Once you have arcade-mode cloned, before you start the application, you first need to install all of the dependencies:

```bash
# Install NPM dependencies
npm install
```

If you run into errors with a package not being found, a current workaround is to delete the `package-lock.json` file and install over it, generating a new `package-lock.json`:

```bash
# Workaround for missing packages:
rm package-lock.json
npm install
```
Once everything is installed, run the following to see the site at `localhost:8080`:

# Initialize arcade-mode
```bash
npm start
```

To watch for changes, run this in a separate terminal:
```bash
npm run watch-dev
```

Now navigate to your browser and open
<http://localhost:3000>. If the app loads,
congratulations – you're all set. Otherwise, let us know by asking in the [Contributors chat room](https://gitter.im/FreeCodeCamp/Contributors) on Gitter. There also might be an error in the console of your browser or in Bash / Terminal / Command Line that will help identify the problem. If the app launches but you are encountering errors with the UI itself, for example if fonts are not being loaded or if the code editor is not displaying properly, you may try the following:

 ```bash
 # Remove all installed node modules
 rm -rf node_modules

 # Reinstall npm packages
 npm install
 ```

### Make Changes
This bit is up to you!

#### How to find the code in the arcade-mode codebase to fix/edit?

The best way to find out any code you wish to change/add or remove is using
the GitHub search bar at the top of the repository page. For example, you could
search for a challenge name and the results will display all the files along
with line numbers. Then you can proceed to the files and verify this is the area
that you were looking forward to edit. Always feel free to reach out to the chat
room when you are not certain of any thing specific in the code.

### Run The Test Suite
When you're ready to share your code, run the test suite:

```shell
$ npm run test:rosetta
```

and ensure all tests pass.

### Squash Your Commits
When you make a pull request, all of your changes need to be in one commit.

If you have made more than one commit, then you will need to _squash_ your commits.

To do this, see [Squashing Your Commits](http://forum.freecodecamp.com/t/how-to-squash-multiple-commits-into-one-with-git/13231).

### Creating A Pull Request

#### What is a Pull Request?

A pull request (PR) is a method of submitting proposed changes to the arcade-mode
Repo (or any Repo, for that matter). You will make changes to copies of the
files which make up arcade-mode in a personal fork, then apply to have them
accepted by arcade-mode proper.

#### Need Help?

arcade-mode Issue Mods and staff are on hand to assist with Pull Request
related issues in our [Contributors chat room](https://gitter.im/FreeCodeCamp/Contributors).

#### Important: ALWAYS EDIT ON A BRANCH

Take away only one thing from this document: Never, **EVER**
make edits to the `master` branch. ALWAYS make a new branch BEFORE you edit
files. This is critical, because if your PR is not accepted, your copy of
master will be forever sullied and the only way to fix it is to delete your
fork and re-fork.

#### Methods

There are two methods of creating a pull request for arcade-mode:

-   Editing files on a local clone (recommended)
-   Editing files via the GitHub Interface

##### Method 1: Editing via your Local Fork _(Recommended)_

This is the recommended method. Read about [How to Setup and Maintain a Local
Instance of arcade-mode](#maintaining-your-fork).

1.  Perform the maintenance step of rebasing `master`.
2.  Ensure you are on the `master` branch using `git status`:

```bash
$ git status
On branch master
Your branch is up-to-date with 'origin/master'.

nothing to commit, working directory clean
```

1.  If you are not on master or your working directory is not clean, resolve
    any outstanding files/commits and checkout master `git checkout master`

2.  Create a branch off of `master` with git: `git checkout -B
    branch/name-here` **Note:** Branch naming is important. Use a name like
    `fix/short-fix-description` or `feature/short-feature-description`. Review
     the [Contribution Guidelines](#contribution-guidelines) for more detail.

3.  Edit your file(s) locally with the editor of your choice

4.  Check your `git status` to see unstaged files.

5.  Add your edited files: `git add path/to/filename.ext` You can also do: `git
    add .` to add all unstaged files. Take care, though, because you can
    accidentally add files you don't want added. Review your `git status` first.

6.  Commit your edits: `git commit -m "Brief Description of Commit"`. Do not add the issue number in the commit message.

7.  Squash your commits, if there are more than one.

8.  Push your commits to your GitHub Fork: `git push -u origin branch/name-here`

9.  Go to [Common Steps](#common-steps)

##### Method 2: Editing via the GitHub Interface

Note: Editing via the GitHub Interface is not recommended, since it is not
possible to update your fork via GitHub's interface without deleting and
recreating your fork.

Read the [Wiki article](http://forum.freecodecamp.com/t/how-to-make-a-pull-request-on-free-code-camp/19114)
for further information

### Common Steps

1.  Once the edits have been committed, you will be prompted to create a pull
    request on your fork's GitHub Page.

2.  By default, all pull requests should be against the arcade-mode main repo, `master`
    branch.

3.  Submit a [pull request](http://forum.freecodecamp.com/t/how-to-contribute-via-a-pull-request/19368)
    from your branch to arcade-mode's `master` branch.

4.  The title (also called the subject) of your PR should be descriptive of your
    changes and succinctly indicates what is being fixed.

    -   **Do not add the issue number in the PR title or commit message.**

    -   Examples: `Add Test Cases to Bonfire Drop It` `Correct typo in Waypoint
        Size Your Images`

5.  In the body of your PR include a more detailed summary of the changes you
    made and why.

    -   If the PR is meant to fix an existing bug/issue then, at the end of
        your PR's description, append the keyword `closes` and #xxxx (where xxxx
        is the issue number). Example: `closes #1337`. This tells GitHub to
        close the existing issue, if the PR is merged.

6.  Indicate if you have tested on a local copy of the site or not.


### How We Review and Merge Pull Requests

Currently, arcade-mode pull requests will be reviewed personally by the two main developers of arcade-mode, [@timolawl](https://github.com/timolawl) and [@tpoikela](https://github.com/tpoikela).

We as issue moderators will routinely go through open pull requests in a process called [Quality Assurance](https://en.wikipedia.org/wiki/Quality_assurance) (QA).

1. If an Issue Moderator QA's a pull request and confirms that the new code does what it is supposed without seeming to introduce any new bugs, they will comment "LGTM" which means "Looks good to me."

2. Another Issue Moderator will QA the same pull request. Once they have also confirmed that the new code does what it is supposed to without seeming to introduce any new bugs, they will merge the pull request.

### How We Close Stale Issues

We will close any issues or pull requests that have been inactive for more than 15 days, except those that match the following criteria:
- bugs that are confirmed
- pull requests that are waiting on other pull requests to be merged
- features that are a part of a GitHub project

### Next Steps

#### If your PR is accepted

Once your PR is accepted, you may delete the branch you created to submit it.
This keeps your working fork clean.

You can do this with a press of a button on the GitHub PR interface. You can
delete the local copy of the branch with: `git branch -D branch/to-delete-name`

#### If your PR is rejected

Don't despair! You should receive solid feedback from the Issue Moderators as to
why it was rejected and what changes are needed.

Many Pull Requests, especially first Pull Requests, require correction or
updating. If you have used the GitHub interface to create your PR, you will need
to close your PR, create a new branch, and re-submit.

If you have a local copy of the repo, you can make the requested changes and
amend your commit with: `git commit --amend` This will update your existing
commit. When you push it to your fork you will need to do a force push to
overwrite your old commit: `git push --force`

Be sure to post in the PR conversation that you have made the requested changes.

### Other resources

-   [Style Guide for freeCodeCamp Challenges](https://github.com/freeCodeCamp/freeCodeCamp/blob/staging/seed/challenge-style-guide.md)

-   [Searching for Your Issue on GitHub](http://forum.freecodecamp.com/t/searching-for-existing-issues/19139)

-   [Creating a New GitHub Issue](http://forum.freecodecamp.com/t/creating-a-new-github-issue/18392)

-   [Select Issues for Contributing Using Labels](http://forum.freecodecamp.com/t/free-code-camp-issue-labels/19556)

-   [Writing great git commit messages](http://forum.freecodecamp.com/t/writing-good-git-commit-messages/13210)

-   [Contributor Chat Support - For the FCC Repositories, and running a local instance](https://gitter.im/FreeCodeCamp/Contributors)

### Rosetta

We currently need help with coverting [RosettaCode](https://rosettacode.org) tasks into in-house challenges.

If you would like to contribute, please check [the spreadsheet][1] to find a task-to-challenge that has not been worked on yet. Once you have decided on a letter, please add your GitHub username to the Contributor section and note the decision `wip` so that others know you are working on it. If you have been vetted by Quincy/Michael, you will be granted write access to the spreadsheet.

**Details:**
Please refer to [this directory](https://github.com/freeCodeCamp/arcade-mode/tree/master/client/scripts/challenges/rosettacode).

- Raw, preprocessed RosettaCode tasks comes from the `raw` directory
- Formatted content goes into the `formatted` directory

**Workflow steps:**
1. In considering a raw RosettaCode task for conversion, check if it passes the following exclusion criteria test (exclude if):
- There exists no JavaScript solution
- It is a trivial task (e.g., it is not asking for A + B)
- It requires HTML to implement (e.g., requires `<canvas>`)
_For other exclusion considerations, refer to [the spreadsheet][1]._

2. If suitable, copy the raw file to its respective formatted letter directory, but replace the `.raw` extension with `.js`.

3. Conversion process:
- Update the challenge description such that it asks the user to create a function to solve the challenge.
- In formatting the challenge seed and solution, they should take the form of:
```
function <APT_NAME_FOR_CHALLENGE_FN> (<ANY_ARGS>) {
  // Good luck!
  return <APT_RETURN_VALUE>;
}
```
- Visual formatting (i.e., does the challenge look acceptable when viewed in the browser?)
- Add tests using Chai's `assert`.
- The `/// tail:` section appends code above the `/// test:` phase. If you find you need to add additional code for testing, it goes in the tail section.
- If you believe the challenge is benchmark worthy, you can add a benchmark call under `/// benchmark:`. Otherwise, remove the `/// benchmark:` and its subsequent line entirely for the time being.
- Assign a difficulty number between 1 (easiest) and 9 (hardest) given your best estimate.

4. Lastly, be sure to test the challenge:
- via unit testing with `npm run test:rosetta` (be sure that `public/json/challenges-rosetta.json` has been regenerated with the updated file content before running the test as it relies on this file)
- via the app itself

If you run into an issue or have questions on the porting process, the first and best method would be to refer to already completed ports; see currently formatted challenges in the directories `0-C` and `T-Z` for reference. If that does not resolve your issue or question, leave a comment below and we will get back to you as soon as we can. If the issue is more general or of a different nature, please create a separate issue. You can also reach us at our [Gitter](https://gitter.im/FreeCodeCamp/arcade-mode).

**Miscellaneous:**
1. There may occasionally be RosettaCode challenges that ask the user to solve multiple tasks. We do not want users to become confused as a result of all the tasks. In these scenarios, please make the best attempt to cut down the number of tasks to one or at most two. The task description will likely have to be rewritten to a degree.

2. For aesthetics and formatting, refer to other already formatted challenges (e.g., formatted challenges in `A-C`) and the [Rosetta Code task itself](http://rosettacode.org/wiki/Category:Programming_Tasks).

Thank you for your help!

[1]: https://docs.google.com/spreadsheets/d/1b_wMIaKR-gA0tD6ADQfDjDT5BBWaUsQyIPP0TS6o7is/edit?usp=sharing

### Euler

We currently need help with converting [Project Euler](https://projecteuler.net/) tasks into in-house challenges. This mostly involves adding a solution to the challenge.

**Details:**
Please refer to [this path](https://github.com/freeCodeCamp/arcade-mode/tree/master/client/scripts/challenges/projecteuler).
- Raw Project Euler tasks are located in the `raw` directory.
- Formatted challenges go into the `formatted` directory; the subdirectory depends on the hundreds-digit (e.g., Problem 53 would go into folder `001_to_100`).

The format you see is the in-house format we use to process the challenges into one json file.

**What needs to be done:**
- A solution under the `/// solutions:` header (it should have the same function name as in the `challengeSeed`)
- An estimated difficulty rating between 1 (easiest) and 9 (hardest)

For reference, refer to the finished [Problem 2: Even Fibonacci numbers](https://github.com/freeCodeCamp/arcade-mode/blob/master/client/scripts/challenges/projecteuler/formatted/001_to_100/Problem%20002:%20Even%20Fibonacci%20numbers.js).

Overall progress is updated at [this spreadsheet](https://docs.google.com/spreadsheets/d/1b_wMIaKR-gA0tD6ADQfDjDT5BBWaUsQyIPP0TS6o7is/edit?usp=sharing).

Please let us know if you would like to get involved at our [Gitter room](https://gitter.im/FreeCodeCamp/arcade-mode).

Thank you all for the help!

