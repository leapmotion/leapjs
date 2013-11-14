# Websocket protocol for communicating with `leapd`

The Leap Motion controller provides a protocol for communicating high-level
hand data to applications using Websockets. This document outlines the usage
of this protocol.

## What is `leapd`?

`leapd` is a service which interprets data coming from the Leap Motion
controller and reconstructs hand position. That hand data is made available
in via a web socket server within `leapd`. This web socket communication is
done through an local service on your computer.

## Client communication

A websocket client can connect and communicate with `leapd` via this web socket
connection. Several clients exist already for this data, for example:

* https://github.com/leapmotion/leapjs - Javascript client for Nodejs and
browsers.
* https://github.com/logotype/LeapMotionAS3 - Flash client

## Protocol versioning

The data sent by the websocket server is versioned. As new fields and features
are added, the version of data sent gets incremented. Currently there are four
versions available. The requested version is encoded in the URI used to conenct.

The current URL format is `/{version number}.{format}`. The only supported format
is `json`.

### Currently supported protocols

As of now (November 2013) the following protocols are supported. Each is
described in a specific documentation sheet.

  * Version 1: accessed by '/' or '/v1.json'
  * Version 2: accessed by '/v2.json
  * Version 3: accessed by '/v3.json'
  * Version 4: accessed by '/v4.json' -- the current (as of November 2013) latest protocol.

When you send this first message, you get back a single JSON object echoing
the version that the leapd will be using in its communications with your
client: {version: 4}

And from then on, you will receive frame data and events over that webSocket
channel, as detailed below.

# Multiple Client Communication and Configuration

One leapd can have zero, one or many clients. It may only have one piece of
hardware that it reports for. Whether a given client receives frame and
gesture information depends on which client has focus and which clients have
elected to listen in the background; this is detailed below. It also relies on
the leapd's connection to a Leap Motion Controller hardware.

## Shared Streaming, focus, and backgrounding

In a windowed GUI, mouse state is "blocked" by overlapping windows. You would
not expect to receive mouse events if another window was wholly covering your
own. With leap, however, every client expects to receive all
hand/finger/pointer data continuously. There is no automatic blocking of leapd
data when you (in your window/mouse environment "defocus" an application
window, cover it with another window, minimize it, etc.

There may not even BE an active window or visible application tied to a
particular client.

It is up to each client to decide when and if to start and stop listening to
the stream when the application context changes.

You can tell the leapd server one of four things:

  * "I have gained focus" --&nbsp;_place_holder;{focused: true}. Take focus away from the last "on top" client and send me frames.
  * "I have lost focus" -- {focused: false}. I do not want to be on top. this will NOT&nbsp;_place_holder;give any other client the focus but it will un-register this client as the focused client.
  * "I always want to get frames" -- {background: true }. I want to receive frame data no matter which client has the focus.
  * "I only want to get frames when in focus" -- {background: false}. I do not want to receive frame data unless I have the focus. (note - this is the default status of all clients until you explicitly send {background: true}.

### Client State

The client is not told which state they are in&nbsp;_place_holder;by the leapd
engine, except if the hardware is disconnected or reconnected. However beneath
the surface, each client has the following possible states:

    Connected    Focused    Listening     Gets Frames

    YES          YES          YES          YES
    YES          YES          NO           YES
    YES          NO           YES          YES
    YES          NO           NO           NO
    NO           YES          YES          NO
    NO           YES          NO           NO
    NO           NO           YES          NO
    NO           NO           NO           NO


## Hardware State Events

In any of these scenarios, if the hardware is disconnected, a
"deviceDisconnect" event is sent to them to inform them that there is not a
current connection to the physical hardware. (but that by implication they ARE
still connected to leapd).

If hardware is then plugged in, they will receive another message letting them
know that the hardware is connected.

State events about connected/disconnected hardware are not repeated. They are
only sent once to each client for each state change; that is, when the Leap
hardware is plugged in/detected or when the hardware is unplugged/loses
connection.

# Client messages to the leapd

Almost all of the communication between the leapd and the client is one-way.
The leapd broadcasts frames or state changes to the listening clients.

The client to leap communication happens when the client wants to change its
state or turn gestures on and off.

## Focus and background messages

Messages regarding focus and background from ONE client may interfere with
ANOTHER client's leapd communication.

When a client grabs focus by setting {focused: true} to leapd, other clients
will no longer receive frames. However other clients may also grab focus;
there is no way to "Lock" the focus of the leapd to your connection.

The leapd will NOT inform the client when it has lost focus. However you can
infer that this is so when you are in a client state that would ordinarily be
getting frames and you don't get frames.

## Gesture messages

Clients can elect whether or not to receive gestures. This choice is at a per-
client basis; if one client elects to get gestures, it will not affect whether
another client does or does not receive gestures.

By default, you will not receive gestures unless you "opt in".

The array of gestures may be empty, have one gesture, or have many gestures.

Some gestures are only connected with a single event. Some are continuous,
such as the circle gesture. Continuous gestures' states will be one of three
(string) values: 'start', 'continue' or 'stop'.

You opt in or out of gestures by sending {enableGestures: true} or
{enableGestures:false} to leapd. (it will not give you any feedback in
response. )

# Leap Protocol 4 schema

As of November, 2013, this is the most current schema that leapd provides.

There are two sets of messages -- leapd to client and client to leapd

# Client to Leapd messages

## connection

As described in the leapd documentation, the client establishes connection to
the leapd by connecting to '/v4'. This connection is made to the leapd daemon
at port 6347.

### response

The server will respond with {version: 4}. It will then send a series of
frames (see below).

### error

If the server CANNOT support the requested api version it sends back a message
with a status code of 1001. No JSON block is provided if the version is not supported.

## background

By sending {background:true} or {background:false} to leapd you can elect to
listen to frames regardless of which client has focus.

### response

no direct response -- but you may see a change in your frame stream.

## focused

By sending {focused: true} or {focused: false} you can attempt to commandeer
the stream of frames from other clients of the leapd. This is detailed in the
leapd communication.

### response

no direct response -- but you may see a change in your frame stream.

# Leapd to Client messages

## events

Events inform the client about changes to the state of the connection, etc. There is currently only one event:
deviceConnect.

### deviceConnect

state is either true (you can expect frames) or false (the hardware is not communicating with the
daemon, so no frames can be communicated.

``` {event: {type: "deviceConnect", state: true}}

## frames

Frames are streamed to active or listening clients as JSON blocks. The schema
of the json block is as follows. Note, the "r", "s" and "t" values for all
elements described below are for internal use and should not be used in your
application.


## id: float

a unique identifier of the frame

### timestamp: integer

a Unix timestamp.

### hands: [hand]

an array of hand data

### interactionBox: InteractionBox

the dimensions of the measurable area of the Leap Motion Controller hardware

### pointables: [Pointable]

An array of all your pointables: fingers, sticks, from all hands in the
interaction box.

### gestures [Gesture]

an array of 0..many Gestures currently detected

### r: [[floats]]

(rotation) a 4 x 4 matrix; mainly for internal use, reflects overall motion of
detected objects.

### s: [float]:3

(scale) a 3 value array of floats indicating relative size of the space
occupied by detected objects; for internal use

### t: [float]:3

(translation) a three value array of the net relative motion of detected
objects, for internal use

## Hands

### id: integer

the identity of the hand

### direction: [3x float]

euler angles of the hand

### palmNormal: [3x float]

euler angles of the palm

### palmPosition: [3x float]

the position of the center of the hand, in millimeters, relative to the
Controller hardware

### palmVelocity: [3x float]

The change in position of the palm relative to the last measured position of
this hand.

### sphereCenter [3x float]

The position of an imaginary "ball" being held by the hand, in millimeters,
relative to the Controller hardware

### sphereRadius float

The distance from the imaginary "ball" to your palm

r: [[float]]

rotation relative to last known position of this hand; for internal use.

s: float

size relative to the last frame of the extent of the hand; for internal use

### t

[float]: 3

relative motion of the hand and its fingers since the last frame; for internal
use

## InteractionBox

The interaction box describes the measured area of space in which Leap can
detect things. It is not going to change over time.

### center [3x float]

the position, in millimeters, of the origin relative to the Controller
hardware

### size [3x float]

the extent of the Controller detection area in millimeters. The three values
are width, height, and depth.

Note, it is not in reality a square; the closer you get to the Controller, the
narrower the detection region gets.

### Gestures

### center [3x float]

the position, in millimeters, of the gesture. For circular gestures it is the position of the center of the gesture.

### duration: integer

the number of microseconds that the gesture has been maintained.[1]

### handIds [integer]

the ids of the hands making the gestures; at this point most gestures are made by a signle hand.

### pointableIds: [integer]

the ids of the pointables making the gestures

### progress: float

?????

### radius: float

for the circle gesture, the approximate distance in millimeters between the center and the
pointable (or the mean location of the pointables).

### state: string -- 'start', 'update', 'stop'

Whether the gesture has started or stopped this frame. Not all gestures will express in all three states -- one-frame
 gestures may only express 'stop'.

### type: string -- 'circle', 'swipe', 'keyTap', 'screenTap'

the type of gesture.

# Leap Protocol Version 3

Leap Protocol Version 3 does not feature background events. You cannot expect to change your frame stream by sending
`{focused: true}` or `{focused: false}` to the leapd server. Likewise, `{background: true}` and `{background: false}`
 have no effect or use in version 3. Leap version 3 also features the heartbeat described below.

# Leap Protocol Version 2

In this version a client establishes unique control of the Leap by sending `{heartbeat: true}` messages within 100ms
(1/10th of a second) often. The heartbeat is present in version 3 but removed in version 4.

Leap Version 2 does not have focus or background messages.

# Leap Protocol Version 1

No heartbeat, focus or background messages.

* * *

[1]&nbsp;_place_holder;&nbsp;_place_holder;(1 million microseconds == 1 second).

