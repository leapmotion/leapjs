describe('Controller', function(){

  it ("should show & hide [browser-only]", function(){
    var dialog = new Dialog("Test Message");

    dialog.show();
    dialog.hide();

    assert(true);
  });

});
