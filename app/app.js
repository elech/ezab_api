var express = require('express'),
	app = express(),
	mongoose = require('mongoose');


app.configure('dev', function(){
	mongoose.connect('mongodb://localhost:27017/test');
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, "Connection error: "));
db.once('open', function(){
  console.log('opened');
})

require('./routes.js')(app);

app.listen(3000);

module.exports = app;
