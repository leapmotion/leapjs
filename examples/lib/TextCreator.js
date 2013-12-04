function TextCreator( world , params ){

  this.world  = world;

  this.params = _.defaults( params || {}, {
    
    size:                                100,
    type:                  "Bold 20px Arial", 
    color:  "rgba( 255 , 255 , 255 , 0.95 )",
    crispness:                            10,
        
  });

  
}

TextCreator.prototype.createMesh = function( string , params ){

  var canvas  = document.createElement('canvas');
  var ctx     = canvas.getContext( '2d' ); 
  var params  = _.defaults( params || {}, {
    
    color:      this.params.color,
    size:       this.params.size,
    crispness:  this.params.crispness
        
  });


  var size   = params.size;
  var color  = params.color;

  // This is the factor the canvas will be scaled 
  // up by, which basically equates to 'crispness'
  var scaleFactor = params.crispness;

  // To make sure that the text is crisp,
  // need to draw it large and scale down
  var fullSize = scaleFactor * size;


  // If you want a margin, you can define it in the params
  if( !params.margin )
    margin = size * .5;

  // Gets how wide the tesxt is
  ctx.font      = fullSize + "pt Arial";
  var textWidth = ctx.measureText(string).width;

  canvas.width  = textWidth + margin;
  canvas.height = fullSize + margin;
  ctx.font      = fullSize + "pt Arial";


  // Gives us a background instead of transparent background
  if( params.backgroundColor ) {
      ctx.fillStyle = params.backgroundColor;
      ctx.fillRect(
          canvas.width / 2 - textWidth / 2 - margin / 2, 
          canvas.height / 2 - fullSize / 2 - + margin / 2, 
          textWidth + margin, 
          fullSize + margin
      );
  }

  // Makes sure our text is centered
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = color;
  ctx.fillText(string, canvas.width / 2, canvas.height / 2);

  // Creates a texture
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  var material = new THREE.MeshBasicMaterial({
    map:         texture,
    transparent:  true,
    side:         THREE.DoubleSide
  });

  var geo = new THREE.PlaneGeometry( 
    canvas.width  / scaleFactor, 
    canvas.height / scaleFactor
  );
  var mesh = new THREE.Mesh(geo, material);
  
  // Assigning the texture
  mesh.string = string;

  return mesh;

}


