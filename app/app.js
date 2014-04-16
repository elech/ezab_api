var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');


app.use(bodyParser());

app.set('models', require('./models'));
require('./routes.js')(app);



var server = app.listen(3000, function(){
	console.log('listening');
});
module.exports = server;