/*    
 * LeapJS-Plugins  - v0.1.6 - 2014-05-14    
 * http://github.com/leapmotion/leapjs-plugins/    
 *    
 * Copyright 2014 LeapMotion, Inc    
 *    
 * Licensed under the Apache License, Version 2.0 (the "License");    
 * you may not use this file except in compliance with the License.    
 * You may obtain a copy of the License at    
 *    
 *     http://www.apache.org/licenses/LICENSE-2.0    
 *    
 * Unless required by applicable law or agreed to in writing, software    
 * distributed under the License is distributed on an "AS IS" BASIS,    
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.    
 * See the License for the specific language governing permissions and    
 * limitations under the License.    
 *    
 */    

//CoffeeScript generated from main/hand-entry/leap.hand-entry.coffee
/*
Emits controller events when a hand enters of leaves the frame
"handLost" and "handFound"
Each event also includes the hand object, which will be invalid for the handLost event.
*/


(function() {
  var handEntry;

  handEntry = function() {
    var activeHandIds;
    activeHandIds = [];
    this.on("deviceDisconnected", function() {
      for (var i = 0, len = activeHandIds.length; i < len; i++){
      id = activeHandIds[i];
      activeHandIds.splice(i, 1);
      // this gets executed before the current frame is added to the history.
      this.emit('handLost', this.lastConnectionFrame.hand(id))
      i--;
      len--;
    };
    });
    return {
      frame: function(frame) {
        var id, newValidHandIds, _i, _len, _results;
        newValidHandIds = frame.hands.map(function(hand) {
          return hand.id;
        });
        for (var i = 0, len = activeHandIds.length; i < len; i++){
        id = activeHandIds[i];
        if(  newValidHandIds.indexOf(id) == -1){
          activeHandIds.splice(i, 1);
          // this gets executed before the current frame is added to the history.
          this.emit('handLost', this.frame(1).hand(id))
          i--;
          len--;
        }
      };
        _results = [];
        for (_i = 0, _len = newValidHandIds.length; _i < _len; _i++) {
          id = newValidHandIds[_i];
          if (activeHandIds.indexOf(id) === -1) {
            activeHandIds.push(id);
            _results.push(this.emit('handFound', frame.hand(id)));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };
  };

  if ((typeof Leap !== 'undefined') && Leap.Controller) {
    Leap.Controller.plugin('handEntry', handEntry);
  } else if (typeof module !== 'undefined') {
    module.exports.handEntry = handEntry;
  } else {
    throw 'leap.js not included';
  }

}).call(this);

//CoffeeScript generated from main/hand-hold/leap.hand-hold.coffee
(function() {
  var handHold;

  handHold = function() {
    var dataFn, interFrameData;
    interFrameData = {};
    dataFn = function(prefix, hashOrKey, value) {
      var dict, key, _name, _results;
      interFrameData[_name = prefix + this.id] || (interFrameData[_name] = []);
      dict = interFrameData[prefix + this.id];
      if (value !== void 0) {
        return dict[hashOrKey] = value;
      } else if ({}.toString.call(hashOrKey) === '[object String]') {
        return dict[hashOrKey];
      } else {
        _results = [];
        for (key in hashOrKey) {
          value = hashOrKey[key];
          if (value === void 0) {
            _results.push(delete dict[key]);
          } else {
            _results.push(dict[key] = value);
          }
        }
        return _results;
      }
    };
    return {
      hand: {
        data: function(hashOrKey, value) {
          return dataFn.call(this, 'h', hashOrKey, value);
        },
        hold: function(object) {
          if (object) {
            return this.data({
              holding: object
            });
          } else {
            return this.hold(this.hovering());
          }
        },
        holding: function() {
          return this.data('holding');
        },
        release: function() {
          var release;
          release = this.data('holding');
          this.data({
            holding: void 0
          });
          return release;
        },
        hoverFn: function(getHover) {
          return this.data({
            getHover: getHover
          });
        },
        hovering: function() {
          var getHover;
          if (getHover = this.data('getHover')) {
            return this._hovering || (this._hovering = getHover.call(this));
          }
        }
      },
      pointable: {
        data: function(hashOrKey, value) {
          return dataFn.call(this, 'p', hashOrKey, value);
        }
      }
    };
  };

  if ((typeof Leap !== 'undefined') && Leap.Controller) {
    Leap.Controller.plugin('handHold', handHold);
  } else if (typeof module !== 'undefined') {
    module.exports.handHold = handHold;
  } else {
    throw 'leap.js not included';
  }

}).call(this);



/*
 * LeapJS Playback - v0.2.1 - 2014-05-14
 * http://github.com/leapmotion/leapjs-playback/
 *
 * Copyright 2014 LeapMotion, Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

;(function( window, undefined ){
 'use strict';
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode

// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.3.3
var LZString = {


  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  _f : String.fromCharCode,

  compressToBase64 : function (input) {
    if (input == null) return "";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    input = LZString.compress(input);

    while (i < input.length*2) {

      if (i%2==0) {
        chr1 = input.charCodeAt(i/2) >> 8;
        chr2 = input.charCodeAt(i/2) & 255;
        if (i/2+1 < input.length)
          chr3 = input.charCodeAt(i/2+1) >> 8;
        else
          chr3 = NaN;
      } else {
        chr1 = input.charCodeAt((i-1)/2) & 255;
        if ((i+1)/2 < input.length) {
          chr2 = input.charCodeAt((i+1)/2) >> 8;
          chr3 = input.charCodeAt((i+1)/2) & 255;
        } else
          chr2=chr3=NaN;
      }
      i+=3;

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }

      output = output +
        LZString._keyStr.charAt(enc1) + LZString._keyStr.charAt(enc2) +
          LZString._keyStr.charAt(enc3) + LZString._keyStr.charAt(enc4);

    }

    return output;
  },

  decompressFromBase64 : function (input) {
    if (input == null) return "";
    var output = "",
        ol = 0,
        output_,
        chr1, chr2, chr3,
        enc1, enc2, enc3, enc4,
        i = 0, f=LZString._f;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

      enc1 = LZString._keyStr.indexOf(input.charAt(i++));
      enc2 = LZString._keyStr.indexOf(input.charAt(i++));
      enc3 = LZString._keyStr.indexOf(input.charAt(i++));
      enc4 = LZString._keyStr.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      if (ol%2==0) {
        output_ = chr1 << 8;

        if (enc3 != 64) {
          output += f(output_ | chr2);
        }
        if (enc4 != 64) {
          output_ = chr3 << 8;
        }
      } else {
        output = output + f(output_ | chr1);

        if (enc3 != 64) {
          output_ = chr2 << 8;
        }
        if (enc4 != 64) {
          output += f(output_ | chr3);
        }
      }
      ol+=3;
    }

    return LZString.decompress(output);

  },

  compressToUTF16 : function (input) {
    if (input == null) return "";
    var output = "",
        i,c,
        current,
        status = 0,
        f = LZString._f;

    input = LZString.compress(input);

    for (i=0 ; i<input.length ; i++) {
      c = input.charCodeAt(i);
      switch (status++) {
        case 0:
          output += f((c >> 1)+32);
          current = (c & 1) << 14;
          break;
        case 1:
          output += f((current + (c >> 2))+32);
          current = (c & 3) << 13;
          break;
        case 2:
          output += f((current + (c >> 3))+32);
          current = (c & 7) << 12;
          break;
        case 3:
          output += f((current + (c >> 4))+32);
          current = (c & 15) << 11;
          break;
        case 4:
          output += f((current + (c >> 5))+32);
          current = (c & 31) << 10;
          break;
        case 5:
          output += f((current + (c >> 6))+32);
          current = (c & 63) << 9;
          break;
        case 6:
          output += f((current + (c >> 7))+32);
          current = (c & 127) << 8;
          break;
        case 7:
          output += f((current + (c >> 8))+32);
          current = (c & 255) << 7;
          break;
        case 8:
          output += f((current + (c >> 9))+32);
          current = (c & 511) << 6;
          break;
        case 9:
          output += f((current + (c >> 10))+32);
          current = (c & 1023) << 5;
          break;
        case 10:
          output += f((current + (c >> 11))+32);
          current = (c & 2047) << 4;
          break;
        case 11:
          output += f((current + (c >> 12))+32);
          current = (c & 4095) << 3;
          break;
        case 12:
          output += f((current + (c >> 13))+32);
          current = (c & 8191) << 2;
          break;
        case 13:
          output += f((current + (c >> 14))+32);
          current = (c & 16383) << 1;
          break;
        case 14:
          output += f((current + (c >> 15))+32, (c & 32767)+32);
          status = 0;
          break;
      }
    }

    return output + f(current + 32);
  },


  decompressFromUTF16 : function (input) {
    if (input == null) return "";
    var output = "",
        current,c,
        status=0,
        i = 0,
        f = LZString._f;

    while (i < input.length) {
      c = input.charCodeAt(i) - 32;

      switch (status++) {
        case 0:
          current = c << 1;
          break;
        case 1:
          output += f(current | (c >> 14));
          current = (c&16383) << 2;
          break;
        case 2:
          output += f(current | (c >> 13));
          current = (c&8191) << 3;
          break;
        case 3:
          output += f(current | (c >> 12));
          current = (c&4095) << 4;
          break;
        case 4:
          output += f(current | (c >> 11));
          current = (c&2047) << 5;
          break;
        case 5:
          output += f(current | (c >> 10));
          current = (c&1023) << 6;
          break;
        case 6:
          output += f(current | (c >> 9));
          current = (c&511) << 7;
          break;
        case 7:
          output += f(current | (c >> 8));
          current = (c&255) << 8;
          break;
        case 8:
          output += f(current | (c >> 7));
          current = (c&127) << 9;
          break;
        case 9:
          output += f(current | (c >> 6));
          current = (c&63) << 10;
          break;
        case 10:
          output += f(current | (c >> 5));
          current = (c&31) << 11;
          break;
        case 11:
          output += f(current | (c >> 4));
          current = (c&15) << 12;
          break;
        case 12:
          output += f(current | (c >> 3));
          current = (c&7) << 13;
          break;
        case 13:
          output += f(current | (c >> 2));
          current = (c&3) << 14;
          break;
        case 14:
          output += f(current | (c >> 1));
          current = (c&1) << 15;
          break;
        case 15:
          output += f(current | c);
          status=0;
          break;
      }


      i++;
    }

    return LZString.decompress(output);
    //return output;

  },



  compress: function (uncompressed) {
    if (uncompressed == null) return "";
    var i, value,
        context_dictionary= {},
        context_dictionaryToCreate= {},
        context_c="",
        context_wc="",
        context_w="",
        context_enlargeIn= 2, // Compensate for the first entry which should not count
        context_dictSize= 3,
        context_numBits= 2,
        context_data_string="",
        context_data_val=0,
        context_data_position=0,
        ii,
        f=LZString._f;

    for (ii = 0; ii < uncompressed.length; ii += 1) {
      context_c = uncompressed.charAt(ii);
      if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
        context_dictionary[context_c] = context_dictSize++;
        context_dictionaryToCreate[context_c] = true;
      }

      context_wc = context_w + context_c;
      if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
        context_w = context_wc;
      } else {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
          if (context_w.charCodeAt(0)<256) {
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1);
              if (context_data_position == 15) {
                context_data_position = 0;
                context_data_string += f(context_data_val);
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<8 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == 15) {
                context_data_position = 0;
                context_data_string += f(context_data_val);
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i=0 ; i<context_numBits ; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position == 15) {
                context_data_position = 0;
                context_data_string += f(context_data_val);
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i=0 ; i<16 ; i++) {
              context_data_val = (context_data_val << 1) | (value&1);
              if (context_data_position == 15) {
                context_data_position = 0;
                context_data_string += f(context_data_val);
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = Math.pow(2, context_numBits);
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w];
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == 15) {
              context_data_position = 0;
              context_data_string += f(context_data_val);
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }


        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        // Add wc to the dictionary.
        context_dictionary[context_wc] = context_dictSize++;
        context_w = String(context_c);
      }
    }

    // Output the code for w.
    if (context_w !== "") {
      if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
        if (context_w.charCodeAt(0)<256) {
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1);
            if (context_data_position == 15) {
              context_data_position = 0;
              context_data_string += f(context_data_val);
              context_data_val = 0;
            } else {
              context_data_position++;
            }
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<8 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == 15) {
              context_data_position = 0;
              context_data_string += f(context_data_val);
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (i=0 ; i<context_numBits ; i++) {
            context_data_val = (context_data_val << 1) | value;
            if (context_data_position == 15) {
              context_data_position = 0;
              context_data_string += f(context_data_val);
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = 0;
          }
          value = context_w.charCodeAt(0);
          for (i=0 ; i<16 ; i++) {
            context_data_val = (context_data_val << 1) | (value&1);
            if (context_data_position == 15) {
              context_data_position = 0;
              context_data_string += f(context_data_val);
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = Math.pow(2, context_numBits);
          context_numBits++;
        }
        delete context_dictionaryToCreate[context_w];
      } else {
        value = context_dictionary[context_w];
        for (i=0 ; i<context_numBits ; i++) {
          context_data_val = (context_data_val << 1) | (value&1);
          if (context_data_position == 15) {
            context_data_position = 0;
            context_data_string += f(context_data_val);
            context_data_val = 0;
          } else {
            context_data_position++;
          }
          value = value >> 1;
        }


      }
      context_enlargeIn--;
      if (context_enlargeIn == 0) {
        context_enlargeIn = Math.pow(2, context_numBits);
        context_numBits++;
      }
    }

    // Mark the end of the stream
    value = 2;
    for (i=0 ; i<context_numBits ; i++) {
      context_data_val = (context_data_val << 1) | (value&1);
      if (context_data_position == 15) {
        context_data_position = 0;
        context_data_string += f(context_data_val);
        context_data_val = 0;
      } else {
        context_data_position++;
      }
      value = value >> 1;
    }

    // Flush the last char
    while (true) {
      context_data_val = (context_data_val << 1);
      if (context_data_position == 15) {
        context_data_string += f(context_data_val);
        break;
      }
      else context_data_position++;
    }
    return context_data_string;
  },

  decompress: function (compressed) {
    if (compressed == null) return "";
    if (compressed == "") return null;
    var dictionary = [],
        next,
        enlargeIn = 4,
        dictSize = 4,
        numBits = 3,
        entry = "",
        result = "",
        i,
        w,
        bits, resb, maxpower, power,
        c,
        f = LZString._f,
        data = {string:compressed, val:compressed.charCodeAt(0), position:32768, index:1};

    for (i = 0; i < 3; i += 1) {
      dictionary[i] = i;
    }

    bits = 0;
    maxpower = Math.pow(2,2);
    power=1;
    while (power!=maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position == 0) {
        data.position = 32768;
        data.val = data.string.charCodeAt(data.index++);
      }
      bits |= (resb>0 ? 1 : 0) * power;
      power <<= 1;
    }

    switch (next = bits) {
      case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = 32768;
              data.val = data.string.charCodeAt(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = 32768;
              data.val = data.string.charCodeAt(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
        c = f(bits);
        break;
      case 2:
        return "";
    }
    dictionary[3] = c;
    w = result = c;
    while (true) {
      if (data.index > data.string.length) {
        return "";
      }

      bits = 0;
      maxpower = Math.pow(2,numBits);
      power=1;
      while (power!=maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = 32768;
          data.val = data.string.charCodeAt(data.index++);
        }
        bits |= (resb>0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch (c = bits) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2,8);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = 32768;
              data.val = data.string.charCodeAt(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }

          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2,16);
          power=1;
          while (power!=maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = 32768;
              data.val = data.string.charCodeAt(data.index++);
            }
            bits |= (resb>0 ? 1 : 0) * power;
            power <<= 1;
          }
          dictionary[dictSize++] = f(bits);
          c = dictSize-1;
          enlargeIn--;
          break;
        case 2:
          return result;
      }

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

      if (dictionary[c]) {
        entry = dictionary[c];
      } else {
        if (c === dictSize) {
          entry = w + w.charAt(0);
        } else {
          return null;
        }
      }
      result += entry;

      // Add w+entry[0] to the dictionary.
      dictionary[dictSize++] = w + entry.charAt(0);
      enlargeIn--;

      w = entry;

      if (enlargeIn == 0) {
        enlargeIn = Math.pow(2, numBits);
        numBits++;
      }

    }
  }
};

if( typeof module !== 'undefined' && module != null ) {
  module.exports = LZString
}

// https://gist.github.com/paulirish/5438650

// relies on Date.now() which has been supported everywhere modern for years.
// as Safari 6 doesn't have support for NavigationTiming, we use a Date.now() timestamp for relative values

// if you want values similar to what you'd get with real perf.now, place this towards the head of the page
// but in reality, you're just getting the delta between now() calls, so it's not terribly important where it's placed


(function(){

  // prepare base perf object
  if (typeof window.performance === 'undefined') {
      window.performance = {};
  }

  if (!window.performance.now){

    var nowOffset = Date.now();

    if (performance.timing && performance.timing.navigationStart){
      nowOffset = performance.timing.navigationStart
    }


    window.performance.now = function now(){
      return Date.now() - nowOffset;
    }

  }

})();
function Recording (options){
  this.options = options || (options = {});
  this.loading = false;
  this.timeBetweenLoops = options.timeBetweenLoops || 50;

  // see https://github.com/leapmotion/leapjs/blob/master/Leap_JSON.rst
  this.packingStructure = [
    'id',
    'timestamp',
    // this should be replace/upgraded with a whitelist instead of a blacklist.
    // leaving out r,s,y, and gestures
    {hands: [[
      'id',
      'type',
      'direction',
      'palmNormal',
      'palmPosition',
      'palmVelocity',
      'stabilizedPalmPosition',
      'pinchStrength',
      'grabStrength',
      'confidence'
      // leaving out r, s, t, sphereCenter, sphereRadius
    ]]},
    {pointables: [[
      'id',
      'direction',
      'handId',
      'length',
      'stabilizedTipPosition',
      'tipPosition',
      'tipVelocity',
      'tool',
      'carpPosition',
      'mcpPosition',
      'pipPosition',
      'dipPosition',
      'btipPosition',
      'bases',
      'type'
      // leaving out touchDistance, touchZone
    ]]},
    {interactionBox: [
      'center', 'size'
    ]}
  ];

  this.setFrames(options.frames || [])
}


Recording.prototype = {

  setFrames: function (frames) {
    this.frameData = frames;
    this.frameIndex = 0;
    this.frameCount = frames.length;
    this.leftCropPosition = 0;
    this.rightCropPosition = this.frameCount;
    this.setMetaData();
  },

  addFrame: function(frameData){
    this.frameData.push(frameData);
  },

  currentFrame: function () {
    return this.frameData[this.frameIndex];
  },

  nextFrame: function () {
    var frameIndex = this.frameIndex + 1;
    // || 1 to prevent `mod 0` error when finishing recording before setFrames has been called.
    frameIndex = frameIndex % (this.rightCropPosition || 1);
    if ((frameIndex < this.leftCropPosition)) {
      frameIndex = this.leftCropPosition;
    }
    return this.frameData[frameIndex];
  },


  advanceFrame: function () {
    this.frameIndex++;

    if (this.frameIndex >= this.rightCropPosition && !this.options.loop) {
      this.frameIndex--;
      // there is currently an issue where angular watching the right handle position
      // will cause this to fire prematurely
      // when switching to an earlier recording
      return false
    }


    this.frameIndex = this.frameIndex % (this.rightCropPosition || 1);

    if ((this.frameIndex < this.leftCropPosition)) {
      this.frameIndex = this.leftCropPosition;
    }

    return true
  },

  // resets to beginning if at end
  readyPlay: function(){
    this.frameIndex++;
    if (this.frameIndex >= this.rightCropPosition) {
      this.frameIndex = this.frameIndex % (this.rightCropPosition || 1);

      if ((this.frameIndex < this.leftCropPosition)) {
        this.frameIndex = this.leftCropPosition;
      }
    }else{
      this.frameIndex--;
    }
  },

  cloneCurrentFrame: function(){
    return JSON.parse(JSON.stringify(this.currentFrame()));
  },


  // this method would be well-moved to its own object/class -.-
  // for every point, lerp as appropriate
  // note: currently hand and finger props are hard coded, but things like stabilizedPalmPosition should be optional
  // should have this be set from the packingStructure or some such, but only for vec3s.
  createLerpFrameData: function(t){
    // http://stackoverflow.com/a/5344074/478354
    var currentFrame = this.currentFrame(),
        nextFrame = this.nextFrame(),
        handProps   = ['palmPosition', 'stabilizedPalmPosition', 'sphereCenter', 'direction', 'palmNormal', 'palmVelocity'],
        fingerProps = ['mcpPosition', 'pipPosition', 'dipPosition', 'tipPosition', 'direction'],
        frameData = this.cloneCurrentFrame(),
        numHands = frameData.hands.length,
        numPointables = frameData.pointables.length,
        len1 = handProps.length,
        len2 = fingerProps.length,
        prop, hand, pointable;

    for (var i = 0; i < numHands; i++){
      hand = frameData.hands[i];

      for (var j = 0; j < len1; j++){
        prop = handProps[j];

        if (!currentFrame.hands[i][prop]){
          continue;
        }

        if (!nextFrame.hands[i]){
          continue;
        }

        Leap.vec3.lerp(
          hand[prop],
          currentFrame.hands[i][prop],
          nextFrame.hands[i][prop],
          t
        );

        console.assert(hand[prop]);
      }

    }

    for ( i = 0; i < numPointables; i++){
      pointable = frameData.pointables[i];

      for ( j = 0; j < len2; j++){
        prop = fingerProps[j];

        if (!currentFrame.pointables[i][prop]){
          continue;
        }

        if (!nextFrame.hands[i]){
          continue;
        }

        Leap.vec3.lerp(
          pointable[prop],
          currentFrame.pointables[i][prop],
          nextFrame.pointables[i][prop],
          0
        );
//          console.assert(t >= 0 && t <= 1);
//          if (t > 0) debugger;

      }

    }

    return frameData;
  },

  // returns ms
  timeToNextFrame: function () {
    var elapsedTime = (this.nextFrame().timestamp - this.currentFrame().timestamp) / 1000;
    if (elapsedTime < 0) {
      elapsedTime = this.timeBetweenLoops; //arbitrary pause at slightly less than 30 fps.
    }
    console.assert(!isNaN(elapsedTime));
    return elapsedTime;
  },


  blank: function(){
    return this.frameData.length === 0;
  },

  // sets the crop-point of the current recording to the current position.
  leftCrop: function () {
    this.leftCropPosition = this.frameIndex
  },

  // sets the crop-point of the current recording to the current position.
  rightCrop: function () {
    this.rightCropPosition = this.frameIndex
  },

  // removes every other frame from the array
  // Accepts an optional `factor` integer, which is the number of frames
  // discarded for every frame kept.
  cullFrames: function (factor) {
    console.log('cull frames', factor);
    factor || (factor = 1);
    for (var i = 0; i < this.frameData.length; i++) {
      this.frameData.splice(i, factor);
    }
    this.setMetaData();
  },

  // Returns the average frames per second of the recording
  frameRate: function () {
    if (this.frameData.length == 0) {
      return 0
    }
    return this.frameData.length / (this.frameData[this.frameData.length - 1].timestamp - this.frameData[0].timestamp) * 1000000;
  },

  // returns frames without any circular references
  croppedFrameData: function () {
    return this.frameData.slice(this.leftCropPosition, this.rightCropPosition);
  },


  setMetaData: function () {

    var newMetaData = {
      formatVersion: 2,
      generatedBy: 'LeapJS Playback 0.2.0',
      frames: this.rightCropPosition - this.leftCropPosition,
      protocolVersion: this.options.requestProtocolVersion,
      serviceVersion: this.options.serviceVersion,
      frameRate: this.frameRate().toPrecision(2),
      modified: (new Date).toString()
    };

    this.metadata || (this.metadata = {});

    for (var key in newMetaData) {
      this.metadata[key] = newMetaData[key];
    }
  },

  // returns an array
  // the first item is the keys of the following items
  // nested arrays are expected to have idententical siblings
  packedFrameData: function(){
    var frameData = this.croppedFrameData(),
      packedFrames = [],
      frameDatum;

    packedFrames.push(this.packingStructure);

    for (var i = 0, len = frameData.length; i < len; i++){
      frameDatum = frameData[i];

      packedFrames.push(
        this.packArray(
          this.packingStructure,
          frameDatum
        )
      );

    }

    return packedFrames;
  },

  // recursive method
  // creates a structure of frame data matching packing structure
  // there may be an issue here where hands/pointables are wrapped in one more array than necessary
  packArray: function(structure, data){
    var out = [], nameOrHash;

    for (var i = 0, len1 = structure.length; i < len1; i++){

      // e.g., nameOrHash is either 'id' or {hand: [...]}
      nameOrHash = structure[i];

      if ( typeof  nameOrHash === 'string'){

        out.push(
          data[nameOrHash]
        );

      }else if (Object.prototype.toString.call(nameOrHash) == "[object Array]") {
        // nested array, such as hands or fingers

        for (var j = 0, len2 = data.length; j < len2; j++){
          out.push(
            this.packArray(
              nameOrHash,
              data[j]
            )
          );
        }

      } else { // key-value (nested object) such as interactionBox

        console.assert(nameOrHash);

        for (var key in nameOrHash) break;

        console.assert(key);
        console.assert(nameOrHash[key]);
        console.assert(data[key]);

        out.push(this.packArray(
          nameOrHash[key],
          data[key]
        ));

      }

    }

    return out;
  },

  // expects the first array element to describe the following arrays
  // this algorithm copies frames to a new array
  // could there be merit in something which would do an in-place substitution?
  unPackFrameData: function(packedFrames){
    var packingStructure = packedFrames[0];
    var frameData = [],
        frameDatum;

    for (var i = 1, len = packedFrames.length; i < len; i++) {
      frameDatum = packedFrames[i];
      frameData.push(
        this.unPackArray(
          packingStructure,
          frameDatum
        )
      );

    }

    return frameData;
  },

  // data is a frame or subset of frame
  // returns a frame object
  // this is the structure of the array
  // gets unfolded to key-value pairs
  // e.g.:
  //  this.packingStructure = [
  //    'id',
  //    'timestamp',
  //    {hands: [[
  //      'id',
  //      'direction',
  //      'palmNormal',
  //      'palmPosition',
  //      'palmVelocity'
  //    ]]},
  //    {pointables: [[
  //      'direction',
  //      'handId',
  //      'length',
  //      'stabilizedTipPosition',
  //      'tipPosition',
  //      'tipVelocity',
  //      'tool'
  //    ]]},
  //    {interactionBox: [
  //      'center', 'size'
  //    ]}
  //  ];
  unPackArray: function(structure, data){
    var out = {}, nameOrHash;

    for (var i = 0, len1 = structure.length; i < len1; i++){

     // e.g., nameOrHash is either 'id' or {hand: [...]}
     nameOrHash = structure[i];

     if ( typeof  nameOrHash === 'string'){

       out[nameOrHash] = data[i];

     }else if (Object.prototype.toString.call(nameOrHash) == "[object Array]") {
       // nested array, such as hands or fingers
       // nameOrHash ["id", "direction", "palmNormal", "palmPosition", "palmVelocity"]
       // data [ [ 31, [vec3], [vec3], ...] ]

       var subArray = [];

       for (var j = 0, len2 = data.length; j < len2; j++){
         subArray.push(
           this.unPackArray(
             nameOrHash,
             data[j]
           )
         );
       }
       return subArray;

     } else { // key-value (nested object) such as interactionBox

       for (var key in nameOrHash) break;

       out[key] = this.unPackArray(
         nameOrHash[key],
         data[i]
       );

     }

    }

    return out;
  },

  toHash: function () {
    this.setMetaData();
    return {
      metadata: this.metadata,
      frames: this.packedFrameData()
    }
  },

  // Returns the cropped data as JSON or compressed
  // http://pieroxy.net/blog/pages/lz-string/index.html
  export: function (format) {
    var json = JSON.stringify(this.toHash());

    if (format == 'json') return json;

    return LZString.compressToBase64(json);
  },

  save: function(format){
    var filename;

    filename = this.metadata.title ? this.metadata.title.replace(/\s/g, '') : 'leap-playback-recording';

    if (this.metadata.frameRate) {
      filename += "-" + (Math.round(this.metadata.frameRate)) + "fps";
    }

    if (format === 'json') {

      saveAs(new Blob([this.export('json')], {
        type: "text/JSON;charset=utf-8"
      }), filename + ".json");

    } else {

      saveAs(new Blob([this.export('lz')], {
        type: "application/x-gzip;charset=utf-8"
      }),  filename + ".json.lz");

    }

  },

  decompress: function (data) {
    return LZString.decompressFromBase64(data);
  },

  loaded: function(){
    return !!(this.frameData && this.frameData.length)
  },


  // optional callback once frames are loaded, will have a context of player
  loadFrameData: function (callback) {
    var xhr = new XMLHttpRequest(),
        url = this.url,
        recording = this,
        contentLength = 0;

    xhr.onreadystatechange = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200 || xhr.status === 0) {
          if (xhr.responseText) {

            recording.finishLoad(xhr.responseText, callback);

          } else {
            console.error('Leap Playback: "' + url + '" seems to be unreachable or the file is empty.');
          }
        } else {
          console.error('Leap Playback: Couldn\'t load "' + url + '" (' + xhr.status + ')');
        }
      }
    };

    xhr.addEventListener('progress', function(oEvent){

      if ( recording.options.loadProgress ) {

        if (oEvent.lengthComputable) {
          var percentComplete = oEvent.loaded / oEvent.total;
          recording.options.loadProgress( recording, percentComplete, oEvent );
        }

      }

    });

    this.loading = true;

    xhr.open("GET", url, true);
    xhr.send(null);
  },

  finishLoad: function(responseData, callback){

    var url = this.url;

    if (url.split('.')[url.split('.').length - 1] == 'lz') {
      responseData = this.decompress(responseData);
    }

    responseData = JSON.parse(responseData);

    if (responseData.metadata.formatVersion == 2) {
      responseData.frames = this.unPackFrameData(responseData.frames);
    }

    this.metadata = responseData.metadata;

    console.log('Recording loaded:', this.metadata);

    this.loading = false;

    if (callback) {
      callback.call(this, responseData.frames);
    }

  }

};
(function () {
  var CONNECT_LEAP_ICON = '<img class="playback-connect-leap" style="margin: 0px 2px -2px 0px; max-width: 100%;" src="data:image/gif;base64,R0lGODlh9AHmAPf/AOnxtbS0tc3eVTMzNM3NztvnhtbX1/Hy86ioqezs7Z6entzd3r7UJdHhZcnKzOjo6sXZO319fkJCQurq6xMTFPj65q2treHh4vT42uXl5/Lz9JCQkfP09FxcXebm54yMjsvMzSgoKdfleLGxsUtLTPDx8cHCwlNTVSIiI6CgoYSEhAUFBpmZmtHS1Li5ucHDxNHR0err7HZ2duDrl8XFxvP09vv98/Dx8trb3MjIyN7e3x4eHmZmZj4+PrzTHtDQ0uvs7dra2uzt7ZWVldfY2cPExtbX2AsLDImJiff4+MbHysjIyoCBgsXGyHp6er6+vsDVKm5ucOTk5XFxc83O0MbGx2FhYm1tbsDWLKWlpu70xRkZGkVFRtPU1pydoM/Q0bKztKamqCQkJeLi5O/w8Glpab/AwtjY2f7+/WtrbcfIytjZ26qrrDc4OdHS0nBxc7/VJ5KTlI6Oj9LS0/v8/b7UI3JzdMPDxIqKi5aWl7y9vi4uL8fHx3BwcNvc3pKSk62usCsrLN/f4Ly8vZydnp2dndXV1snJycXGym5vcefn6IuMjYWFhYODhiMjJCYmJ+fo6UhISR8fH/7+/hsbHP39/ejo6cHWLu/v8Lq7vPv7++nq6+3u7q+wsby9wL6/wvj4+Pz8/Pr6+vLy8+bn6O7u7vj4+e3u7/f3+PT19fn5+ff39/T09Pb29+jo6MHWL/b29vLy8vT09e7v8L2+v/Pz9O7u7/39/vHy9L2+wbi6ve/v7+no6fz9/fn6+vj5+fv7/Pr7+////v7//8XGx/X19vX29vb39+7v7/z8/enp6uPk5fr6+/n5+g8PENTU1Hh4eYeHh05OT+fo6JGSk0BAQOTl6CAgIS8vML+/wHNzc5eYmLa3t+Xm54OEhfn4+Y+PkFdXV1hZWv3++IiIiJGRkZubm3t8ff7+/35/gOjp6ru8vmRkZMTFyLO0tWJiY6eoqycnKGxsbkNDQ77TIl5eX6Kjo+Xm6QcHBwgICZSUlvLz8y0tLv///wAAAP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQyMUExNDAzQjE2NzExRTNBMUE1RTA3Qjc0NDg0NDMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQyMUExNDA0QjE2NzExRTNBMUE1RTA3Qjc0NDg0NDMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDIxQTE0MDFCMTY3MTFFM0ExQTVFMDdCNzQ0ODQ0MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDIxQTE0MDJCMTY3MTFFM0ExQTVFMDdCNzQ0ODQ0MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMi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">';
  var MOVE_HAND_OVER_LEAP_ICON = '<img class="playback-move-hand" style="margin: 0px 2px -2px 0px; max-width: 100%;" src="data:image/gif;base64,R0lGODlh9AHtAPf/AJ2dnfT09KWlpZWVlejo6bGxsRwcHHl5eYmJiRMTFOrq66GhoYWFhcHCxObm54GBgdjY2GFhYcXGydPT0+Dg4OPj4319fQsLC0ZGRuTk5GlpaVVVVV5eXpGRkXFxcd7e3kFBQXV1ddbW1lJSUsDAwNvb221tbk1OTgMDAykpKaurqzw9PdTU1FlZWdzc3JiYmMjKzLu7u8jIyJubnPLy9M7Ozr2/wUlJSTo6OsLCwmRkZDY2NtDQ0DIyMr29vaytsKysrC4uLra2ttHS1CUlJtXX2MrKy6+vr5qamiEhIczMzM3O0LS0tMTExMbGxsbIyt7e4I2Njby8vOTl5qioqMPEx+rr7KqqrOjo6np6fNTV17i4uMzNzo+Pj3Z3ePHx8rm7veDh4uzt7r/AwoeHh8PDxM/Q0sTFx42OkMDBw+fo6bW3utjZ2vHy8tHR0sjJyru8v+Xl5d3d3dzc3mNjZJ+fn2pra+np6t/f4OLj5NPT1V9fYFdXV8HCxsDBxbO0tq6vsqqsrk9PT0tLS5KTlGdnZ4uMjn1+gHd4e1JTUzs7PEJCQzMzMysrK+fn6P7+/v////39/fPz8+7u7/z8/Pv7+/f39/b29vr6+vj4+Pn5+e7u7vLy8u/v7+3t7ezs7PDw8Ozs7fHx8fDw8fb29/Ly8/X19fr6+/z8/fn5+tvc3e/v8HNzdKmpqvf3+CMjJPDx8fP09OPk5ZmZmvj5+Xt8flBQUP39/mtsbvLz8+/w8Nra3NXW15+govr7+x8fH7m5uicnJ+fn6ezt7Zqcn7Kzs7S0s1hYWLe4uvz9/aanqq2trf3+/ouLi2NkZqOjo5aXmqKkppeYmmBgYPv7/JSVl4ODg4eHihcXFw8PD/7//9HS0kBAQOHh4mhoa0RERDAwMPf4+AcHB+vr7NfX11xcXKenp5manJqameXm6ExMTcjHyfv8/G9vb/j4+UdHRywsLHN0dj4+PsrLzTQ0NObm6Obn6efm6Ly9v39/fzc4OL2+v+3s7fb39wAAAP///yH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQyMUExNDA3QjE2NzExRTNBMUE1RTA3Qjc0NDg0NDMxIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQyMUExNDA4QjE2NzExRTNBMUE1RTA3Qjc0NDg0NDMxIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDIxQTE0MDVCMTY3MTFFM0ExQTVFMDdCNzQ0ODQ0MzEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDIxQTE0MDZCMTY3MTFFM0ExQTVFMDdCNzQ0ODQ0MzEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMi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" />';


  function Player(controller, options) {
    var player = this;
    options || (options = {});

//    this.frameData = [];

    this.options = options;
    this.recording = options.recording;

    this.controller = controller;
    this.resetTimers();
    this.setupLoops();
    this.controller.connection.on('ready', function () {
      player.setupProtocols();
    });

    this.userHasControl = false;


    if (options.recording) {
      // string check via underscore.js
      if (toString.call(options.recording) == '[object String]') {
        options.recording = {
          url: options.recording
        }
      }
      this.setRecording(options.recording);
    }

    document.addEventListener("DOMContentLoaded", function(event) {
      document.body.addEventListener('keydown', function (e) {
        if (e.which === player.options.pauseHotkey) {
          player.toggle();
        }
      }, false);
    });

  }

  Player.prototype = {
    resetTimers: function (){
      this.timeSinceLastFrame = 0;
      this.lastFrameTime = null;
    },

    setupLoops: function () {
      var player = this;

      // Loop with explicit frame timing
      this.stepFrameLoop = function (timestamp) {
        if (player.state != 'playing') return;

        player.sendFrameAt(timestamp || performance.now());

        requestAnimationFrame(player.stepFrameLoop);
      };


    },

    // This is how we intercept frame data early
    // By hooking in before Frame creation, we get data exactly as the frame sends it.
    setupProtocols: function () {
      var player = this;
      // This is the original normal protocol, used while in record mode but not recording.
      this.stopProtocol = this.controller.connection.protocol;

      // This consumes all frame data, making the device act as if not streaming
      this.playbackProtocol = function (data) {
        // The old protocol still needs to emit events, so we use it, but intercept Frames
        var eventOrFrame = player.stopProtocol(data);
        if (eventOrFrame instanceof Leap.Frame) {

          if (player.pauseOnHand) {
            if (data.hands.length > 0) {
              player.userHasControl = true;
              player.controller.emit('playback.userTakeControl');
              player.setGraphic();
              player.idle();
            } else if (data.hands.length == 0) {
              if (player.userHasControl) {
                player.userHasControl = false;
                player.controller.emit('playback.userReleaseControl');
                player.setGraphic('wave');
              }

            }
          }

          // prevent the actual frame from getting through
          return {type: 'playback'}
        } else {
          return eventOrFrame;
        }
      };

      // This pushes frame data, and watches for hands to auto change state.
      // Returns the eventOrFrame without modifying it.
      this.recordProtocol = function (data) {
        var eventOrFrame = player.stopProtocol(data);
        if (eventOrFrame instanceof Leap.Frame) {
          player.recordFrameHandler(data);
        }
        return eventOrFrame;
      };

      // Copy methods/properties from the default protocol over
      for (var property in this.stopProtocol) {
        if (this.stopProtocol.hasOwnProperty(property)) {
          this.playbackProtocol[property] = this.stopProtocol[property]
          this.recordProtocol[property] = this.stopProtocol[property]
        }
      }

      // todo: this is messy. Should cover all cases, not just active playback!
      if (this.state == 'playing') {
        this.controller.connection.protocol = this.playbackProtocol
      }
    },



    // Adds playback = true to artificial frames
    sendFrameAt: function (now) {

      if (this.lastFrameTime){
        // chrome bug, see: https://code.google.com/p/chromium/issues/detail?id=268213
        // http://jsfiddle.net/pehrlich/35pTx/
        // console.assert(this.lastFrameTime < now);
        if (now < this.lastFrameTime){
          // this fix will cause an extra animation frame before the lerp frame advances. no big.
          this.lastFrameTime = now;
        }else{
          this.timeSinceLastFrame += (now - this.lastFrameTime);
        }
      }

      this.lastFrameTime = now;

      console.assert(!isNaN(this.timeSinceLastFrame));


      var timeToNextFrame;

      // handle frame dropping, etc
      while ( this.timeSinceLastFrame > ( timeToNextFrame = this.recording.timeToNextFrame() ) ){
        this.timeSinceLastFrame -= timeToNextFrame;
        if (!this.recording.advanceFrame()){
          this.pause();
          this.controller.emit('playback.playbackFinished', this);
          return
        }
      }

      this.sendFrame(
        this.recording.createLerpFrameData(this.timeSinceLastFrame / timeToNextFrame)
      );

    },

    sendFrame: function(frameData){
      if (!frameData) throw "Frame data not provided";

      var frame = new Leap.Frame(frameData);

      // send a deviceFrame to the controller:
      // this frame gets picked up by the controllers own animation loop.

      this.controller.processFrame(frame);
      return true
    },

    sendImmediateFrame: function(frameData){
      if (!frameData) throw "Frame data not provided";

      var frame = new Leap.Frame(frameData);

      // sends an animation frame to the controller

      this.controller.processFinishedFrame(frame);
      return true
    },

    setFrameIndex: function (frameIndex) {
      if (frameIndex != this.recording.frameIndex) {
        this.recording.frameIndex = frameIndex % this.recording.frameCount;
        this.sendFrame(this.recording.currentFrame());
      }
    },


    // used after record
    stop: function () {
      this.idle();

      delete this.recording;

      this.recording = new Recording({
        timeBetweenLoops:       this.options.timeBetweenLoops,
        loop:                   this.options.loop,
        requestProtocolVersion: this.controller.connection.opts.requestProtocolVersion,
        serviceVersion:         this.controller.connection.protocol.serviceVersion
      });

      this.controller.emit('playback.stop', this);
    },

    // used after play
    pause: function () {
      // todo: we should change this idle state to paused or leave it as playback with a pause flag
      // state should correspond always to protocol handler (through a setter)?
      this.state = 'idle';
      this.hideOverlay();
      this.controller.emit('playback.pause', this);
    },

    idle: function () {
      this.state = 'idle';
      this.controller.connection.protocol = this.stopProtocol;
    },

    toggle: function () {
      if (this.state == 'idle') {
        this.play();
      } else if (this.state == 'playing') {
        this.pause();
      }
    },

    // switches to record mode, which will be begin capturing data when a hand enters the frame,
    // and stop when a hand leaves
    // Todo: replace frameData with a full fledged recording, including metadata.
    record: function () {
      this.clear();
      this.stop();
      this.state = 'recording';
      this.controller.connection.protocol = this.recordProtocol;
      this.setGraphic('connect');
      this.controller.emit('playback.record', this)
    },

    // if there is existing frame data, sends a frame with nothing in it
    clear: function () {
      if (!this.recording || this.recording.blank()) return;
      var finalFrame = this.recording.cloneCurrentFrame();
      finalFrame.hands = [];
      finalFrame.fingers = [];
      finalFrame.pointables = [];
      finalFrame.tools = [];
      this.sendImmediateFrame(finalFrame);
    },

    recordPending: function () {
      return this.state == 'recording' && this.recording.blank()
    },

    isRecording: function () {
      return this.state == 'recording' && !this.recording.blank()
    },

    finishRecording: function () {
      // change to the playbackHandler which suppresses frames:
      this.controller.connection.protocol = this.playbackProtocol;
      this.recording.setFrames(this.recording.frameData);
      this.controller.emit('playback.recordingFinished', this)
    },


    loaded: function () {
      return this.recording.loaded();
    },

    loading: function(){
      return this.recording.loading;
    },


    /* Plays back the provided frame data
     * Params {object|boolean}:
     *  - frames: previously recorded frame json
     * - loop: whether or not to loop playback.  Defaults to true.
     */
    play: function () {
      if (this.state === 'playing') return;
      if ( this.loading() || this.recording.blank() ) return;

      this.state = 'playing';
      this.controller.connection.protocol = this.playbackProtocol;

      var player = this;

      // prevent the normal controller response while playing
      this.controller.connection.removeAllListeners('frame');
      this.controller.connection.on('frame', function (frame) {
        // resume play when hands are removed:
        if (player.autoPlay && player.state == 'idle' && frame.hands.length == 0) {
          player.play();
        }

        // The default LeapJS callback processes the frame, which is what we do now:
        player.controller.processFrame(frame);
      });

      // Kick off
      this.resetTimers();
      this.recording.readyPlay();
      this.stepFrameLoop();

      this.controller.emit('playback.play', this);
    },

    // this method replaces connection.handleData when in record mode
    // It accepts the raw connection data which is used to make a frame.
    recordFrameHandler: function (frameData) {
      // Would be better to check controller.streaming() in showOverlay, but that method doesn't exist, yet.
      this.setGraphic('wave');
      if (frameData.hands.length > 0) {
        this.recording.addFrame(frameData);
        this.hideOverlay();
      } else if ( !this.recording.blank() ) {
        this.finishRecording();
      }
    },


    // Accepts a hash with any of
    // URL, recording, metadata
    // once loaded, the recording is immediately activated
    setRecording: function (options) {
      var player = this;

      // otherwise, the animation loop may try and play non-existant frames:
      this.pause();

      // this is called on the context of the recording
      var loadComplete = function (frames) {

        this.setFrames(frames);

        if (player.recording != this){
          console.log('recordings changed during load');
          return
        }

        // it would be better to use streamingCount here, but that won't be in until 0.5.0+
        // For now, it just flashes for a moment until the first frame comes through with a hand on it.
        // if (autoPlay && (controller.streamingCount == 0 || pauseOnHand)) {
        if (player.autoPlay) {
          player.play();
          if (player.pauseOnHand) {
            player.setGraphic('connect');
          }
        }

        player.controller.emit('playback.recordingSet', this);
      };

      this.recording = options;

      // Here we turn the existing argument in to a recording
      // this allows frames to be added to the existing object via ajax
      // saving ajax requests
      if (!(options instanceof Recording)){

        this.recording.__proto__ = Recording.prototype;
        Recording.call(this.recording, {
          timeBetweenLoops: this.options.timeBetweenLoops,
          loop:             this.options.loop,
          loadProgress: function(recording, percentage, oEvent){
            player.controller.emit('playback.ajax:progress', recording, percentage, oEvent);
          }
        });

      }


      if ( this.recording.loaded() ) {

        loadComplete.call(this.recording, this.recording.frameData);

      } else if (options.url) {

        this.controller.emit('playback.ajax:begin', this, this.recording);

        // called in the context of the recording
        this.recording.loadFrameData(function(frames){
          loadComplete.call(this, frames);
          player.controller.emit('playback.ajax:complete', player, this);
        });

      }


      return this;
    },


    hideOverlay: function () {
      if (!this.overlay) return;
      this.overlay.style.display = 'none';
    },


    // Accepts either "connect", "wave", or undefined.
    setGraphic: function (graphicName) {
      if (!this.overlay) return;
      if (this.graphicName == graphicName) return;

      this.graphicName = graphicName;
      switch (graphicName) {
        case 'connect':
          this.overlay.style.display = 'block';
          this.overlay.innerHTML = CONNECT_LEAP_ICON;
          break;
        case 'wave':
          this.overlay.style.display = 'block';
          this.overlay.innerHTML = MOVE_HAND_OVER_LEAP_ICON;
          break;
        case undefined:
          this.overlay.innerHTML = '';
          break;
      }
    }

  };

  // will only play back if device is disconnected
  // Accepts options:
  // - frames: [string] URL of .json frame data
  // - autoPlay: [boolean true] Whether to turn on and off playback based off of connection state
  // - overlay: [boolean or DOM element] Whether or not to show the overlay: "Connect your Leap Motion Controller"
  //            if a DOM element is passed, that will be shown/hidden instead of the default message.
  // - pauseOnHand: [boolean true] Whether to stop playback when a hand is in field of view
  // - requiredProtocolVersion: clients connected with a lower protocol number will not be able to take control of the
  // - timeBetweenLoops: [number, ms] delay between looping playback
  // controller with their device.  This option, if set, ovverrides autoPlay
  // - pauseHotkey: [number or false, default: 32 (spacebar)] - keycode for pause, bound to body
  var playback = function (scope) {
    var controller = this;
    var autoPlay = scope.autoPlay;
    if (autoPlay === undefined) autoPlay = true;

    var pauseOnHand = scope.pauseOnHand;
    if (pauseOnHand === undefined) pauseOnHand = true;

    var timeBetweenLoops = scope.timeBetweenLoops;
    if (timeBetweenLoops === undefined) timeBetweenLoops = 50;

    var requiredProtocolVersion = scope.requiredProtocolVersion;

    var pauseHotkey = scope.pauseHotkey;
    if (pauseHotkey === undefined) pauseHotkey = 32; // spacebar

    var loop = scope.loop;
    if (loop === undefined) loop = true;

    var overlay = scope.overlay;
    // A better fix would be to set an onload handler for this, rather than disable the overlay.
    if (overlay === undefined && document.body) {
      overlay = document.createElement('div');
      document.body.appendChild(overlay);
      overlay.style.width = '100%';
      overlay.style.position = 'absolute';
      overlay.style.top = '0';
      overlay.style.left = '-' + window.getComputedStyle(document.body).getPropertyValue('margin');
      overlay.style.padding = '10px';
      overlay.style.textAlign = 'center';
      overlay.style.fontSize = '18px';
      overlay.style.opacity = '0.8';
      overlay.style.display = 'none';
      overlay.style.zIndex = '10';
      overlay.id = 'connect-leap';
      overlay.style.cursor = 'pointer';
      overlay.addEventListener("click", function () {
        this.style.display = 'none';
        return false;
      }, false);

    }


    scope.player = new Player(this, {
      recording: scope.recording,
      loop: loop,
      pauseHotkey: pauseHotkey,
      timeBetweenLoops: timeBetweenLoops
    });

    // By doing this, we allow player methods to be accessible on the scope
    // this is the controller
    scope.player.overlay = overlay;
    scope.player.pauseOnHand = pauseOnHand;
    scope.player.requiredProtocolVersion = requiredProtocolVersion;
    scope.player.autoPlay = autoPlay;

    var setupStreamingEvents = function () {
      if (scope.player.pauseOnHand && controller.connection.opts.requestProtocolVersion < scope.requiredProtocolVersion) {
        console.log('Protocol Version too old (' + controller.connection.opts.requestProtocolVersion + '), disabling device interaction.');
        scope.player.pauseOnHand = false;
        return
      }

      if (autoPlay) {
        controller.on('streamingStarted', function () {
          if (scope.player.state == 'recording') {
            scope.player.pause();
            scope.player.setGraphic('wave');
          } else {
            if (pauseOnHand) {
              scope.player.setGraphic('wave');
            } else {
              scope.player.setGraphic();
            }
          }
        });

        controller.on('streamingStopped', function () {
          scope.player.play();
        });
      }
      controller.on('streamingStopped', function () {
        scope.player.setGraphic('connect');
      });
    }

    // ready happens before streamingStarted, allowing us to check the version before responding to streamingStart/Stop
    // we can't call this any earlier, or protcol version won't be available
    if (!!this.connection.connected) {
      setupStreamingEvents()
    } else {
      this.on('ready', setupStreamingEvents)
    }

    return {}
  }


  if ((typeof Leap !== 'undefined') && Leap.Controller) {
    Leap.Controller.plugin('playback', playback);
  } else if (typeof module !== 'undefined') {
    module.exports.playback = playback;
  } else {
    throw 'leap.js not included';
  }

}).call(this);
}( window ));
//CoffeeScript generated from main/screen-position/leap.screen-position.coffee
/*
Adds the "screenPosition" method by default to hands and pointables.  This returns a vec3 (an array of length 3)
with [x,y,z] screen coordinates indicating where the hand is, originating from the bottom left.
This method can accept an optional vec3, allowing it to convert any arbitrary vec3 of coordinates.

Custom positioning methods can be passed in, allowing different scaling techniques,
e.g., http://msdn.microsoft.com/en-us/library/windows/hardware/gg463319.aspx (Pointer Ballistics)
Here we scale based upon the interaction box and screen size:

options:
  scale, scaleX, and scaleY.  They all default to 1.
  verticalOffset: in pixels.  This number is added to the returned Y value.  Defaults to 0.



controller.use 'screenPosition', {
  method: (positionVec3)->
    Arguments for Leap.vec3 are (out, a, b)
    [
      Leap.vec3.subtract(positionVec3, positionVec3, @frame.interactionBox.center)
      Leap.vec3.divide(positionVec3, positionVec3, @frame.interactionBox.size)
      Leap.vec3.multiply(positionVec3, positionVec3, [document.body.offsetWidth, document.body.offsetHeight, 0])
    ]
}
More info on vec3 can be found, here: http://glmatrix.net/docs/2.2.0/symbols/vec3.html
*/


(function() {
  var screenPosition;

  screenPosition = function(options) {
    var baseScale, baseVerticalOffset, position, positioningMethods;
    if (options == null) {
      options = {};
    }
    options.positioning || (options.positioning = 'absolute');
    options.scale || (options.scale = 1);
    options.scaleX || (options.scaleX = 1);
    options.scaleY || (options.scaleY = 1);
    options.scaleZ || (options.scaleZ = 1);
    options.verticalOffset || (options.verticalOffset = 0);
    baseScale = 6;
    baseVerticalOffset = -100;
    positioningMethods = {
      absolute: function(positionVec3) {
        return [(window.innerWidth / 2) + (positionVec3[0] * baseScale * options.scale * options.scaleX), window.innerHeight + baseVerticalOffset + options.verticalOffset - (positionVec3[1] * baseScale * options.scale * options.scaleY), positionVec3[2] * baseScale * options.scale * options.scaleZ];
      }
    };
    position = function(vec3, memoize) {
      var screenPositionVec3;
      if (memoize == null) {
        memoize = false;
      }
      screenPositionVec3 = typeof options.positioning === 'function' ? options.positioning.call(this, vec3) : positioningMethods[options.positioning].call(this, vec3);
      if (memoize) {
        this.screenPositionVec3 = screenPositionVec3;
      }
      return screenPositionVec3;
    };
    return {
      hand: {
        screenPosition: function(vec3) {
          return position.call(this, vec3 || this.stabilizedPalmPosition, !vec3);
        }
      },
      pointable: {
        screenPosition: function(vec3) {
          return position.call(this, vec3 || this.stabilizedTipPosition, !vec3);
        }
      }
    };
  };

  if ((typeof Leap !== 'undefined') && Leap.Controller) {
    Leap.Controller.plugin('screenPosition', screenPosition);
  } else if (typeof module !== 'undefined') {
    module.exports.screenPosition = screenPosition;
  } else {
    throw 'leap.js not included';
  }

}).call(this);

//CoffeeScript generated from main/version-check/leap.version-check.coffee
(function() {
  var versionCheck;

  versionCheck = function(scope) {
    scope.alert || (scope.alert = false);
    scope.requiredProtocolVersion || (scope.requiredProtocolVersion = 6);
    scope.disconnect || (scope.disconnect = true);
    if ((typeof Leap !== 'undefined') && Leap.Controller) {
      if (Leap.version.minor < 5 && Leap.version.dot < 4) {
        console.warn("LeapJS Version Check plugin incompatible with LeapJS pre 0.4.4");
      }
    }
    this.on('ready', function() {
      var current, message, required;
      required = scope.requiredProtocolVersion;
      current = this.connection.opts.requestProtocolVersion;
      if (current < required) {
        message = "Protocol Version too old. v" + required + " required, v" + current + " available.";
        if (scope.disconnect) {
          this.disconnect();
          message += " Disconnecting.";
        }
        console.warn(message);
        if (scope.alert) {
          alert("Your Leap Software version is out of date.  Visit http://www.leapmotion.com/setup to update");
        }
        return this.emit('versionCheck.outdated', {
          required: required,
          current: current,
          disconnect: scope.disconnect
        });
      }
    });
    return {};
  };

  if ((typeof Leap !== 'undefined') && Leap.Controller) {
    Leap.Controller.plugin('versionCheck', versionCheck);
  } else if (typeof module !== 'undefined') {
    module.exports.versionCheck = versionCheck;
  } else {
    throw 'leap.js not included';
  }

}).call(this);
