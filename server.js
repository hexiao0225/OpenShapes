var express = require('express');
var fs = require('fs');
var http = require('http');

app = express();
app.use('/', express.static(__dirname + '/'));

var path = "./images/"
var port = process.env.PORT || 3000;

function imageMatch(dimRatio){
  fs.readdir(path, function(err, items) {
    for(var i = 0; i < items.length; i++){
      console.log(items[i]);
    }
  })
}

app.get('/ImageMatch', function(req, res){
  console.log(req.query.Width)
  console.log(req.query.Height)
  console.log(req.query.Width / req.query.Height)
  imageMatch(req.query.Width / req.query.Height);
  res.send("hrllo");
});

const server = http.createServer(app)
    .listen(port, () => {
        console.log('server running at ' + port)
    })
