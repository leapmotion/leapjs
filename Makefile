BROWSERIFY_ARGS=--ignore=./node_connection lib/websocketjs/swfobject.js lib/websocketjs/web_socket.js template/entry.js

serve:
	./node_modules/.bin/static .

test: build
	./node_modules/.bin/mocha-phantomjs test/runner.html

build: compile compress

watch:
	./node_modules/.bin/browserify ${BROWSERIFY_ARGS} -o leap.js -w

compress:
	./node_modules/.bin/uglifyjs ./leap.js -o leap.min.js

compile:
	./node_modules/.bin/browserify ${BROWSERIFY_ARGS} -o leap.js
