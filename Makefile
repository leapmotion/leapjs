serve:
	./node_modules/.bin/static .

test: build
	./node_modules/.bin/mocha-phantomjs test/runner.html

build:
	./node_modules/.bin/browserify template/entry.js -o leap.js

