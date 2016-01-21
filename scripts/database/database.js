'use strict';

exports.initialize = function(ip) {

		var mongoose = require('mongoose'),
				fs = require('fs'),
				connectionString = 'mongodb://' + ip + '/mean-heremaps-jobmapper';

		// bootstrap connections.

		console.log('connect to DB: ' + connectionString);
		mongoose.connect(connectionString);

		// bootstrap modules

		var modelsPath = __dirname + '/models';
		fs.readdirSync(modelsPath).forEach(function(file) {
			console.log('load model ' + file);
		    require(modelsPath + '/' + file);
		});
}
