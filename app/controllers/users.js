module.exports = function(app){
	var User = app.get('models').User;

	function _get(req, res){
		User.find(req.params.id)
			.success(function(user){
				if(!user) return res.send(404);
				return res.send(200, user);
			})
			.error(function(err){
				return res.send(500);
			})
	}

	function _list(req, res){
		User.findAll()
			.success(function(users){
				return res.send(200, users);
			})
			.error(function(err){
				console.log(err);
				return res.send(500);
			})
	}

	function _create(req, res){
		User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})
		.success(function(user){
			var dto = user.toJSON();
			dto.password = void 0;
			return res.send(201, dto);
		})
		.error(function(err){
			console.log(err);
			return res.send(400, err);
		})
		
	}

	return {
		get: _get,
		list: _list,
		create: _create
	}
}