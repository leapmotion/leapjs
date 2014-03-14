# Changelog

## 0.4.3
 - Animation Frames are no longer be sent after disconnect
 - Animation Frames are no longer sent if new device frame data is not available
 - suppressAnimationLoop, when set to false in node, will cause node to try and use the animation loop, and fail.

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