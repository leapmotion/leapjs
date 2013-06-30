# LeapJS

Welcome to the Leap JavaScript framework. This is intended for use with the Leap (https://www.leapmotion.com/).

[![Build Status](https://travis-ci.org/leapmotion/leapjs.png)](https://travis-ci.org/leapmotion/leapjs)

## Resources

* [API Documentation](http://leapmotion.github.io/leapjs/)
* [Examples](http://leapmotion.github.io/leapjs/examples/)

## Installation

If you're using npm, you can use `npm install leapjs`.

## Usage

LeapJS works with Node.js or your browser.

### From the browser

Include the leap.js script included at the root of this package, or, use the minified version provided at leap.min.js.

```html
<script src="./leap.min.js"></script>
```

### From node

Use the following:

```javascript
var Leap = require('leapjs').Leap
```

### Getting frames

To listen to the frame events, you can use the friendly `Leap.loop` function.
This will auto-detect which type of event loop you can accept, and, call your callback with frames.

```javascript
Leap.loop(function(frame) {
  // ... your code here
})
```

As well, you can call a special version of `Leap.loop` where you provide a second argument to the callback.
This allows you to wait until you're ready to receieve further frame events. Here is an example of
this approach.

```javascript
Leap.loop(function(frame, done) {
  // do things
  done() // if you don't invoke this, you won't get more events
})
```

### Options

The controller supports several options.

* `host` – The host used by the WebSocket connection, default is `"127.0.0.1"`
* `port` – The port used by the WebSocket connection, default is `6437`
* `enableGestures` – Enabled or disabled gesture recognition for this controller, default is `false`
* `frameEventName` – The name of the frame event to pass through as a `frame` event. This auto-detects which type of frame event to use.

#### Passing options

Using the `loop` method, you can pass in options in the following way:

```javascript
Leap.loop({enableGestures: true}, {
  // do things
});
```

To pass in options when constructing the controller, do the following:

```javascript
var controller = new Leap.Controller({enableGestures: true});
```

### Event types

The controller supports a number of event types. When leap.js connects to the websocket server, it first fires the `connect` event. After that, once the protocol has been selected, it fires a `ready` event. Once a frame has been received, a `deviceConnected` event gets fired once. Then, a `deviceFrame` gets fired for each frame coming from the websocket server conenction.

* `connect` - The client is connected to the websocket server
* `protocol` - The protocol has been selected for the connection. The protocol object is passed as an argument to the event handler.
* `ready` - The protocol has been selected
* `disconnect` - The client disconnects from the websocket server
* `focus` - The browser received focus
* `blur` - The browser loses focus
* `frame` - A frame is finished being processed by the controller. This event is either driven by the `animationFrame` event or the `deviceFrame` event. The frame is passed as an argument to the event handler.
* `animationFrame` - A frame is being emitted in time with the animation loop. The frame is passed as an argument to the event handler.
* `deviceFrame` - A frame is being emitted by the connection. The frame is passed as an argument to the event handler.
* `deviceConnected` - A device has been connected.
* `deviceDisconnected` - A device has been disconnected.

### Internals of the event loop

Leap.loop attempts to pick the right event loop to use. Within the
background page of a Chrome extension, Chrome will not use the `animationFrame` loop. As well,
in Node.js no animation event exists.

In general, browsers optimize the load of requestAnimationFrame based on load, element visibility,
battery status, etc. Chrome has chosen to optimize this by omitting the functionality
altogether in the background.js of its extensions.

To manually pick the event type you'd like to use, create a leap controller and listen for the appropriate event
type, either `frame` or `animationFrame`.

### Picking your own event type

```javascript
var controller = new Leap.Controller();

// for the frame event
controller.on('frame', function() {
  console.log("hello frame")
})

// for the animationFrame event. this is only supported from within the browser
controller.on('animationFrame', function() {
  console.log("hello frame")
})
controller.connect()
```

## Examples

Inside the examples directory are a few great examples. To get them running, do the following:

* Run `npm install`
* Run `make serve`
* Point your browser at http://localhost:8080/examples and enjoy

### Node.js example

To run the node.js example, run `node examples/node.js`.

## Development

You can build your own leap.js file by using `make build`. If you're doing any amount of development, you'll find it
convenient to run `make watch`. This takes care of building leap.js for you on every edit. As well, you can both
watch and running `make watch-test`.

## Tests

There are currently rudamentary tests. To get them running, do the following:

* Run `npm install`
* Run `make test`

Or use make watch-test as noted above.
