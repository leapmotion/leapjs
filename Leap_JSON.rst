Leap Motion WebSocket server
-----------------------------

The Leap Motion service/daemon provides a WebSocket server listening to port 6347 on the localhost domain. The server provides tracking data in the form of JSON formated messages.

Connecting to the WebSocket server
+++++++++++++++++++++++++++++++++++

.. code:: javascript

    // Support both the WebSocket and MozWebSocket objects
    if ((typeof(WebSocket) == 'undefined') &&
        (typeof(MozWebSocket) != 'undefined')) {
      WebSocket = MozWebSocket;
    }

    // Create the socket with event handlers
    function init() {
      // Create and open the socket
      ws = new WebSocket("ws://localhost:6437/");

      // On successful connection
      ws.onopen = function(event) {
        var enableMessage = JSON.stringify({enableGestures: true});
        ws.send(enableMessage); // Enable gestures
      };

      // On message received
      ws.onmessage = function(event) {
          var trackingdata = JSON.parse(event.data);
          // ...do something with the data
        }
      };

      // On socket close
      ws.onclose = function(event) {
        ws = null;
      }

      // On socket error
      ws.onerror = function(event) {
        alert("Received error");
      };
    }



  
Leap Motion JSON format
------------------------

Each frame of data from the WebSocket server contains JSON defining a frame. The attributes of a frame in the JSON message are similar, but not identical to those of a Frame object obtained through the native library. They include: 

.. code:: javascript

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


Protocol versions
+++++++++++++++++++

The current version of the protocol is v2.json. The format is the same as the previous version (v1.json), but the WebSocket server now accepts a heartbeat message to suppress plug-ins.


Motion factors
---------------

The motion factors, r, s, t, attached to Hand and Frame objects are snapshots of the motion occuring across frames. These factors must be combined with those of a previous frame to derive the relative motion.

* r -- a 3x3 rotation matrix
* s -- a scale factor
* t -- a 3-element translation vector


Rotation factor
++++++++++++++++

The matrix expressing the relative rotation between two frames can be calculated by multiplying the r matrix from the current frame by the inverse of the r matrix of the starting frame.

.. math::

  \mathbf{rotation} = \mathbf{r_{current frame}} * \mathbf{r_{since frame}^{-1}}
  

Scale factor
+++++++++++++

The relative scale factor between two frames can be calculated by subtracting the s value from the starting frame from the current s value and taking the natural logarithm of the result.

.. math::

  scalefactor = s_{current frame} - s_{sinceframe}
  
  
Translation factor
++++++++++++++++++++

The relative translation factor between two frames can be calculated by subtracting the t vector from the starting frame from the current t factor.

.. math::

  \mathbf{\overrightarrow{translation}} = \mathbf{\vec{t}}_{current frame} - \mathbf{\vec{t}}_{since frame}
  

Heartbeat messages
-------------------

A user interacting with your Leap-enabled application can cause unintended interactions with background Leap-enabled applications, such as the Leap Motion OS Interaction touch emulation feature.            
           