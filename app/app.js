var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');


app.use(bodyParser());
app.use('/public', express.static(__dirname + '/public'));


app.set('models', require('./models'));
require('./routes.js')(app);

app.listen(8000);
module.exports = app;