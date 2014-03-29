describe('Indicator [browser-only]', function(){
  it('should show & hide', function(){
    var indicator = Leap.Indicator.element;

    Leap.Indicator.show();
    assert(indicator.style.display, 'block');
    assert(indicator.parentNode, document.body);

    Leap.Indicator.hide()
    assert(indicator.style.display, 'none');
  });

  it('should go green on connection', function(){

  });

  it('should fade on disconnection', function(){

  });

  it('should navigation to leapmotion.com', function(){

  });

  it('should be positionable', function(){

  });

  it('should be hoverable ', function(){

  });
});