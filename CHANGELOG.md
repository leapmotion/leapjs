# Changelog

## 0.4.3
 - Added a new controller option `loopWhileDisconnected` which defaults to true (legacy behavior) and can be set
   to false.  This is an optimization which allows the loop to be turned off when the leap is not connected.
 -- When set to false, Animation Frames are no longer be sent after disconnect
 -- When set to false, Animation Frames are no longer sent if new device frame data is not available
 - suppressAnimationLoop, when set to false in node, will cause node to try and use the animation loop, and fail.
 - Fixed #159 where setBackground would not apply when reconnecting a controller.

## 0.4.2 - 2014-03-12
 - Allow controller.use to be called idempotently
 - Fix issue where requestAnimationFrame would not be used in Chrome
 - Exclude node code from browser js
 - The plugin pipeline now runs on animationFrames rather than deviceFrames when in the browser.

##0.4.1 - 2014-02-11
 - Allow controller.use to accept a factory directly (node support)

##0.4.0 - 2014-01-30
 - Started changelog
 - Added plugins
 - Allow Controller method chaining