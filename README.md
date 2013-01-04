# Leap JS

This is the js framework for working with the Leap.

## Examples blah blah

To use the leap motion api do the following...

```javascript
<script src="https://leapmotion.com/leap.js"></script>
<script>
  var controller = new Leap.Controller();
  controller.onFrame(function() {
    console.log("hello")
    console.log(controller.frame().id)
    console.log(controller.frame().fingers.length)
    console.log(controller.frame().finger(0))
  })
</script>
```
