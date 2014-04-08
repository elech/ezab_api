module.exports = function(app){
	app.get('/', function(req, res){
		res.send(200);
	});

	app.post('/tokens', function(req, res){
		res.send(201);
	});
}