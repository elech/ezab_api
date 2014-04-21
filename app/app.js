var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');


app.use(bodyParser());

app.set('models', require('./models'));
require('./routes.js')(app);

app.listen(3000)
module.exports = app;