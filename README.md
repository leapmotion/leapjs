__What do you think about the future of VR? [Take our survey.](https://www.surveymonkey.com/s/7LZQDKL)__


[![LeapJS Logo](https://cloud.githubusercontent.com/assets/407497/2652512/eedfb992-bfae-11e3-8323-f202845e3fd8.png)](https://developer.leapmotion.com/leapjs/)

Welcome to the [Leap Motion](https://www.leapmotion.com) JavaScript framework.

[![Build Status](https://travis-ci.org/leapmotion/leapjs.svg)](https://travis-ci.org/leapmotion/leapjs)

```javascript
Leap.loop(function(frame){
  console.log(frame.hands.length);
});
```

Learn more in the [Getting Started Guide](https://developer.leapmotion.com/leapjs/getting-started), and the [API Reference](https://developer.leapmotion.com/documentation/javascript/api/Leap_Classes.html).

### Installation

**Browser**: Download the latest `leap.js` [from our CDN](https://developer.leapmotion.com/leapjs/welcome).

**Bower**: `bower install leapjs`

**Node**:  `npm install leapjs`

### Examples

Visit [developer.leapmotion.com/gallery/category/javascript](https://developer.leapmotion.com/gallery/category/javascript) for the latest examples.

Some more basic examples have also been included in the [examples/](https://github.com/leapmotion/leapjs/tree/master/examples) directory.

### Plugins

[Plugins](http://developer.leapmotion.com/leapjs/plugins) are used to modularly extend Leap Webapps with external libraries.
Here we use the `screenPosition` plugin to get the position of the hand as an on-screen cursor.

```javascript
Leap.loop({

  hand: function(hand){
    console.log( hand.screenPosition() );
  }

}).use('screenPosition');
```


### Misc

LeapJS includes the vector math library [GL-Matrix](http://glmatrix.net/) for your use and convenience.  For example, we can easily compute a dot product.  See [the example](https://github.com/leapmotion/leapjs/blob/master/examples/math.html) and [the gl matrix docs](http://glmatrix.net/docs/2.2.0/) for more info.

```javascript
var dot = Leap.vec3.dot(hand.direction, hand.indexFinger.direction);
```

Also visit the wiki for [how to make plugins](https://github.com/leapmotion/leapjs/wiki/Plugins),
[protocol guide](https://github.com/leapmotion/leapjs/wiki/Protocol), and [other stuff](https://github.com/leapmotion/leapjs/wiki).



### Contributing

Add your name, email, and github account to the CONTRIBUTORS.txt list, thereby agreeing to the terms and conditions of the Contributor License Agreement.

Open a Pull Request. If your information is not in the CONTRIBUTORS file, your pull request will not be reviewed.

[![Analytics](https://ga-beacon.appspot.com/UA-31536531-10/LeapJS/README.md?pixel)](https://github.com/leapmotion/LeapJS)
