var express = require('express');
var app = express();
var path = require('path');
var port = 8080;

// __dirname will use the current path from where you run this file 
app.use(express.static(path.join(__dirname, '/build')));
app.listen(port, "0.0.0.0");

require('dns').lookup(require('os').hostname(), function (err, add, fam) {
  console.log("Listening: " + add + ':' + port);
})