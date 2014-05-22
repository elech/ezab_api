var express = require('express')
	,	bodyParser = require('body-parser');
require('express-namespace')

app = express();
app.set('port', process.env.PORT || 8000);

app.use(bodyParser());
app.use('/public', express.static(__dirname + '/public'));


app.set('models', require('./models'));
require('./routes.js')(app);

app.listen(app.get('port'));
module.exports = app;