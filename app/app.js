var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');


app.use(bodyParser());

app.set('models', require('./models'));
require('./routes.js')(app);


module.exports = app;