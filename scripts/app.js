'use strict';

var express = require('express');
var app = express();
var fs = require('fs');
var services = {};
var staticFiles = __dirname + '/../public';

// server static

console.log('serve static files from:: ' + staticFiles);
app.use(express.static(staticFiles));

// bootstrap services

var servicesPath = __dirname + '/services';
fs.readdirSync(servicesPath).forEach(function(file) {
	console.log('load service:: ' + file);
  var service = require(servicesPath + '/' + file);
  services[service.name] = service;
});

// bootstrap resources

var modelsPath = __dirname + '/resources';
fs.readdirSync(modelsPath).forEach(function(file) {
	console.log('load resource:: ' + file);
  var resource = require(modelsPath + '/' + file);
  resource.initialize(app, services);
});

// start app

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
