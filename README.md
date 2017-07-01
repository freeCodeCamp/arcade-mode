# freeCodeCamp's Arcade Mode

[![Join the chat at https://gitter.im/FreeCodeCamp/arcade-mode](https://badges.gitter.im/FreeCodeCamp/arcade-mode.svg)](https://gitter.im/FreeCodeCamp/arcade-mode?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Arcade Mode is an interview preparation app featuring algorithm and data structure questions in a timed environment.

### Note:
Arcade Mode has been undergoing heavy prototyping and iteration. As such, it is currently set up with development and debugging in mind.

### Quick Start:
1. [Fork the repository](https://help.github.com/articles/fork-a-repo/) using the "Fork Button" in the upper right hand corner of the interface.
2. Clone your fork using `git clone https://github.com/<YOUR_GITHUB_USERNAME>/arcade-mode.git` into your projects directory (e.g., `/<YOUR_PROJECTS_DIRECTORY>/`
3. Go into the new arcade-mode directory.
4. Run `npm install` to install dependencies and start the build process.
5. Run `npm start` and see the example app at http://localhost:8080

### Fork Maintenance:
1. Set the upstream remote to the official arcade-mode repository: `git remote add upstream https://github.com/freeCodeCamp/arcade-mode.git`
2. Update the fork with the upstream remote with: `git merge upstream master`.


### Contributing:
- After finishing Quick Start steps 1 - 4, do the following:
1. Find an issue that needs assistance by searching for the [Help Wanted](https://github.com/freeCodeCamp/arcade-mode/labels/help%20wanted) tag.
2. Always make modifications on a branch. Create a branch using: `git checkout -b <BRANCH_NAME>`.
3. Test modifications with unit tests `npm run test:client` and in-app validation on the browser.
3. Once it all checks out, submit a [pull request](https://help.github.com/articles/creating-a-pull-request/).

For a more complete guide, see CONTRIBUTING.md.
