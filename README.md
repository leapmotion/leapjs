# LeapJS

Welcome to the Leap JavaScript framework. This is intended for use with the Leap (https://www.leapmotion.com/).

[![Build Status](https://travis-ci.org/leapmotion/leapjs.png)](https://travis-ci.org/leapmotion/leapjs)

For more information, please visit [http://js.leapmotion.com/](http://js.leapmotion.com/).

For examples, please see [http://js.leapmotion.com/examples](http://js.leapmotion.com/examples), as well, there are some basic examples included in the `examples` directory.

## Compatibility

Version 0.3.0 or greater of leapjs requires version 1.0.9 or greater of the tracking software which is available at [https://www.leapmotion.com/setup](https://www.leapmotion.com/setup) in order to have background support work properly. Mixing and matching prior versions will result in inconsistent background/focus support.

## Protocol

Details about the protocol used to communicate with `leapd` are detailed here [PROTOCOL.md](https://github.com/leapmotion/leapjs/blob/master/PROTOCOL.md).

##  Examples

Some examples have been included in the <code>examples/</code> directory. To run them do the following:

1. Run `npm install`
2. Run `make serve`
3. Point your browser to [http://localhost:8080/examples](http://localhost:8080/examples)

Or in code:

1. Run `node examples/node.js`

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/f4522a98d0918ac69a49119ac3249bdb "githalytics.com")](http://githalytics.com/leapmotion/leapjs)
