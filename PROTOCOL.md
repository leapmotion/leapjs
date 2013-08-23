# Protocol for communicating with leapd

The Leap Motion service provides a locally running WebSocket server listening to port 6347. This server provides tracking data as JSON.

## Typical sequence of events on connecting

* Connects to `/v2.json`
* Server resonds with `{version: 2}`
* Client sends `{enableGestures:true}`
* Servers sends frames (one message per frame)
* Client sends `{heartbeat:true}` every 100ms

## Negotiating protocol

The client requests a specific version of the protocol by requesting a specific path. Currently the only supported paths are `/`, `/v1.json` and `/v2.json`. The server responds with a message indicating what protocol it can respond with. It is assumed that any client can currently speak and protocol lower than what it is requesting. Support for a minimum supported protocol will be added later.

Currently, version 1 and version 2 of the protocol are differentiated only by the use heartbeats. Heartbeats are used to inform the Leap service that the current application wants exclusive use of the Leap. If the server responds with version 1, you should not send it heartbeats.

## Version 1

The first version of the protocol is available at `/` or `/v1.json`.

### Sending

#### Enable gestures

* `{ enableGestures: {true, false} }`

You can send a message at any point to enable or disable gesture support.

### Receiving

Each frame of data from the WebSocket server contains JSON defining a frame. The attributes of a frame in the JSON message are similar, but not identical to those of a Frame object obtained through the native library. They include:

```
"id": float
"timestamp": integer

"hands": array of Hand objects
   "direction": array of floats (vector)
   "id": integer
   "palmNormal": array of floats (vector)
   "palmPosition": array of floats (vector)
   "palmVelocity": array of floats (vector)
   "r": nested arrays of floats (matrix)
   "s": float
   "sphereCenter": array of floats (vector)
   "sphereRadius": float
   "t": array of floats (vector)

"interactionBox": object
   "center": array of floats (vector)
   "size": array of floats (vector)

"pointables": array of Pointable objects
   "direction": array of floats (vector)
   "handId": integer
   "id": integer
   "length": float
   "stabilizedTipPosition": array of floats (vector)
   "tipPosition":  array of floats (vector)
   "tipVelocity":  array of floats (vector)
   "tool": boolean (true or false)
   "touchDistance": float
   "touchZone": string - one of "none", "hovering", "touching"

"gestures": array of Gesture objects
    "center": array of floats (vector)
    "duration": integer microseconds
    "handIds": array of integers
    "id": integer
    "normal": array of floats
    "pointableIds": array
    "progress": float,
    "radius": float,
    "state": string - one of "start", "update", "stop"
    "type": string - one of "circle", "swipe", "keyTap", "screenTap"

"r": nested arrays of floats (matrix)
"s": float
"t": array of floats (vector)
```

#### Motion factors

The motion factors, r, s, t, attached to Hand and Frame objects are snapshots of the motion occuring across frames. These factors must be combined with those of a previous frame to derive the relative motion.

* r -- a 3x3 rotation matrix
* s -- a scale factor
* t -- a 3-element translation vector

#### Rotation factor

The matrix expressing the relative rotation between two frames can be calculated by multiplying the r matrix from the current frame by the inverse of the r matrix of the starting frame.

#### Scale factor

The relative scale factor between two frames can be calculated by subtracting the s value from the starting frame from the current s value and taking the natural logarithm of the result.

#### Translation factor

The relative translation factor between two frames can be calculated by subtracting the t vector from the starting frame from the current t factor.

## Version 2

### Changes

This version introduced *heartbeats*. Heartbeats are used to signal that you'd like exclusive control of the Leap. Other apps that provide OS-level interaction should be suppressed when you are sending heartbeats.

### Sending Heartbeats

Clients heartbeat by sending `{heartbeat: true}`. Heartbeats must be sent <100 ms from each other.

## Version 3

### Changes

This version introduced server-side events. Events are structured in the following way.

{event: {type: "deviceConnect", state: true}}

These were introduced to allow reliable reporting of events from the server. Currently only `deviceConnect` events are supported.
