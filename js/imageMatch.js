var fs = require("fs");
var sizeOf = require('image-size');
var path = "./images/";

exports.matchImage = function(dimRatio, type){
  var bound = 0.1;
  var imageList = []
  fs.readdir(path, function(err, items) {
    for(var i = 0; i < items.length; i++){
      sizeOf(path + items[i], function(err, dims){
        var imgRatio = dims.width/dims.height;
        if(imgRatio >= dimRatio - bound &&
           imgRatio <= dimRatio + bound){
          imageList.push(items[i]);
        }
      });
    }
  });
}
