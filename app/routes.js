
module.exports = function(app){
	var users = require('./controllers/users.js')(app);
	
	//users
	app.get('/users/:id', users.get);
	app.post('/users', users.create)
	app.get('/', function(req, res){
		res.send(200);
	});

	app.get('/users/:id', users.get);
	app.post('/tokens', function(req, res){
		res.send(201);
	});
}