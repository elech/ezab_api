var express = require('express'),
	app = express(),
	Bookshelf = require('bookshelf')
	
require('./routes.js')(app);

Bookshelf.DB = Bookshelf.initialize({
	client: 'mysql',
	connection: {
		host: 'localhost',
		port: '3306',
		user: 'root',
		password: 'toor',
		database: 'ezab'
	}
});

var server = app.listen(3000, function(){
	console.log('listening');
});

module.exports = server;