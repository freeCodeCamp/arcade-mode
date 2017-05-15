#! /bin/bash

node_modules/.bin/babel-node node_modules/.bin/babel-istanbul cover node_modules/.bin/_mocha --require test/helpers/browser.js --opts test/client/**/*.{js,jsx} --recursive test/client
istanbul report --root coverage html --dir coverage_html_client

