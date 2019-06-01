var fs = require("fs");
var glob = require('glob')
var sizeOf = require('image-size');
var path = "./shape-database/";

exports.matchImage = function(dimRatio, type){
  var imageList = [];
  var rounded = (Math.round(dimRatio * 10)/10).toFixed(1);
  var currPath = path + type + '/' + rounded + "/";
  console.log(currPath);
  var imageList = glob.sync(currPath + '*.svg');
  return imageList;
}
