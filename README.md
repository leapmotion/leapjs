[![LeapJS Logo](https://cloud.githubusercontent.com/assets/407497/2652512/eedfb992-bfae-11e3-8323-f202845e3fd8.png)](https://developer.leapmotion.com/leapjs/)

Welcome to the [Leap Motion](https://www.leapmotion.com) JavaScript framework.

[![Build Status](https://travis-ci.org/leapmotion/leapjs.png)](https://travis-ci.org/leapmotion/leapjs)

```javascript
Leap.loop(function(frame){
  console.log(frame.hands.length);
});
```

Learn more in the [Getting Started Guide](https://developer.leapmotion.com/leapjs/getting-started), and the [API Reference](https://developer.leapmotion.com/documentation/javascript/api/Leap_Classes.html).

## Installation

**Browser**: Download the latest `leap.js` [from our CDN](https://developer.leapmotion.com/leapjs/welcome).

**Bower**: `bower install leapjs`

**Node**:  `npm install leapjs`

## Examples

**Live Examples** can be found at [developer.leapmotion.com/leapjs/examples](http://developer.leapmotion.com/leapjs/examples).

Some examples have been included in the <code>examples/</code> directory. To run them do the following:

1. Run `npm install`
2. Run `make serve`
3. Point your browser to [localhost:8080/examples](http://localhost:8080/examples)

Or in code:

1. Run `node examples/node.js`

## Plugins

[Plugins](http://developer.leapmotion.com/leapjs/plugins) are used to modularly extend Leap Webapps with external libraries.

```javascript
Leap.loop(function(frame){
  if (frame.hands.length < 1) return;

  console.log(frame.hands[0].screenPosition());
}).use('screenPosition');
```

## Compatibility

Version 0.3.0 or greater of leapjs requires version 1.0.9 or greater of the tracking software which is available at
[https://www.leapmotion.com/setup](https://www.leapmotion.com/setup) in order to have background support work properly.
Mixing and matching prior versions will result in inconsistent background/focus support.


## Troubleshooting

You may encounter a problem with an error message including `SELF_SIGNED_CERT_IN_CHAIN`.
This is often a result of changes in OSX's security system; try reinstalling Node.js.

If that does not work, turn off SSL checking with the following instructions:

``` bash

npm config set strict-ssl=false
npm install leapjs -v0.4.1

````

### Protocol
Details about the protocol used to communicate with `leapd` are detailed here
[PROTOCOL.md](https://github.com/leapmotion/leapjs/blob/master/PROTOCOL.md).

## Contributing

Add your name, email, and github account to the CONTRIBUTORS.txt list, thereby agreeing to the terms and conditions of the Contributor License Agreement.

Open a Pull Request. If your information is not in the CONTRIBUTORS file, your pull request will not be reviewed.
[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/f4522a98d0918ac69a49119ac3249bdb "githalytics.com")](http://githalytics.com/leapmotion/leapjs)
