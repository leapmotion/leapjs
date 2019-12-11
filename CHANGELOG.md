# Changelog

## 1.0.0

- Upgraded Node to v12
- Upgraded and removed deprecated and vulnerable depends/packages
- Fixed compatiility with v3 of wss (Websockets) package
- Removed phantomjs and related mocha components and migrated to mocha-chrome
- Added ultraleap to bower keywords


## 0.6.4
 - Expose EventEmitter and _ on Leap
 - Fixes #190 Cannot pass in Leap.loop options without callback
 - Fix #194: Add frameEnd event dumper example
 - loopWhileDisconnected now defaults to true
 - FrameEnd Looping now begins even before (or without) controller connection


## 0.6.3
 - Add Optimize HMD flag for Controller
 

## 0.6.2
 - Add support for Secure Websocket connection over https:// pages for Leap Software >= 2.1.0
 - Add events fore beforeFrameCreated and afterFrameCreated (allowing low-level frame access)

## 0.6.1
 - Add arm bone for Leap Software >= 2.0.3
 - Fix issue where initial frame can be invalid
 - Allow Leap.loop to be called with no arguments


## 0.6.0
 - Bones API: finger.metacarpal, proximal, intermediate, distal, each with .prevJoin and .nextJoint
 - Fix issue where hand options could not be used with loop + loop options
 - console.warn plugin duplication, rather than throwing an error.
 - Allow prototypical extension of Fingers in plugins


## 0.6.0-beta2
 - Added convenience `hand` event for controllers.  Add `hand` and `frame` as callback options for Leap.loop.
 - Merge in LeapJS 0.5.0 - device events (see below)
 - Fingers on hands will now always be ordered correctly.
 - Upgrade gl-matrix to 2.2.1


## 0.6.0-beta1
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
 - [feature] Support protocol v5: better device info when connected to clients with Leap Service version 1.2.0 or above.
 - [feature] Added streamingStarted, streamingStopped, deviceStreaming, and deviceStopped events
 - [feature] Device events now include device info with the following fields:
    - attached [boolean]
    - streaming [boolean]
    - id [string]
    - type [string], on of: "peripheral", "keyboard", "laptop", "unknown", or "unrecognized".
 - [feature] Add convenience methods `controller.connected()` and `controller.streaming()`
 - [bugfix] Focus state is now cleared after disconnection
 - [behavior change] Leap.loop no longer uses all plugins by default.
 - [feature] serviceVersion will now be available when connected to Leap Service v1.3.0 or above
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
