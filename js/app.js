var width = window.innerWidth;
var height = window.innerHeight;

var currSelType = null;
var currSelWidth = null;
var currSelHeight = null;

var stage = new Konva.Stage({
  stroke: 'grey',
  container: 'drawing-area',
  width: 600,
  height: 400
});

// stage.getContainer().style.border = '1px solid black';
stage.getContainer().style.background = 'white';
stage.getContainer().style.boxShadow = '2px -1px 20px -1px rgba(207,205,207,1)';
stage.getContainer().style.width = '600px !important';
stage.getContainer().style.height = '400px !important';
stage.getContainer().style.marginLeft = '40px';
stage.getContainer().style.marginRight = 'auto';
stage.getContainer().style.borderRadius = '10px';
stage.getContainer().style.overflow = 'hidden';

var layer = new Konva.Layer();
stage.add(layer);

document.getElementById('save').addEventListener(
  'click',
  function() {
    console.log(stage);
    var dataURL = stage.toDataURL();
    downloadURI(dataURL, 'stage.png');
  },
  false
);

function passParams(width, height, template){
    $.ajax({
      url: "/ImageMatch",
      type: "get", //send it through get method
      data: {
        Width: width,
        Height: height,
        Image: template
      },
      success: function(response) {
        //Do Something
      },
      error: function(xhr) {
        //Do Something to handle error
      }
    });
}

function update(activeAnchor) {
  var group = activeAnchor.getParent();
  console.log(group.type)

  var topLeft = group.get('.topLeft')[0];
  var topRight = group.get('.topRight')[0];
  var bottomRight = group.get('.bottomRight')[0];
  var bottomLeft = group.get('.bottomLeft')[0];
  var image = group.get('Image')[0];

  var anchorX = activeAnchor.getX();
  var anchorY = activeAnchor.getY();

  // update anchor positions
  switch (activeAnchor.getName()) {
    case 'topLeft':
      topRight.y(anchorY);
      bottomLeft.x(anchorX);
      break;
    case 'topRight':
      topLeft.y(anchorY);
      bottomRight.x(anchorX);
      break;
    case 'bottomRight':
      bottomLeft.y(anchorY);
      topRight.x(anchorX);
      break;
    case 'bottomLeft':
      bottomRight.y(anchorY);
      topLeft.x(anchorX);
      break;
  }

  image.position(topLeft.position());

  var width = topRight.getX() - topLeft.getX();
  var height = bottomLeft.getY() - topLeft.getY();
  if (width && height) {
    image.width(width);
    image.height(height);
  }

  group.on('mouseover', showAnchors);
  group.on('mouseout', hideAnchors);
}

function addAnchor(group, x, y, name) {
  var stage = group.getStage();
  var layer = group.getLayer();

  var anchor = new Konva.Circle({
    x: x,
    y: y,
    stroke: '#456bd9',
    fill: '#456bd9',
    strokeWidth: 1,
    radius: 8,
    name: name,
    draggable: true,
    dragOnTop: false
  });

  anchor.on('dragmove', function() {
    update(this);
    layer.draw();
  });

  anchor.on('mouseup', function(){
    var tempGroup = this.getParent();
    var image = tempGroup.get('Image')[0];
    passParams(image.width(), image.height(), tempGroup.getAttr("template"));
  })

  group.add(anchor);
}

function showAnchors() {
  this.find('Circle').show();
  layer.draw();
}

function hideAnchors() {
  this.find('Circle').hide();
  layer.draw();
}

//-------------------- New Image -----------------------------

function createNewImage(type) {
  var objectImage = new Konva.Image({
    width: 100,
    height: 100,
  });

  var objectImageGroup = new Konva.Group({
    x: 100,
    y: 100,
    draggable: true
  });

  objectImageGroup.add(objectImage);
  objectImageGroup.setAttr("template", type);
  layer.add(objectImageGroup);

  passParams(100, 100, type);

  addAnchor(objectImageGroup, 0, 0, 'topLeft');
  addAnchor(objectImageGroup, 100, 0, 'topRight');
  addAnchor(objectImageGroup, 100, 100, 'bottomRight');
  addAnchor(objectImageGroup, 0, 100, 'bottomLeft');


  var img = new Image();
  img.onload = function() {
    objectImage.image(img);
    layer.draw();
  };

  objectImageGroup.on("click", function(){
    var image = this.get('Image')[0];
    passParams(image.width(), image.height(), this.getAttr("template"));
  });

  if (type === 'Person') {
    img.src = 'shape-database/001/000000000036_01.png';
  } else if (type === 'Tree') {
    img.src = 'images/tree.svg';
  } else if (type === 'Sky') {
    img.src = 'images/sky.svg';
  } else if (type === 'Water') {
    img.src = 'images/water.svg';
  } else if (type === 'Mountain') {
    img.src = 'images/mountain.svg';
  } else if (type === 'Ground') {
    img.src = 'images/ground.svg';
  } else if (type === 'Fish') {
    img.src = 'images/fish.svg';
  }
}

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}
