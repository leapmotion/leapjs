# Changelog

## Skeleton
 - Hand:
  - type ('left' or 'right'),
  - grabStrength (number 0-1) - 1 being fully closed
  - pinchStrength (number 0-1) - 1 being fully closed, between the thumb and any finger
  - confidence (number 0-1) (a measure of hand data accuracy, 1 being good)
 - Finger:
  - mcp, pip, dip, and tip positions (all array vec3) - joint positions of the finger (see source/docs4)
  - extended (boolean) - True for a straight finger, false if the finger is curled
  - Moved to own class
 - Add convenience method controller.connected()

## 0.5.0
 - [feature] Support protocol v5: multiple devices when connected to clients with Leap Service version 1.2.0 or above.
 - [feature] Added streamingStarted, streamingStopped, deviceStreaming, and deviceStopped events
 - [feature] Device events now include device info with the following fields:
    - attached [boolean]
    - streaming [boolean]
    - id [string]
    - type [string], on of: "peripheral", "keyboard", "laptop", "unknown", or "unrecognized".
 - [feature] Add convenience methods `controller.connected()` and `controller.streaming()`
 - [bugfix] Focus state is now cleared after disconnection
 - [behavior change] Leap.loop no longer uses all plugins by default.
 - [feature] serviceVersion will now be available when connected to Leap Service v1.2.1 or above
 - [bugfix] Fix issue where any call to disconnect would automatically reconnect
 - [bugfix] Send focus state more quickly when connecting
 - [bugfix] Fix issue where focus changes while disconnected would cause focus not to be updated upon reconnection

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