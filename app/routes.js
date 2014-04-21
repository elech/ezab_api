module.exports = function(app){
	var users = require('./controllers/users.js')(app);
	var tokens = require('./controllers/tokens.js')(app);
	var webprops = require('./controllers/webproperties.js')(app);
	var campaigns = require('./controllers/campaigns.js')(app);
	var experiences = require('./controllers/experiences.js')(app);
	var jwt = require('jsonwebtoken');
	var User = app.get('models').User;
	
	function auth(req, res, next){
		jwt.verify(req.get('Bearer'), 'secret', function(err, decoded) {
  		if(err) return res.send(401);
  		User.find(decoded.id).then(function(user){
  			if(!user) return res.send(500); //why would this happen
  			req.user = user;
  			next();
  		}, function(err){
  			return res.send(500);
  		})
		});
	}

	//users
	app.get('/users', users.list);
	app.get('/users/:id', users.get);
	app.post('/users', users.create);
	app.put('/users/:id', users.edit);
	app.del('/users/:id', users.del);
	

	//tokens
	app.post('/tokens', tokens.create);

	//webprops
	app.get('/webproperties', auth, webprops.list);
	app.get('/webproperties/:id', auth, webprops.get);
	app.post('/webproperties', auth, webprops.create);
	app.get('/webproperties/:propid/campaigns', auth, campaigns.list);

	app.get('/webproperties/:propid/campaigns/:cid/experiences', auth, experiences.list);
	app.get('/webproperties/:propid/campaigns/:cid/experiences/:eid', auth, experiences.get);

	app.get('/', function(req, res){
		res.send(200);
	});

}