
module.exports = function(app){
	var users = require('./controllers/users.js')(app);
	var tokens = require('./controllers/tokens.js')(app);
	//users
	app.get('/users', users.list);
	app.get('/users/:id', users.get);
	app.post('/users', users.create);
	app.put('/users/:id', users.edit);
	app.del('/users/:id', users.del);
	

	//tokens
	app.post('/tokens', tokens.create);

	app.get('/', function(req, res){
		res.send(200);
	});

}