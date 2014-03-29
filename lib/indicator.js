/* A singleton class which show or hides a Leap indicator on the page
 * Node support not available
 * Accepts options:
 *  - position: [string] one of 'TR', 'TL', 'BR', 'BL' - which corner the indicator should be positioned to, if any.
 *  - fadeOut [number] default of 5000 - this is how long the indicator lasts after the device is streaming
 *  - onFade: [function] a callback after the indicator fade.
 */
var Indicator = module.exports = function(options) {
  var indicator = this;
  this.options = options;
  if (options.fadeOut === undefined) options.fadeOut = 6000;
  
  this.element = document.createElement('div');
  this.element.style.width = "100px";
  this.element.style.height = "60px";
  this.element.style.transition = "opacity 2s, background-color 1s";
  this.element.style.border = "2px solid black";
  this.element.style.borderRadius = "10px";
  this.element.onmouseover = function(){ indicator.mouseover() };
  this.element.onmouseout =  function(){ indicator.mouseout()  };

  this.link = document.createElement('a');
  this.element.appendChild(this.link);
  this.link.innerHTML = 'Powered By Leapmotion';
  this.link.href = 'http://www.leapmotion.com';
  this.link.style.opacity = "0";
  this.link.style.transition = "opacity 1s";
  this.link.style.webkitTransition = "opacity 1s";
  options.lit = false;

  // available post 0.5.0
  if (false && options.controller.streaming()){
    this.lightUp();
  }else{
    // ready -> streamingStarted in 0.5.0
    options.controller.on('frame', function(frame){if (frame.valid && !indicator.options.lit) indicator.lightUp()});
  }

  // deviceDisconnected -> streamingStopped in 0.5.0
  options.controller.on('deviceDisconnected', function(){indicator.dim()});
  options.controller.on('deviceConnected',    function(){indicator.lightUp()});

  if (document.body){
    document.body.appendChild(this.element);
  }else{
    // webkit/firefox:
    if ( document.addEventListener ) {
      document.addEventListener('DOMContentLoaded', function(){
        console.log('loaded', arguments);
        document.body.appendChild(indicator.element);
      });
    // ie
    } else {
      var checkLoad = function () {
        document.readyState !== "complete" ? setTimeout(checkLoad, 50) : document.body.appendChild(indicator.element);
      };

      checkLoad();
    }
  }
  return this;
}


Indicator.prototype.show = function(position){
  switch(position) {
  case 'TR':
    this.element.style.position = "absolute";
    this.element.style.top = "0px";
    this.element.style.right = "0px";
    break;
  case 'TL':
    this.element.style.position = "absolute";
    this.element.style.top = "0px";
    this.element.style.left = "0px";
    break;
  case 'BR':
    this.element.style.position = "absolute";
    this.element.style.bottom = "0px";
    this.element.style.right = "0px";
    break;
  case 'BL':
    this.element.style.position = "absolute";
    this.element.style.bottom = "0px";
    this.element.style.left = "0px";
    break;
  }
  this.element.style.display = 'block';
  return this;
}

Indicator.prototype.hide = function(){
  if (!this.element) return Indicator;
  this.element.style.display = 'none';
  return this;
}

Indicator.prototype.fadeOut = function(){
  console.log('fadeout');
  if (!this.element) return Indicator;
  this.element.style.opacity = 0;
  if (this.options.onFade) this.options.onFade(this);
  return this;
}

Indicator.prototype.lightUp = function(){
  this.setFadeTimer();
//  this.element.className += 'active'
  this.options.lit = true;
  this.element.style.backgroundColor = 'green';
  return this;
}

Indicator.prototype.dim = function(){
  console.log('dim');
  this.options.lit = false;
  this.element.style.backgroundColor = 'initial';
//  this.element.className.replace(/active/g, '');
  return this;
}

Indicator.prototype.mouseover = function(){
  clearTimeout(this.options.fadeTimer);
  this.link.style.opacity = "1";
}

Indicator.prototype.mouseout = function(){
  this.link.style.opacity = "0";
  this.setFadeTimer();
}

Indicator.prototype.setFadeTimer = function(){
  if (this.options.fadeOut > 0) {
    var indicator = this;
    clearTimeout(this.options.fadeTimer);
    this.options.fadeTimer = setTimeout(function(){indicator.fadeOut()}, this.options.fadeOut);
  }
}