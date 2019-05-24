var fs = require("fs");
var glob = require('glob')
var sizeOf = require('image-size');
var path = "./shape-database/";

exports.matchImage = function(dimRatio, type){
  var bound = 0.1;
  var imageList = [];
  var currPath = path + type + '/'
  var items = glob.sync(currPath + '*.svg');
  for(var i = 0; i < items.length; i++){
    var dims = sizeOf(items[i]);
    var imgRatio = dims.width/dims.height;
    if(imgRatio >= dimRatio - bound &&
       imgRatio <= dimRatio + bound){
      console.log(items[i]);
      imageList.push(items[i]);
    }
  }
  console.log(imageList);
}
