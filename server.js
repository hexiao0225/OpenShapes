var express = require('express');
var fs = require('fs');
var http = require('http');
var sizeOf = require('image-size');

app = express();
app.use('/', express.static(__dirname + '/'));

var path = "./images/"
var port = process.env.PORT || 3000;

function imageMatch(dimRatio, type){
  var bound = 0.1;
  var imageList = []
  fs.readdir(path, function(err, items) {
    for(var i = 0; i < items.length; i++){
      sizeOf(path + items[i], function(err, dims){
        console.log(dims.width/dims.height);
      });
    }
  })
}

app.get('/ImageMatch', function(req, res){
  console.log(req.query.Width)
  console.log(req.query.Height)
  console.log(req.query.Width / req.query.Height)
  console.log(req.query.Image)
  imageMatch(req.query.Width / req.query.Height, req.query.Image);
  res.end();
});

const server = http.createServer(app)
    .listen(port, () => {
        console.log('server running at ' + port)
    })
