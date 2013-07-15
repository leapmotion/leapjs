# Leap Motion WebSocket server

The Leap Motion service provides a WebSocket server listening to port 6347 on the localhost domain. This server provides tracking data. Currently, there are two protocol supported.

## Negotiating protocol

The client requests a specific version of the protocol by requesting a specific path. Currently the only supported paths are `/`, `/v1.json` and `/v2.json`. The server responds with a message indicating what protocol it can respond with. It is assumed that any client can currently speak and protocol lower than what it is requesting. Support for a minimum supported protocol will be added later.

Currently, version 1 and version 2 of the protocol are differentiated only by the use heartbeats. Heartbeats are used to inform the Leap service that the current application wants exclusive use of the Leap.

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
"r": array of floats (Matrix)
"s": float
"t":  array of floats (Vector)
"timestamp": integer

"hands": array of Hand objects
   "direction": array of floats (Vector)
   "id": integer
   "palmNormal": array of floats (Vector)
   "palmPosition": array of floats (Vector)
   "palmVelocity": array of floats (Vector)
   "r": array of floats (Matrix)
   "s": float
   "sphereCenter": array of floats (Vector)
   "sphereRadius": float
   "t": array of floats (Vector)

"interactionBox": object
   "center": array of floats (Vector)
   "size": array of floats  (Vector)

"pointables": array of Pointable objects
   "direction": array of floats (Vector)
   "handId": integer
   "id": integer
   "length": float
   "stabilizedTipPosition": array of floats (Vector)
   "tipPosition":  array of floats (Vector)
   "tipVelocity":  array of floats (Vector)
   "tool": boolean (true or false)
   "touchDistance": float
   "touchZone": string - one of "none", "hovering", "touching"

"gestures": array of Gesture objects
    "center": array of floats (Vector)
    "duration": integer microseconds
    "handIds": array of integers
    "id": integer
    "normal": array of floats
    "pointableIds": array
    "progress": float,
    "radius": float,
    "state": string - one of "start", "update", "stop"
    "type": string - one of "circle", "swipe", "keyTap", "screenTap"
```

#### Motion factors

The motion factors, r, s, t, attached to Hand and Frame objects are snapshots of the motion occuring across frames. These factors must be combined with those of a previous frame to derive the relative motion.

* r -- a 3x3 rotation matrix
* s -- a scale factor
* t -- a 3-element translation vector

#### Rotation factor

The matrix expressing the relative rotation between two frames can be calculated by multiplying the r matrix from the current frame by the inverse of the r matrix of the starting frame.

.. math::

  \mathbf{rotation} = \mathbf{r_{current frame}} * \mathbf{r_{since frame}^{-1}}


#### Scale factor

The relative scale factor between two frames can be calculated by subtracting the s value from the starting frame from the current s value and taking the natural logarithm of the result.

.. math::

  scalefactor = s_{current frame} - s_{sinceframe}

#### Translation factor

The relative translation factor between two frames can be calculated by subtracting the t vector from the starting frame from the current t factor.

.. math::

  \mathbf{\overrightarrow{translation}} = \mathbf{\vec{t}}_{current frame} - \mathbf{\vec{t}}_{since frame}

## Version 2

The first version of the protocol is available at `/v2.json`.

### Sending

#### Heartbeats

Clients can send a heartbeat to get exclusive access by sending `{heartbeat: true}`. Heartbeats must be sent <100 ms from each other.

### Receiving

Same as version 1.
