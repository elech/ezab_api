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

	function _edit(req, res){
		User.find(req.params.id)
			.success(function(user){
				if(!user) return res.send(404);
				var updates = {};
				if(req.body.name) { updates.name = req.body.name; }
				if(req.body.email) { updates.email = req.body.email; }
				if(req.body.password){ updates.password = req.body.password; }

				user.updateAttributes(updates).success(function(user){
					return res.send(200, user);
				}).error(function(err){
					return res.send(400, err)
				})
			})
			.error(function(){
				return res.send(500);
			})
	}

	function _del(req, res){
		User.find(req.params.id)
			.success(function(user){
				if(!user) return res.send(404);
				user.destroy()
					.success(function(){
						return res.send(200, user);
					})
					.error(function(err){
						return res.send(400, err);
					})
			})
			.error(function(err){
				return res.send(500);
			})
	}

	return {
		get: _get,
		list: _list,
		create: _create,
		edit: _edit,
		del: _del
	}
}