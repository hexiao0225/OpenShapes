var express = require('express');
var fs = require('fs');
var glob = require('glob')
var http = require('http');
var sizeOf = require('image-size');
var imageMatch = require('./js/imageMatch.js');

app = express();
app.use('/', express.static(__dirname + '/'));

var port = process.env.PORT || 3000;

app.get('/ImageMatch', function(req, res){
  console.log("type:", req.query.Image);
  console.log("dims:", req.query.Width / req.query.Height)
  imageMatch.matchImage(req.query.Width / req.query.Height, req.query.Image);
  res.end();
});

const server = http.createServer(app)
    .listen(port, () => {
        console.log('server running at ' + port)
    })
