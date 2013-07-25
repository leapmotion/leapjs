BROWSERIFY_ARGS=--ignore=./node_connection template/entry.js


build: compile compress

compile:
	./node_modules/.bin/browserify ${BROWSERIFY_ARGS} -o leap.js

compress:
	./node_modules/.bin/uglifyjs ./leap.js -o leap.min.js

docs:
	./node_modules/jsdoc/jsdoc lib README.md -d docs


test: build test-only

test-only: test-node test-browser

test-browser:
	./node_modules/.bin/mocha-phantomjs -R dot test/helpers/browser.html

test-node:
	./node_modules/.bin/mocha lib/index.js test/helpers/node.js test/*.js -R dot

stress: stress/punisher.js
	node stress/punisher.js


watch: watch-test

watch-build: 
	./node_modules/.bin/nodemon --watch lib --exec "make" build

watch-test:
	./node_modules/.bin/nodemon --watch lib --exec "make" test


open-in-browsers: build
	open -a /Applications/Firefox.app test/helpers/browser.html
	open -a /Applications/Safari.app test/helpers/browser.html
	open -a /Applications/Google\ Chrome.app test/helpers/browser.html
