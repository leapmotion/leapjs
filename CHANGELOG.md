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


## 0.4.2 - 2014-03-12
 - Allow controller.use to be called idempotently
 - Fix issue where requestAnimationFrame would not be used in Chrome
 - Exclude node code from browser js

##0.4.1 - 2014-02-11
 - Allow controller.use to accept a factory directly (node support)

##0.4.0 - 2014-01-30
 - Started changelog
 - Added plugins
 - Allow Controller method chaining