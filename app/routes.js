module.exports = function(app){
	var users = require('./controllers/users.js')(app);
	var tokens = require('./controllers/tokens.js')(app);
	var webprops = require('./controllers/webproperties.js')(app);
	var campaigns = require('./controllers/campaigns.js')(app);
	var experiences = require('./controllers/experiences.js')(app);
	var beacons = require('./controllers/beacons.js')(app);
	var jwt = require('jsonwebtoken');
	var User = app.get('models').User;
	
	function auth(req, res, next){
		if(!req.get('Authorization')) return res.send(401);
		var parts = req.get('Authorization').split(' ');
		if(parts.length !== 2) return res.send(401); 
		jwt.verify(parts[1], 'secret', function(err, decoded) {
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

	app.namespace('/api/v1', function(){
		app.get('/users', users.list);
		app.get('/users/:id', users.get);
		app.post('/users', users.create);
		app.put('/users/:id', users.edit);
		app.delete('/users/:id', users.del);
		

		//tokens
		app.post('/tokens', tokens.create);

		//webprops
		app.get('/webproperties', auth, webprops.list);
		app.get('/webproperties/:id', auth, webprops.get);
		app.post('/webproperties', auth, webprops.create);
		app.put('/webproperties/:propid', auth, webprops.edit);
		app.delete('/webproperties/:propid', auth, webprops.del);
		app.get('/webproperties/:propid/publish', auth, webprops.publish);
		
		//campaigns
		app.get('/webproperties/:propid/campaigns', auth, campaigns.list);
		app.get('/webproperties/:propid/campaigns/:cid', auth, campaigns.get);
		app.post('/webproperties/:propid/campaigns', auth, campaigns.create);
		app.put('/webproperties/:propid/campaigns/:cid', auth, campaigns.edit);
		app.delete('/webproperties/:propid/campaigns/:cid', auth, campaigns.del)
		app.get('/campaigns/:cid/stats', campaigns.stats);


		//experiences
		app.get('/webproperties/:propid/campaigns/:cid/experiences', auth, experiences.list);
		app.get('/webproperties/:propid/campaigns/:cid/experiences/:eid', auth, experiences.get);
		app.post('/webproperties/:propid/campaigns/:cid/experiences', auth, experiences.create);
		app.put('/webproperties/:propid/campaigns/:cid/experiences/:eid', auth, experiences.edit);
		app.delete('/webproperties/:propid/campaigns/:cid/experiences/:eid', auth, experiences.del);

		//beacon
		app.get('/beacon', beacons.get);
	})
	//users
}