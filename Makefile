BROWSERIFY_ARGS=--ignore=./node_connection lib/websocketjs/swfobject.js lib/websocketjs/web_socket.js template/entry.js

serve:
	./node_modules/.bin/http-server .

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

docs: docs-clone docs-build docs-commit

docs-clone:
	if test -d docs-repo; then rm -rf docs-repo; fi
	git clone -b gh-pages git@github.com:leapmotion/leapjs.git docs-repo

docs-build:
	if ! test -d './node_modules/jsdoc/templates/jsdoc3Template'; then cp -r ./docs-repo/templates/jsdoc3Template ./node_modules/jsdoc/templates/jsdoc3Template; fi
	./node_modules/jsdoc/jsdoc -c jsdoc_conf.json lib README.md -d docs-repo -t ./node_modules/jsdoc/templates/jsdoc3Template

docs-commit:
	cd docs-repo
	git commit -a -m"regenerate docs"
	git push origin gh-pages
	cd ..

