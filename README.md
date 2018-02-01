# freeCodeCamp's Arcade Mode

[![Join the chat at https://gitter.im/FreeCodeCamp/arcade-mode](https://badges.gitter.im/FreeCodeCamp/arcade-mode.svg)](https://gitter.im/FreeCodeCamp/arcade-mode?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Arcade Mode is an interview preparation app featuring algorithm and data structure questions in a timed environment. The end goal will be its incorporation into freeCodeCamp proper as part of the coding interview preparation section.

### Note:
Arcade Mode has been undergoing heavy prototyping and iteration. As such, it is currently set up with development and debugging in mind.

## Quick Start:
1. [Fork the repository](https://help.github.com/articles/fork-a-repo/) using the "Fork Button" in the upper right hand corner of the interface.
2. Clone your fork using `git clone https://github.com/<YOUR_GITHUB_USERNAME>/arcade-mode.git` into your projects directory (e.g., `/<YOUR_PROJECTS_DIRECTORY>/`
3. Go into the new arcade-mode directory.
4. Run `npm install` to install dependencies and start the build process. If you run into errors, please refer to the FAQ down below.
5. Run `npm start` and see the example app at http://localhost:8080

## Fork Maintenance:
1. Set the upstream remote to the official arcade-mode repository: `git remote add upstream https://github.com/freeCodeCamp/arcade-mode.git`
2. Update the fork locally by pulling from the upstream remote: `git pull upstream master`.
3. Push the updates to your fork repository with `git push origin master`.


## Contributing:
- After finishing Quick Start steps 1 - 4, do the following:
1. Find an issue that needs assistance by searching for the [Help Wanted](https://github.com/freeCodeCamp/arcade-mode/labels/help%20wanted) tag.
2. Always make modifications on a branch. Create a branch using: `git checkout -b <BRANCH_NAME>`.
3. Test modifications with unit tests `npm run test:client` and in-app validation on the browser.
3. Once it all checks out, submit a [pull request](https://help.github.com/articles/creating-a-pull-request/).

For a more complete guide, see CONTRIBUTING.md.

## FAQ:

> I'm receiving errors about the npm package, canvas. How can I fix this?

The canvas package has prerequisites that need to be installed before canvas can be installed correctly. Please refer to [its npm page](https://www.npmjs.com/package/canvas) for installation instructions that depend on the operating system.

> I'm receiving `package not found` errors on `npm install`. How can I fix this?

Try removing the `node_modules` directory, then `npm install` again. If this does not work, remove both `node_modules` and `package-lock.json` and try `npm install` again.

> I'm receiving the error "Received a non-Vinyl object in `dest()`". How can I fix this?

Remove the node_modules folder and `npm install` again.

> Is there a way I can automate `npm run test:client` to run when I try to push?

You can use git hooks. We are currently using this `pre-push` script [here](https://github.com/freeCodeCamp/arcade-mode/blob/master/bin/pre-push), but you may want to tailor it to a different branch or all branches. The project's git hooks can be found in the `/bin` directory (i.e., `pre-push` and `post-merge`).
