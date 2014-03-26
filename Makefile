BROWSERIFY_ARGS=--ignore=./connection/node template/entry.js

build: grunt compile compress

compile:
	./node_modules/.bin/browserify ${BROWSERIFY_ARGS} -o leap.js

compress:
	./node_modules/.bin/uglifyjs ./leap.js -o leap.min.js

docs:
	./node_modules/jsdoc/jsdoc lib README.md -d docs

test: build test-only

test-only: test-node test-browser test-integration

test-browser:
	./node_modules/.bin/mocha-phantomjs -R dot test/helpers/browser.html

test-node:
	./node_modules/.bin/mocha lib/index.js test/helpers/node.js test/*.js -R dot

test-integration:
	node integration_test/reconnection.js && node integration_test/protocol_versions.js

stress: stress/punisher.js
	node stress/punisher.js

watch: watch-test

watch-build:
	./node_modules/.bin/nodemon --watch lib --exec "make" build

watch-test:
	./node_modules/.bin/nodemon --watch lib --exec "make" test

grunt:
	grunt

open-in-browsers: build
	open -a /Applications/Firefox.app test/helpers/browser.html
	open -a /Applications/Safari.app test/helpers/browser.html
	open -a /Applications/Google\ Chrome.app test/helpers/browser.html

serve:
	./node_modules/.bin/http-server .
