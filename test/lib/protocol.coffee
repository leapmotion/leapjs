angular.
  module('ProtocolTest', []).
  controller 'ProtocolController',  ($scope)->
    $scope.protocol = 4
    $scope.script = "//js.leapmotion.com/leap-0.4.1.min.js"
    $scope.scripts = [
      "//js.leapmotion.com/0.2.0-beta1/leap.min.js"
      "//js.leapmotion.com/0.2.0-beta2/leap.min.js"
      "//js.leapmotion.com/0.2.0-beta3/leap.min.js"
      "//js.leapmotion.com/0.2.0-beta4/leap.min.js"
      "//js.leapmotion.com/0.2.0-beta5/leap.min.js"
      "//js.leapmotion.com/0.2.0-beta6/leap.min.js"
      "//js.leapmotion.com/0.2.0/leap.min.js"
      "//js.leapmotion.com/0.2.1/leap.min.js"
      "//js.leapmotion.com/0.2.2/leap.min.js"
      "//js.leapmotion.com/0.3.0-beta1/leap.min.js"
      "//js.leapmotion.com/0.3.0-beta2/leap.min.js"
      "//js.leapmotion.com/0.3.0-beta3/leap.min.js"
      "//js.leapmotion.com/0.3.0/leap.min.js"
      "//js.leapmotion.com/leap-0.4.0.min.js"
      "//js.leapmotion.com/leap-0.4.1.min.js"
    ]
    $scope.log = []

    $scope.safeApply = (fn) ->
      phase = this.$root.$$phase;
      if(phase == '$apply' || phase == '$digest')
        fn() if fn && (typeof(fn) == 'function')
      else
        this.$apply(fn)

    log = (message, options = {})->
      $scope.log.unshift {
        message: message
        date: Date.now()
        class: options.class
      }
      $scope.safeApply()


    $scope.$watch 'protocol', (newVal, oldVal)->
      reconnect() if window.Leap


    $scope.saveCustomScriptURL = ->
      console.log 'save custom url'
      $scope.showCustomScriptInput = false
      if $scope.customScriptURL.length > 0
        $scope.scripts.push $scope.customScriptURL
        $scope.script = $scope.customScriptURL

    $scope.$watch 'script', (newVal, oldVal)->
      if newVal == 'other'
        $scope.showCustomScriptInput = true
        return


      script = document.createElement('script')
      document.body.appendChild script
      script.type = 'text/javascript'
      script.src = newVal
      script.onload = reconnect
      script.onerror = (e)->
        log("Error loading #{newVal}", class: 'italic')

    controller = undefined

    reconnect = ->
      if controller
        controller.disconnect()
        # for whatever reason, blur and focus events still trigger after d/c
        controller.removeAllListeners('blur')
        controller.removeAllListeners('focus')
        controller = null

      log "connected #{$scope.script}, protocol v#{$scope.protocol}", {class: 'italic'}
      window.controller = controller = new Leap.Controller()
      controller.connection.opts.requestProtocolVersion = $scope.protocol
      controller.on 'connect', () ->
        log('connect')

      controller.on 'deviceConnected', () ->
        log('deviceConnected')

      controller.on 'deviceDisconnected', () ->
        log('deviceDisconnected')

      controller.on 'ready', () ->
        log('ready')

      controller.on 'focus', () ->
        log('focus')

      controller.on 'blur', () ->
        log('blur')

      controller.on 'deviceStreaming', (e) ->
        log("deviceStreaming")

      controller.on 'streamingStarted', (e) ->
        log("streamingStarted")

      controller.on 'streamingStopped', (e) ->
        log("streamingStopped")

      controller.on 'deviceStopped', (e) ->
        log("deviceStopped")

      controller.on 'deviceAttached', (e) ->
        log("deviceAttached")

      controller.on 'deviceRemoved', (e) ->
        log("deviceRemoved")

      controller.on 'frame', (frame) ->
        $scope.frameId = frame.id
        $scope.safeApply()

      controller.connect()


    window.onerror = (message, url, linenumber)->
      # this will be unhelpful for remote scripts due to CORS.
      # See http://blog.meldium.com/home/2013/9/30/so-youre-thinking-of-tracking-your-js-errors
      log(message, class: 'italic')
