var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  stroke: 'grey',
  container: 'drawing-area',
  width: 800,
  height: 600
});

stage.getContainer().style.border = '1px solid black';
stage.getContainer().style.width = '800px';
stage.getContainer().style.height = '600px';
stage.getContainer().style.margin = '40px';
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

function update(activeAnchor) {
  var group = activeAnchor.getParent();

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
}
function addAnchor(group, x, y, name) {
  var stage = group.getStage();
  var layer = group.getLayer();

  var anchor = new Konva.Circle({
    x: x,
    y: y,
    stroke: 'grey',
    fill: '#ededed',
    strokeWidth: 1,
    radius: 4,
    name: name,
    draggable: true,
    dragOnTop: false
  });

  anchor.on('dragmove', function() {
    update(this);
    layer.draw();
  });
  anchor.on('dblclick', function() {
    this.remove();
    layer.draw();
  });
  anchor.on('mousedown touchstart', function() {
    group.draggable(false);
    this.moveToTop();
  });
  anchor.on('dragend', function() {
    group.draggable(true);
    layer.draw();
  });
  // add hover styling
  anchor.on('mouseover', function() {
    var layer = this.getLayer();
    document.body.style.cursor = 'pointer';
    this.stroke('#00bcd4');
    this.fill('#00bcd4');
    this.strokeWidth(1);
    this.radius(4);
    layer.draw();
  });
  anchor.on('mouseout', function() {
    var layer = this.getLayer();
    document.body.style.cursor = 'default';
    //   this.strokeWidth(2);
    this.stroke('black');
    this.fill('transparent');
    layer.draw();
  });

  group.add(anchor);
}

//-------------------- New Image -----------------------------

function createNewImage(type) {
  var objectImage = new Konva.Image({
    width: 100,
    height: 100
  });

  var objectImageGroup = new Konva.Group({
    x: 100,
    y: 100,
    draggable: true
  });
  objectImageGroup.add(objectImage);
  layer.add(objectImageGroup);

  addAnchor(objectImageGroup, 0, 0, 'topLeft');
  addAnchor(objectImageGroup, 100, 0, 'topRight');
  addAnchor(objectImageGroup, 100, 100, 'bottomRight');
  addAnchor(objectImageGroup, 0, 100, 'bottomLeft');

  console.log(objectImageGroup.getLayer());

  var img = new Image();
  img.onload = function() {
    objectImage.image(img);
    layer.draw();
  };

  if (type === 'Elephant') {
    img.src = '/Users/xiaohe/cmu_drawing_app/konva/images/elephant.svg';
  } else if (type === 'Tree') {
    img.src = '/Users/xiaohe/cmu_drawing_app/konva/images/tree.svg';
  } else if (type === 'Sky') {
    img.src = '/Users/xiaohe/cmu_drawing_app/konva/images/sky.svg';
  } else if (type === 'Water') {
    img.src = '/Users/xiaohe/cmu_drawing_app/konva/images/water.svg';
  } else if (type === 'Mountain') {
    img.src = '/Users/xiaohe/cmu_drawing_app/konva/images/mountain.svg';
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
