var jwt = require('jsonwebtoken');
module.exports = function(app){

	function _create(){
		User.find({where: {email: req.body.email}}).then(function(user){
			if(!user) return res.send(401);
			user.comparePassword(req.body.password).then(function(match){
				if(!match) return res.send(401);
				var profile = {
					name: user.get('name'),
					email: user.get('email')
				};
				var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
				res.send(200, token);
			}, function(){
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