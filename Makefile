BROWSERIFY_ARGS=--ignore=./node_connection lib/websocketjs/swfobject.js lib/websocketjs/web_socket.js template/entry.js

serve:
	./node_modules/.bin/static .

test: test-all

test-all: test-browser test-node

test-browser: build
	./node_modules/.bin/mocha-phantomjs test/runner.html

test-node:
	./node_modules/.bin/mocha lib/index.js test/common.js test/test.js test/*.js -R dot

build: compile compress

watch:
	./node_modules/.bin/nodemon --watch lib --exec "make" test

compress:
	./node_modules/.bin/uglifyjs ./leap.js -o leap.min.js

compile:
	./node_modules/.bin/browserify ${BROWSERIFY_ARGS} -o leap.js

watch-test: watch
