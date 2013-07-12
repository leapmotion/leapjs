BROWSERIFY_ARGS=--ignore=./node_connection template/entry.js

stress: stress/punisher.js
	node stress/punisher.js

test: build test-only

test-only: test-browser test-node

test-browser:
	./node_modules/.bin/mocha-phantomjs test/helpers/browser.html

test-node:
	./node_modules/.bin/mocha lib/index.js test/helpers/node.js test/*.js -R dot

build: compile compress

watch:
	./node_modules/.bin/nodemon --watch lib --exec "make" test

compress:
	./node_modules/.bin/uglifyjs ./leap.js -o leap.min.js

compile:
	./node_modules/.bin/browserify ${BROWSERIFY_ARGS} -o leap.js

watch-test: watch

open-in-browsers: build
	open -a /Applications/Firefox.app test/helpers/browser.html
	open -a /Applications/Safari.app test/helpers/browser.html
	open -a /Applications/Google\ Chrome.app test/helpers/browser.html
