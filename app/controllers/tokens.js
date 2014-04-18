var jwt = require('jsonwebtoken');
module.exports = function(app){
	var User = app.get('models').User;

	function _create(req, res){
		User.find({where: {email: req.body.email}}).then(function(user){
			
			if(!user) return res.send(401);
			
			user.comparePassword(req.body.password).then(function(match){
				if(!match) return res.send(401);
				var profile = {
					id: user.get('id')
				}, token = jwt.sign(profile, 'secret', { expiresInMinutes: 60*5 });
				
				return res.send(201, {token: token});
			}, function(err){
				return res.send(401);
			})
		}, function(err){
			return res.send(500);
		})
	}

	return {
		create: _create
	}
}