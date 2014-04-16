var express = require('express'),
	app = express();


app.set('models', require('./models'));
require('./routes.js')(app);

var server = app.listen(3000, function(){
	console.log('listening');
});

module.exports = server;