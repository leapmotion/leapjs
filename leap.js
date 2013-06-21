;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
},{}],2:[function(require,module,exports){
(function(){// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
// License: New BSD License
// Reference: http://dev.w3.org/html5/websockets/
// Reference: http://tools.ietf.org/html/rfc6455

(function() {
  
  if (window.WEB_SOCKET_FORCE_FLASH) {
    // Keeps going.
  } else if (window.WebSocket) {
    return;
  } else if (window.MozWebSocket) {
    // Firefox.
    window.WebSocket = MozWebSocket;
    return;
  }
  
  var logger;
  if (window.WEB_SOCKET_LOGGER) {
    logger = WEB_SOCKET_LOGGER;
  } else if (window.console && window.console.log && window.console.error) {
    // In some environment, console is defined but console.log or console.error is missing.
    logger = window.console;
  } else {
    logger = {log: function(){ }, error: function(){ }};
  }
  
  // swfobject.hasFlashPlayerVersion("10.0.0") doesn't work with Gnash.
  if (swfobject.getFlashPlayerVersion().major < 10) {
    logger.error("Flash Player >= 10.0.0 is required.");
    return;
  }
  if (location.protocol == "file:") {
    logger.error(
      "WARNING: web-socket-js doesn't work in file:///... URL " +
      "unless you set Flash Security Settings properly. " +
      "Open the page via Web server i.e. http://...");
  }

  /**
   * Our own implementation of WebSocket class using Flash.
   * @param {string} url
   * @param {array or string} protocols
   * @param {string} proxyHost
   * @param {int} proxyPort
   * @param {string} headers
   */
  window.WebSocket = function(url, protocols, proxyHost, proxyPort, headers) {
    var self = this;
    self.__id = WebSocket.__nextId++;
    WebSocket.__instances[self.__id] = self;
    self.readyState = WebSocket.CONNECTING;
    self.bufferedAmount = 0;
    self.__events = {};
    if (!protocols) {
      protocols = [];
    } else if (typeof protocols == "string") {
      protocols = [protocols];
    }
    // Uses setTimeout() to make sure __createFlash() runs after the caller sets ws.onopen etc.
    // Otherwise, when onopen fires immediately, onopen is called before it is set.
    self.__createTask = setTimeout(function() {
      WebSocket.__addTask(function() {
        self.__createTask = null;
        WebSocket.__flash.create(
            self.__id, url, protocols, proxyHost || null, proxyPort || 0, headers || null);
      });
    }, 0);
  };

  /**
   * Send data to the web socket.
   * @param {string} data  The data to send to the socket.
   * @return {boolean}  True for success, false for failure.
   */
  WebSocket.prototype.send = function(data) {
    if (this.readyState == WebSocket.CONNECTING) {
      throw "INVALID_STATE_ERR: Web Socket connection has not been established";
    }
    // We use encodeURIComponent() here, because FABridge doesn't work if
    // the argument includes some characters. We don't use escape() here
    // because of this:
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Functions#escape_and_unescape_Functions
    // But it looks decodeURIComponent(encodeURIComponent(s)) doesn't
    // preserve all Unicode characters either e.g. "\uffff" in Firefox.
    // Note by wtritch: Hopefully this will not be necessary using ExternalInterface.  Will require
    // additional testing.
    var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
    if (result < 0) { // success
      return true;
    } else {
      this.bufferedAmount += result;
      return false;
    }
  };

  /**
   * Close this web socket gracefully.
   */
  WebSocket.prototype.close = function() {
    if (this.__createTask) {
      clearTimeout(this.__createTask);
      this.__createTask = null;
      this.readyState = WebSocket.CLOSED;
      return;
    }
    if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
      return;
    }
    this.readyState = WebSocket.CLOSING;
    WebSocket.__flash.close(this.__id);
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {string} type
   * @param {function} listener
   * @param {boolean} useCapture
   * @return void
   */
  WebSocket.prototype.addEventListener = function(type, listener, useCapture) {
    if (!(type in this.__events)) {
      this.__events[type] = [];
    }
    this.__events[type].push(listener);
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {string} type
   * @param {function} listener
   * @param {boolean} useCapture
   * @return void
   */
  WebSocket.prototype.removeEventListener = function(type, listener, useCapture) {
    if (!(type in this.__events)) return;
    var events = this.__events[type];
    for (var i = events.length - 1; i >= 0; --i) {
      if (events[i] === listener) {
        events.splice(i, 1);
        break;
      }
    }
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {Event} event
   * @return void
   */
  WebSocket.prototype.dispatchEvent = function(event) {
    var events = this.__events[event.type] || [];
    for (var i = 0; i < events.length; ++i) {
      events[i](event);
    }
    var handler = this["on" + event.type];
    if (handler) handler.apply(this, [event]);
  };

  /**
   * Handles an event from Flash.
   * @param {Object} flashEvent
   */
  WebSocket.prototype.__handleEvent = function(flashEvent) {
    
    if ("readyState" in flashEvent) {
      this.readyState = flashEvent.readyState;
    }
    if ("protocol" in flashEvent) {
      this.protocol = flashEvent.protocol;
    }
    
    var jsEvent;
    if (flashEvent.type == "open" || flashEvent.type == "error") {
      jsEvent = this.__createSimpleEvent(flashEvent.type);
    } else if (flashEvent.type == "close") {
      jsEvent = this.__createSimpleEvent("close");
      jsEvent.wasClean = flashEvent.wasClean ? true : false;
      jsEvent.code = flashEvent.code;
      jsEvent.reason = flashEvent.reason;
    } else if (flashEvent.type == "message") {
      var data = decodeURIComponent(flashEvent.message);
      jsEvent = this.__createMessageEvent("message", data);
    } else {
      throw "unknown event type: " + flashEvent.type;
    }
    
    this.dispatchEvent(jsEvent);
    
  };
  
  WebSocket.prototype.__createSimpleEvent = function(type) {
    if (document.createEvent && window.Event) {
      var event = document.createEvent("Event");
      event.initEvent(type, false, false);
      return event;
    } else {
      return {type: type, bubbles: false, cancelable: false};
    }
  };
  
  WebSocket.prototype.__createMessageEvent = function(type, data) {
    if (document.createEvent && window.MessageEvent && !window.opera) {
      var event = document.createEvent("MessageEvent");
      event.initMessageEvent("message", false, false, data, null, null, window, null);
      return event;
    } else {
      // IE and Opera, the latter one truncates the data parameter after any 0x00 bytes.
      return {type: type, data: data, bubbles: false, cancelable: false};
    }
  };
  
  /**
   * Define the WebSocket readyState enumeration.
   */
  WebSocket.CONNECTING = 0;
  WebSocket.OPEN = 1;
  WebSocket.CLOSING = 2;
  WebSocket.CLOSED = 3;

  // Field to check implementation of WebSocket.
  WebSocket.__isFlashImplementation = true;
  WebSocket.__initialized = false;
  WebSocket.__flash = null;
  WebSocket.__instances = {};
  WebSocket.__tasks = [];
  WebSocket.__nextId = 0;
  
  /**
   * Load a new flash security policy file.
   * @param {string} url
   */
  WebSocket.loadFlashPolicyFile = function(url){
    WebSocket.__addTask(function() {
      WebSocket.__flash.loadManualPolicyFile(url);
    });
  };

  /**
   * Loads WebSocketMain.swf and creates WebSocketMain object in Flash.
   */
  WebSocket.__initialize = function() {
    
    if (WebSocket.__initialized) return;
    WebSocket.__initialized = true;
    
    if (WebSocket.__swfLocation) {
      // For backword compatibility.
      window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
    }
    if (!window.WEB_SOCKET_SWF_LOCATION) {
      logger.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
      return;
    }
    if (!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR &&
        !WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/) &&
        WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)) {
      var swfHost = RegExp.$1;
      if (location.host != swfHost) {
        logger.error(
            "[WebSocket] You must host HTML and WebSocketMain.swf in the same host " +
            "('" + location.host + "' != '" + swfHost + "'). " +
            "See also 'How to host HTML file and SWF file in different domains' section " +
            "in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message " +
            "by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;");
      }
    }
    var container = document.createElement("div");
    container.id = "webSocketContainer";
    // Hides Flash box. We cannot use display: none or visibility: hidden because it prevents
    // Flash from loading at least in IE. So we move it out of the screen at (-100, -100).
    // But this even doesn't work with Flash Lite (e.g. in Droid Incredible). So with Flash
    // Lite, we put it at (0, 0). This shows 1x1 box visible at left-top corner but this is
    // the best we can do as far as we know now.
    container.style.position = "absolute";
    if (WebSocket.__isFlashLite()) {
      container.style.left = "0px";
      container.style.top = "0px";
    } else {
      container.style.left = "-100px";
      container.style.top = "-100px";
    }
    var holder = document.createElement("div");
    holder.id = "webSocketFlash";
    container.appendChild(holder);
    document.body.appendChild(container);
    // See this article for hasPriority:
    // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
    swfobject.embedSWF(
      WEB_SOCKET_SWF_LOCATION,
      "webSocketFlash",
      "1" /* width */,
      "1" /* height */,
      "10.0.0" /* SWF version */,
      null,
      null,
      {hasPriority: true, swliveconnect : true, allowScriptAccess: "always"},
      null,
      function(e) {
        if (!e.success) {
          logger.error("[WebSocket] swfobject.embedSWF failed");
        }
      }
    );
    
  };
  
  /**
   * Called by Flash to notify JS that it's fully loaded and ready
   * for communication.
   */
  WebSocket.__onFlashInitialized = function() {
    // We need to set a timeout here to avoid round-trip calls
    // to flash during the initialization process.
    setTimeout(function() {
      WebSocket.__flash = document.getElementById("webSocketFlash");
      WebSocket.__flash.setCallerUrl(location.href);
      WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
      for (var i = 0; i < WebSocket.__tasks.length; ++i) {
        WebSocket.__tasks[i]();
      }
      WebSocket.__tasks = [];
    }, 0);
  };
  
  /**
   * Called by Flash to notify WebSockets events are fired.
   */
  WebSocket.__onFlashEvent = function() {
    setTimeout(function() {
      try {
        // Gets events using receiveEvents() instead of getting it from event object
        // of Flash event. This is to make sure to keep message order.
        // It seems sometimes Flash events don't arrive in the same order as they are sent.
        var events = WebSocket.__flash.receiveEvents();
        for (var i = 0; i < events.length; ++i) {
          WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);
        }
      } catch (e) {
        logger.error(e);
      }
    }, 0);
    return true;
  };
  
  // Called by Flash.
  WebSocket.__log = function(message) {
    logger.log(decodeURIComponent(message));
  };
  
  // Called by Flash.
  WebSocket.__error = function(message) {
    logger.error(decodeURIComponent(message));
  };
  
  WebSocket.__addTask = function(task) {
    if (WebSocket.__flash) {
      task();
    } else {
      WebSocket.__tasks.push(task);
    }
  };
  
  /**
   * Test if the browser is running flash lite.
   * @return {boolean} True if flash lite is running, false otherwise.
   */
  WebSocket.__isFlashLite = function() {
    if (!window.navigator || !window.navigator.mimeTypes) {
      return false;
    }
    var mimeType = window.navigator.mimeTypes["application/x-shockwave-flash"];
    if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
      return false;
    }
    return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false;
  };
  
  if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
    // NOTE:
    //   This fires immediately if web_socket.js is dynamically loaded after
    //   the document is loaded.
    swfobject.addDomLoadEvent(function() {
      WebSocket.__initialize();
    });
  }
  
})();

})()
},{}],3:[function(require,module,exports){
window.requestAnimFrame = (function() {
  return  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame   ||
  window.mozRequestAnimationFrame      ||
  window.oRequestAnimationFrame        ||
  window.msRequestAnimationFrame       ||
  function(callback) { window.setTimeout(callback, 1000 / 60); }
})();

Leap = require("../lib/index").Leap

},{"../lib/index":4}],4:[function(require,module,exports){
(function(){var Controller = require("./controller").Controller
  , Frame = require("./frame").Frame
  , Gesture = require("./gesture").Gesture
  , Hand = require("./hand").Hand
  , Pointable = require("./pointable").Pointable
  , Vector = require("./vector").Vector
  , Matrix = require("./matrix").Matrix
  , Connection = require("./connection").Connection
  , CircularBuffer = require("./circular_buffer").CircularBuffer
  , UI = require("./ui").UI
  , loopController = undefined;

/**
 * Leap is the global namespace of the Leap API.
 * @namespace Leap
 */
exports.Leap = {

  /**
   * The Leap.loop() function passes a frame of Leap data to your
   * callback function and then calls window.requestAnimationFrame() after
   * executing your callback function.
   *
   * Leap.loop() sets up the Leap controller and WebSocket connection for you.
   * You do not need to create your own controller when using this method.
   *
   * Your callback function is called on an interval determined by the client
   * browser. Typically, this is on an interval of 60 frames/second. The most
   * recent frame of Leap data is passed to your callback function. If the Leap
   * is producing frames at a slower rate than the browser frame rate, the same
   * frame of Leap data can be passed to your function in successive animation
   * updates.
   *
   * As an alternative, you can create your own Controller object and use a
   * {@link Controller#onFrame onFrame} callback to process the data at
   * the frame rate of the Leap device. See {@link Controller} for an
   * example.
   *
   * @method Leap.loop
   * @param {function} callback A function called when the browser is ready to
   * draw to the screen. The most recent {@link Frame} object is passed to
   * your callback function.
   * 
   * ```javascript
   *    Leap.loop( function( frame ) {
   *        // ... your code here
   *    })
   * ```
   */
  loop: function(opts, callback) {
    if (callback === undefined) {
      callback = opts;
      opts = {};
    }
    if (!loopController) loopController = new Controller(opts);
    loopController.loop(callback);
  },
  Controller: Controller,
  Frame: Frame,
  Gesture: Gesture,
  Hand: Hand,
  Pointable: Pointable,
  Vector: Vector,
  Matrix: Matrix,
  Connection: Connection,
  CircularBuffer: CircularBuffer,
  UI: UI
}

})()
},{"./controller":5,"./frame":6,"./gesture":7,"./hand":8,"./pointable":9,"./vector":10,"./matrix":11,"./connection":12,"./circular_buffer":13,"./ui":14}],13:[function(require,module,exports){
var CircularBuffer = exports.CircularBuffer = function(size) {
  this.pos = 0;
  this._buf = [];
  this.size = size;
}

CircularBuffer.prototype.get = function(i) {
  if (i == undefined) i = 0;
  if (i >= this.size) return undefined;
  if (i >= this._buf.length) return undefined;
  return this._buf[(this.pos - i - 1) % this.size];
}

CircularBuffer.prototype.push = function(o) {
  this._buf[this.pos % this.size] = o;
  return this.pos++;
}

},{}],15:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            if (ev.source === window && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],16:[function(require,module,exports){
(function(process){if (!process.EventEmitter) process.EventEmitter = function () {};

var EventEmitter = exports.EventEmitter = process.EventEmitter;
var isArray = typeof Array.isArray === 'function'
    ? Array.isArray
    : function (xs) {
        return Object.prototype.toString.call(xs) === '[object Array]'
    }
;
function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0; i < xs.length; i++) {
        if (x === xs[i]) return i;
    }
    return -1;
}

// By default EventEmitters will print a warning if more than
// 10 listeners are added to it. This is a useful default which
// helps finding memory leaks.
//
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
var defaultMaxListeners = 10;
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!this._events) this._events = {};
  this._events.maxListeners = n;
};


EventEmitter.prototype.emit = function(type) {
  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events || !this._events.error ||
        (isArray(this._events.error) && !this._events.error.length))
    {
      if (arguments[1] instanceof Error) {
        throw arguments[1]; // Unhandled 'error' event
      } else {
        throw new Error("Uncaught, unspecified 'error' event.");
      }
      return false;
    }
  }

  if (!this._events) return false;
  var handler = this._events[type];
  if (!handler) return false;

  if (typeof handler == 'function') {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        var args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
    return true;

  } else if (isArray(handler)) {
    var args = Array.prototype.slice.call(arguments, 1);

    var listeners = handler.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
      listeners[i].apply(this, args);
    }
    return true;

  } else {
    return false;
  }
};

// EventEmitter is defined in src/node_events.cc
// EventEmitter.prototype.emit() is also defined there.
EventEmitter.prototype.addListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('addListener only takes instances of Function');
  }

  if (!this._events) this._events = {};

  // To avoid recursion in the case that type == "newListeners"! Before
  // adding it to the listeners, first emit "newListeners".
  this.emit('newListener', type, listener);

  if (!this._events[type]) {
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  } else if (isArray(this._events[type])) {

    // Check for listener leak
    if (!this._events[type].warned) {
      var m;
      if (this._events.maxListeners !== undefined) {
        m = this._events.maxListeners;
      } else {
        m = defaultMaxListeners;
      }

      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error('(node) warning: possible EventEmitter memory ' +
                      'leak detected. %d listeners added. ' +
                      'Use emitter.setMaxListeners() to increase limit.',
                      this._events[type].length);
        console.trace();
      }
    }

    // If we've already got an array, just append.
    this._events[type].push(listener);
  } else {
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  var self = this;
  self.on(type, function g() {
    self.removeListener(type, g);
    listener.apply(this, arguments);
  });

  return this;
};

EventEmitter.prototype.removeListener = function(type, listener) {
  if ('function' !== typeof listener) {
    throw new Error('removeListener only takes instances of Function');
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (!this._events || !this._events[type]) return this;

  var list = this._events[type];

  if (isArray(list)) {
    var i = indexOf(list, listener);
    if (i < 0) return this;
    list.splice(i, 1);
    if (list.length == 0)
      delete this._events[type];
  } else if (this._events[type] === listener) {
    delete this._events[type];
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  if (arguments.length === 0) {
    this._events = {};
    return this;
  }

  // does not use listeners(), so no side effect of creating _events[type]
  if (type && this._events && this._events[type]) this._events[type] = null;
  return this;
};

EventEmitter.prototype.listeners = function(type) {
  if (!this._events) this._events = {};
  if (!this._events[type]) this._events[type] = [];
  if (!isArray(this._events[type])) {
    this._events[type] = [this._events[type]];
  }
  return this._events[type];
};

})(require("__browserify_process"))
},{"__browserify_process":15}],17:[function(require,module,exports){

},{}],7:[function(require,module,exports){
var Vector = require("./vector").Vector

/**
 * Constructs a new Gesture object.
 *
 * An uninitialized Gesture object is considered invalid. Get valid instances
 * of the Gesture class, which will be one of the Gesture subclasses, from a
 * Frame object.
 *
 * @class Gesture
 * @abstract
 * @memberof Leap
 * @classdesc
 * The Gesture class represents a recognized movement by the user.
 *
 * The Leap watches the activity within its field of view for certain movement
 * patterns typical of a user gesture or command. For example, a movement from side to
 * side with the hand can indicate a swipe gesture, while a finger poking forward
 * can indicate a screen tap gesture.
 *
 * When the Leap recognizes a gesture, it assigns an ID and adds a
 * Gesture object to the frame gesture list. For continuous gestures, which
 * occur over many frames, the Leap updates the gesture by adding
 * a Gesture object having the same ID and updated properties in each
 * subsequent frame.
 *
 * **Important:** Recognition for each type of gesture must be enabled;
 * otherwise **no gestures are recognized or reported**.
 *
 * Subclasses of Gesture define the properties for the specific movement patterns
 * recognized by the Leap.
 *
 * The Gesture subclasses for include:
 *
 * * CircleGesture -- A circular movement by a finger.
 * * SwipeGesture -- A straight line movement by the hand with fingers extended.
 * * ScreenTapGesture -- A forward tapping movement by a finger.
 * * KeyTapGesture -- A downward tapping movement by a finger.
 *
 * Circle and swipe gestures are continuous and these objects can have a
 * state of start, update, and stop.
 *
 * The screen tap gesture is a discrete gesture. The Leap only creates a single
 * ScreenTapGesture object appears for each tap and it always has a stop state.
 *
 * Get valid Gesture instances from a Frame object. You can get a list of gestures
 * from the Frame gestures array. You can also use the Frame gesture() method
 * to find a gesture in the current frame using an ID value obtained in a
 * previous frame.
 *
 * Gesture objects can be invalid. For example, when you get a gesture by ID
 * using Frame.gesture(), and there is no gesture with that ID in the current
 * frame, then gesture() returns an Invalid Gesture object (rather than a null
 * value). Always check object validity in situations where a gesture might be
 * invalid.
 */
var Gesture = exports.Gesture = function(data) {
  var gesture = undefined
  switch (data.type) {
    case 'circle':
      gesture = new CircleGesture(data);
      break;
    case 'swipe':
      gesture = new SwipeGesture(data);
      break;
    case 'screenTap':
      gesture = new ScreenTapGesture(data);
      break;
    case 'keyTap':
      gesture = new KeyTapGesture(data);
      break;
    default:
      throw "unkown gesture type";
  }
 /**
  * The gesture ID.
  *
  * All Gesture objects belonging to the same recognized movement share the
  * same ID value. Use the ID value with the Frame::gesture() method to
  * find updates related to this Gesture object in subsequent frames.
  *
  * @member id
  * @memberof Leap.Gesture.prototype
  * @type {Number}
  */
  gesture.id = data.id;
 /**
  * The list of hands associated with this Gesture, if any.
  *
  * If no hands are related to this gesture, the list is empty.
  *
  * @member handIds
  * @memberof Leap.Gesture.prototype
  * @type {Array}
  */
  gesture.handIds = data.handIds;
 /**
  * The list of fingers and tools associated with this Gesture, if any.
  *
  * If no Pointable objects are related to this gesture, the list is empty.
  *
  * @member pointableIds
  * @memberof Leap.Gesture.prototype
  * @type {Array}
  */
  gesture.pointableIds = data.pointableIds;
 /**
  * The elapsed duration of the recognized movement up to the
  * frame containing this Gesture object, in microseconds.
  *
  * The duration reported for the first Gesture in the sequence (with the
  * start state) will typically be a small positive number since
  * the movement must progress far enough for the Leap to recognize it as
  * an intentional gesture.
  *
  * @member duration
  * @memberof Leap.Gesture.prototype
  * @type {Number}
  */
  gesture.duration = data.duration;
 /**
  * The gesture ID.
  *
  * Recognized movements occur over time and have a beginning, a middle,
  * and an end. The 'state()' attribute reports where in that sequence this
  * Gesture object falls.
  *
  * Possible values for the state field are:
  *
  * * start
  * * update
  * * stop
  *
  * @member state
  * @memberof Leap.Gesture.prototype
  * @type {String}
  */
  gesture.state = data.state;
 /**
  * The gesture type.
  *
  * Possible values for the type field are:
  *
  * * circle
  * * swipe
  * * screenTap
  * * keyTap
  *
  * @member type
  * @memberof Leap.Gesture.prototype
  * @type {String}
  */
  gesture.type = data.type;
  return gesture;
}

/**
 * Constructs a new CircleGesture object.
 *
 * An uninitialized CircleGesture object is considered invalid. Get valid instances
 * of the CircleGesture class from a Frame object.
 *
 * @class CircleGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The CircleGesture classes represents a circular finger movement.
 *
 * A circle movement is recognized when the tip of a finger draws a circle
 * within the Leap field of view.
 *
 * ![CircleGesture](images/Leap_Gesture_Circle.png)
 *
 * Circle gestures are continuous. The CircleGesture objects for the gesture have
 * three possible states:
 *
 * * start -- The circle gesture has just started. The movement has
 *  progressed far enough for the recognizer to classify it as a circle.
 * * update -- The circle gesture is continuing.
 * * stop -- The circle gesture is finished.
 */
var CircleGesture = function(data) {
 /**
  * The center point of the circle within the Leap frame of reference.
  *
  * @member center
  * @memberof Leap.CircleGesture.prototype
  * @type {Leap.Vector}
  */
  this.center = new Vector(data.center);
 /**
  * The normal vector for the circle being traced.
  *
  * If you draw the circle clockwise, the normal vector points in the same
  * general direction as the pointable object drawing the circle. If you draw
  * the circle counterclockwise, the normal points back toward the
  * pointable. If the angle between the normal and the pointable object
  * drawing the circle is less than 90 degrees, then the circle is clockwise.
  *
  * ```javascript
  *    var clockwiseness;
  *    if (circle.pointable.direction.angleTo(circle.normal) <= PI/4) {
  *        clockwiseness = "clockwise";
  *    }
  *    else
  *    {
  *        clockwiseness = "counterclockwise";
  *    }
  * ```
  *
  * @member normal
  * @memberof Leap.CircleGesture.prototype
  * @type {Leap.Vector}
  */
  this.normal = new Vector(data.normal);
 /**
  * The number of times the finger tip has traversed the circle.
  *
  * Progress is reported as a positive number of the number. For example,
  * a progress value of .5 indicates that the finger has gone halfway
  * around, while a value of 3 indicates that the finger has gone around
  * the the circle three times.
  *
  * Progress starts where the circle gesture began. Since the circle
  * must be partially formed before the Leap can recognize it, progress
  * will be greater than zero when a circle gesture first appears in the
  * frame.
  *
  * @member progress
  * @memberof Leap.CircleGesture.prototype
  * @type {Number}
  */
  this.progress = data.progress;
 /**
  * The radius of the circle in mm.
  *
  * @member radius
  * @memberof Leap.CircleGesture.prototype
  * @type {Number}
  */
  this.radius = data.radius;
}

/**
 * Constructs a new SwipeGesture object.
 *
 * An uninitialized SwipeGesture object is considered invalid. Get valid instances
 * of the SwipeGesture class from a Frame object.
 *
 * @class SwipeGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The SwipeGesture class represents a swiping motion of a finger or tool.
 *
 * ![SwipeGesture](images/Leap_Gesture_Swipe.png)
 *
 * Swipe gestures are continuous.
 */
var SwipeGesture = function(data) {
 /**
  * The starting position within the Leap frame of
  * reference, in mm.
  *
  * @member startPosition
  * @memberof Leap.SwipeGesture.prototype
  * @type {Leap.Vector}
  */
  this.startPosition = new Vector(data.startPosition);
 /**
  * The current swipe position within the Leap frame of
  * reference, in mm.
  *
  * @member position
  * @memberof Leap.SwipeGesture.prototype
  * @type {Leap.Vector}
  */
  this.position = new Vector(data.position);
 /**
  * The unit direction vector parallel to the swipe motion.
  *
  * You can compare the components of the vector to classify the swipe as
  * appropriate for your application. For example, if you are using swipes
  * for two dimensional scrolling, you can compare the x and y values to
  * determine if the swipe is primarily horizontal or vertical.
  *
  * @member direction
  * @memberof Leap.SwipeGesture.prototype
  * @type {Leap.Vector}
  */
  this.direction = new Vector(data.direction);
 /**
  * The speed of the finger performing the swipe gesture in
  * millimeters per second.
  *
  * @member speed
  * @memberof Leap.SwipeGesture.prototype
  * @type {Number}
  */
  this.speed = data.speed;
}

/**
 * Constructs a new ScreenTapGesture object.
 *
 * An uninitialized ScreenTapGesture object is considered invalid. Get valid instances
 * of the ScreenTapGesture class from a Frame object.
 *
 * @class ScreenTapGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The ScreenTapGesture class represents a tapping gesture by a finger or tool.
 *
 * A screen tap gesture is recognized when the tip of a finger pokes forward
 * and then springs back to approximately the original postion, as if
 * tapping a vertical screen. The tapping finger must pause briefly before beginning the tap.
 *
 * ![ScreenTap](images/Leap_Gesture_Tap2.png)
 *
 * ScreenTap gestures are discrete. The ScreenTapGesture object representing a tap always
 * has the state, STATE_STOP. Only one ScreenTapGesture object is created for each
 * screen tap gesture recognized.
 */
var ScreenTapGesture = function(data) {
 /**
  * The position where the screen tap is registered.
  *
  * @member position
  * @memberof Leap.ScreenTapGesture.prototype
  * @type {Leap.Vector}
  */
  this.position = new Vector(data.position);
 /**
  * The direction of finger tip motion.
  *
  * @member direction
  * @memberof Leap.ScreenTapGesture.prototype
  * @type {Leap.Vector}
  */
  this.direction = new Vector(data.direction);
 /**
  * The progess value is always 1.0 for a screen tap gesture.
  *
  * @member progress
  * @memberof Leap.ScreenTapGesture.prototype
  * @type {Number}
  */
  this.progress = data.progress;
}

/**
 * Constructs a new KeyTapGesture object.
 *
 * An uninitialized KeyTapGesture object is considered invalid. Get valid instances
 * of the KeyTapGesture class from a Frame object.
 *
 * @class KeyTapGesture
 * @memberof Leap
 * @augments Leap.Gesture
 * @classdesc
 * The KeyTapGesture class represents a tapping gesture by a finger or tool.
 *
 * A key tap gesture is recognized when the tip of a finger rotates down toward the
 * palm and then springs back to approximately the original postion, as if
 * tapping. The tapping finger must pause briefly before beginning the tap.
 *
 * ![KeyTap](images/Leap_Gesture_Tap.png)
 *
 * Key tap gestures are discrete. The KeyTapGesture object representing a tap always
 * has the state, STATE_STOP. Only one KeyTapGesture object is created for each
 * key tap gesture recognized.
 */
var KeyTapGesture = function(data) {
    /**
     * The position where the key tap is registered.
     *
     * @member position
     * @memberof Leap.KeyTapGesture.prototype
     * @type {Leap.Vector}
     */
    this.position = new Vector(data.position);
    /**
     * The direction of finger tip motion.
     *
     * @member direction
     * @memberof Leap.KeyTapGesture.prototype
     * @type {Leap.Vector}
     */
    this.direction = new Vector(data.direction);
    /**
     * The progess value is always 1.0 for a key tap gesture.
     *
     * @member progress
     * @memberof Leap.KeyTapGesture.prototype
     * @type {Number}
     */
    this.progress = data.progress;
}

},{"./vector":10}],9:[function(require,module,exports){
var Vector = require("./vector").Vector

/**
 * Constructs a Pointable object.
 *
 * An uninitialized pointable is considered invalid.
 * Get valid Pointable objects from a Frame or a Hand object.
 *
 * @class Pointable
 * @memberof Leap
 * @classdesc
 * The Pointable class reports the physical characteristics of a detected
 * finger or tool.
 *
 * Both fingers and tools are classified as Pointable objects. Use the
 * Pointable.tool property to determine whether a Pointable object represents a
 * tool or finger. The Leap classifies a detected entity as a tool when it is
 * thinner, straighter, and longer than a typical finger.
 *
 * Note that Pointable objects can be invalid, which means that they do not
 * contain valid tracking data and do not correspond to a physical entity.
 * Invalid Pointable objects can be the result of asking for a Pointable object
 * using an ID from an earlier frame when no Pointable objects with that ID
 * exist in the current frame. A Pointable object created from the Pointable
 * constructor is also invalid. Test for validity with the Pointable.valid
 * property.
 */
var Pointable = exports.Pointable = function(data) {
  /**
   * Indicates whether this is a valid Pointable object.
   *
   * @member valid
   * @type {Boolean}
   * @memberof Leap.Pointable.prototype
   */
  this.valid = true;
  /**
   * A unique ID assigned to this Pointable object, whose value remains the
   * same across consecutive frames while the tracked finger or tool remains
   * visible. If tracking is lost (for example, when a finger is occluded by
   * another finger or when it is withdrawn from the Leap field of view), the
   * Leap may assign a new ID when it detects the entity in a future frame.
   *
   * Use the ID value with the pointable() functions defined for the
   * {@link Frame} and {@link Frame.Hand} classes to find this
   * Pointable object in future frames.
   *
   * @member id
   * @type {String}
   * @memberof Leap.Pointable.prototype
   */
  this.id = data.id;
  this.handId = data.handId;
  /**
   * The estimated length of the finger or tool in millimeters.
   *
   * The reported length is the visible length of the finger or tool from the
   * hand to tip. If the length isn't known, then a value of 0 is returned.
   *
   * @member length
   * @type {Number}
   * @memberof Leap.Pointable.prototype
   */
  this.length = data.length;
  /**
   * Whether or not the Pointable is believed to be a tool.
   * Tools are generally longer, thinner, and straighter than fingers.
   *
   * If tool is false, then this Pointable must be a finger.
   *
   * @member tool
   * @type {Boolean}
   * @memberof Leap.Pointable.prototype
   */
  this.tool = data.tool;
  /**
   * The estimated width of the tool in millimeters.
   *
   * The reported width is the average width of the visible portion of the
   * tool from the hand to the tip. If the width isn't known,
   * then a value of 0 is returned.
   *
   * Pointable objects representing fingers do not have a width property.
   *
   * @member width
   * @type {Number}
   * @memberof Leap.Pointable.prototype
   */
  this.width = data.width;
  /**
   * The direction in which this finger or tool is pointing.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the tip.
   *
   * ![Finger](images/Leap_Finger_Model.png)
   * @member direction
   * @type {Leap.Vector}
   * @memberof Leap.Pointable.prototype
   */
  this.direction = new Vector(data.direction);
  /**
   * The tip position in millimeters from the Leap origin.
   *
   * @member tipPosition
   * @type {Leap.Vector}
   * @memberof Leap.Pointable.prototype
   */
  this.tipPosition = new Vector(data.tipPosition);
  /**
   * The rate of change of the tip position in millimeters/second.
   *
   * @member tipVelocity
   * @type {Leap.Vector}
   * @memberof Leap.Pointable.prototype
   */
  this.tipVelocity = new Vector(data.tipVelocity);
}

/**
 * A string containing a brief, human readable description of the Pointable
 * object.
 *
 * @method toString
 * @memberof Leap.Pointable.prototype
 * @returns {String} A description of the Pointable object as a string.
 */
Pointable.prototype.toString = function() {
  if(this.tool == true){
    return "Pointable [ id:" + this.id + " " + this.length + "mmx | with:" + this.width + "mm | direction:" + this.direction + ' ]';
  } else {
    return "Pointable [ id:" + this.id + " " + this.length + "mmx | direction: " + this.direction + ' ]';
  }
}

/**
 * An invalid Pointable object.
 *
 * You can use this Pointable instance in comparisons testing
 * whether a given Pointable instance is valid or invalid. (You can also use the
 * Pointable.valid property.)

 * @static
 * @type {Leap.Pointable}
 * @name Invalid
 * @memberof Leap.Pointable
 */
Pointable.Invalid = { valid: false };

},{"./vector":10}],12:[function(require,module,exports){
var Connection = exports.Connection = require('./base_connection').Connection

Connection.prototype.setupSocket = function() {
  var connection = this;
  var socket = new WebSocket("ws://" + this.host + ":" + this.port);
  socket.onopen = function() { connection.handleOpen() };
  socket.onmessage = function(message) { connection.handleData(message.data) };
  socket.onclose = function() { connection.handleClose() };
  return socket;
}

Connection.prototype.teardownSocket = function() {
  this.socket.close();
  delete this.socket;
  delete this.protocol;
}

Connection.prototype.startHeartbeat = function() {
  if (this.heartbeatTimer) return;
  if (!this.protocol.sendHeartbeat) return;
  var connection = this;
  var propertyName = null;
  if (typeof document.hidden !== "undefined") {
    propertyName = "hidden";
  } else if (typeof document.mozHidden !== "undefined") {
    propertyName = "mozHidden";
  } else if (typeof document.msHidden !== "undefined") {
    propertyName = "msHidden";
  } else if (typeof document.webkitHidden !== "undefined") {
    propertyName = "webkitHidden";
  } else {
    propertyName = "hidden";
  }

  var windowVisible = true;

  var focusListener = window.addEventListener('focus', function(e) { windowVisible = true; });
  var blurListener = window.addEventListener('blur', function(e) { windowVisible = false; });

  this.on('disconnect', function() {
    window.removeEventListener(focusListener);
    window.removeEventListener(blurListener);
  });

  this.heartbeatTimer = setInterval(function() {
    var isVisible = document[propertyName] === false;
    if (isVisible && windowVisible) {
      connection.sendHeartbeat();
    } else {
      connection.setHeartbeatState(false);
    }
  }, this.opts.heartbeatInterval);
}

},{"./base_connection":18}],14:[function(require,module,exports){
exports.UI = {
  Region: require("./ui/region").Region,
  Cursor: require("./ui/cursor").Cursor
};
},{"./ui/region":19,"./ui/cursor":20}],21:[function(require,module,exports){
var Pipeline = exports.Pipeline = function() {
  this.steps = [];
}

Pipeline.prototype.addStep = function(step) {
  this.steps.push(step);
}

Pipeline.prototype.run = function(frame) {
  var stepsLength = this.steps.length;
  for (var i = 0; i != stepsLength; i++) {
    if (!frame) break;
    frame = this.steps[i](frame);
  }
  return frame;
}

},{}],20:[function(require,module,exports){
var Cursor = exports.Cursor = function() {
  return function(frame) {
    var pointable = frame.pointables.sort(function(a, b) { return a.z - b.z })[0]
    if (pointable && pointable.valid) {
      frame.cursorPosition = pointable.tipPosition
    }
    return frame
  }
}

},{}],5:[function(require,module,exports){
var inNode = typeof(window) === 'undefined';

var Frame = require('./frame').Frame
  , CircularBuffer = require("./circular_buffer").CircularBuffer
  , Pipeline = require("./pipeline").Pipeline
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

/**
 * Constructs a Controller object.
 *
 * When creating a Controller object, you may optionally pass in options
 * to set the host , set the port, enable gestures, or select the frame event type.
 *
 * ```javascript
 * var controller = new Leap.Controller({
 *   host: '127.0.0.1',
 *   port: 6437,
 *   enableGestures: true,
 *   frameEventName: 'animationFrame'
 * });
 * ```
 *
 * @class Controller
 * @memberof Leap
 * @classdesc
 * The Controller class is your main interface to the Leap Motion Controller.
 *
 * Create an instance of this Controller class to access frames of tracking data
 * and configuration information. Frame data can be polled at any time using the
 * [Controller.frame]{@link Leap.Controller#frame}() function. Call frame() or frame(0) to get the most recent
 * frame. Set the history parameter to a positive integer to access previous frames.
 * A controller stores up to 60 frames in its frame history.
 *
 * Polling is an appropriate strategy for applications which already have an
 * intrinsic update loop, such as a game.
 */
var Controller = exports.Controller = function(opts) {
  this.opts = _.defaults(opts || {}, {
    frameEventName: this.useAnimationLoop() ? 'animationFrame' : 'connectionFrame'
  });
  this.history = new CircularBuffer(200);
  var controller = this;
  this.lastFrame = Frame.Invalid;
  this.lastValidFrame = Frame.Invalid;
  this.lastConnectionFrame = Frame.Invalid;
  var connectionType = this.opts.connectionType || this.connectionType();
  this.connection = new connectionType(this.opts);
  this.accumulatedGestures = [];
  this.connection.on('frame', function(frame) {
    if (frame.gestures) {
      controller.accumulatedGestures = controller.accumulatedGestures.concat(frame.gestures);
    }
    controller.processFrame(frame);
  });
  this.on(this.opts.frameEventName, function(frame) {
    controller.processFinishedFrame(frame);
  });

  // Delegate connection events
  this.connection.on('ready', function() { controller.emit('ready') });
  this.connection.on('connect', function() { controller.emit('connect') });
  this.connection.on('disconnect', function() { controller.emit('disconnect') });
  this.connection.on('focus', function() { controller.emit('focus') });
  this.connection.on('blur', function() { controller.emit('blur') });
}

Controller.prototype.inBrowser = function() {
  return !inNode;
}

Controller.prototype.useAnimationLoop = function() {
  return this.inBrowser() && typeof(chrome) === "undefined";
}

Controller.prototype.connectionType = function() {
  return (this.inBrowser() ? require('./connection') : require('./node_connection')).Connection;
}

Controller.prototype.connect = function() {
  var controller = this;
  if (this.connection.connect() && this.inBrowser()) {
    var callback = function() {
      controller.emit('animationFrame', controller.lastConnectionFrame);
      if (controller.opts.supressAnimationLoop !== true) window.requestAnimFrame(callback);
    }
    if (controller.opts.supressAnimationLoop !== true) {
      window.requestAnimFrame(callback);
    };
  }
}

Controller.prototype.disconnect = function() {
  this.connection.disconnect();
}

/**
 * Returns a frame of tracking data from the Leap.
 *
 * Use the optional history parameter to specify which frame to retrieve.
 * Call frame() or frame(0) to access the most recent frame; call frame(1) to
 * access the previous frame, and so on. If you use a history value greater
 * than the number of stored frames, then the controller returns an invalid frame.
 *
 * @method frame
 * @memberof Leap.Controller.prototype
 * @param {Number} history The age of the frame to return, counting backwards from
 * the most recent frame (0) into the past and up to the maximum age (59).
 * @returns {Leap.Frame} The specified frame; or, if no history
 * parameter is specified, the newest frame. If a frame is not available at
 * the specified history position, an invalid Frame is returned.
 */
Controller.prototype.frame = function(num) {
  return this.history.get(num) || Frame.Invalid;
}

Controller.prototype.loop = function(callback) {
  switch (callback.length) {
    case 1:
      this.on(this.opts.frameEventName, callback);
      break;
    case 2:
      var controller = this;
      var scheduler = null;
      var immediateRunnerCallback = function(frame) {
        callback(frame, function() {
          if (controller.lastFrame != frame) {
            immediateRunnerCallback(controller.lastFrame);
          } else {
            controller.once(controller.opts.frameEventName, immediateRunnerCallback);
          }
        });
      }
      this.once(this.opts.frameEventName, immediateRunnerCallback);
      break;
  }
  this.connect();
}

Controller.prototype.addStep = function(step) {
  if (!this.pipeline) this.pipeline = new Pipeline(this);
  this.pipeline.addStep(step);
}

Controller.prototype.processFrame = function(frame) {
  if (this.pipeline) {
    frame = this.pipeline.run(frame);
    if (!frame) frame = Frame.Invalid;
  }
  this.lastConnectionFrame = frame;
  this.emit('connectionFrame', frame);
}

Controller.prototype.processFinishedFrame = function(frame) {
  this.lastFrame = frame;
  if (frame.valid) {
    this.lastValidFrame = frame;
  }
  if (frame.gestures) {
    frame.gestures = this.accumulatedGestures;
    this.accumulatedGestures = [];
  }
  frame.controller = this;
  frame.historyIdx = this.history.push(frame);
  this.emit('frame', frame);
}

_.extend(Controller.prototype, EventEmitter.prototype);

},{"events":16,"./node_connection":17,"./frame":6,"./circular_buffer":13,"./pipeline":21,"./connection":12,"underscore":22}],6:[function(require,module,exports){
var Hand = require("./hand").Hand
  , Pointable = require("./pointable").Pointable
  , Gesture = require("./gesture").Gesture
  , Vector = require("./vector").Vector
  , Matrix = require("./matrix").Matrix
  , _ = require("underscore");

/**
 * Constructs a Frame object.
 *
 * Frame instances created with this constructor are invalid.
 * Get valid Frame objects by calling the
 * [Controller.frame]{@link Leap.Controller#frame}() function.
 *
 * @class Frame
 * @memberof Leap
 * @classdesc
 * The Frame class represents a set of hand and finger tracking data detected
 * in a single frame.
 *
 * The Leap detects hands, fingers and tools within the tracking area, reporting
 * their positions, orientations and motions in frames at the Leap frame rate.
 *
 * Access Frame objects using the [Controller.frame]{@link Leap.Controller#frame}() function.
 */
var Frame = exports.Frame = function(data) {
  /**
   * Reports whether this Frame instance is valid.
   *
   * A valid Frame is one generated by the Controller object that contains
   * tracking data for all detected entities. An invalid Frame contains no
   * actual tracking data, but you can call its functions without risk of a
   * undefined object exception. The invalid Frame mechanism makes it more
   * convenient to track individual data across the frame history. For example,
   * you can invoke:
   *
   * ```javascript
   * var finger = controller.frame(n).finger(fingerID);
   * ```
   *
   * for an arbitrary Frame history value, "n", without first checking whether
   * frame(n) returned a null object. (You should still check that the
   * returned Finger instance is valid.)
   *
   * @member valid
   * @memberof Leap.Frame.prototype
   * @type {Boolean}
   */
  this.valid = true;
  /**
   * A unique ID for this Frame. Consecutive frames processed by the Leap
   * have consecutive increasing values.
   * @member id
   * @memberof Leap.Frame.prototype
   * @type {String}
   */
  this.id = data.id;
  /**
   * The frame capture time in microseconds elapsed since the Leap started.
   * @member timestamp
   * @memberof Leap.Frame.prototype
   * @type {Number}
   */
  this.timestamp = data.timestamp;
  /**
   * The list of Hand objects detected in this frame, given in arbitrary order.
   * The list can be empty if no hands are detected.
   *
   * @member hands[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Hand}
   */
  this.hands = [];
  this.handsMap = {};
  /**
   * The list of Pointable objects (fingers and tools) detected in this frame,
   * given in arbitrary order. The list can be empty if no fingers or tools are
   * detected.
   *
   * @member pointables[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Pointable}
   */
  this.pointables = [];
  /**
   * The list of Tool objects detected in this frame, given in arbitrary order.
   * The list can be empty if no tools are detected.
   *
   * @member tools[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Pointable}
   */
  this.tools = [];
  /**
   * The list of Finger objects detected in this frame, given in arbitrary order.
   * The list can be empty if no fingers are detected.
   * @member fingers[]
   * @memberof Leap.Frame.prototype
   * @type {Leap.Pointable}
   */

  this.fingers = [];
  this.gestures = [];
  this.pointablesMap = {};
  this._translation = new Vector(data.t);
  this.rotation = new Matrix(data.r);
  this._scaleFactor = data.s;
  this.data = data;
  this.type = 'frame'; // used by event emitting
  var handMap = {};
  for (var handIdx = 0, handCount = data.hands.length; handIdx != handCount; handIdx++) {
    var hand = new Hand(data.hands[handIdx]);
    hand.frame = this;
    this.hands.push(hand);
    this.handsMap[hand.id] = hand;
    handMap[hand.id] = handIdx;
  }
  for (var pointableIdx = 0, pointableCount = data.pointables.length; pointableIdx != pointableCount; pointableIdx++) {
    var pointable = new Pointable(data.pointables[pointableIdx]);
    pointable.frame = this;
    this.pointables.push(pointable);
    this.pointablesMap[pointable.id] = pointable;
    (pointable.tool ? this.tools : this.fingers).push(pointable);
    if (pointable.handId && handMap.hasOwnProperty(pointable.handId)) {
      var hand = this.hands[handMap[pointable.handId]];
      hand.pointables.push(pointable);
      (pointable.tool ? hand.tools : hand.fingers).push(pointable);
    }
  }

  if (data.gestures) {
   /**
    * The list of Gesture objects detected in this frame, given in arbitrary order.
    * The list can be empty if no gestures are detected.
    *
    * Circle and swipe gestures are updated every frame. Tap gestures
    * only appear in the list for a single frame.
    * @member gestures[]
    * @memberof Leap.Frame.prototype
    * @type {Leap.Gesture}
    */
    for (var gestureIdx = 0, gestureCount = data.gestures.length; gestureIdx != gestureCount; gestureIdx++) {
      this.gestures.push(Gesture(data.gestures[gestureIdx]));
    }
  }
}

/**
 * The tool with the specified ID in this frame.
 *
 * Use the Frame tool() function to retrieve a tool from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Pointable object, but if no tool
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a tool is lost and subsequently
 * regained, the new Pointable object representing that tool may have a
 * different ID than that representing the tool in an earlier frame.
 *
 * @method tool
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a Tool object from a previous frame.
 * @returns {Leap.Pointable} The tool with the
 * matching ID if one exists in this frame; otherwise, an invalid Pointable object
 * is returned.
 */
Frame.prototype.tool = function(id) {
  var pointable = this.pointable(id);
  return pointable.tool ? pointable : Pointable.Invalid;
}

/**
 * The Pointable object with the specified ID in this frame.
 *
 * Use the Frame pointable() function to retrieve the Pointable object from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Pointable object, but if no finger or tool
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a finger or tool is lost and subsequently
 * regained, the new Pointable object representing that finger or tool may have
 * a different ID than that representing the finger or tool in an earlier frame.
 *
 * @method pointable
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a Pointable object from a previous frame.
 * @returns {Leap.Pointable} The Pointable object with
 * the matching ID if one exists in this frame;
 * otherwise, an invalid Pointable object is returned.
 */
Frame.prototype.pointable = function(id) {
  return this.pointablesMap[id] || Pointable.Invalid;
}

/**
 * The finger with the specified ID in this frame.
 *
 * Use the Frame finger() function to retrieve the finger from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Finger object, but if no finger
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a finger is lost and subsequently
 * regained, the new Pointable object representing that physical finger may have
 * a different ID than that representing the finger in an earlier frame.
 *
 * @method finger
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a finger from a previous frame.
 * @returns {Leap.Pointable} The finger with the
 * matching ID if one exists in this frame; otherwise, an invalid Pointable
 * object is returned.
 */
Frame.prototype.finger = function(id) {
  var pointable = this.pointable(id);
  return !pointable.tool ? pointable : Pointable.Invalid;
}

/**
 * The Hand object with the specified ID in this frame.
 *
 * Use the Frame hand() function to retrieve the Hand object from
 * this frame using an ID value obtained from a previous frame.
 * This function always returns a Hand object, but if no hand
 * with the specified ID is present, an invalid Hand object is returned.
 *
 * Note that ID values persist across frames, but only until tracking of a
 * particular object is lost. If tracking of a hand is lost and subsequently
 * regained, the new Hand object representing that physical hand may have
 * a different ID than that representing the physical hand in an earlier frame.
 *
 * @method hand
 * @memberof Leap.Frame.prototype
 * @param {String} id The ID value of a Hand object from a previous frame.
 * @returns {Leap.Hand} The Hand object with the matching
 * ID if one exists in this frame; otherwise, an invalid Hand object is returned.
 */
Frame.prototype.hand = function(id) {
  return this.handsMap[id] || Hand.Invalid;
}

/**
 * The angle of rotation around the rotation axis derived from the overall 
 * rotational motion between the current frame and the specified frame.
 * 
 * The returned angle is expressed in radians measured clockwise around 
 * the rotation axis (using the right-hand rule) between the start and end frames. 
 * The value is always between 0 and pi radians (0 and 180 degrees).
 * 
 * The Leap derives frame rotation from the relative change in position and 
 * orientation of all objects detected in the field of view.
 * 
 * If either this frame or sinceFrame is an invalid Frame object, then the 
 * angle of rotation is zero.
 * 
 * @method rotationAngle
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @param {Leap.Vector} [axis] The axis to measure rotation around.
 * @returns {Number} A positive value containing the heuristically determined 
 * rotational change between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.rotationAngle = function(sinceFrame, axis){
  if (!this.valid || !sinceFrame.valid) return 0.0;
  var rot = this.rotationMatrix(sinceFrame);
  var cs = (rot[0][0] + rot[1][1] + rot[2][2] - 1.0)*0.5
  var angle = Math.acos(cs);
  angle = isNaN(angle) ? 0.0 : angle;

  if(axis){
    var rotAxis = this.rotationAxis(sinceFrame);
    angle *= rotAxis.dot(axis.normalized());
  }

  return angle;
}

/**
 * The axis of rotation derived from the overall rotational motion between 
 * the current frame and the specified frame.
 * 
 * The returned direction vector is normalized.
 * 
 * The Leap derives frame rotation from the relative change in position and 
 * orientation of all objects detected in the field of view.
 * 
 * If either this frame or sinceFrame is an invalid Frame object, or if no 
 * rotation is detected between the two frames, a zero vector is returned.
 * 
 * @method rotationAxis
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {Leap.Vector} A normalized direction Vector representing the axis of the heuristically determined 
 * rotational change between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.rotationAxis = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return Vector.zero();
  var x = this.rotation[2][1] - sinceFrame.rotation[1][2];
  var y = this.rotation[0][2] - sinceFrame.rotation[2][0];
  var z = this.rotation[1][0] - sinceFrame.rotation[0][1];
  var vec = new Vector([x, y, z]);
  return vec.normalized();
}

/**
 * The transform matrix expressing the rotation derived from the overall 
 * rotational motion between the current frame and the specified frame.
 * 
 * The Leap derives frame rotation from the relative change in position and 
 * orientation of all objects detected in the field of view.
 * 
 * If either this frame or sinceFrame is an invalid Frame object, then 
 * this method returns an identity matrix.
 * 
 * @method rotationMatrix
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {Leap.Matrix} A transformation Matrix containing the heuristically determined 
 * rotational change between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.rotationMatrix = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return Matrix.identity();
  var xBasis = new Vector([this.rotation[0][0], this.rotation[1][0], this.rotation[2][0]]);
  var yBasis = new Vector([this.rotation[0][1], this.rotation[1][1], this.rotation[2][1]]);
  var zBasis = new Vector([this.rotation[0][2], this.rotation[1][2], this.rotation[2][2]]);
  var transpose = new Matrix([xBasis, yBasis, zBasis]);
  return sinceFrame.rotation.times(transpose);
}

/**
 * The scale factor derived from the overall motion between the current frame and the specified frame.
 * 
 * The scale factor is always positive. A value of 1.0 indicates no scaling took place. 
 * Values between 0.0 and 1.0 indicate contraction and values greater than 1.0 indicate expansion.
 * 
 * The Leap derives scaling from the relative inward or outward motion of all 
 * objects detected in the field of view (independent of translation and rotation).
 * 
 * If either this frame or sinceFrame is an invalid Frame object, then this method returns 1.0.
 * 
 * @method scaleFactor
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative scaling.
 * @returns {Number} A positive value representing the heuristically determined 
 * scaling change ratio between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.scaleFactor = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return 1.0;
  return Math.exp(this._scaleFactor - sinceFrame._scaleFactor);
}

/**
 * The change of position derived from the overall linear motion between the 
 * current frame and the specified frame.
 * 
 * The returned translation vector provides the magnitude and direction of the 
 * movement in millimeters.
 * 
 * The Leap derives frame translation from the linear motion of all objects 
 * detected in the field of view.
 * 
 * If either this frame or sinceFrame is an invalid Frame object, then this 
 * method returns a zero vector.
 * 
 * @method translation
 * @memberof Leap.Frame.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative translation.
 * @returns {Leap.Vector} A Vector representing the heuristically determined change in 
 * position of all objects between the current frame and that specified in the sinceFrame parameter.
 */
Frame.prototype.translation = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return Vector.zero();
  var x = this._translation[0] - sinceFrame._translation[0];
  var y = this._translation[1] - sinceFrame._translation[1];
  var z = this._translation[2] - sinceFrame._translation[2];
  return new Vector([x, y, z]);
}

/**
 * A string containing a brief, human readable description of the Frame object.
 *
 * @method toString
 * @memberof Leap.Frame.prototype
 * @returns {String} A brief description of this frame.
 */
Frame.prototype.toString = function() {
  var str = "Frame [ id:"+this.id+" | timestamp:"+this.timestamp+" | Hand count:("+this.hands.length+") | Pointable count:("+this.pointables.length+")";
  if (this.gestures) str += " | Gesture count:("+this.gestures.length+")";
  str += " ]";
  return str;
}

/**
 * Returns a JSON-formatted string containing the hands, pointables and gestures
 * in this frame.
 *
 * @method dump
 * @memberof Leap.Frame.prototype
 * @returns {String} A JSON-formatted string.
 */
Frame.prototype.dump = function() {
  var out = '';
  out += "Frame Info:<br/>";
  out += this.toString();
  out += "<br/><br/>Hands:<br/>"
  for (var handIdx = 0, handCount = this.hands.length; handIdx != handCount; handIdx++) {
    out += "  "+ this.hands[handIdx].toString() + "<br/>";
  }
  out += "<br/><br/>Pointables:<br/>";
  for (var pointableIdx = 0, pointableCount = this.pointables.length; pointableIdx != pointableCount; pointableIdx++) {
      out += "  "+ this.pointables[pointableIdx].toString() + "<br/>";
  }
  if (this.gestures) {
    out += "<br/><br/>Gestures:<br/>";
    for (var gestureIdx = 0, gestureCount = this.gestures.length; gestureIdx != gestureCount; gestureIdx++) {
        out += "  "+ this.gestures[gestureIdx].toString() + "<br/>";
    }
  }
  out += "<br/><br/>Raw JSON:<br/>";
  out += JSON.stringify(this.data);
  return out;
}

/**
 * An invalid Frame object.
 *
 * You can use this invalid Frame in comparisons testing
 * whether a given Frame instance is valid or invalid. (You can also check the
 * [Frame.valid]{@link Leap.Frame#valid} property.)
 *
 * @static
 * @type {Leap.Frame}
 * @name Invalid
 * @memberof Leap.Frame
 */
Frame.Invalid = {
  valid: false,
  hands: [],
  fingers: [],
  tools: [],
  gestures: [],
  pointables: [],
  pointable: function() { return Pointable.Invalid },
  finger: function() { return Pointable.Invalid },
  hand: function() { return Hand.Invalid },
  toString: function() { return "invalid frame" },
  dump: function() { return this.toString() }
}

},{"./hand":8,"./pointable":9,"./gesture":7,"./vector":10,"./matrix":11,"underscore":22}],8:[function(require,module,exports){
var Pointable = require("./pointable").Pointable
  , Vector = require("./vector").Vector
  , Matrix = require("./matrix").Matrix
  , _ = require("underscore");

/**
 * Constructs a Hand object.
 *
 * An uninitialized hand is considered invalid.
 * Get valid Hand objects from a Frame object.
 * @class Hand
 * @memberof Leap
 * @classdesc
 * The Hand class reports the physical characteristics of a detected hand.
 *
 * Hand tracking data includes a palm position and velocity; vectors for
 * the palm normal and direction to the fingers; properties of a sphere fit
 * to the hand; and lists of the attached fingers and tools.
 *
 * Note that Hand objects can be invalid, which means that they do not contain
 * valid tracking data and do not correspond to a physical entity. Invalid Hand
 * objects can be the result of asking for a Hand object using an ID from an
 * earlier frame when no Hand objects with that ID exist in the current frame.
 * A Hand object created from the Hand constructor is also invalid.
 * Test for validity with the [Hand.valid]{@link Leap.Hand#valid} property.
 */
var Hand = exports.Hand = function(data) {
  /**
   * A unique ID assigned to this Hand object, whose value remains the same
   * across consecutive frames while the tracked hand remains visible. If
   * tracking is lost (for example, when a hand is occluded by another hand
   * or when it is withdrawn from or reaches the edge of the Leap field of view),
   * the Leap may assign a new ID when it detects the hand in a future frame.
   *
   * Use the ID value with the {@link Frame.hand}() function to find this
   * Hand object in future frames.
   *
   * @member id
   * @memberof Leap.Hand.prototype
   * @type {String}
   */
  this.id = data.id;
  /**
   * The center position of the palm in millimeters from the Leap origin.
   * @member palmPosition
   * @memberof Leap.Hand.prototype
   * @type {Leap.Vector}
   */
  this.palmPosition = new Vector(data.palmPosition);
  /**
   * The direction from the palm position toward the fingers.
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the directed line from the palm position to the fingers.
   *
   * @member direction
   * @memberof Leap.Hand.prototype
   * @type {Leap.Vector}
   */
  this.direction = new Vector(data.direction);
  /**
   * The rate of change of the palm position in millimeters/second.
   *
   * @member palmVeclocity
   * @memberof Leap.Hand.prototype
   * @type {Leap.Vector}
   */
  this.palmVelocity = new Vector(data.palmVelocity);
  /**
   * The normal vector to the palm. If your hand is flat, this vector will
   * point downward, or "out" of the front surface of your palm.
   *
   * ![Palm Vectors](images/Leap_Palm_Vectors.png)
   *
   * The direction is expressed as a unit vector pointing in the same
   * direction as the palm normal (that is, a vector orthogonal to the palm).
   * @member palmNormal
   * @memberof Leap.Hand.prototype
   * @type {Leap.Vector}
   */
  this.palmNormal = new Vector(data.palmNormal);
  /**
   * The center of a sphere fit to the curvature of this hand.
   *
   * This sphere is placed roughly as if the hand were holding a ball.
   *
   * ![Hand Ball](images/Leap_Hand_Ball.png)
   * @member sphereCenter
   * @memberof Leap.Hand.prototype
   * @type {Leap.Vector}
   */
  this.sphereCenter = new Vector(data.sphereCenter);
  /**
   * The radius of a sphere fit to the curvature of this hand, in millimeters.
   *
   * This sphere is placed roughly as if the hand were holding a ball. Thus the
   * size of the sphere decreases as the fingers are curled into a fist.
   *
   * @member sphereRadius
   * @memberof Leap.Hand.prototype
   * @type {Number}
   */
  this.sphereRadius = data.sphereRadius;
  /**
   * Reports whether this is a valid Hand object.
   *
   * @member valid
   * @memberof Leap.Hand.prototype
   * @type {Boolean}
   */
  this.valid = true;
  /**
   * The list of Pointable objects (fingers and tools) detected in this frame
   * that are associated with this hand, given in arbitrary order. The list
   * can be empty if no fingers or tools associated with this hand are detected.
   *
   * Use the {@link Pointable} tool property to determine
   * whether or not an item in the list represents a tool or finger.
   * You can also get only the tools using the Hand.tools[] list or
   * only the fingers using the Hand.fingers[] list.
   *
   * @member pointables[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable}
   */
  this.pointables = [];
  /**
   * The list of fingers detected in this frame that are attached to
   * this hand, given in arbitrary order.
   *
   * The list can be empty if no fingers attached to this hand are detected.
   *
   * @member fingers[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable}
   */
  this.fingers = [];
  /**
   * The list of tools detected in this frame that are held by this
   * hand, given in arbitrary order.
   *
   * The list can be empty if no tools held by this hand are detected.
   *
   * @member tools[]
   * @memberof Leap.Hand.prototype
   * @type {Leap.Pointable}
   */
  this.tools = [];
  this._translation = new Vector(data.t);
  this.rotation = new Matrix(data.r);
  this._scaleFactor = data.s;
}

/**
 * The finger with the specified ID attached to this hand.
 *
 * Use this function to retrieve a Pointable object representing a finger
 * attached to this hand using an ID value obtained from a previous frame.
 * This function always returns a Pointable object, but if no finger
 * with the specified ID is present, an invalid Pointable object is returned.
 *
 * Note that the ID values assigned to fingers persist across frames, but only
 * until tracking of a particular finger is lost. If tracking of a finger is
 * lost and subsequently regained, the new Finger object representing that
 * finger may have a different ID than that representing the finger in an
 * earlier frame.
 *
 * @method finger
 * @memberof Leap.Hand.prototype
 * @param {String} id The ID value of a finger from a previous frame.
 * @returns {Leap.Pointable} The Finger object with
 * the matching ID if one exists for this hand in this frame; otherwise, an
 * invalid Finger object is returned.
 */
Hand.prototype.finger = function(id) {
  var finger = this.frame.finger(id);
  return (finger && finger.handId == this.id) ? finger : Pointable.Invalid;
}

/**
 * The angle of rotation around the rotation axis derived from the change in 
 * orientation of this hand, and any associated fingers and tools, between the 
 * current frame and the specified frame.
 * 
 * The returned angle is expressed in radians measured clockwise around the 
 * rotation axis (using the right-hand rule) between the start and end frames. 
 * The value is always between 0 and pi radians (0 and 180 degrees).
 * 
 * If a corresponding Hand object is not found in sinceFrame, or if either 
 * this frame or sinceFrame are invalid Frame objects, then the angle of rotation is zero.
 * 
 * @method rotationAngle
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @param {Leap.Vector} [axis] The axis to measure rotation around.
 * @returns {Number} A positive value representing the heuristically determined 
 * rotational change of the hand between the current frame and that specified in 
 * the sinceFrame parameter.
 */
Hand.prototype.rotationAngle = function(sinceFrame, axis){
  if (!this.valid || !sinceFrame.valid) return 0.0;
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return 0.0;
  
  var rot = this.rotationMatrix(sinceFrame);
  var cs = (rot[0][0] + rot[1][1] + rot[2][2] - 1.0)*0.5
  var angle = Math.acos(cs);
  angle = isNaN(angle) ? 0.0 : angle;

  if(axis){
    var rotAxis = this.rotationAxis(sinceFrame);
    angle *= rotAxis.dot(axis.normalized());
  }

  return angle;
}

/**
 * The axis of rotation derived from the change in orientation of this hand, and 
 * any associated fingers and tools, between the current frame and the specified frame.
 * 
 * The returned direction vector is normalized.
 * 
 * If a corresponding Hand object is not found in sinceFrame, or if either 
 * this frame or sinceFrame are invalid Frame objects, then this method returns a zero vector.
 * 
 * @method rotationAxis
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {Leap.Vector} A normalized direction Vector representing the axis of the heuristically determined 
 * rotational change of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.rotationAxis = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return Vector.zero();
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return Vector.zero();
  
  var x = this.rotation[2][1] - sinceHand.rotation[1][2];
  var y = this.rotation[0][2] - sinceHand.rotation[2][0];
  var z = this.rotation[1][0] - sinceHand.rotation[0][1];
  var vec = new Vector([x, y, z]);
  return vec.normalized();
}

/**
 * The transform matrix expressing the rotation derived from the change in 
 * orientation of this hand, and any associated fingers and tools, between 
 * the current frame and the specified frame.
 * 
 * If a corresponding Hand object is not found in sinceFrame, or if either 
 * this frame or sinceFrame are invalid Frame objects, then this method returns 
 * an identity matrix.
 * 
 * @method rotationMatrix
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative rotation.
 * @returns {Leap.Matrix} A transformation Matrix containing the heuristically determined 
 * rotational change of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.rotationMatrix = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return Matrix.identity();
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return Matrix.identity();
  
  var xBasis = new Vector([this.rotation[0][0], this.rotation[1][0], this.rotation[2][0]]);
  var yBasis = new Vector([this.rotation[0][1], this.rotation[1][1], this.rotation[2][1]]);
  var zBasis = new Vector([this.rotation[0][2], this.rotation[1][2], this.rotation[2][2]]);
  var transpose = new Matrix([xBasis, yBasis, zBasis]);
  return sinceHand.rotation.times(transpose);
}

/**
 * The scale factor derived from the hand's motion between the current frame and the specified frame.
 * 
 * The scale factor is always positive. A value of 1.0 indicates no scaling took place. 
 * Values between 0.0 and 1.0 indicate contraction and values greater than 1.0 indicate expansion.
 * 
 * The Leap derives scaling from the relative inward or outward motion of a hand 
 * and its associated fingers and tools (independent of translation and rotation).
 * 
 * If a corresponding Hand object is not found in sinceFrame, or if either this frame or sinceFrame 
 * are invalid Frame objects, then this method returns 1.0.
 * 
 * @method scaleFactor
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative scaling.
 * @returns {Number} A positive value representing the heuristically determined 
 * scaling change ratio of the hand between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.scaleFactor = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return 1.0;
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return 1.0;
  
  return Math.exp(this._scaleFactor - sinceHand._scaleFactor);
}

/**
 * The change of position of this hand between the current frame and the specified frame
 * 
 * The returned translation vector provides the magnitude and direction of the 
 * movement in millimeters.
 * 
 * If a corresponding Hand object is not found in sinceFrame, or if either this frame or 
 * sinceFrame are invalid Frame objects, then this method returns a zero vector.
 * 
 * @method translation
 * @memberof Leap.Hand.prototype
 * @param {Leap.Frame} sinceFrame The starting frame for computing the relative translation.
 * @returns {Leap.Vector} A Vector representing the heuristically determined change in hand 
 * position between the current frame and that specified in the sinceFrame parameter.
 */
Hand.prototype.translation = function(sinceFrame){
  if (!this.valid || !sinceFrame.valid) return Vector.zero();
  var sinceHand = sinceFrame.hand(this.id);
  if(!sinceHand.valid) return Vector.zero();
  
  var x = this._translation[0] - sinceHand._translation[0];
  var y = this._translation[1] - sinceHand._translation[1];
  var z = this._translation[2] - sinceHand._translation[2];
  return new Vector([x, y, z]);
}

/**
 * A string containing a brief, human readable description of the Hand object.
 * @method toString
 * @memberof Leap.Hand.prototype
 * @returns {String} A description of the Hand as a string.
 */
Hand.prototype.toString = function() {
  return "Hand [ id: "+ this.id + " | palm velocity:"+this.palmVelocity+" | sphere center:"+this.sphereCenter+" ] ";
}

/**
 * An invalid Hand object.
 *
 * You can use an invalid Hand object in comparisons testing
 * whether a given Hand instance is valid or invalid. (You can also use the
 * Hand valid property.)
 *
 * @static
 * @type {Leap.Hand}
 * @name Invalid
 * @memberof Leap.Hand
 */
Hand.Invalid = { valid: false };

},{"./pointable":9,"./vector":10,"./matrix":11,"underscore":22}],10:[function(require,module,exports){
var _ = require('underscore');

/**
 * Constructs a Vector object.
 *
 * Creates a new Vector from the specified Array or Vector. 
 * The default constructor sets all components to zero.
 *
 * @class Vector
 * @memberof Leap
 * @classdesc
 * The Vector object represents a three-component mathematical vector or point 
 * such as a direction or position in three-dimensional space.
 * 
 * The Leap software employs a right-handed Cartesian coordinate system. 
 * Values given are in units of real-world millimeters. The origin is 
 * centered at the center of the Leap device. The x- and z-axes lie in the 
 * horizontal plane, with the x-axis running parallel to the long edge of 
 * the device. The y-axis is vertical, with positive values increasing upwards 
 * (in contrast to the downward orientation of most computer graphics 
 * coordinate systems). The z-axis has positive values increasing away from the 
 * computer screen.
 */
var Vector = exports.Vector = function(data){
	
	if(data == null){
		this[0] = 0;
		this[1] = 0;
		this[2] = 0;
	}
	else if("x" in data){
		this[0] = data[0];
		this[1] = data[1];
		this[2] = data[2];
	}
	else if("0" in data){
		this[0] = (typeof(data[0]) == "number")?data[0]:0;
		this[1] = (typeof(data[1]) == "number")?data[1]:0;
		this[2] = (typeof(data[2]) == "number")?data[2]:0;
	}
	
	this.length = 3;
	/**
	 * The horizontal component.
	 * @member x
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	/**
	 * The horizontal component.
	 * @member [0]
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	this.x = this[0];
	/**
	 * The vertical component.
	 * @member y
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	/**
	 * The vertical component.
	 * @member [1]
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	this.y = this[1];
	/**
	 * The depth component.
	 * @member z
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	/**
	 * The depth component.
	 * @member [2]
	 * @memberof Leap.Vector.prototype
	 * @type {Float}
	 */
	this.z = this[2];
};

var VectorPrototype = {
	/**
	 * The angle between this vector and the specified vector in radians.
	 * 
	 * The angle is measured in the plane formed by the two vectors. 
	 * The angle returned is always the smaller of the two conjugate angles. 
	 * Thus A.angleTo(B) == B.angleTo(A) and is always a positive value less 
	 * than or equal to pi radians (180 degrees).
	 * 
	 * If either vector has zero length, then this function returns zero.
	 * 
	 * ![Vector AngleTo](images/Math_AngleTo.png)
	 * 
	 * @method AngleTo
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Float} The angle between this vector and the specified 
	 * vector in radians. 
	 */
	angleTo : function(other){
		var denom = this.magnitude()*other.magnitude();
		if(denom > 0) return Math.acos(this.dot(other)/denom);
		else return 0;
	},
	
	/**
	 * The cross product of this vector and the specified vector.
	 * 
	 * The cross product is a vector orthogonal to both original vectors. 
	 * It has a magnitude equal to the area of a parallelogram having the 
	 * two vectors as sides. The direction of the returned vector is 
	 * determined by the right-hand rule. Thus A.cross(B) == -B.cross(A).
	 * 
	 * ![Vector Cross](images/Math_Cross.png)
	 * 
	 * @method Cross
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Leap.Vector} The cross product of this vector and the 
	 * specified vector. 
	 */
	cross : function(other){
		var x = this[1]*other[2] - other[1]*this[2];
		var y = this[0]*other[2] - other[0]*this[2];
		var z = this[0]*other[1] - other[0]*this[1];
		return new Vector([x,y,z]);
	},
	
	/**
	 * The distance between the point represented by this Vector object 
	 * and a point represented by the specified Vector object. 
	 * 
	 * @method distanceTo
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Float} The distance from this point to the specified point.
	 */
	distanceTo : function(other){
		return this.minus(other).magnitude();
	},
	
	/**
	 * The dot product of this vector with another vector.
	 * 
	 * The dot product is the magnitude of the projection of this vector onto 
	 * the specified vector.
	 * 
	 * ![Vector Dot](images/Math_Dot.png)
	 * 
	 * @method dot
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Float} The dot product of this vector and the specified vector.
	 */
	dot : function(other){
		return this[0]*other[0] + this[1]*other[1] + this[2]*other[2];
	},
	
	/**
	 * Add vectors component-wise.
	 * 
	 * @method plus
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Leap.Vector}
	 */
	plus : function(other){
		return new Vector([this[0] + other[0],this[1] + other[1],this[2] + other[2]]);
	},
	
	/**
	 * Subtract vectors component-wise.
	 * 
	 * @method minus
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Leap.Vector}
	 */
	minus : function(other){
		return new Vector([this[0] - other[0],this[1] - other[1],this[2] - other[2]]);
	},
	
	/**
	 * Multiply vector by a scalar.
	 * 
	 * @method multiply
	 * @memberof Leap.Vector.prototype
	 * @param {Float} scalar
	 * @returns {Leap.Vector}
	 */
	multiply : function(scalar){
		return new Vector([this[0]*scalar,this[1]*scalar,this[2]*scalar]);
	},
	
	/**
	 * Divide vector by a scalar.
	 * 
	 * @method dividedBy
	 * @memberof Leap.Vector.prototype
	 * @param {Float} scalar
	 * @returns {Leap.Vector}
	 */
	dividedBy : function(scalar){
		return new Vector([this[0]/scalar,this[1]/scalar,this[2]/scalar]);
	},
	
	/**
	 * The magnitude, or length, of this vector.
	 * 
	 * The magnitude is the L2 norm, or Euclidean distance between the 
	 * origin and the point represented by the (x, y, z) components of 
	 * this Vector object.
	 * 
	 * @method magnitude
	 * @memberof Leap.Vector.prototype
	 * @returns {Float} The length of this vector.
	 */
	magnitude : function(){
		return Math.sqrt(this.magnitudeSquared());
	},
	
	/**
	 * The square of the magnitude, or length, of this vector.
	 * 
	 * @method magnitudeSquared
	 * @memberof Leap.Vector.prototype
	 * @returns {Float} The square of the length of this vector. 
	 */
	magnitudeSquared : function(){
		return Math.pow(this[0],2) + Math.pow(this[1],2) + Math.pow(this[2],2);
	},
	
	/**
	 * A normalized copy of this vector.
	 * 
	 * A normalized vector has the same direction as the original 
	 * vector, but with a length of one.
	 * 
	 * @method normalized
	 * @memberof Leap.Vector.prototype
	 * @returns {Leap.Vector} A Vector object with a length of one, 
	 * pointing in the same direction as this Vector object. 
	 */
	normalized : function(){
		var magnitude = this.magnitude();
		if(magnitude > 0) return this.dividedBy(magnitude);
		else return new Vector();
	},
	
	/**
	 * The pitch angle in radians.
	 * 
	 * Pitch is the angle between the negative z-axis and the projection 
	 * of the vector onto the y-z plane. In other words, pitch represents 
	 * rotation around the x-axis. If the vector points upward, the 
	 * returned angle is between 0 and pi radians (180 degrees); if it 
	 * points downward, the angle is between 0 and -pi radians.
	 * 
	 * ![Vector Pitch](images/Math_Pitch_Angle.png)
	 * 
	 * @method pitch
	 * @memberof Leap.Vector.prototype
	 * @returns {Float} The angle of this vector above or below the 
	 * horizon (x-z plane). 
	 */
	pitch : function(){
		return Math.atan2(this[1], -this[2]);
	},
	
	/**
	 * The roll angle in radians.
	 * 
	 * Roll is the angle between the y-axis and the projection of 
	 * the vector onto the x-y plane. In other words, roll represents 
	 * rotation around the z-axis. If the vector points to the left 
	 * of the y-axis, then the returned angle is between 0 and pi 
	 * radians (180 degrees); if it points to the right, the angle is 
	 * between 0 and -pi radians.
	 * 
	 * ![Vector Roll](images/Math_Roll_Angle.png)
	 * 
	 * Use this function to get roll angle of the plane to which this 
	 * vector is a normal. For example, if this vector represents the 
	 * normal to the palm, then this function returns the tilt or roll 
	 * of the palm plane compared to the horizontal (x-z) plane.
	 * 
	 * @method roll
	 * @memberof Leap.Vector.prototype
	 * @returns {Float} The angle of this vector above or below the 
	 * horizon (x-z plane). 
	 */
	roll : function(){
		return Math.atan2(this[0], -this[1]);
	},
	
	/**
	 * The yaw angle in radians. 
	 * 
	 * Yaw is the angle between the negative z-axis and the projection 
	 * of the vector onto the x-z plane. In other words, yaw represents 
	 * rotation around the y-axis. If the vector points to the right 
	 * of the negative z-axis, then the returned angle is between 0 and 
	 * pi radians (180 degrees); if it points to the left, the angle 
	 * is between 0 and -pi radians.
	 * 
	 * ![Vector Roll](images/Math_Yaw_Angle.png)
	 * 
	 * @method yaw
	 * @memberof Leap.Vector.prototype
	 * @returns {Float} The angle of this vector to the right or left 
	 * of the negative z-axis. 
	 */
	yaw : function(){
		return Math.atan2(this[0], -this[2]);
	},
	
	/**
	 * Returns the vector as a float array.
	 * 
	 * @method toArray
	 * @memberof Leap.Vector.prototype
	 * @returns {Float[]}
	 */
	toArray : function(){
		return [this[0], this[1], this[2]];
	},
	
	/**
	 * Returns a string containing this vector in a human readable 
	 * format: (x, y, z). 
	 * 
	 * @method toString
	 * @memberof Leap.Vector.prototype
	 * @returns {String}
	 */
	toString : function(){
		return "{x:"+this[0]+",y:"+this[1]+",z:"+this[2]+"}";
	},
	
	toSource : function(){ this.toString(); },
	
	/**
	 * Compare Vector equality component-wise.
	 * 
	 * @method compare
	 * @memberof Leap.Vector.prototype
	 * @param {Leap.Vector} other A Vector object.
	 * @returns {Boolean}
	 */
	compare : function(other){
		return this[0]==other[0] && this[1]==other[1] && this[2]==other[2];
	},
	
	/**
	 * Returns true if all of the vector's components are finite.
	 *
	 * If any component is NaN or infinite, then this returns false.
	 * 
	 * @method isValid
	 * @memberof Leap.Vector.prototype
	 * @returns {Boolean}
	 */
	isValid : function(){
		return (this[0] != NaN && this[0] > -Infinity && this[0] < Infinity) &&
				 (this[1] != NaN && this[1] > -Infinity && this[1] < Infinity) &&
			   (this[2] != NaN && this[2] > -Infinity && this[2] < Infinity);
	}
};

Vector.prototype = new Array;
_.extend(Vector.prototype, VectorPrototype);

/**
 * The unit vector pointing backward along the positive z-axis: (0, 0, 1)
 *
 * @static
 * @type {Leap.Vector}
 * @name backward
 * @memberof Leap.Vector
 */
Vector.backward = function(){ return new Vector([0,0,1]); };
/**
 * The unit vector pointing down along the negative y-axis: (0, -1, 0) 
 *
 * @static
 * @type {Leap.Vector}
 * @name down
 * @memberof Leap.Vector
 */
Vector.down = function(){ return new Vector([0,-1,0]); };
/**
 * The unit vector pointing forward along the negative z-axis: (0, 0, -1) 
 *
 * @static
 * @type {Leap.Vector}
 * @name forward
 * @memberof Leap.Vector
 */
Vector.forward = function(){ return new Vector([0,0,-1]); };
/**
 * The unit vector pointing left along the negative x-axis: (-1, 0, 0) 
 *
 * @static
 * @type {Leap.Vector}
 * @name left
 * @memberof Leap.Vector
 */
Vector.left = function(){ return new Vector([-1,0,0]); };
/**
 * The unit vector pointing right along the positive x-axis: (1, 0, 0) 
 *
 * @static
 * @type {Leap.Vector}
 * @name right
 * @memberof Leap.Vector
 */
Vector.right = function(){ return new Vector([1,0,0]); };
/**
 * The unit vector pointing up along the positive y-axis: (0, 1, 0) 
 *
 * @static
 * @type {Leap.Vector}
 * @name up
 * @memberof Leap.Vector
 */
Vector.up = function(){ return new Vector([0,1,0]); };
/**
 * The x-axis unit vector: (1, 0, 0)
 *
 * @static
 * @type {Leap.Vector}
 * @name xAxis
 * @memberof Leap.Vector
 */
Vector.xAxis = function(){ return new Vector([1,0,0]); };
/**
 * The y-axis unit vector: (0, 1, 0)
 *
 * @static
 * @type {Leap.Vector}
 * @name yAxis
 * @memberof Leap.Vector
 */
Vector.yAxis = function(){ return new Vector([0,1,0]); };
/**
 * The z-axis unit vector: (0, 0, 1)
 *
 * @static
 * @type {Leap.Vector}
 * @name zAxis
 * @memberof Leap.Vector
 */
Vector.zAxis = function(){ return new Vector([0,0,1]); };
/**
 * The zero vector: (0, 0, 0)
 *
 * @static
 * @type {Leap.Vector}
 * @name zero
 * @memberof Leap.Vector
 */
Vector.zero = function(){ return new Vector([0,0,0]); };

},{"underscore":22}],11:[function(require,module,exports){
var Vector = require("./vector").Vector,
    _ = require('underscore');

/**
 * Constructs a Matrix object.
 *
 * Creates a new Matrix from the specified Array of Vectors or Matrix. 
 * The default constructor creates an identity matrix.
 *
 * @class Matrix
 * @memberof Leap
 * @classdesc
 * The Matrix object represents a transformation matrix. 
 * 
 * To use this object to transform a Vector, construct a matrix 
 * containing the desired transformation and then use the 
 * [Matrix.transformPoint]{@link Leap.Matrix#transformPoint}() or 
 * [Matrix.transformDirection]{@link Leap.Matrix#transformDirection}() functions 
 * to apply the transform.
 * 
 * Transforms can be combined by multiplying two or more transform 
 * matrices using the times function. 
 */
var Matrix = exports.Matrix = function(data){
	
	if(data instanceof Matrix){
		this[0] = new Vector(data.xBasis);
		this[1] = new Vector(data.yBasis);
		this[2] = new Vector(data.zBasis);
		this[3] = new Vector(data.origin);
	}
	else if(data instanceof Array){
		if(data[0] instanceof Vector && typeof(data[1]) == "number"){
			this.setRotation(data[0],data[1]);
			this[3] = new Vector(data[2]);
		}
		else{
			this[0] = new Vector(data[0]);
			this[1] = new Vector(data[1]);
			this[2] = new Vector(data[2]);
			this[3] = new Vector(data[3]);
		}
	}
	else{
		this[0] = new Vector([1,0,0]);
		this[1] = new Vector([0,1,0]);
		this[2] = new Vector([0,0,1]);
		this[3] = new Vector([0,0,0]);
	}
	
	this.length = 4;

	/**
	 * The rotation and scale factors for the x-axis.
	 * @member xBasis
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	/**
	 * The rotation and scale factors for the x-axis.
	 * @member [0]
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	this.xBasis = this[0];

	/**
	 * The rotation and scale factors for the y-axis.
	 * @member yBasis
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	/**
	 * The rotation and scale factors for the y-axis.
	 * @member [1]
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	this.yBasis = this[1];

	/**
	 * The rotation and scale factors for the z-axis.
	 * @member zBasis
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	/**
	 * The rotation and scale factors for the z-axis.
	 * @member [2]
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	this.zBasis = this[2];

	/**
	 * The translation factors for all three axes. 
	 * @member origin
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	/**
	 * The translation factors for all three axes. 
	 * @member [3]
	 * @memberof Leap.Matrix.prototype
	 * @type {Leap.Vector}
	 */
	this.origin = this[3];
};

var MatrixPrototype = {
	
	/**
	 * Sets this transformation matrix to represent a rotation around 
	 * the specified vector.
	 * 
	 * This function erases any previous rotation and scale transforms 
	 * applied to this matrix, but does not affect translation.
	 * 
	 * @method setRotation
	 * @memberof Leap.Matrix.prototype
	 * @param {Leap.Vector} _axis A Vector specifying the axis of rotation.
	 * @param {float} angleRadians The amount of rotation in radians. 
	 */
	setRotation : function(_axis, angle){
		var axis = _axis.normalized();
		var s = Math.sin(angle);
		var c = Math.cos(angle);
		var C = 1-c;
		
		this[0] = new Vector([axis[0]*axis[0]*C + c, axis[0]*axis[1]*C - axis[2]*s, axis[0]*axis[2]*C + axis[1]*s]);
		this[1] = new Vector([axis[1]*axis[0]*C + axis[2]*s, axis[1]*axis[1]*C + c, axis[1]*axis[2]*C - axis[0]*s]);
		this[2] = new Vector([axis[2]*axis[0]*C - axis[1]*s, axis[2]*axis[1]*C + axis[0]*s, axis[2]*axis[2]*C + c]);
	},
	
	/**
	 * Transforms a vector with this matrix by transforming its 
	 * rotation, scale, and translation. 
	 * 
	 * Translation is applied after rotation and scale.
	 * 
	 * @method transformPoint
	 * @memberof Leap.Matrix.prototype
	 * @param {Leap.Vector} in The Vector to transform.  
	 * @returns {Leap.Vector} A new Vector representing the transformed original.
	 */
	transformPoint : function(data){
		return this[3].plus(this.transformDirection(data));
	},

	/**
	 * Transforms a vector with this matrix by transforming its 
	 * rotation and scale only.
	 * 
	 * @method transformDirection
	 * @memberof Leap.Matrix.prototype
	 * @param {Leap.Vector} in The Vector to transform.  
	 * @returns {Leap.Vector} A new Vector representing the transformed original.
	 */
	transformDirection : function(data){
		var x = this[0].multiply(data[0]);
		var y = this[1].multiply(data[1]);
		var z = this[2].multiply(data[2]);
		return x.plus(y).plus(z);
	},
	
	/**
	 * Multiply transform matrices.
	 * 
	 * Combines two transformations into a single equivalent transformation.
	 * 
	 * @method times
	 * @memberof Leap.Matrix.prototype
	 * @param {Matrix} other A Matrix to multiply on the right hand side. 
	 * @returns {Leap.Matrix} A new Matrix representing the transformation 
	 * equivalent to applying the other transformation followed by this transformation.
	 */
	times : function(other){
		var x = this.transformDirection(other[0]);
		var y = this.transformDirection(other[1]);
		var z = this.transformDirection(other[2]);
		var o = this.transformPoint(other[3]);
		return new Matrix([x,y,z,o]);
	},
	
	/**
	 * Performs a matrix inverse if the matrix consists entirely of 
	 * rigid transformations (translations and rotations). 
	 * 
	 * If the matrix is not rigid, this operation will not represent an inverse.
	 * 
	 * Note that all matricies that are directly returned by the API are rigid.
	 * 
	 * @method rigidInverse
	 * @memberof Leap.Matrix.prototype
	 * @returns {Leap.Matrix} The rigid inverse of the matrix.
	 */
	rigidInverse : function(){
		var x = new Vector([this[0][0], this[1][0], this[2][0]]);
		var y = new Vector([this[0][1], this[1][1], this[2][1]]);
		var z = new Vector([this[0][2], this[1][2], this[2][2]]);
		var rotInverse = new Matrix([x,y,z]);
		rotInverse[3] = rotInverse.transformDirection(Vector.zero().minus(this[3]));
		return rotInverse;
	},
	
	/**
	 * Writes the 3x3 Matrix object to a 9 element row-major float array. 
	 * 
	 * Translation factors are discarded.
	 * 
	 * @method toArray3x3
	 * @memberof Leap.Matrix.prototype
	 * @returns {Array} The rotation Matrix as a flattened array.
	 */
	toArray3x3 : function(output){
		if(output == null) output = [];
		else output.length = 0;
		output[0] = this[0][0];
		output[1] = this[0][1];
		output[2] = this[0][2];
		output[3] = this[1][0];
		output[4] = this[1][1];
		output[5] = this[1][2];
		output[6] = this[2][0];
		output[7] = this[2][1];
		output[8] = this[2][2];
		return output;
	},
	
	/**
	 * Convert a 4x4 Matrix object to a 16 element row-major float array. 
	 * 
	 * Translation factors are discarded.
	 * 
	 * @method toArray4x4
	 * @memberof Leap.Matrix.prototype
	 * @returns {Array} The entire Matrix as a flattened array.
	 */
	toArray4x4 : function(output){
		if(output == null) output = [];
		else output.length = 0;
		output[0] = this[0][0];
		output[1] = this[0][1];
		output[2] = this[0][2];
		output[3] = 0;
		output[4] = this[1][0];
		output[5] = this[1][1];
		output[6] = this[1][2];
		output[7] = 0;
		output[8] = this[2][0];
		output[9] = this[2][1];
		output[10] = this[2][2];
		output[11] = 0;
		output[12] = this[3][0];
		output[13] = this[3][1];
		output[14] = this[3][2];
		output[15] = 1;
		return output;
	},
	
	/**
	 * Write the matrix to a string in a human readable format. 
	 * 
	 * @method toString
	 * @memberof Leap.Matrix.prototype
	 * @returns {String}
	 */
	toString : function(){
		return "{xBasis:"+this[0]+",yBasis:"+this[1]+
		",zBasis:"+this[2]+",origin:"+this[3]+"}";
	},
	
	toSource : function(){ this.toString(); },
	
	/**
	 * Compare Matrix equality component-wise. 
	 * 
	 * @method compare
	 * @memberof Leap.Matrix.prototype
	 * @returns {Boolean}
	 */
	compare : function(other){
		return this[0].compare(other[0]) && 
		this[1].compare(other[1]) && 
		this[2].compare(other[2]) && 
		this[3].compare(other[3]);
	}
};

Matrix.prototype = new Array;
_.extend(Matrix.prototype, MatrixPrototype);

/**
 * Returns the identity matrix specifying no translation, rotation, and scale.
 *
 * @static
 * @type {Leap.Matrix}
 * @name identity
 * @memberof Leap.Matrix
 */
Matrix.identity = function(){ return new Matrix(); };

},{"./vector":10,"underscore":22}],22:[function(require,module,exports){
(function(){//     Underscore.js 1.4.4
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      concat           = ArrayProto.concat,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.4.4';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? null : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        index : index,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index < right.index ? -1 : 1;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, value, context, behavior) {
    var result = {};
    var iterator = lookupIterator(value || _.identity);
    each(obj, function(value, index) {
      var key = iterator.call(context, value, index, obj);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key, value) {
      (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, value, context) {
    return group(obj, value, context, function(result, key) {
      if (!_.has(result, key)) result[key] = 0;
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(concat.apply(ArrayProto, arguments));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, l = list.length; i < l; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, l = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, l + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    var args = slice.call(arguments, 2);
    return function() {
      return func.apply(context, args.concat(slice.call(arguments)));
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
      previous = new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var values = [];
    for (var key in obj) if (_.has(obj, key)) values.push(obj[key]);
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var pairs = [];
    for (var key in obj) if (_.has(obj, key)) pairs.push([key, obj[key]]);
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    for (var key in obj) if (_.has(obj, key)) result[obj[key]] = key;
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] == null) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent, but `Object`s
      // from different frames are.
      var aCtor = a.constructor, bCtor = b.constructor;
      if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                               _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
        return false;
      }
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(n);
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '/': '&#x2F;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

})()
},{}],23:[function(require,module,exports){
var events = require('events');

exports.isArray = isArray;
exports.isDate = function(obj){return Object.prototype.toString.call(obj) === '[object Date]'};
exports.isRegExp = function(obj){return Object.prototype.toString.call(obj) === '[object RegExp]'};


exports.print = function () {};
exports.puts = function () {};
exports.debug = function() {};

exports.inspect = function(obj, showHidden, depth, colors) {
  var seen = [];

  var stylize = function(str, styleType) {
    // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
    var styles =
        { 'bold' : [1, 22],
          'italic' : [3, 23],
          'underline' : [4, 24],
          'inverse' : [7, 27],
          'white' : [37, 39],
          'grey' : [90, 39],
          'black' : [30, 39],
          'blue' : [34, 39],
          'cyan' : [36, 39],
          'green' : [32, 39],
          'magenta' : [35, 39],
          'red' : [31, 39],
          'yellow' : [33, 39] };

    var style =
        { 'special': 'cyan',
          'number': 'blue',
          'boolean': 'yellow',
          'undefined': 'grey',
          'null': 'bold',
          'string': 'green',
          'date': 'magenta',
          // "name": intentionally not styling
          'regexp': 'red' }[styleType];

    if (style) {
      return '\033[' + styles[style][0] + 'm' + str +
             '\033[' + styles[style][1] + 'm';
    } else {
      return str;
    }
  };
  if (! colors) {
    stylize = function(str, styleType) { return str; };
  }

  function format(value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (value && typeof value.inspect === 'function' &&
        // Filter out the util module, it's inspect function is special
        value !== exports &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      return value.inspect(recurseTimes);
    }

    // Primitive types cannot have properties
    switch (typeof value) {
      case 'undefined':
        return stylize('undefined', 'undefined');

      case 'string':
        var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                                 .replace(/'/g, "\\'")
                                                 .replace(/\\"/g, '"') + '\'';
        return stylize(simple, 'string');

      case 'number':
        return stylize('' + value, 'number');

      case 'boolean':
        return stylize('' + value, 'boolean');
    }
    // For some reason typeof null is "object", so special case here.
    if (value === null) {
      return stylize('null', 'null');
    }

    // Look up the keys of the object.
    var visible_keys = Object_keys(value);
    var keys = showHidden ? Object_getOwnPropertyNames(value) : visible_keys;

    // Functions without properties can be shortcutted.
    if (typeof value === 'function' && keys.length === 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        var name = value.name ? ': ' + value.name : '';
        return stylize('[Function' + name + ']', 'special');
      }
    }

    // Dates without properties can be shortcutted
    if (isDate(value) && keys.length === 0) {
      return stylize(value.toUTCString(), 'date');
    }

    var base, type, braces;
    // Determine the object type
    if (isArray(value)) {
      type = 'Array';
      braces = ['[', ']'];
    } else {
      type = 'Object';
      braces = ['{', '}'];
    }

    // Make functions say that they are functions
    if (typeof value === 'function') {
      var n = value.name ? ': ' + value.name : '';
      base = (isRegExp(value)) ? ' ' + value : ' [Function' + n + ']';
    } else {
      base = '';
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + value.toUTCString();
    }

    if (keys.length === 0) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return stylize('' + value, 'regexp');
      } else {
        return stylize('[Object]', 'special');
      }
    }

    seen.push(value);

    var output = keys.map(function(key) {
      var name, str;
      if (value.__lookupGetter__) {
        if (value.__lookupGetter__(key)) {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Getter/Setter]', 'special');
          } else {
            str = stylize('[Getter]', 'special');
          }
        } else {
          if (value.__lookupSetter__(key)) {
            str = stylize('[Setter]', 'special');
          }
        }
      }
      if (visible_keys.indexOf(key) < 0) {
        name = '[' + key + ']';
      }
      if (!str) {
        if (seen.indexOf(value[key]) < 0) {
          if (recurseTimes === null) {
            str = format(value[key]);
          } else {
            str = format(value[key], recurseTimes - 1);
          }
          if (str.indexOf('\n') > -1) {
            if (isArray(value)) {
              str = str.split('\n').map(function(line) {
                return '  ' + line;
              }).join('\n').substr(2);
            } else {
              str = '\n' + str.split('\n').map(function(line) {
                return '   ' + line;
              }).join('\n');
            }
          }
        } else {
          str = stylize('[Circular]', 'special');
        }
      }
      if (typeof name === 'undefined') {
        if (type === 'Array' && key.match(/^\d+$/)) {
          return str;
        }
        name = JSON.stringify('' + key);
        if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
          name = name.substr(1, name.length - 2);
          name = stylize(name, 'name');
        } else {
          name = name.replace(/'/g, "\\'")
                     .replace(/\\"/g, '"')
                     .replace(/(^"|"$)/g, "'");
          name = stylize(name, 'string');
        }
      }

      return name + ': ' + str;
    });

    seen.pop();

    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf('\n') >= 0) numLinesEst++;
      return prev + cur.length + 1;
    }, 0);

    if (length > 50) {
      output = braces[0] +
               (base === '' ? '' : base + '\n ') +
               ' ' +
               output.join(',\n  ') +
               ' ' +
               braces[1];

    } else {
      output = braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
    }

    return output;
  }
  return format(obj, (typeof depth === 'undefined' ? 2 : depth));
};


function isArray(ar) {
  return ar instanceof Array ||
         Array.isArray(ar) ||
         (ar && ar !== Object.prototype && isArray(ar.__proto__));
}


function isRegExp(re) {
  return re instanceof RegExp ||
    (typeof re === 'object' && Object.prototype.toString.call(re) === '[object RegExp]');
}


function isDate(d) {
  if (d instanceof Date) return true;
  if (typeof d !== 'object') return false;
  var properties = Date.prototype && Object_getOwnPropertyNames(Date.prototype);
  var proto = d.__proto__ && Object_getOwnPropertyNames(d.__proto__);
  return JSON.stringify(proto) === JSON.stringify(properties);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

exports.log = function (msg) {};

exports.pump = null;

var Object_keys = Object.keys || function (obj) {
    var res = [];
    for (var key in obj) res.push(key);
    return res;
};

var Object_getOwnPropertyNames = Object.getOwnPropertyNames || function (obj) {
    var res = [];
    for (var key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) res.push(key);
    }
    return res;
};

var Object_create = Object.create || function (prototype, properties) {
    // from es5-shim
    var object;
    if (prototype === null) {
        object = { '__proto__' : null };
    }
    else {
        if (typeof prototype !== 'object') {
            throw new TypeError(
                'typeof prototype[' + (typeof prototype) + '] != \'object\''
            );
        }
        var Type = function () {};
        Type.prototype = prototype;
        object = new Type();
        object.__proto__ = prototype;
    }
    if (typeof properties !== 'undefined' && Object.defineProperties) {
        Object.defineProperties(object, properties);
    }
    return object;
};

exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = Object_create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (typeof f !== 'string') {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(exports.inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j': return JSON.stringify(args[i++]);
      default:
        return x;
    }
  });
  for(var x = args[i]; i < len; x = args[++i]){
    if (x === null || typeof x !== 'object') {
      str += ' ' + x;
    } else {
      str += ' ' + exports.inspect(x);
    }
  }
  return str;
};

},{"events":16}],24:[function(require,module,exports){
var Frame = require('./frame').Frame
  , util = require('util');

var JSONProtocol = function(version) {
  var protocol = function(data) {
    return new Frame(data);
  }
  protocol.encode = function(message) {
    return util.format("%j", message);
  }
  protocol.version = version;
  protocol.versionLong = 'Version ' + version;
  protocol.type = 'version';
  return protocol;
};

var chooseProtocol = exports.chooseProtocol = function(header) {
  var protocol;
  switch(header.version) {
    case 1:
      protocol = JSONProtocol(1);
      break;
    case 2:
      protocol = JSONProtocol(2);
      protocol.sendHeartbeat = function(connection) {
        connection.send(protocol.encode({heartbeat: true}));
      }
      break;
    default:
      throw "unrecognized version";
  }
  return protocol;
}

},{"util":23,"./frame":6}],18:[function(require,module,exports){
var chooseProtocol = require('./protocol').chooseProtocol
  , EventEmitter = require('events').EventEmitter
  , _ = require('underscore');

var Connection = exports.Connection = function(opts) {
  this.opts = _.defaults(opts || {}, {
    host : '127.0.0.1',
    enableGestures: false,
    port: 6437,
    enableHeartbeat: true,
    heartbeatInterval: 100
  });
  this.host = opts.host;
  this.port = opts.port;
  this.on('ready', function() {
    this.enableGestures(this.opts.enableGestures);
    if (this.opts.enableHeartbeat) this.startHeartbeat();
  });
  this.on('disconnect', function() {
    if (this.opts.enableHeartbeat) this.stopHeartbeat();
  });
  this.heartbeatTimer = null;
}

Connection.prototype.sendHeartbeat = function() {
  this.setHeartbeatState(true);
  this.protocol.sendHeartbeat(this);
}

Connection.prototype.handleOpen = function() {
  this.emit('connect');
}

Connection.prototype.enableGestures = function(enabled) {
  this.gesturesEnabled = enabled ? true : false;
  this.send(this.protocol.encode({"enableGestures": this.gesturesEnabled}));
}

Connection.prototype.handleClose = function() {
  this.startReconnection();
  this.emit('disconnect');
}

Connection.prototype.startReconnection = function() {
  var connection = this;
  setTimeout(function() { connection.connect() }, 1000);
}

Connection.prototype.disconnect = function() {
  if (!this.socket) return;
  this.teardownSocket();
  this.socket = undefined;
  this.protocol = undefined;
}

Connection.prototype.handleData = function(data) {
  var message = JSON.parse(data);
  var messageEvent;
  if (this.protocol === undefined) {
    messageEvent = this.protocol = chooseProtocol(message);
    this.emit('ready');
  } else {
    messageEvent = this.protocol(message);
  }
  this.emit(messageEvent.type, messageEvent);
}

Connection.prototype.connect = function() {
  if (this.socket) {
    this.teardownSocket();
  }
  this.socket = this.setupSocket();
  return true;
}

Connection.prototype.send = function(data) {
  this.socket.send(data);
}

Connection.prototype.stopHeartbeat = function() {
  if (!this.heartbeatTimer) return;
  clearInterval(this.heartbeatTimer);
  delete this.heartbeatTimer;
  this.setHeartbeatState(false);
};

Connection.prototype.setHeartbeatState = function(state) {
  if (this.heartbeatState === state) return;
  this.heartbeatState = state;
  this.emit(this.heartbeatState ? 'focus' : 'blur');
};

_.extend(Connection.prototype, EventEmitter.prototype);

},{"events":16,"./protocol":24,"underscore":22}],19:[function(require,module,exports){
var EventEmitter = require('events').EventEmitter
  , Vector = require('../vector').Vector
  , _ = require('underscore')

var Region = exports.Region = function(start, end) {
  this.start = new Vector(start)
  this.end = new Vector(end)
  this.enteredFrame = null
}

Region.prototype.hasPointables = function(frame) {
  for (var i = 0; i != frame.pointables.length; i++) {
    var position = frame.pointables[i].tipPosition
    if (position.x >= this.start.x && position.x <= this.end.x && position.y >= this.start.y && position.y <= this.end.y && position.z >= this.start.z && position.z <= this.end.z) {
      return true
    }
  }
  return false
}

Region.prototype.listener = function(opts) {
  var region = this
  if (opts && opts.nearThreshold) this.setupNearRegion(opts.nearThreshold)
  return function(frame) {
    return region.updatePosition(frame)
  }
}

Region.prototype.clipper = function() {
  var region = this
  return function(frame) {
    region.updatePosition(frame)
    return region.enteredFrame ? frame : null
  }
}

Region.prototype.setupNearRegion = function(distance) {
  var nearRegion = this.nearRegion = new Region(
    [this.start.x - distance, this.start.y - distance, this.start.z - distance],
    [this.end.x + distance, this.end.y + distance, this.end.z + distance]
  )
  var region = this
  nearRegion.on("enter", function(frame) {
    region.emit("near", frame)
  })
  nearRegion.on("exit", function(frame) {
    region.emit("far", frame)
  })
  region.on('exit', function(frame) {
    region.emit("near", frame)
  })
}

Region.prototype.updatePosition = function(frame) {
  if (this.nearRegion) this.nearRegion.updatePosition(frame)
  if (this.hasPointables(frame) && this.enteredFrame == null) {
    this.enteredFrame = frame
    this.emit("enter", this.enteredFrame)
  } else if (!this.hasPointables(frame) && this.enteredFrame != null) {
    this.enteredFrame = null
    this.emit("exit", this.enteredFrame)
  }
  return frame
}

Region.prototype.normalize = function(position) {
  return new Vector([
    (position.x - this.start.x) / (this.end.x - this.start.x),
    (position.y - this.start.y) / (this.end.y - this.start.y),
    (position.z - this.start.z) / (this.end.z - this.start.z)
  ])
}

Region.prototype.mapToXY = function(position, width, height) {
  var normalized = this.normalize(position)
  var x = normalized.x, y = normalized.y
  if (x > 1) x = 1
  else if (x < -1) x = -1
  if (y > 1) y = 1
  else if (y < -1) y = -1
  return [
    (x + 1) / 2 * width,
    (1 - y) / 2 * height,
    normalized.z
  ]
}

_.extend(Region.prototype, EventEmitter.prototype)
},{"events":16,"../vector":10,"underscore":22}]},{},[1,2,3])
;