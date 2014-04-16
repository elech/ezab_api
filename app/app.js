var express = require('express'),
	app = express(),
	Bookshelf = require('bookshelf')
	
require('./routes.js')(app);



var server = app.listen(3000, function(){
	console.log('listening');
});

module.exports = server;