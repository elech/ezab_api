module.exports = function(app){
	var WebProperty = app.get('models').WebProperty;
	
	function _list(req, res){
		req.user.getWebproperties().then(function(props){
			return res.send(200, props);
		}, function(err){
			return res.send(500, err);
		})	
	}

	function _get(req, res){
		req.user.getWebproperties({where:{id: req.params.id}}).then(function(prop){
			if(!prop || prop.length !== 1) return res.send(404);
			return res.send(200, prop[0]);
		}, function(err){
			return res.send(500, err);
		})
	}

	function _create(req, res){
		WebProperty.create({
			name: req.body.name,
			url: req.body.url,
			userId: req.user.get('id')
		}).then(function(prop){
			return res.send(201, prop);
		}, function(err){
			return res.send(400, err);
		});
	}

	function _publish(req, res){
		//WebProperty.publishable()
		res.send(200);
	}

	

	return {
		list: _list,
		get: _get,
		create: _create
	}

}